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

const RISK_LEVELS = new Set(["low", "medium", "high", "unknown"]);
const SOURCE_TYPES = new Set([
  "original",
  "critique",
  "adoption",
  "leaderboard",
  "implementation"
]);

const COVERAGE_GAPS = [
  "Code and agents",
  "Long context",
  "Multilingual behavior",
  "RAG and groundedness",
  "Safety",
  "Tool use",
  "Vision",
  "Production workloads"
];

const REQUIRED_METADATA = [
  ["Taxonomy", "taxonomy"],
  ["Task Format", "taskFormat"],
  ["Languages", "languages"],
  ["Primary Metric", "primaryMetric"],
  ["Saturation Risk", "saturationRisk"],
  ["Contamination Risk", "contaminationRisk"],
  ["Reproducibility", "reproducibility"],
  ["Last Reviewed", "lastReviewed"],
  ["Reviewer", "reviewer"],
  ["Canonical Source", "canonicalSource"],
  ["License Status", "licenseStatus"],
  ["Link Status", "linkStatus"]
];

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

const parseFrontmatter = (raw, filename) => {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) {
    throw new Error(`Missing YAML frontmatter in ${filename}`);
  }

  const frontmatter = {};
  for (const line of match[1].replaceAll("\r\n", "\n").split("\n")) {
    const field = line.match(/^([A-Za-z][A-Za-z ]*):\s*(.+)$/);
    if (field) {
      frontmatter[field[1].trim().toLowerCase()] = field[2].trim();
    }
  }

  return frontmatter;
};

const parseEvidence = (rawSection) =>
  parseBullets(rawSection).map((item) => {
    const match = item.match(/^\[(.+)\]\((https?:\/\/.+)\)$/);
    if (!match) {
      return { label: item, type: null, year: null, scope: null, url: null };
    }

    const [label, type, year, scope] = match[1].split("|").map((part) => part.trim());
    return {
      label,
      type: type?.toLowerCase() || null,
      year: year || null,
      scope: scope || null,
      url: match[2].trim()
    };
  });

const readRequiredMetadata = (lines, filename) => {
  const metadata = {};
  for (const [label, key] of REQUIRED_METADATA) {
    const expression = new RegExp(`^${label}:\\s*(.+)$`, "i");
    const line = lines.find((candidate) => expression.test(candidate.trim()));
    if (!line) {
      throw new Error(`Missing '${label}:' line in ${filename}`);
    }
    metadata[key] = line.replace(expression, "$1").trim();
  }

  for (const key of ["saturationRisk", "contaminationRisk", "reproducibility"]) {
    if (!RISK_LEVELS.has(metadata[key].toLowerCase())) {
      throw new Error(`${key} must be Low/Medium/High/Unknown in ${filename}`);
    }
    metadata[key] = metadata[key].toLowerCase();
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(metadata.lastReviewed)) {
    throw new Error(`Last Reviewed must use YYYY-MM-DD in ${filename}`);
  }

  if (!/^https?:\/\/.+/.test(metadata.canonicalSource)) {
    throw new Error(`Canonical Source must be an HTTP(S) URL in ${filename}`);
  }

  return metadata;
};

