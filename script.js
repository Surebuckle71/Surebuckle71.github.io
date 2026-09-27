// ---------- Dark mode toggle ----------
(function () {
  const root = document.documentElement;
  const toggle = document.querySelector(".theme-toggle");
  const media = window.matchMedia("(prefers-color-scheme: dark)");

  const isDark = () => root.dataset.theme ? root.dataset.theme === "dark" : media.matches;

  const updateLabel = () => {
    toggle.setAttribute("aria-label", isDark() ? "Switch to light mode" : "Switch to dark mode");
  };

  toggle.addEventListener("click", () => {
    const next = isDark() ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
    updateLabel();
  });

  media.addEventListener("change", updateLabel);
  updateLabel();
})();

// ---------- Project filter ----------
(function () {
  const chips = document.querySelectorAll(".chip");
  const groups = document.querySelectorAll(".project-group");

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const filter = chip.dataset.filter;
      chips.forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
      groups.forEach((g) => {
        g.hidden = filter !== "all" && g.dataset.group !== filter;
      });
    });
  });
})();

// ---------- Scroll-triggered fade-in ----------
(function () {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
  items.forEach((el) => observer.observe(el));
})();

// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();
