/* Neha Nallapu — vCard portfolio interactions
   - tab navigation (About / Resume / Projects / Contact)
   - mobile sidebar contacts toggle
   - count-up stats (respects reduced motion)
   - footer year
*/
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- sidebar contacts toggle (mobile) ---------- */
  var sidebar = document.querySelector("[data-sidebar]");
  var sidebarBtn = document.querySelector("[data-sidebar-btn]");
  if (sidebar && sidebarBtn) {
    sidebarBtn.addEventListener("click", function () {
      var open = sidebar.classList.toggle("active");
      sidebarBtn.setAttribute("aria-expanded", String(open));
    });
  }

  /* ---------- tab navigation ---------- */
  var navLinks = document.querySelectorAll("[data-nav]");
  var articles = document.querySelectorAll("[data-page]");

  function activate(page) {
    articles.forEach(function (a) {
      a.classList.toggle("active", a.dataset.page === page);
    });
    navLinks.forEach(function (n) {
      var on = n.dataset.nav === page;
      n.classList.toggle("active", on);
      n.setAttribute("aria-selected", String(on));
    });
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    if (history.replaceState) history.replaceState(null, "", "#" + page);
  }

  navLinks.forEach(function (n) {
    n.addEventListener("click", function () { activate(n.dataset.nav); });
  });

  // open tab from URL hash (e.g. index.html#projects)
  var hash = (location.hash || "").replace("#", "");
  if (hash && document.querySelector('[data-page="' + hash + '"]')) activate(hash);

  /* ---------- count-up ---------- */
  function formatNumber(v, d) {
    return v.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
  }
  function countUp(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    if (isNaN(target)) return;
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    var prefix = el.getAttribute("data-prefix") || "";
    var suffix = el.getAttribute("data-suffix") || "";
    function paint(v) { el.textContent = prefix + formatNumber(v, decimals) + suffix; }
    if (reduceMotion) { paint(target); return; }
    var dur = 1400, start = null;
    function ease(t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); }
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      paint(target * ease(p));
      if (p < 1) requestAnimationFrame(step); else paint(target);
    }
    requestAnimationFrame(step);
  }

  var counters = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window) {
    var obs = new IntersectionObserver(function (entries, o) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { countUp(e.target); o.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (c) { obs.observe(c); });
  } else {
    counters.forEach(function (c) {
      var d = parseInt(c.getAttribute("data-decimals") || "0", 10);
      c.textContent = (c.getAttribute("data-prefix") || "") + formatNumber(parseFloat(c.getAttribute("data-count")), d) + (c.getAttribute("data-suffix") || "");
    });
  }

  /* ---------- contact form (mailto fallback; swap action to a Formspree URL to go server-side) ---------- */
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      var action = form.getAttribute("action") || "";
      var useMailto = action === "" || action === "#";
      if (!useMailto) return; // real endpoint configured — let it POST
      e.preventDefault();
      if (!form.reportValidity()) return;
      var name = (form.name.value || "").trim();
      var email = (form.email.value || "").trim();
      var message = (form.message.value || "").trim();
      var subject = encodeURIComponent("Portfolio enquiry from " + (name || "a visitor"));
      var body = encodeURIComponent(message + "\n\n— " + name + (email ? " (" + email + ")" : ""));
      window.location.href = "mailto:nehanallapu03@gmail.com?subject=" + subject + "&body=" + body;
    });
  }

  /* ---------- footer year ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
