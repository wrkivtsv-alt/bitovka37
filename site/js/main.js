(() => {
  const header = document.getElementById("header");
  const nav = document.getElementById("nav");
  const toggle = document.querySelector(".nav-toggle");
  const form = document.getElementById("lead-form");
  const formNote = document.getElementById("form-note");
  const fleet = document.getElementById("fleet-track");
  const fleetPrev = document.getElementById("fleet-prev");
  const fleetNext = document.getElementById("fleet-next");
  const dotsWrap = document.getElementById("puzzle-dots");
  const leftImgs = [...document.querySelectorAll(".puzzle__panel--a .puzzle__img")];
  const cards = [...document.querySelectorAll(".puzzle-slide")];
  const cardCount = cards.length;
  const photoCount = leftImgs.length;

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-solid", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

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

  /* Hero: left photo + right slide synced */
  let slide = 0;
  let timer;
  const slideCount = Math.min(photoCount, cardCount) || Math.max(photoCount, cardCount);

  const ctaBtn = document.getElementById("hero-puzzle-cta");
  const ctaSlideIndex = Math.max(0, slideCount - 1);

  const goSlide = (i) => {
    if (!slideCount) return;
    slide = (i + slideCount) % slideCount;
    leftImgs.forEach((img, n) => img.classList.toggle("is-active", n === slide));
    cards.forEach((el, n) => el.classList.toggle("is-active", n === slide));
    if (dotsWrap) {
      [...dotsWrap.children].forEach((dot, n) =>
        dot.classList.toggle("is-active", n === slide)
      );
    }
    if (ctaBtn) ctaBtn.hidden = slide !== ctaSlideIndex;
  };

  if (slideCount && dotsWrap) {
    for (let n = 0; n < slideCount; n += 1) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "hero__dot" + (n === 0 ? " is-active" : "");
      dot.setAttribute("aria-label", `Слайд ${n + 1}`);
      dot.addEventListener("click", () => {
        goSlide(n);
        restart();
      });
      dotsWrap.appendChild(dot);
    }
  }

  const restart = () => {
    clearInterval(timer);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer = setInterval(() => goSlide(slide + 1), 4800);
  };

  restart();

  const scrollToLead = (e) => {
    const id = e.currentTarget.getAttribute("data-scroll-to") || "lead-form";
    const target = document.getElementById(id) || document.getElementById("contact");
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      target.querySelector?.("input[name='name']")?.focus({ preventScroll: true });
    }, 450);
  };
  document.querySelectorAll("[data-scroll-to]").forEach((el) => {
    el.addEventListener("click", scrollToLead);
  });

  const scrollFleet = (dir) => {
    if (!fleet) return;
    const amount = fleet.clientWidth * 0.85;
    fleet.scrollBy({ left: dir * amount, behavior: "smooth" });
  };
  fleetPrev?.addEventListener("click", () => scrollFleet(-1));
  fleetNext?.addEventListener("click", () => scrollFleet(1));

  const phoneInput = document.getElementById("lead-phone");
  phoneInput?.addEventListener("input", () => {
    phoneInput.value = phoneInput.value.replace(/\D/g, "").slice(0, 11);
  });

  form?.addEventListener("submit", (e) => {
    if (phoneInput) {
      phoneInput.value = phoneInput.value.replace(/\D/g, "").slice(0, 11);
    }
    if (!form.checkValidity()) {
      e.preventDefault();
      form.reportValidity();
      return;
    }
    if (formNote) {
      formNote.hidden = false;
    }
  });
})();
