(() => {
  const searchInput = document.getElementById("searchInput");
  const measurementStatusFilter = document.getElementById("measurementStatusFilter");
  const taxonomyFilter = document.getElementById("taxonomyFilter");
  const saturationFilter = document.getElementById("saturationFilter");
  const contaminationFilter = document.getElementById("contaminationFilter");
  const cards = Array.from(document.querySelectorAll(".benchmark-card"));
  const resultCount = document.getElementById("resultCount");
  const compareLink = document.getElementById("compareLink");
  const comparisonCount = document.getElementById("comparisonCount");
  const comparisonCheckboxes = Array.from(document.querySelectorAll(".compare-checkbox"));

  if (
    !searchInput ||
    !measurementStatusFilter ||
    !taxonomyFilter ||
    !saturationFilter ||
    !contaminationFilter ||
    !cards.length ||
    !resultCount ||
    !compareLink ||
    !comparisonCount
  ) {
    return;
  }

  const applyFilters = () => {
    const query = searchInput.value.trim().toLowerCase();
    const measurementStatus = measurementStatusFilter.value;
    const taxonomy = taxonomyFilter.value;
    const saturationRisk = saturationFilter.value;
    const contaminationRisk = contaminationFilter.value;
    let visible = 0;

    for (const card of cards) {
      const matchesQuery = !query || card.dataset.content.includes(query);
      const matchesMeasurementStatus =
        measurementStatus === "all" || card.dataset.measurementStatus === measurementStatus;
      const matchesTaxonomy = taxonomy === "all" || card.dataset.taxonomy === taxonomy;
      const matchesSaturation =
        saturationRisk === "all" || card.dataset.saturationRisk === saturationRisk;
      const matchesContamination =
        contaminationRisk === "all" || card.dataset.contaminationRisk === contaminationRisk;
      const show =
        matchesQuery &&
        matchesMeasurementStatus &&
        matchesTaxonomy &&
        matchesSaturation &&
        matchesContamination;
      card.style.display = show ? "" : "none";
      if (show) visible += 1;
    }

    resultCount.textContent = `${visible} benchmark${visible === 1 ? "" : "s"} in the register`;
  };

  const updateComparisonSelection = () => {
    const selected = comparisonCheckboxes.filter((checkbox) => checkbox.checked);
    const canCompare = selected.length >= 2 && selected.length <= 5;

    for (const checkbox of comparisonCheckboxes) {
      checkbox.disabled = selected.length >= 5 && !checkbox.checked;
    }

    if (selected.length === 0) {
      comparisonCount.textContent = "Select 2 to 5 instruments for comparative assessment.";
    } else {
      comparisonCount.textContent = `${selected.length} instrument${selected.length === 1 ? "" : "s"} selected.`;
    }

    compareLink.classList.toggle("is-disabled", !canCompare);
    compareLink.setAttribute("aria-disabled", String(!canCompare));
    compareLink.href = canCompare
      ? `compare/?selected=${encodeURIComponent(selected.map((checkbox) => checkbox.dataset.slug).join(","))}`
      : "compare/";
  };

  searchInput.addEventListener("input", applyFilters);
  measurementStatusFilter.addEventListener("change", applyFilters);
  taxonomyFilter.addEventListener("change", applyFilters);
  saturationFilter.addEventListener("change", applyFilters);
  contaminationFilter.addEventListener("change", applyFilters);
  compareLink.addEventListener("click", (event) => {
    if (compareLink.getAttribute("aria-disabled") === "true") {
      event.preventDefault();
    }
  });

  for (const checkbox of comparisonCheckboxes) {
    checkbox.addEventListener("change", updateComparisonSelection);
  }

  updateComparisonSelection();
})();
