(() => {
  const main = document.querySelector("main");
  const menuButton = document.querySelector(".nav-menu");
  const menuPanel = document.querySelector(".menu-panel");
  const heroMedia = document.querySelector(".hero-media");
  const aboutStatement = document.querySelector(".about-statement");
  const workScene = document.querySelector(".work-scene");
  const workButtons = [...document.querySelectorAll(".work-index button")];
  const workArticles = [...document.querySelectorAll(".work-visual article")];
  const workProgress = document.querySelector(".work-progress span");
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const updateClock = () => {
    const value = new Intl.DateTimeFormat("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date());
    document.querySelector("#clock").textContent = value;
    document.querySelector("#footer-clock").textContent = value;
  };

  updateClock();
  setInterval(updateClock, 60000);
  setTimeout(() => main.classList.add("loaded"), 1150);

  const setMenu = (open) => {
    menuPanel.classList.toggle("open", open);
    menuPanel.setAttribute("aria-hidden", String(!open));
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    document.body.style.overflow = open ? "hidden" : "";
  };

  menuButton.addEventListener("click", () => setMenu(menuButton.getAttribute("aria-expanded") !== "true"));
  addEventListener("keydown", (event) => { if (event.key === "Escape") setMenu(false); });

  document.querySelectorAll('a[href^="#"]').forEach((link) => link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    const wasOpen = menuButton.getAttribute("aria-expanded") === "true";
    setMenu(false);
    setTimeout(() => target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" }), wasOpen ? 720 : 40);
  }));

  const revealItems = document.querySelectorAll("[data-reveal]");
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  }), { threshold: .12, rootMargin: "0px 0px -7% 0px" });
  revealItems.forEach((item) => observer.observe(item));

  const setActiveWork = (index) => {
    workButtons.forEach((button, itemIndex) => button.classList.toggle("active", itemIndex === index));
    workArticles.forEach((article, itemIndex) => article.classList.toggle("active", itemIndex === index));
  };
  workButtons.forEach((button, index) => button.addEventListener("click", () => setActiveWork(index)));

  document.querySelectorAll(".service-list article").forEach((article) => {
    const activate = () => {
      document.querySelectorAll(".service-list article").forEach((item) => {
        item.classList.toggle("active", item === article);
        item.querySelector("button").setAttribute("aria-expanded", String(item === article));
      });
    };
    article.addEventListener("mouseenter", activate);
    article.querySelector("button").addEventListener("click", activate);
  });

  document.querySelectorAll(".faq-list article").forEach((article) => {
    article.querySelector("button").addEventListener("click", () => {
      const opening = !article.classList.contains("active");
      document.querySelectorAll(".faq-list article").forEach((item) => {
        const active = opening && item === article;
        item.classList.toggle("active", active);
        item.querySelector("button").setAttribute("aria-expanded", String(active));
        item.querySelector("button i").textContent = active ? "−" : "+";
      });
    });
  });

  let frame = 0;
  const render = () => {
    frame = 0;
    const y = scrollY;
    const vh = innerHeight;
    document.documentElement.classList.toggle("has-scrolled", y > 80);

    if (!reduceMotion && heroMedia) {
      heroMedia.style.transform = `translate3d(0,${Math.min(y * .08, 80)}px,0) scale(${1.02 + Math.min(y / vh, 1) * .05})`;
    }

    if (aboutStatement) {
      const rect = aboutStatement.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (vh * .82 - rect.top) / (rect.height + vh * .4)));
      const words = aboutStatement.querySelectorAll("span");
      words.forEach((word, index) => word.classList.toggle("lit", index / words.length < progress));
    }

    if (workScene && innerWidth > 820) {
      const rect = workScene.getBoundingClientRect();
      const distance = workScene.offsetHeight - vh;
      const progress = Math.max(0, Math.min(.999, -rect.top / distance));
      setActiveWork(Math.min(workArticles.length - 1, Math.floor(progress * workArticles.length)));
      workProgress.style.transform = `scaleX(${progress})`;
    }

    document.querySelectorAll("[data-reveal]:not(.is-visible)").forEach((item) => {
      const rect = item.getBoundingClientRect();
      if (rect.top < vh * .94 && rect.bottom > 0) item.classList.add("is-visible");
    });
  };

  const requestRender = () => { if (!frame) frame = requestAnimationFrame(render); };
  render();
  addEventListener("scroll", requestRender, { passive: true });
  addEventListener("resize", requestRender);
})();
