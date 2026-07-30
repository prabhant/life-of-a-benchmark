(() => {
  const status = document.getElementById("compareStatus");
  const tableContainer = document.getElementById("comparisonTable");

  if (!status || !tableContainer) {
    return;
  }

  const selectedSlugs = [
    ...new Set(
      (new URLSearchParams(window.location.search).get("selected") || "")
        .split(",")
        .map((slug) => slug.trim())
        .filter(Boolean)
    )
  ].slice(0, 5);

  const appendTextCell = (row, tagName, value, scope) => {
    const cell = document.createElement(tagName);
    if (scope) {
      cell.scope = scope;
    }
    cell.textContent = value;
    row.append(cell);
    return cell;
  };

  const appendListCell = (row, items) => {
    const cell = document.createElement("td");
    const list = document.createElement("ul");
    for (const item of items) {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      list.append(listItem);
    }
    cell.append(list);
    row.append(cell);
  };

  const appendLinkCell = (row, href, label) => {
    const cell = document.createElement("td");
    const link = document.createElement("a");
    link.href = href;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = label;
    cell.append(link);
    row.append(cell);
  };

  const addTextRow = (body, label, benchmarks, getValue) => {
    const row = document.createElement("tr");
    appendTextCell(row, "th", label, "row");
    for (const benchmark of benchmarks) {
      appendTextCell(row, "td", getValue(benchmark));
    }
    body.append(row);
  };

  const addListRow = (body, label, benchmarks, getValue) => {
    const row = document.createElement("tr");
    appendTextCell(row, "th", label, "row");
    for (const benchmark of benchmarks) {
      appendListCell(row, getValue(benchmark));
    }
    body.append(row);
  };

  const addCanonicalSourceRow = (body, benchmarks) => {
    const row = document.createElement("tr");
    appendTextCell(row, "th", "Canonical source", "row");
    for (const benchmark of benchmarks) {
      appendLinkCell(row, benchmark.canonicalSource, "Open source");
    }
    body.append(row);
  };

  const renderComparison = (benchmarks) => {
    const table = document.createElement("table");
    table.className = "comparison-table";
    const caption = document.createElement("caption");
    caption.textContent = "Selected benchmark comparison";
    table.append(caption);

    const header = document.createElement("thead");
    const headerRow = document.createElement("tr");
    appendTextCell(headerRow, "th", "Field", "col");
    for (const benchmark of benchmarks) {
      const cell = document.createElement("th");
      cell.scope = "col";
      const link = document.createElement("a");
      link.href = `../benchmarks/${benchmark.slug}/`;
      link.textContent = benchmark.title;
      cell.append(link);
      headerRow.append(cell);
    }
    header.append(headerRow);
    table.append(header);

    const body = document.createElement("tbody");
    addTextRow(body, "Health", benchmarks, (benchmark) => benchmark.health);
    addTextRow(body, "Taxonomy", benchmarks, (benchmark) => benchmark.taxonomy);
    addTextRow(body, "Task format", benchmarks, (benchmark) => benchmark.taskFormat);
    addTextRow(body, "Languages", benchmarks, (benchmark) => benchmark.languages);
    addTextRow(body, "Primary metric", benchmarks, (benchmark) => benchmark.primaryMetric);
    addTextRow(body, "Saturation risk", benchmarks, (benchmark) => benchmark.saturationRisk);
    addTextRow(body, "Contamination risk", benchmarks, (benchmark) => benchmark.contaminationRisk);
    addTextRow(body, "Reproducibility", benchmarks, (benchmark) => benchmark.reproducibility);
    addListRow(body, "Recommended use", benchmarks, (benchmark) => benchmark.recommendedUse);
    addListRow(body, "Avoid when", benchmarks, (benchmark) => benchmark.avoidWhen);
    addTextRow(body, "Reported critiques", benchmarks, (benchmark) => String(benchmark.knownIssues.length));
    addTextRow(body, "Last reviewed", benchmarks, (benchmark) => benchmark.lastReviewed);
    addTextRow(body, "License status", benchmarks, (benchmark) => benchmark.licenseStatus);
    addTextRow(body, "Link status", benchmarks, (benchmark) => benchmark.linkStatus);
    addCanonicalSourceRow(body, benchmarks);
    table.append(body);

    tableContainer.replaceChildren(table);
  };

  const renderEmptyState = (message) => {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = message;
    tableContainer.replaceChildren(empty);
  };

  if (selectedSlugs.length < 2) {
    renderEmptyState("Choose at least two benchmarks from the catalog to begin a comparison.");
    return;
  }

  fetch("../benchmarks.json", { cache: "no-store" })
    .then((response) => {
      if (!response.ok) {
        throw new Error("The benchmark data could not be loaded.");
      }
      return response.json();
    })
    .then((catalog) => {
      const selected = selectedSlugs
        .map((slug) => catalog.find((benchmark) => benchmark.slug === slug))
        .filter(Boolean);

      if (selected.length < 2) {
        renderEmptyState("Choose at least two valid benchmarks from the catalog to begin a comparison.");
        return;
      }

      status.textContent = `${selected.length} benchmarks selected.`;
      renderComparison(selected);
    })
    .catch((error) => {
      status.textContent = "Comparison data is unavailable.";
      renderEmptyState(error.message);
    });
})();