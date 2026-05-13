(function () {
  "use strict";

  const STORAGE_THEME = "static-app-theme";

  const counterEl = document.getElementById("counter");
  const incBtn = document.getElementById("inc");
  const decBtn = document.getElementById("dec");
  const resetBtn = document.getElementById("reset");
  const themeToggle = document.getElementById("theme-toggle");

  let count = 0;

  function renderCounter() {
    if (counterEl) counterEl.textContent = String(count);
  }

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_THEME);
    } catch {
      return null;
    }
  }

  function applyTheme(theme) {
    const root = document.documentElement;
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
    try {
      localStorage.setItem(STORAGE_THEME, theme);
    } catch {
      /* ignore */
    }
  }

  function initTheme() {
    const stored = getStoredTheme();
    if (stored === "dark" || stored === "light") {
      applyTheme(stored);
      return;
    }
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(prefersDark ? "dark" : "light");
  }

  function toggleTheme() {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    applyTheme(isDark ? "light" : "dark");
  }

  incBtn?.addEventListener("click", () => {
    count += 1;
    renderCounter();
  });

  decBtn?.addEventListener("click", () => {
    count -= 1;
    renderCounter();
  });

  resetBtn?.addEventListener("click", () => {
    count = 0;
    renderCounter();
  });

  themeToggle?.addEventListener("click", toggleTheme);

  initTheme();
  renderCounter();
})();
