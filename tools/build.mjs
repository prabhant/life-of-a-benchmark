import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const benchmarksDir = path.join(rootDir, "benchmarks");
const assetsDir = path.join(rootDir, "assets");
const distDir = path.join(rootDir, "dist");

const HEALTH_COLORS = {
  green: "Green",
  yellow: "Yellow",
  red: "Red"
};

const htmlEscape = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const parseBullets = (rawSection) =>
  rawSection
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => line.slice(2).trim())
    .filter(Boolean);

const parseEvidence = (rawSection) =>
  parseBullets(rawSection).map((item) => {
    const match = item.match(/^\[(.+)\]\((https?:\/\/.+)\)$/);
    if (!match) {
      return { label: item, url: null };
    }
    return { label: match[1].trim(), url: match[2].trim() };
  });

const parseMarkdownBenchmark = (filename, raw) => {
  const lines = raw.replaceAll("\r\n", "\n").split("\n");
  const titleLine = lines.find((line) => line.trim().startsWith("# "));
  if (!titleLine) {
    throw new Error(`Missing top-level title in ${filename}`);
  }

  const title = titleLine.replace(/^#\s+/, "").trim();

  const healthLine = lines.find((line) => /^Health:\s*/i.test(line.trim()));
  if (!healthLine) {
    throw new Error(`Missing 'Health:' line in ${filename}`);
  }

  const health = healthLine.split(":")[1].trim().toLowerCase();
  if (!HEALTH_COLORS[health]) {
    throw new Error(`Health must be Green/Yellow/Red in ${filename}`);
  }

  const slugLine = lines.find((line) => /^Slug:\s*/i.test(line.trim()));
  const slug = slugLine
    ? slugify(slugLine.split(":")[1].trim())
    : slugify(path.basename(filename, ".md"));

  const sections = {};
  let currentSection = null;
  const sectionBuffer = [];

  const flush = () => {
    if (!currentSection) return;
    sections[currentSection] = sectionBuffer.join("\n").trim();
    sectionBuffer.length = 0;
  };

  for (const line of lines) {
    const sectionMatch = line.match(/^##\s+(.+)$/);
    if (sectionMatch) {
      flush();
      currentSection = sectionMatch[1].trim().toLowerCase();
      continue;
    }
    if (currentSection) {
      sectionBuffer.push(line);
    }
  }
  flush();

  const description = (sections.description || "").trim();
  const capabilities = parseBullets(sections.capabilities || "");
  const timeline = parseBullets(sections.timeline || "");
  const knownIssues = parseEvidence(sections["known issues"] || "");
  const evidence = parseEvidence(sections.evidence || "");
  const successors = parseBullets(sections.successors || "");

  if (!description) {
    throw new Error(`Missing Description section content in ${filename}`);
  }

  const unsupportedIssue = knownIssues.find((issue) => !issue.url);
  if (unsupportedIssue) {
    throw new Error(
      `Known issue must link directly to supporting evidence in ${filename}: ${unsupportedIssue.label}`
    );
  }

  return {
    title,
    slug,
    health,
    description,
    capabilities,
    timeline,
    knownIssues,
    evidence,
    successors
  };
};

const readBenchmarks = async () => {
  const entries = await readdir(benchmarksDir, { withFileTypes: true });
  const markdownFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => entry.name);

  if (markdownFiles.length === 0) {
    throw new Error("No benchmark markdown files found in benchmarks/.");
  }

  const benchmarks = [];
  for (const file of markdownFiles) {
    const fullPath = path.join(benchmarksDir, file);
    const raw = await readFile(fullPath, "utf8");
    benchmarks.push(parseMarkdownBenchmark(file, raw));
  }

  benchmarks.sort((a, b) => a.title.localeCompare(b.title));
  return benchmarks;
};

const renderList = (items) => {
  if (!items.length) {
    return '<p class="empty">No entries listed.</p>';
  }

  return `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
};

const renderEvidenceList = (items) => {
  if (!items.length) {
    return '<p class="empty">No evidence links listed.</p>';
  }

  return `<ul>${items
    .map((item) =>
      item.url
        ? `<li><a href="${htmlEscape(item.url)}" target="_blank" rel="noreferrer">${htmlEscape(item.label)}</a></li>`
        : `<li>${htmlEscape(item.label)}</li>`
    )
    .join("")}</ul>`;
};

const renderDescription = (description) => {
  const paragraphs = description
    .split(/\n\s*\n/g)
    .map((p) => p.trim())
    .filter(Boolean);
  return paragraphs.map((p) => `<p>${htmlEscape(p)}</p>`).join("");
};

const pageShell = (
  title,
  content,
  options = { homeHref: "./", assetPrefix: "./assets", extraHead: "", inlineScript: "" }
) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${htmlEscape(title)}</title>
  <link rel="stylesheet" href="${htmlEscape(options.assetPrefix)}/styles.css" />
  ${options.extraHead}
</head>
<body>
  <header class="site-header">
    <div class="container">
      <a href="${htmlEscape(options.homeHref)}" class="brand">BenchmarkCards</a>
      <nav>
        <a href="${htmlEscape(options.homeHref)}">Benchmarks</a>
      </nav>
    </div>
  </header>
  <main class="container">
    ${content}
  </main>
  ${options.inlineScript}
</body>
</html>
`;

const renderHome = async (benchmarks) => {
  const cards = benchmarks
    .map((benchmark) => {
      const shortDescription =
        benchmark.description.length > 190
          ? `${benchmark.description.slice(0, 190)}...`
          : benchmark.description;

      return `<article class="card benchmark-card" data-title="${htmlEscape(
        benchmark.title.toLowerCase()
      )}" data-health="${htmlEscape(benchmark.health)}" data-content="${htmlEscape(
        `${benchmark.description} ${benchmark.capabilities.join(" ")} ${benchmark.knownIssues
          .map((issue) => issue.label)
          .join(" ")}`.toLowerCase()
      )}">
  <div class="card-top">
    <h2><a href="benchmarks/${htmlEscape(benchmark.slug)}/">${htmlEscape(benchmark.title)}</a></h2>
    <span class="health-badge health-${htmlEscape(benchmark.health)}">${htmlEscape(HEALTH_COLORS[benchmark.health])}</span>
  </div>
  <p>${htmlEscape(shortDescription)}</p>
  <div class="chip-row">
    ${benchmark.capabilities
      .slice(0, 4)
      .map((capability) => `<span class="chip">${htmlEscape(capability)}</span>`)
      .join("")}
  </div>
</article>`;
    })
    .join("\n");

  const body = `
<section class="hero">
  <h1>BenchmarkCards</h1>
  <p>Static benchmark cards for transparent, evidence-linked benchmark tracking.</p>
</section>

<section class="controls card">
  <label for="searchInput">Search</label>
  <input id="searchInput" type="search" placeholder="Search benchmark name, capability, issue..." />

  <label for="healthFilter">Health</label>
  <select id="healthFilter">
    <option value="all">All</option>
    <option value="green">Green</option>
    <option value="yellow">Yellow</option>
    <option value="red">Red</option>
  </select>

  <p id="resultCount" class="result-count">${benchmarks.length} benchmark(s)</p>
</section>

<section id="benchmarkGrid" class="grid">
  ${cards}
</section>`;

  const script = `
<script>
${await readFile(path.join(assetsDir, "search.js"), "utf8")}
</script>`;

  return pageShell("BenchmarkCards", body, {
    homeHref: "./",
    assetPrefix: "./assets",
    inlineScript: script
  });
};

const renderBenchmarkPage = (benchmark, benchmarksBySlug, benchmarksByTitle) => {
  const resolvedSuccessors = benchmark.successors.map((successor) => {
    const key = successor.toLowerCase();
    const found = benchmarksBySlug.get(slugify(key)) || benchmarksByTitle.get(key);
    if (!found) {
      return `<li>${htmlEscape(successor)}</li>`;
    }
    return `<li><a href="../${htmlEscape(found.slug)}/">${htmlEscape(found.title)}</a></li>`;
  });

  const body = `
<article class="detail">
  <a class="back-link" href="../../">← Back to all benchmarks</a>
  <header class="detail-header">
    <h1>${htmlEscape(benchmark.title)}</h1>
    <span class="health-badge health-${htmlEscape(benchmark.health)}">${htmlEscape(HEALTH_COLORS[benchmark.health])}</span>
  </header>

  <section class="card">
    <h2>Description</h2>
    ${renderDescription(benchmark.description)}
  </section>

  <section class="card">
    <h2>Capabilities</h2>
    ${renderList(benchmark.capabilities.map((item) => htmlEscape(item)))}
  </section>

  <section class="card">
    <h2>Timeline</h2>
    ${renderList(benchmark.timeline.map((item) => htmlEscape(item)))}
  </section>

  <section class="card">
    <h2>Known Issues</h2>
    ${renderEvidenceList(benchmark.knownIssues)}
  </section>

  <section class="card">
    <h2>Evidence</h2>
    ${renderEvidenceList(benchmark.evidence)}
  </section>

  <section class="card">
    <h2>Successors</h2>
    ${
      resolvedSuccessors.length
        ? `<ul>${resolvedSuccessors.join("")}</ul>`
        : '<p class="empty">No successors listed.</p>'
    }
  </section>
</article>`;

  return pageShell(`${benchmark.title} • BenchmarkCards`, body, {
    homeHref: "../../",
    assetPrefix: "../../assets"
  });
};

const createSite = async () => {
  const benchmarks = await readBenchmarks();
  const benchmarksBySlug = new Map(benchmarks.map((item) => [item.slug, item]));
  const benchmarksByTitle = new Map(
    benchmarks.map((item) => [item.title.toLowerCase(), item])
  );

  await rm(distDir, { recursive: true, force: true });
  await mkdir(distDir, { recursive: true });
  await cp(assetsDir, path.join(distDir, "assets"), { recursive: true });

  const indexHtml = await renderHome(benchmarks);
  await writeFile(path.join(distDir, "index.html"), indexHtml, "utf8");

  for (const benchmark of benchmarks) {
    const benchmarkDir = path.join(distDir, "benchmarks", benchmark.slug);
    await mkdir(benchmarkDir, { recursive: true });
    const benchmarkHtml = renderBenchmarkPage(
      benchmark,
      benchmarksBySlug,
      benchmarksByTitle
    );
    await writeFile(path.join(benchmarkDir, "index.html"), benchmarkHtml, "utf8");
  }

  const payload = benchmarks.map((benchmark) => ({
    title: benchmark.title,
    slug: benchmark.slug,
    health: benchmark.health,
    description: benchmark.description,
    capabilities: benchmark.capabilities,
    timeline: benchmark.timeline,
    knownIssues: benchmark.knownIssues,
    evidence: benchmark.evidence,
    successors: benchmark.successors
  }));
  await writeFile(
    path.join(distDir, "benchmarks.json"),
    `${JSON.stringify(payload, null, 2)}\n`,
    "utf8"
  );
};

await createSite();
console.log("Built BenchmarkCards into dist/");
