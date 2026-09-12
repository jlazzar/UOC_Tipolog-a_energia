/* =========================================================
   Juanma Larrañaga · portfolio
   1. Pétalos de sakura en la cabecera (canvas)
   2. Enlace activo de la navegación
   3. Capa interactiva del gráfico de generación
   ========================================================= */

(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. pétalos ---------- */

  var canvas = document.getElementById("petals");
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext("2d");
    var petals = [];
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = 0;
    var h = 0;

    function resize() {
      var box = canvas.getBoundingClientRect();
      w = box.width;
      h = box.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seed() {
      var count = w < 620 ? 16 : 30;
      petals = [];
      for (var i = 0; i < count; i++) {
        petals.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 4 + Math.random() * 6,
          spin: Math.random() * Math.PI * 2,
          spinSpeed: (Math.random() - 0.5) * 0.04,
          fall: 0.25 + Math.random() * 0.55,
          sway: 0.4 + Math.random() * 0.9,
          phase: Math.random() * Math.PI * 2,
          alpha: 0.3 + Math.random() * 0.5
        });
      }
    }

    function petal(p) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.spin);
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = "#FF9EC4";
      ctx.beginPath();
      ctx.moveTo(0, -p.r);
      ctx.bezierCurveTo(p.r * 0.9, -p.r * 0.5, p.r * 0.7, p.r * 0.7, 0, p.r);
      ctx.bezierCurveTo(-p.r * 0.7, p.r * 0.7, -p.r * 0.9, -p.r * 0.5, 0, -p.r);
      ctx.fill();
      ctx.restore();
    }

    function frame(t) {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < petals.length; i++) {
        var p = petals[i];
        p.y += p.fall;
        p.x += Math.sin(t / 1400 + p.phase) * p.sway * 0.5;
        p.spin += p.spinSpeed;
        if (p.y - p.r > h) {
          p.y = -p.r * 2;
          p.x = Math.random() * w;
        }
        petal(p);
      }
      window.requestAnimationFrame(frame);
    }

    function still() {
      ctx.clearRect(0, 0, w, h);
      petals.forEach(petal);
    }

    resize();
    seed();

    if (reduced) {
      still();
    } else {
      window.requestAnimationFrame(frame);
    }

    var resizeTimer;
    window.addEventListener("resize", function () {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(function () {
        resize();
        seed();
        if (reduced) still();
      }, 180);
    });
  }

  /* ---------- 2. navegación activa ---------- */

  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav__links a"));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) {
          a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- 3. gráfico: cursor y tooltip ---------- */

  var chart = document.getElementById("mixChart");
  var hit = document.getElementById("chartHit");
  var cursor = document.getElementById("cursor");
  var tip = document.getElementById("chartTip");

  if (chart && hit && cursor && tip) {
    var VB = 760;
    var X0 = 54;
    var X1 = 720;
    var Y0 = 32;
    var Y1 = 252;
    var MAX = 13000;

    var series = [
      { name: "Solar FV",   color: "var(--c-solar)",   v: [18, 14, 14, 14, 13, 13, 13, 11, 566, 7091, 12815, 12177, 11212, 11033, 11093, 10743, 10859, 11188, 12638, 10241, 3213, 231, 220, 220] },
      { name: "Hidráulica", color: "var(--c-hidro)",   v: [8884, 9004, 7945, 8142, 7682, 7686, 7748, 8459, 8065, 6149, 3479, 3316, 2105, 2343, 2288, 1909, 1969, 2902, 3082, 4371, 7757, 9682, 9489, 8449] },
      { name: "Nuclear",    color: "var(--c-nuclear)", v: [4304, 4306, 4307, 4308, 4420, 4434, 4434, 4432, 4468, 4547, 4639, 4642, 4697, 4747, 4775, 4792, 4796, 4841, 4929, 5008, 5046, 5077, 5106, 5143] },
      { name: "Eólica",     color: "var(--c-eolica)",  v: [2599, 2610, 2450, 2207, 1832, 1560, 1486, 1615, 1447, 1332, 980, 911, 843, 842, 890, 786, 809, 1060, 1964, 1950, 2870, 3099, 3295, 3278] }
    ];

    var dots = cursor.querySelectorAll("circle");
    var line = cursor.querySelector("line");
    var wrap = chart.closest(".chart-wrap");

    function ux(i) { return X0 + (i * (X1 - X0)) / 23; }
    function uy(v) { return Y1 - (v / MAX) * (Y1 - Y0); }
    function mw(n) { return n.toLocaleString("es-ES") + " MW"; }

    function show(index) {
      var x = ux(index);
      line.setAttribute("x1", x);
      line.setAttribute("x2", x);
      for (var i = 0; i < dots.length; i++) {
        dots[i].setAttribute("cx", x);
        dots[i].setAttribute("cy", uy(series[i].v[index]));
      }
      cursor.style.display = "";

      var rows = series
        .map(function (s) {
          return '<span><em>' + s.name + "</em><u>" + mw(s.v[index]) + "</u></span>";
        })
        .join("");
      tip.innerHTML = "<b>" + (index < 10 ? "0" + index : index) + ":00</b>" + rows;
      tip.setAttribute("data-show", "1");

      var svgBox = chart.getBoundingClientRect();
      var wrapBox = wrap.getBoundingClientRect();
      var scale = svgBox.width / VB;
      var left = svgBox.left - wrapBox.left + x * scale + 16;
      if (left + tip.offsetWidth > wrapBox.width) {
        left = svgBox.left - wrapBox.left + x * scale - tip.offsetWidth - 16;
      }
      tip.style.left = Math.max(0, left) + "px";
      tip.style.top = svgBox.top - wrapBox.top + 24 * scale + "px";
    }

    function hide() {
      cursor.style.display = "none";
      tip.setAttribute("data-show", "0");
    }

    function indexFromEvent(evt) {
      var box = chart.getBoundingClientRect();
      var point = ((evt.clientX - box.left) / box.width) * VB;
      var i = Math.round(((point - X0) / (X1 - X0)) * 23);
      return Math.max(0, Math.min(23, i));
    }

    hit.addEventListener("mousemove", function (evt) { show(indexFromEvent(evt)); });
    hit.addEventListener("mouseleave", hide);
    hit.addEventListener("touchstart", function (evt) {
      show(indexFromEvent(evt.touches[0]));
    }, { passive: true });
    hit.addEventListener("touchmove", function (evt) {
      show(indexFromEvent(evt.touches[0]));
    }, { passive: true });
    hit.addEventListener("touchend", hide);
  }
})();
