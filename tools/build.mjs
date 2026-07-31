import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const benchmarksDir = path.join(rootDir, "benchmarks");
const assetsDir = path.join(rootDir, "assets");
const distDir = path.join(rootDir, "dist");
const methodologyPath = path.join(rootDir, "METHODOLOGY.md");

const MEASUREMENT_STATUSES = {
  fit: "Fit for stated use",
  qualified: "Qualified use",
  "not-fit": "Not fit for primary inference"
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
  ["Scoring Rule", "scoringRule"],
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

  const measurementStatusLine = lines.find((line) =>
    /^Measurement Status:\s*/i.test(line.trim())
  );
  if (!measurementStatusLine) {
    throw new Error(`Missing 'Measurement Status:' line in ${filename}`);
  }

  const measurementStatus = slugify(measurementStatusLine.split(":")[1].trim());
  if (!MEASUREMENT_STATUSES[measurementStatus]) {
    throw new Error(`Measurement Status must be Fit/Qualified/Not Fit in ${filename}`);
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

  const instrumentOverview = (sections["instrument overview"] || "").trim();
  const measurementTargets = parseBullets(sections["measurement targets"] || "");
  const evidenceHistory = parseBullets(sections["evidence history"] || "");
  const validityThreats = parseEvidence(sections["validity threats"] || "");
  const evidenceRegister = parseEvidence(sections["evidence register"] || "");
  const alternativeInstruments = parseBullets(sections["alternative instruments"] || "").filter(
    (instrument) => instrument.toLowerCase() !== "none listed"
  );
  const supportedUses = parseBullets(sections["supported uses"] || "");
  const unsupportedInferences = parseBullets(sections["unsupported inferences"] || "");

  if (!instrumentOverview) {
    throw new Error(`Missing Instrument Overview section content in ${filename}`);
  }

  const unsupportedThreat = validityThreats.find((threat) => !threat.url);
  if (unsupportedThreat) {
    throw new Error(
      `Validity threat must link directly to supporting evidence in ${filename}: ${unsupportedThreat.label}`
    );
  }

  const incompleteEvidence = evidenceRegister.find(
    (source) => !source.url || !source.type || !source.year || !source.scope
  );
  if (incompleteEvidence) {
    throw new Error(
      `Evidence must use '[Title | type | year | scope](URL)' in ${filename}: ${incompleteEvidence.label}`
    );
  }

  const unsupportedSourceType = evidenceRegister.find((source) => !SOURCE_TYPES.has(source.type));
  if (unsupportedSourceType) {
    throw new Error(`Unsupported evidence type in ${filename}: ${unsupportedSourceType.type}`);
  }

  const invalidEvidenceYear = evidenceRegister.find((source) => !/^\d{4}$/.test(source.year));
  if (invalidEvidenceYear) {
    throw new Error(`Evidence year must use YYYY in ${filename}: ${invalidEvidenceYear.label}`);
  }

  const unregisteredThreat = validityThreats.find(
    (threat) => !evidenceRegister.some((source) => source.url === threat.url)
  );
  if (unregisteredThreat) {
    throw new Error(
      `Validity threat evidence must also appear in Evidence Register in ${filename}: ${unregisteredThreat.label}`
    );
  }

  if (!supportedUses.length || !unsupportedInferences.length) {
    throw new Error(`Supported Uses and Unsupported Inferences require at least one entry in ${filename}`);
  }

  return {
    title,
    slug,
    measurementStatus,
    instrumentOverview,
    measurementTargets,
    evidenceHistory,
    validityThreats,
    evidenceRegister,
    alternativeInstruments,
    supportedUses,
    unsupportedInferences,
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

const renderMeasurementProfile = (benchmark) => `
<dl class="profile-grid">
  <div><dt>Measurement status</dt><dd><span class="status-badge status-${htmlEscape(benchmark.measurementStatus)}">${htmlEscape(
    MEASUREMENT_STATUSES[benchmark.measurementStatus]
  )}</span></dd></div>
  <div><dt>Taxonomy</dt><dd>${htmlEscape(benchmark.taxonomy)}</dd></div>
  <div><dt>Task format</dt><dd>${htmlEscape(benchmark.taskFormat)}</dd></div>
  <div><dt>Languages</dt><dd>${htmlEscape(benchmark.languages)}</dd></div>
  <div><dt>Scoring rule</dt><dd>${htmlEscape(benchmark.scoringRule)}</dd></div>
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

const renderMarkdownDocument = (raw) => {
  const markdown = raw
    .replace(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, "")
    .replaceAll("\r\n", "\n")
    .trim();
  const output = [];
  let paragraph = [];
  let listItems = [];
  let listTag = null;

  const flushParagraph = () => {
    if (paragraph.length) {
      output.push(`<p>${htmlEscape(paragraph.join(" "))}</p>`);
      paragraph = [];
    }
  };

  const flushList = () => {
    if (listItems.length) {
      output.push(`<${listTag}>${listItems.map((item) => `<li>${htmlEscape(item)}</li>`).join("")}</${listTag}>`);
      listItems = [];
      listTag = null;
    }
  };

  for (const line of markdown.split("\n")) {
    const trimmed = line.trim();
    const heading = trimmed.match(/^(##|###)\s+(.+)$/);
    const unorderedItem = trimmed.match(/^\*\s+(.+)$/);
    const orderedItem = trimmed.match(/^\d+\.\s+(.+)$/);

    if (!trimmed) {
      flushParagraph();
      flushList();
    } else if (heading) {
      flushParagraph();
      flushList();
      const level = heading[1].length;
      output.push(`<h${level}>${htmlEscape(heading[2])}</h${level}>`);
    } else if (unorderedItem || orderedItem) {
      flushParagraph();
      const nextListTag = unorderedItem ? "ul" : "ol";
      if (listTag && listTag !== nextListTag) flushList();
      listTag = nextListTag;
      listItems.push((unorderedItem || orderedItem)[1]);
    } else {
      flushList();
      paragraph.push(trimmed);
    }
  }

  flushParagraph();
  flushList();
  return output.join("\n");
};

const readMethodology = async () => {
  const raw = await readFile(methodologyPath, "utf8");
  const frontmatter = parseFrontmatter(raw, "METHODOLOGY.md");
  if (!frontmatter.title || !frontmatter.description) {
    throw new Error("METHODOLOGY.md requires title and description frontmatter");
  }
  return { raw, title: frontmatter.title, description: frontmatter.description };
};

const pageShell = (
  title,
  content,
  {
    homeHref = "./",
    compareHref = "compare/",
    methodologyHref = "methodology/",
    assetPrefix = "./assets",
    extraHead = "",
    inlineScript = ""
  } = {}
) => `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${htmlEscape(title)}</title>
  <link rel="stylesheet" href="${htmlEscape(assetPrefix)}/styles.css" />
  ${extraHead}
</head>
<body>
  <div class="measurement-scenery" aria-hidden="true">
    <span class="scenery-axis scenery-axis-one"></span>
    <span class="scenery-axis scenery-axis-two"></span>
    <span class="scenery-target"></span>
    <span class="scenery-error-bar"></span>
  </div>
  <header class="site-header">
    <div class="container">
      <a href="${htmlEscape(homeHref)}" class="brand">
        <span class="brand-logo" aria-hidden="true">
          <svg viewBox="0 0 40 40" role="img" focusable="false">
            <rect x="1" y="1" width="38" height="38" rx="9" class="logo-bg" />
            <path class="logo-axis" d="M9 8 v24 h24" />
            <path class="logo-trend" d="M11 27 l6 -7 l5 3 l8 -11" />
            <circle class="logo-point" cx="17" cy="20" r="2" />
            <circle class="logo-point" cx="22" cy="23" r="2" />
            <circle class="logo-point" cx="30" cy="12" r="2" />
          </svg>
        </span>
        <span class="brand-name">Benchmark Metrology Lab</span>
      </a>
      <nav aria-label="Primary navigation">
        <a href="${htmlEscape(homeHref)}">Register</a>
        <a href="${htmlEscape(compareHref)}">Compare</a>
        <a href="${htmlEscape(methodologyHref)}">Methodology</a>
      </nav>
    </div>
  </header>
  <main class="container">
    ${content}
  </main>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-scale" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></div>
      <p><strong>Benchmark Metrology Lab</strong> documents what evaluation instruments can and cannot support.</p>
      <p class="footer-fineprint">Status labels are editorial assessments. Follow the evidence register before drawing conclusions.</p>
    </div>
  </footer>
  ${inlineScript}
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
        benchmark.instrumentOverview.length > 190
          ? `${benchmark.instrumentOverview.slice(0, 190)}...`
          : benchmark.instrumentOverview;

      return `<article class="card benchmark-card" data-title="${htmlEscape(
        benchmark.title.toLowerCase()
      )}" data-measurement-status="${htmlEscape(benchmark.measurementStatus)}" data-taxonomy="${htmlEscape(
        benchmark.taxonomy
      )}" data-saturation-risk="${htmlEscape(
        benchmark.saturationRisk
      )}" data-contamination-risk="${htmlEscape(benchmark.contaminationRisk)}" data-content="${htmlEscape(
        `${benchmark.instrumentOverview} ${benchmark.measurementTargets.join(" ")} ${benchmark.supportedUses.join(
          " "
        )} ${benchmark.unsupportedInferences.join(" ")} ${benchmark.validityThreats
          .map((threat) => threat.label)
          .join(" ")} ${benchmark.taxonomy} ${benchmark.taskFormat} ${benchmark.scoringRule}`.toLowerCase()
      )}">
  <div class="card-top">
    <h2><a href="benchmarks/${htmlEscape(benchmark.slug)}/">${htmlEscape(benchmark.title)}</a></h2>
    <span class="status-badge status-${htmlEscape(benchmark.measurementStatus)}">${htmlEscape(MEASUREMENT_STATUSES[benchmark.measurementStatus])}</span>
  </div>
  <p>${htmlEscape(shortDescription)}</p>
  <p class="card-meta">${htmlEscape(benchmark.taxonomy)} · ${htmlEscape(benchmark.taskFormat)}</p>
  <div class="chip-row">
    ${benchmark.measurementTargets
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
  <div class="hero-illustration" aria-hidden="true">
    <div class="calibration-plot">
      <span class="plot-axis plot-axis-x"></span>
      <span class="plot-axis plot-axis-y"></span>
      <span class="plot-trend"></span>
      <span class="plot-point plot-point-one"></span>
      <span class="plot-point plot-point-two"></span>
      <span class="plot-point plot-point-three"></span>
      <span class="uncertainty-bar"></span>
    </div>
    <div class="calibration-dial"><span></span></div>
  </div>
  <p class="hero-kicker">Measurement register</p>
  <h1>Benchmark Metrology Lab</h1>
  <p>An evidence-linked instrument registry for LLM evaluation. Examine what each benchmark measures, where its scores remain valid, and which threats qualify interpretation.</p>
</section>

<section class="controls card" aria-label="Benchmark filters">
  <div class="filter-field filter-search">
    <label for="searchInput">Search</label>
    <input id="searchInput" type="search" placeholder="Search instruments, methods, or validity threats" />
  </div>
  <div class="filter-field">
    <label for="taxonomyFilter">Taxonomy</label>
    <select id="taxonomyFilter">
      <option value="all">All taxonomies</option>
      ${taxonomyOptions}
    </select>
  </div>
  <div class="filter-field">
    <label for="measurementStatusFilter">Measurement status</label>
    <select id="measurementStatusFilter">
      <option value="all">All statuses</option>
      <option value="fit">Fit for stated use</option>
      <option value="qualified">Qualified use</option>
      <option value="not-fit">Not fit for primary inference</option>
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
  <p id="comparisonCount">Select 2 to 5 instruments for comparative assessment.</p>
  <a id="compareLink" class="compare-action is-disabled" href="compare/" aria-disabled="true">Compare instruments</a>
</section>

<section id="benchmarkGrid" class="grid">
  ${cards}
</section>

<section class="coverage-section" aria-labelledby="coverage-heading">
  <h2 id="coverage-heading">Measurement Coverage</h2>
  <div class="coverage-grid">
    <div>
      <h3>Represented domains</h3>
      <div class="chip-row">${coverageTaxonomies}</div>
    </div>
    <div>
      <h3>Coverage gaps</h3>
      <div class="chip-row">${coverageGaps}</div>
    </div>
  </div>
</section>`;

  const script = `
<script>
${await readFile(path.join(assetsDir, "search.js"), "utf8")}
</script>`;

  return pageShell("Benchmark Metrology Lab", body, {
    homeHref: "./",
    compareHref: "compare/",
    methodologyHref: "methodology/",
    assetPrefix: "./assets",
    inlineScript: script
  });
};

const renderBenchmarkPage = (benchmark, benchmarksBySlug, benchmarksByTitle) => {
  const resolvedAlternatives = benchmark.alternativeInstruments.map((instrument) => {
    const key = instrument.toLowerCase();
    const found = benchmarksBySlug.get(slugify(key)) || benchmarksByTitle.get(key);
    if (!found) {
      return `<li>${htmlEscape(instrument)}</li>`;
    }
    return `<li><a href="../${htmlEscape(found.slug)}/">${htmlEscape(found.title)}</a></li>`;
  });

  const body = `
<article class="detail">
  <a class="back-link" href="../../">← Back to all benchmarks</a>
  <header class="detail-header">
    <h1>${htmlEscape(benchmark.title)}</h1>
    <span class="status-badge status-${htmlEscape(benchmark.measurementStatus)}">${htmlEscape(MEASUREMENT_STATUSES[benchmark.measurementStatus])}</span>
  </header>

  <section class="card">
    <h2>Instrument Overview</h2>
    ${renderDescription(benchmark.instrumentOverview)}
  </section>

  <section class="card">
    <h2>Measurement Profile</h2>
    <p class="section-note">Measurement status is an editorial assessment: Fit supports the stated use, Qualified requires companion evaluations or interpretive constraints, and Not fit should not support primary inference. Unknown risk means the register lacks enough documented evidence to assign a level.</p>
    ${renderMeasurementProfile(benchmark)}
  </section>

  <section class="card guidance-card">
    <h2>Interpretation Guidance</h2>
    <div class="guidance-grid">
      <div>
        <h3>Supported uses</h3>
        ${renderList(benchmark.supportedUses.map((item) => htmlEscape(item)))}
      </div>
      <div>
        <h3>Unsupported inferences</h3>
        ${renderList(benchmark.unsupportedInferences.map((item) => htmlEscape(item)))}
      </div>
    </div>
  </section>

  <section class="card">
    <h2>Measurement Targets</h2>
    ${renderList(benchmark.measurementTargets.map((item) => htmlEscape(item)))}
  </section>

  <section class="card">
    <h2>Evidence History</h2>
    ${renderList(benchmark.evidenceHistory.map((item) => htmlEscape(item)))}
  </section>

  <section class="card">
    <h2>Validity Threats</h2>
    <p class="section-note">Each reported threat links to an entry in the evidence register below.</p>
    ${renderEvidenceList(benchmark.validityThreats)}
  </section>

  <section class="card">
    <h2>Evidence Register</h2>
    ${renderEvidenceList(benchmark.evidenceRegister)}
  </section>

  <section class="card">
    <h2>Assessment Governance</h2>
    ${renderGovernance(benchmark)}
  </section>

  <section class="card">
    <h2>Alternative Instruments</h2>
    ${
      resolvedAlternatives.length
        ? `<ul>${resolvedAlternatives.join("")}</ul>`
        : '<p class="empty">No documented alternative instrument.</p>'
    }
  </section>
</article>`;

  return pageShell(`${benchmark.title} \u2022 Benchmark Metrology Lab`, body, {
    homeHref: "../../",
    compareHref: "../../compare/",
    methodologyHref: "../../methodology/",
    assetPrefix: "../../assets"
  });
};

const renderComparePage = () => {
  const body = `
<section class="compare-header">
  <h1>Compare Instruments</h1>
  <p id="compareStatus" aria-live="polite">Select 2 to 5 benchmarks from the instrument register for comparative assessment.</p>
</section>

<section class="comparison-surface" aria-live="polite">
  <div id="comparisonTable"></div>
</section>`;

  return pageShell("Compare Instruments \u2022 Benchmark Metrology Lab", body, {
    homeHref: "../",
    compareHref: "./",
    methodologyHref: "../methodology/",
    assetPrefix: "../assets",
    inlineScript: '<script src="../assets/compare.js"></script>'
  });
};

const renderMethodologyPage = (methodology, benchmarks) => {
  const notFitBenchmarks = benchmarks.filter(
    (benchmark) => benchmark.measurementStatus === "not-fit"
  );
  const redRegister = notFitBenchmarks
    .map(
      (benchmark) => `
<article class="red-record">
  <header>
    <div>
      <h3><a href="../benchmarks/${htmlEscape(benchmark.slug)}/">${htmlEscape(benchmark.title)}</a></h3>
      <p>${htmlEscape(benchmark.taxonomy)}</p>
    </div>
    <span class="status-badge status-not-fit">${htmlEscape(MEASUREMENT_STATUSES[benchmark.measurementStatus])}</span>
  </header>
  <div class="red-record-risks">
    <span>Saturation ${renderRiskValue(benchmark.saturationRisk)}</span>
    <span>Contamination ${renderRiskValue(benchmark.contaminationRisk)}</span>
    <span>Reproducibility ${renderRiskValue(benchmark.reproducibility)}</span>
  </div>
  <h4>Unsupported primary inferences</h4>
  ${renderList(benchmark.unsupportedInferences.map((item) => htmlEscape(item)))}
  <details>
    <summary>${benchmark.validityThreats.length} source-linked validity threats</summary>
    ${renderEvidenceList(benchmark.validityThreats)}
  </details>
</article>`
    )
    .join("\n");

  const body = `
<section class="methodology-header">
  <p class="hero-kicker">Assessment governance</p>
  <h1>${htmlEscape(methodology.title)}</h1>
  <p>${htmlEscape(methodology.description)}.</p>
</section>

<div class="methodology-layout">
  <article class="methodology-copy">
    ${renderMarkdownDocument(methodology.raw)}
  </article>
  <aside class="methodology-summary card" aria-labelledby="status-scale-heading">
    <p class="summary-label">Current register</p>
    <strong>${notFitBenchmarks.length} of ${benchmarks.length}</strong>
    <span>instruments are not fit for primary inference</span>
    <h2 id="status-scale-heading">Status scale</h2>
    <ul class="status-scale">
      <li><span class="status-badge status-fit">Fit for stated use</span></li>
      <li><span class="status-badge status-qualified">Qualified use</span></li>
      <li><span class="status-badge status-not-fit">Not fit for primary inference</span></li>
    </ul>
  </aside>
</div>

<section class="red-register" aria-labelledby="red-register-heading">
  <header class="section-heading">
    <div>
      <p class="hero-kicker">Current application</p>
      <h2 id="red-register-heading">Red register</h2>
    </div>
    <p>Each decision exposes the source-linked evidence recorded for that instrument.</p>
  </header>
  <div class="red-register-grid">${redRegister}</div>
</section>`;

  return pageShell(`${methodology.title} \u2022 Benchmark Metrology Lab`, body, {
    homeHref: "../",
    compareHref: "../compare/",
    methodologyHref: "./",
    assetPrefix: "../assets"
  });
};

const createSite = async () => {
  const benchmarks = await readBenchmarks();
  const methodology = await readMethodology();
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

  const methodologyDir = path.join(distDir, "methodology");
  await mkdir(methodologyDir, { recursive: true });
  await writeFile(
    path.join(methodologyDir, "index.html"),
    renderMethodologyPage(methodology, benchmarks),
    "utf8"
  );

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
    measurementStatus: MEASUREMENT_STATUSES[benchmark.measurementStatus],
    instrumentOverview: benchmark.instrumentOverview,
    measurementTargets: benchmark.measurementTargets,
    evidenceHistory: benchmark.evidenceHistory,
    validityThreats: benchmark.validityThreats,
    evidenceRegister: benchmark.evidenceRegister,
    alternativeInstruments: benchmark.alternativeInstruments,
    supportedUses: benchmark.supportedUses,
    unsupportedInferences: benchmark.unsupportedInferences,
    taxonomy: benchmark.taxonomy,
    taskFormat: benchmark.taskFormat,
    languages: benchmark.languages,
    scoringRule: benchmark.scoringRule,
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
console.log("Built Benchmark Metrology Lab into dist/");