const parseMarkdownBenchmark = (filename, raw) => {
  const lines = raw.replaceAll("\r\n", "\n").split("\n");
  const frontmatter = parseFrontmatter(raw, filename);
  const title = frontmatter.title;
  if (!title) {
    throw new Error(`Missing 'title:' in YAML frontmatter for ${filename}`);
  }

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
  const metadata = readRequiredMetadata(lines, filename);

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
  const successors = parseBullets(sections.successors || "").filter(
    (successor) => successor.toLowerCase() !== "none listed"
  );
  const recommendedUse = parseBullets(sections["recommended use"] || "");
  const avoidWhen = parseBullets(sections["avoid when"] || "");

  if (!description) {
    throw new Error(`Missing Description section content in ${filename}`);
  }

  const unsupportedIssue = knownIssues.find((issue) => !issue.url);
  if (unsupportedIssue) {
    throw new Error(
      `Known issue must link directly to supporting evidence in ${filename}: ${unsupportedIssue.label}`
    );
  }

  const incompleteEvidence = evidence.find(
    (source) => !source.url || !source.type || !source.year || !source.scope
  );
  if (incompleteEvidence) {
    throw new Error(
      `Evidence must use '[Title | type | year | scope](URL)' in ${filename}: ${incompleteEvidence.label}`
    );
  }

  const unsupportedSourceType = evidence.find((source) => !SOURCE_TYPES.has(source.type));
  if (unsupportedSourceType) {
    throw new Error(`Unsupported evidence type in ${filename}: ${unsupportedSourceType.type}`);
  }

  const invalidEvidenceYear = evidence.find((source) => !/^\d{4}$/.test(source.year));
  if (invalidEvidenceYear) {
    throw new Error(`Evidence year must use YYYY in ${filename}: ${invalidEvidenceYear.label}`);
  }

  const unregisteredCritique = knownIssues.find(
    (issue) => !evidence.some((source) => source.url === issue.url)
  );
  if (unregisteredCritique) {
    throw new Error(
      `Known issue evidence must also appear in Evidence in ${filename}: ${unregisteredCritique.label}`
    );
  }

  if (!recommendedUse.length || !avoidWhen.length) {
    throw new Error(`Recommended Use and Avoid When require at least one entry in ${filename}`);
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
    ,
    recommendedUse,
    avoidWhen,
    ...metadata
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
        ? `<li class="evidence-item"><a href="${htmlEscape(item.url)}" target="_blank" rel="noreferrer">${htmlEscape(item.label)}</a>${
            item.type
              ? `<span class="source-metadata"><span class="source-type source-${htmlEscape(
                  item.type
                )}">${htmlEscape(item.type)}</span><span>${htmlEscape(item.year)}</span><span>${htmlEscape(
                  item.scope
                )}</span></span>`
              : ""
          }</li>`
        : `<li>${htmlEscape(item.label)}</li>`
    )
    .join("")}</ul>`;
};

const titleCase = (value) => value.charAt(0).toUpperCase() + value.slice(1);

const renderRiskValue = (value) =>
  `<span class="risk-value risk-${htmlEscape(value)}">${htmlEscape(titleCase(value))}</span>`;

const renderDecisionProfile = (benchmark) => `
<dl class="profile-grid">
  <div><dt>Health</dt><dd><span class="health-badge health-${htmlEscape(benchmark.health)}">${htmlEscape(
    HEALTH_COLORS[benchmark.health]
  )}</span></dd></div>
  <div><dt>Taxonomy</dt><dd>${htmlEscape(benchmark.taxonomy)}</dd></div>
  <div><dt>Task format</dt><dd>${htmlEscape(benchmark.taskFormat)}</dd></div>
  <div><dt>Languages</dt><dd>${htmlEscape(benchmark.languages)}</dd></div>
  <div><dt>Primary metric</dt><dd>${htmlEscape(benchmark.primaryMetric)}</dd></div>
  <div><dt>Saturation risk</dt><dd>${renderRiskValue(benchmark.saturationRisk)}</dd></div>
  <div><dt>Contamination risk</dt><dd>${renderRiskValue(benchmark.contaminationRisk)}</dd></div>
  <div><dt>Reproducibility</dt><dd>${renderRiskValue(benchmark.reproducibility)}</dd></div>
</dl>`;

const renderGovernance = (benchmark) => `
<dl class="profile-grid governance-grid">
  <div><dt>Last reviewed</dt><dd>${htmlEscape(benchmark.lastReviewed)}</dd></div>
  <div><dt>Reviewer</dt><dd>${htmlEscape(benchmark.reviewer)}</dd></div>
  <div><dt>Canonical source</dt><dd><a href="${htmlEscape(
    benchmark.canonicalSource
  )}" target="_blank" rel="noreferrer">Open source</a></dd></div>
  <div><dt>License status</dt><dd>${htmlEscape(benchmark.licenseStatus)}</dd></div>
  <div><dt>Link status</dt><dd>${htmlEscape(benchmark.linkStatus)}</dd></div>
