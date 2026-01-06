(function () {
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const year = document.getElementById("year");
  year.textContent = new Date().getFullYear();

  // Theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) root.setAttribute("data-theme", savedTheme);

  themeToggle?.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });

  // Mobile nav
  navToggle?.addEventListener("click", () => {
    const open = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
  });

  // Close menu when clicking a link (mobile)
  navMenu?.querySelectorAll("a")?.forEach(a => {
    a.addEventListener("click", () => {
      navMenu.classList.remove("is-open");
      navToggle?.setAttribute("aria-expanded", "false");
    });
  });

  // Reveal on scroll
  const observer = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        observer.unobserve(e.target);
      }
    }
  }, { threshold: 0.15 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  // Contact form => mailto
  const form = document.getElementById("contactForm");
  form?.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const fd = new FormData(form);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const message = String(fd.get("message") || "").trim();

    const subject = encodeURIComponent(`Portfolio – Contact (${name || "Nouveau message"})`);
    const body = encodeURIComponent(`Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:aman.miezan20@inphb.ci?subject=${subject}&body=${body}`;
  });
})();