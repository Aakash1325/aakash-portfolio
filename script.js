(() => {
  const root = document.querySelector("main");
  const menu = document.querySelector(".menu-panel");
  const menuButton = document.querySelector(".nav-menu");
  const navLinks = [...document.querySelectorAll(".nav-links a")];
  const navSections = navLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
  const hero = document.querySelector(".hero");
  const heroMedia = document.querySelector(".hero-media");
  const about = document.querySelector(".about-statement");
  const experienceScene = document.querySelector(".work-scene");
  const experienceSlides = [...document.querySelectorAll(".work-visual article")];
  const experienceButtons = [...document.querySelectorAll(".work-index button")];
  const experienceProgress = document.querySelector(".work-progress span");
  const capabilityRows = [...document.querySelectorAll(".service-list article")];
  let menuOpen = false;
  let frame = 0;
  let activeExperience = 0;

  const setMenu = (open) => {
    menuOpen = open;
    menu?.classList.toggle("open", open);
    menu?.setAttribute("aria-hidden", String(!open));
    if (menu) menu.inert = !open;
    menuButton?.setAttribute("aria-expanded", String(open));
    menuButton?.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    document.body.style.overflow = open ? "hidden" : "";
  };

  const setExperience = (index) => {
    activeExperience = Math.max(0, Math.min(experienceSlides.length - 1, index));
    experienceSlides.forEach((slide, itemIndex) => slide.classList.toggle("active", itemIndex === activeExperience));
    experienceButtons.forEach((button, itemIndex) => button.classList.toggle("active", itemIndex === activeExperience));
  };

  const setCapability = (index) => {
    capabilityRows.forEach((row, itemIndex) => {
      const active = itemIndex === index;
      row.classList.toggle("active", active);
      row.querySelector("button")?.setAttribute("aria-expanded", String(active));
    });
  };

  const navigate = (id) => {
    const delay = menuOpen ? 520 : 30;
    setMenu(false);
    window.setTimeout(() => {
      const target = document.getElementById(id);
      if (!target) return;
      const startY = window.scrollY;
      const endY = Math.max(0, target.getBoundingClientRect().top + startY - 92);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        window.scrollTo(0, endY);
        return;
      }
      const started = performance.now();
      const duration = Math.min(1000, Math.max(520, Math.abs(endY - startY) * 0.18));
      const step = (now) => {
        const progress = Math.min(1, (now - started) / duration);
        const eased = 1 - Math.pow(1 - progress, 4);
        window.scrollTo(0, startY + (endY - startY) * eased);
        if (progress < 1) window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
    }, delay);
  };

  const updateClock = () => {
    const time = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date());
    const navClock = document.querySelector(".nav-clock strong");
    const footerClock = document.querySelector(".footer-grid > div:last-child p");
    if (navClock) navClock.textContent = time;
    if (footerClock) footerClock.textContent = `${time} · IST`;
  };

  const onFrame = () => {
    frame = 0;
    const y = window.scrollY;
    const vh = window.innerHeight;
    document.querySelectorAll("[data-reveal]:not(.is-visible)").forEach((item) => {
      const rect = item.getBoundingClientRect();
      if (rect.top < vh * 0.96 && rect.bottom > 0) item.classList.add("is-visible");
    });
    document.documentElement.classList.toggle("has-scrolled", y > 80);
    const currentSection = [...navSections].reverse().find((section) => section.getBoundingClientRect().top <= vh * 0.38);
    navLinks.forEach((link) => {
      const active = Boolean(currentSection && link.getAttribute("href") === `#${currentSection.id}`);
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
    if (hero) {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const progress = reducedMotion ? 0 : Math.max(0, Math.min(1, y / Math.max(hero.offsetHeight * 0.82, 1)));
      const mobile = window.innerWidth <= 820;
      hero.style.setProperty("--hero-title-y", `${-progress * (mobile ? 30 : 82)}px`);
      hero.style.setProperty("--hero-role-y", `${-progress * (mobile ? 18 : 48)}px`);
      if (heroMedia) {
        heroMedia.style.transform = `translate3d(0,${progress * (mobile ? 6 : 14)}px,0)`;
      }
    }
    if (about) {
      const rect = about.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (vh * 0.82 - rect.top) / Math.max(rect.height + vh * 0.28, 1)));
      const words = [...about.querySelectorAll("span")];
      words.forEach((word, index) => {
        const local = Math.max(0, Math.min(1, progress * 1.45 - index / Math.max(words.length, 1)));
        word.style.opacity = String(0.18 + local * 0.82);
        word.style.transform = `translateY(${(1 - local) * 8}px)`;
      });
    }
    if (experienceScene && window.innerWidth > 820) {
      const rect = experienceScene.getBoundingClientRect();
      const distance = Math.max(experienceScene.offsetHeight - vh, 1);
      const progress = Math.max(0, Math.min(0.999, -rect.top / distance));
      const next = Math.min(experienceSlides.length - 1, Math.floor(progress * experienceSlides.length));
      if (next !== activeExperience) setExperience(next);
      if (experienceProgress) experienceProgress.style.transform = `scaleX(${progress})`;
    }
  };

  const requestFrame = () => {
    if (!frame) frame = window.requestAnimationFrame(onFrame);
  };

  if (menu) menu.inert = true;
  menuButton?.addEventListener("click", () => setMenu(!menuOpen));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
  });
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href")?.slice(1);
      if (!id) return;
      event.preventDefault();
      navigate(id);
    });
  });
  experienceButtons.forEach((button, index) => button.addEventListener("click", () => setExperience(index)));
  capabilityRows.forEach((row, index) => {
    row.addEventListener("mouseenter", () => setCapability(index));
    row.querySelector("button")?.addEventListener("click", () => setCapability(index));
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.04, rootMargin: "0px 0px -2% 0px" });
    document.querySelectorAll("[data-reveal]").forEach((item) => observer.observe(item));
  }

  window.setTimeout(() => root?.classList.add("loaded"), 900);
  window.setTimeout(onFrame, 120);
  window.setTimeout(onFrame, 900);
  document.fonts?.ready.then(onFrame);
  updateClock();
  window.setInterval(updateClock, 60000);
  window.addEventListener("pageshow", onFrame);
  window.addEventListener("scroll", requestFrame, { passive: true });
  window.addEventListener("resize", requestFrame);
  onFrame();
})();