</dl>`;

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
  options = {
    homeHref: "./",
    compareHref: "compare/",
    assetPrefix: "./assets",
    extraHead: "",
    inlineScript: ""
  }
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
      <nav aria-label="Primary navigation">
        <a href="${htmlEscape(options.homeHref)}">Benchmarks</a>
        <a href="${htmlEscape(options.compareHref)}">Compare</a>
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
  const taxonomies = [...new Set(benchmarks.map((benchmark) => benchmark.taxonomy))].sort();
  const taxonomyOptions = taxonomies
    .map((taxonomy) => `<option value="${htmlEscape(taxonomy)}">${htmlEscape(taxonomy)}</option>`)
    .join("");
  const coverageTaxonomies = taxonomies
    .map((taxonomy) => `<span class="chip">${htmlEscape(taxonomy)}</span>`)
    .join("");
  const coverageGaps = COVERAGE_GAPS.map(
    (gap) => `<span class="chip chip-gap">${htmlEscape(gap)}</span>`
  ).join("");
  const cards = benchmarks
    .map((benchmark) => {
      const shortDescription =
        benchmark.description.length > 190
          ? `${benchmark.description.slice(0, 190)}...`
          : benchmark.description;

      return `<article class="card benchmark-card" data-title="${htmlEscape(
        benchmark.title.toLowerCase()
      )}" data-health="${htmlEscape(benchmark.health)}" data-taxonomy="${htmlEscape(
        benchmark.taxonomy
      )}" data-saturation-risk="${htmlEscape(
        benchmark.saturationRisk
      )}" data-contamination-risk="${htmlEscape(benchmark.contaminationRisk)}" data-content="${htmlEscape(
        `${benchmark.description} ${benchmark.capabilities.join(" ")} ${benchmark.recommendedUse.join(
          " "
        )} ${benchmark.avoidWhen.join(" ")} ${benchmark.knownIssues
          .map((issue) => issue.label)
          .join(" ")} ${benchmark.taxonomy} ${benchmark.taskFormat} ${benchmark.primaryMetric}`.toLowerCase()
      )}">
  <div class="card-top">
    <h2><a href="benchmarks/${htmlEscape(benchmark.slug)}/">${htmlEscape(benchmark.title)}</a></h2>
    <span class="health-badge health-${htmlEscape(benchmark.health)}">${htmlEscape(HEALTH_COLORS[benchmark.health])}</span>
  </div>
  <p>${htmlEscape(shortDescription)}</p>
  <p class="card-meta">${htmlEscape(benchmark.taxonomy)} · ${htmlEscape(benchmark.taskFormat)}</p>
  <div class="chip-row">
    ${benchmark.capabilities
      .slice(0, 4)
      .map((capability) => `<span class="chip">${htmlEscape(capability)}</span>`)
      .join("")}
  </div>
  <label class="compare-toggle"><input type="checkbox" class="compare-checkbox" data-slug="${htmlEscape(
    benchmark.slug
  )}" aria-label="Select ${htmlEscape(benchmark.title)} for comparison" /> <span>Compare</span></label>
</article>`;
    })
    .join("\n");

  const body = `
<section class="hero">
  <h1>BenchmarkCards</h1>
  <p>Evidence-linked guidance for choosing and assessing LLM evaluation benchmarks.</p>
</section>

<section class="controls card" aria-label="Benchmark filters">
  <div class="filter-field filter-search">
    <label for="searchInput">Search</label>
    <input id="searchInput" type="search" placeholder="Search benchmarks, methods, or critiques" />
  </div>
  <div class="filter-field">
    <label for="taxonomyFilter">Taxonomy</label>
    <select id="taxonomyFilter">
      <option value="all">All taxonomies</option>
      ${taxonomyOptions}
    </select>
  </div>
  <div class="filter-field">
    <label for="healthFilter">Health</label>
    <select id="healthFilter">
      <option value="all">All health levels</option>
      <option value="green">Green</option>
      <option value="yellow">Yellow</option>
      <option value="red">Red</option>
    </select>
  </div>
  <div class="filter-field">
    <label for="saturationFilter">Saturation risk</label>
    <select id="saturationFilter">
      <option value="all">All levels</option>
      <option value="high">High</option>
      <option value="medium">Medium</option>
      <option value="low">Low</option>
      <option value="unknown">Unknown</option>
    </select>
  </div>
  <div class="filter-field">
    <label for="contaminationFilter">Contamination risk</label>
    <select id="contaminationFilter">
      <option value="all">All levels</option>
      <option value="high">High</option>
      <option value="medium">Medium</option>
      <option value="low">Low</option>
      <option value="unknown">Unknown</option>
    </select>
  </div>
  <p id="resultCount" class="result-count">${benchmarks.length} benchmark(s)</p>
</section>

