(() => {
  const box = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".lightbox__close");
  if (!box || !img) return;

  const open = (src, alt) => {
    img.src = src;
    img.alt = alt || "";
    box.hidden = false;
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    box.hidden = true;
    img.removeAttribute("src");
    document.body.style.overflow = "";
  };

  document.querySelectorAll(".gallery-item").forEach((btn) => {
    btn.addEventListener("click", () => {
      open(btn.dataset.full || btn.querySelector("img")?.src, btn.querySelector("img")?.alt);
    });
  });

  closeBtn?.addEventListener("click", close);
  box.addEventListener("click", (e) => {
    if (e.target === box) close();
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !box.hidden) close();
  });
})();
