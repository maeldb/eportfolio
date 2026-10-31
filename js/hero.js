/* ==========================================================================
   Hero — champ de points « ledger » : vague lente, balayage diagonal,
   et points repoussés / colorés en indigo autour du curseur.
   ========================================================================== */
(function () {
  'use strict';

  var canvas = document.querySelector('.hero__canvas');
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var RADIUS = 160;
  var gap = 26, dpr = 1, w = 0, h = 0, dots = [];
  var mouse = { x: -1e4, y: -1e4, active: false };
  var raf = 0, visible = true;
  var colors = { dot: 'rgba(131, 155, 200, 0.34)', hot: '83, 58, 253', sweep: '255, 107, 74' };

  // Les couleurs viennent du thème : indigo autour du curseur, corail pour le balayage.
  function readColors() {
    var cs = getComputedStyle(document.documentElement);
    colors.dot = cs.getPropertyValue('--dot').trim() || colors.dot;
    colors.hot = cs.getPropertyValue('--dot-hot').trim() || colors.hot;
    colors.sweep = cs.getPropertyValue('--dot-sweep').trim() || colors.sweep;
    if (reduced && w) draw(0);
  }

  function resize() {
    var rect = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = rect.width; h = rect.height;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    gap = w < 640 ? 22 : 26;
    dots = [];
    for (var y = gap / 2, r = 0; y < h + gap; y += gap, r++) {
      for (var x = (r % 2 ? gap / 2 : 0); x < w + gap; x += gap) dots.push({ x: x, y: y, ox: 0, oy: 0, a: 0 });
    }
    if (reduced) draw(0);
  }

  function draw(t) {
    ctx.clearRect(0, 0, w, h);
    var sweep = ((t * 0.00018) % 1.5 - 0.25) * (w + h);
    var hot = [];

    ctx.fillStyle = colors.dot;
    ctx.beginPath();
    for (var i = 0; i < dots.length; i++) {
      var d = dots[i];
      var wave = Math.sin(d.x * 0.011 + d.y * 0.017 - t * 0.0011);
      var tx = 0, ty = 0, inf = 0;
      if (mouse.active) {
        var dx = d.x - mouse.x, dy = d.y - mouse.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < RADIUS) {
          inf = 1 - dist / RADIUS;
          var push = inf * inf * 22 / (dist || 1);
          tx = dx * push; ty = dy * push;
        }
      }
      d.ox += (tx - d.ox) * 0.12; d.oy += (ty - d.oy) * 0.12;
      d.a += (inf - d.a) * 0.15;
      var band = Math.max(0, 1 - Math.abs(d.x + d.y - sweep) / 70);
      var rad = 0.8 + 0.55 * (wave + 1) * 0.5 + band * 0.7;
      var px = d.x + d.ox, py = d.y + d.oy + wave * 2.2;
      if (d.a > 0.04 || band > 0.05) {
        hot.push(px, py, rad + d.a * 1.6, Math.max(d.a, band * 0.55), d.a >= band * 0.55 ? 0 : 1);
        continue;
      }
      ctx.moveTo(px + rad, py);
      ctx.arc(px, py, rad, 0, 6.2832);
    }
    ctx.fill();

    for (var j = 0; j < hot.length; j += 5) {
      ctx.fillStyle = 'rgba(' + (hot[j + 4] ? colors.sweep : colors.hot) + ', ' + (0.25 + hot[j + 3] * 0.75).toFixed(3) + ')';
      ctx.beginPath();
      ctx.arc(hot[j], hot[j + 1], hot[j + 2], 0, 6.2832);
      ctx.fill();
    }
  }

  function loop(t) {
    draw(t);
    raf = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
  }
  function start() { if (!raf && !reduced) raf = requestAnimationFrame(loop); }

  window.addEventListener('pointermove', function (e) {
    var rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left; mouse.y = e.clientY - rect.top;
    mouse.active = e.pointerType === 'mouse' && mouse.y > 0 && mouse.y < rect.height;
  }, { passive: true });
  document.addEventListener('pointerleave', function () { mouse.active = false; });
  document.addEventListener('visibilitychange', start);

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible) start();
    }).observe(canvas);
  }

  var resizeTimer = 0;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });

  document.addEventListener('themechange', readColors);

  readColors();
  resize();
  start();
})();