<section class="selection-summary" aria-live="polite">
  <p id="comparisonCount">Select 2 to 5 benchmarks to compare.</p>
  <a id="compareLink" class="compare-action is-disabled" href="compare/" aria-disabled="true">Compare selected</a>
</section>

<section id="benchmarkGrid" class="grid">
  ${cards}
</section>

<section class="coverage-section" aria-labelledby="coverage-heading">
  <h2 id="coverage-heading">Catalog Coverage</h2>
  <div class="coverage-grid">
    <div>
      <h3>Current taxonomies</h3>
      <div class="chip-row">${coverageTaxonomies}</div>
    </div>
    <div>
      <h3>Priority gaps</h3>
      <div class="chip-row">${coverageGaps}</div>
    </div>
  </div>
</section>`;

  const script = `
<script>
${await readFile(path.join(assetsDir, "search.js"), "utf8")}
</script>`;

  return pageShell("BenchmarkCards", body, {
    homeHref: "./",
    compareHref: "compare/",
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
    <h2>Decision Profile</h2>
    <p class="section-note">Health is a catalog assessment: Green is suitable as a primary signal, Yellow needs companion evaluations, and Red should not be used as primary evidence. Unknown risk means the catalog has not documented enough evidence to assign a level.</p>
    ${renderDecisionProfile(benchmark)}
  </section>

  <section class="card guidance-card">
    <h2>Catalog Guidance</h2>
    <div class="guidance-grid">
      <div>
        <h3>Recommended use</h3>
        ${renderList(benchmark.recommendedUse.map((item) => htmlEscape(item)))}
      </div>
      <div>
        <h3>Avoid when</h3>
        ${renderList(benchmark.avoidWhen.map((item) => htmlEscape(item)))}
      </div>
    </div>
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
    <h2>Reported Critiques</h2>
    <p class="section-note">Each limitation links to evidence listed in the sources below.</p>
    ${renderEvidenceList(benchmark.knownIssues)}
  </section>

  <section class="card">
    <h2>Sources</h2>
    ${renderEvidenceList(benchmark.evidence)}
  </section>

  <section class="card">
    <h2>Governance</h2>
    ${renderGovernance(benchmark)}
  </section>

  <section class="card">
    <h2>Successors</h2>
    ${
      resolvedSuccessors.length
        ? `<ul>${resolvedSuccessors.join("")}</ul>`
        : '<p class="empty">No documented successor.</p>'
    }
  </section>
</article>`;

  return pageShell(`${benchmark.title} • BenchmarkCards`, body, {
    homeHref: "../../",
    compareHref: "../../compare/",
    assetPrefix: "../../assets"
  });
};

const renderComparePage = () => {
  const body = `
<section class="compare-header">
  <h1>Compare Benchmarks</h1>
  <p id="compareStatus" aria-live="polite">Select 2 to 5 benchmarks from the catalog.</p>
</section>

<section class="comparison-surface" aria-live="polite">
  <div id="comparisonTable"></div>
</section>`;

  return pageShell("Compare Benchmarks • BenchmarkCards", body, {
    homeHref: "../",
    compareHref: "./",
    assetPrefix: "../assets",
    inlineScript: '<script src="../assets/compare.js"></script>'
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

  const compareDir = path.join(distDir, "compare");
  await mkdir(compareDir, { recursive: true });
  await writeFile(path.join(compareDir, "index.html"), renderComparePage(), "utf8");

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
    successors: benchmark.successors,
    recommendedUse: benchmark.recommendedUse,
    avoidWhen: benchmark.avoidWhen,
    taxonomy: benchmark.taxonomy,
    taskFormat: benchmark.taskFormat,
    languages: benchmark.languages,
    primaryMetric: benchmark.primaryMetric,
    saturationRisk: benchmark.saturationRisk,
    contaminationRisk: benchmark.contaminationRisk,
    reproducibility: benchmark.reproducibility,
    lastReviewed: benchmark.lastReviewed,
    reviewer: benchmark.reviewer,
    canonicalSource: benchmark.canonicalSource,
    licenseStatus: benchmark.licenseStatus,
    linkStatus: benchmark.linkStatus
  }));
  await writeFile(
    path.join(distDir, "benchmarks.json"),
    `${JSON.stringify(payload, null, 2)}\n`,
    "utf8"
  );
};

await createSite();
console.log("Built BenchmarkCards into dist/");
