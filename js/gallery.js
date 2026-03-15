// 🌙 SIMPLE IMAGE CLICK PREVIEW
const memoryImages = document.querySelectorAll(".memory-card img");

memoryImages.forEach(img => {
  img.addEventListener("click", () => {
    const overlay = document.createElement("div");
    overlay.classList.add("lightbox");
    overlay.innerHTML = `<img src="${img.src}">`;
    document.body.appendChild(overlay);

    overlay.addEventListener("click", () => {
      overlay.remove();
    });
  });
});