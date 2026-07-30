(() => {
  const searchInput = document.getElementById("searchInput");
  const healthFilter = document.getElementById("healthFilter");
  const cards = Array.from(document.querySelectorAll(".benchmark-card"));
  const resultCount = document.getElementById("resultCount");

  if (!searchInput || !healthFilter || !cards.length || !resultCount) {
    return;
  }

  const applyFilters = () => {
    const query = searchInput.value.trim().toLowerCase();
    const health = healthFilter.value;
    let visible = 0;

    for (const card of cards) {
      const matchesQuery = !query || card.dataset.content.includes(query);
      const matchesHealth = health === "all" || card.dataset.health === health;
      const show = matchesQuery && matchesHealth;
      card.style.display = show ? "" : "none";
      if (show) visible += 1;
    }

    resultCount.textContent = `${visible} benchmark(s)`;
  };

  searchInput.addEventListener("input", applyFilters);
  healthFilter.addEventListener("change", applyFilters);
})();
