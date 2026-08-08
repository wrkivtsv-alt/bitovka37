(() => {
  const header = document.getElementById("header");
  const nav = document.getElementById("nav");
  const toggle = document.querySelector(".nav-toggle");
  const slides = [...document.querySelectorAll(".hero__slide")];
  const dotsWrap = document.querySelector(".hero__dots");
  const form = document.getElementById("lead-form");
  const formNote = document.getElementById("form-note");
  const fleet = document.getElementById("fleet-track");
  const fleetPrev = document.getElementById("fleet-prev");
  const fleetNext = document.getElementById("fleet-next");

  /* Sticky header state */
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-solid", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Mobile nav */
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Hero background carousel — fade only, no bouncing icons */
  let index = 0;
  let timer;

  const goTo = (i) => {
    if (!slides.length) return;
    index = (i + slides.length) % slides.length;
    slides.forEach((slide, n) => slide.classList.toggle("is-active", n === index));
    if (dotsWrap) {
      [...dotsWrap.children].forEach((dot, n) =>
        dot.classList.toggle("is-active", n === index)
      );
    }
  };

  if (slides.length && dotsWrap) {
    slides.forEach((_, n) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "hero__dot" + (n === 0 ? " is-active" : "");
      dot.setAttribute("aria-label", `Слайд ${n + 1}`);
      dot.addEventListener("click", () => {
        goTo(n);
        restart();
      });
      dotsWrap.appendChild(dot);
    });
  }

  const tick = () => goTo(index + 1);
  const restart = () => {
    clearInterval(timer);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer = setInterval(tick, 5500);
  };
  restart();

  /* Fleet horizontal scroll */
  const scrollFleet = (dir) => {
    if (!fleet) return;
    const amount = fleet.clientWidth * 0.85;
    fleet.scrollBy({ left: dir * amount, behavior: "smooth" });
  };
  fleetPrev?.addEventListener("click", () => scrollFleet(-1));
  fleetNext?.addEventListener("click", () => scrollFleet(1));

  /* Lead form — demo accept */
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    form.reset();
    if (formNote) {
      formNote.hidden = false;
    }
  });
})();
