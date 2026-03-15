const filters = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".project-card");

filters.forEach(btn => {
  btn.addEventListener("click", () => {
    const category = btn.dataset.filter;

    cards.forEach(card => {
      if (category === "all" || card.dataset.category === category) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});