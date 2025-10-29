// lightbox.js
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img[data-lightbox]");
  const overlay = document.createElement("div");
  overlay.className = "lightbox-overlay";

  let currentIndex = 0;
  let gallery = [];

  // Construir overlay
  overlay.innerHTML = `
    <div class="lightbox-content">
      <button class="lightbox-close">×</button>
      <button class="lightbox-prev">‹</button>
      <img class="lightbox-img" src="" alt="">
      <button class="lightbox-next">›</button>
    </div>
  `;

  document.body.appendChild(overlay);

  const content = overlay.querySelector(".lightbox-content");
  const img = overlay.querySelector(".lightbox-img");
  const closeBtn = overlay.querySelector(".lightbox-close");
  const prevBtn = overlay.querySelector(".lightbox-prev");
  const nextBtn = overlay.querySelector(".lightbox-next");

  // Abrir lightbox
  images.forEach((image, index) => {
    image.style.cursor = "zoom-in";
    image.addEventListener("click", () => {
      const group = image.getAttribute("data-lightbox");
      gallery = Array.from(document.querySelectorAll(`img[data-lightbox="${group}"]`));
      currentIndex = gallery.indexOf(image);
      openLightbox(gallery[currentIndex].src, gallery[currentIndex].alt);
    });
  });

  function openLightbox(src, alt) {
    img.src = src;
    img.alt = alt;
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
    updateArrows();
  }

  function closeLightbox() {
    overlay.classList.remove("active");
    setTimeout(() => {
      document.body.style.overflow = "";
    }, 300);
  }

  function updateArrows() {
    prevBtn.style.display = currentIndex > 0 ? "block" : "none";
    nextBtn.style.display = currentIndex < gallery.length - 1 ? "block" : "none";
  }

  // Navegación
  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      img.src = gallery[currentIndex].src;
      img.alt = gallery[currentIndex].alt;
      updateArrows();
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentIndex < gallery.length - 1) {
      currentIndex++;
      img.src = gallery[currentIndex].src;
      img.alt = gallery[currentIndex].alt;
      updateArrows();
    }
  });

  // Cerrar
  closeBtn.addEventListener("click", closeLightbox);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeLightbox();
  });

  // Teclas
  document.addEventListener("keydown", (e) => {
    if (!overlay.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft" && currentIndex > 0) prevBtn.click();
    if (e.key === "ArrowRight" && currentIndex < gallery.length - 1) nextBtn.click();
  });
});