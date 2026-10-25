/* ==========================================================================
   Suguru — démo du backtracking, pas à pas.
   Grille 6×6 à solution unique (13 indices), vérifiée hors ligne.
   ========================================================================== */
(function () {
  'use strict';

  var root = document.querySelector('[data-suguru]');
  if (!root) return;

  var N = 6;
  var REGIONS = [
    [0, 0, 0, 0, 1, 2],
    [3, 3, 0, 1, 1, 1],
    [3, 4, 5, 1, 6, 6],
    [4, 4, 5, 6, 6, 6],
    [4, 4, 7, 7, 8, 8],
    [7, 7, 7, 8, 8, 8]
  ];
  var GIVENS = [
    [1, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 4, 0],
    [0, 4, 0, 0, 0, 0],
    [0, 5, 0, 0, 5, 0],
    [1, 0, 2, 0, 0, 2],
    [4, 5, 0, 0, 5, 3]
  ];
  var EVENTS_PER_SECOND = 110;

  var gridEl = root.querySelector('.sg__grid');
  var playBtn = root.querySelector('[data-sg-play]');
  var resetBtn = root.querySelector('[data-sg-reset]');
  var out = {
    tries: root.querySelector('[data-sg-tries]'),
    backs: root.querySelector('[data-sg-backs]'),
    filled: root.querySelector('[data-sg-filled]')
  };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var t = function (k) { return window.I18N ? window.I18N.t(k) : k; };

  // ---- Solveur : même logique que la version C (parcours ligne par ligne, valeurs croissantes)
  function solve() {
    var grid = GIVENS.map(function (row) { return row.slice(); });
    var size = {}, members = {};
    for (var r = 0; r < N; r++) for (var c = 0; c < N; c++) {
      var id = REGIONS[r][c];
      size[id] = (size[id] || 0) + 1;
      (members[id] = members[id] || []).push([r, c]);
    }
    var order = [];
    for (r = 0; r < N; r++) for (c = 0; c < N; c++) if (!grid[r][c]) order.push([r, c]);
    var trace = [];

    function ok(r, c, v) {
      for (var dr = -1; dr <= 1; dr++) for (var dc = -1; dc <= 1; dc++) {
        var rr = r + dr, cc = c + dc;
        if ((dr || dc) && rr >= 0 && rr < N && cc >= 0 && cc < N && grid[rr][cc] === v) return false;
      }
      return members[REGIONS[r][c]].every(function (p) { return grid[p[0]][p[1]] !== v; });
    }
    function bt(i) {
      if (i === order.length) return true;
      var r = order[i][0], c = order[i][1];
      for (var v = 1; v <= size[REGIONS[r][c]]; v++) {
        trace.push(['try', r, c, v]);
        if (!ok(r, c, v)) continue;
        grid[r][c] = v; trace.push(['set', r, c, v]);
        if (bt(i + 1)) return true;
        grid[r][c] = 0; trace.push(['undo', r, c, v]);
      }
      return false;
    }
    bt(0);
    return trace;
  }

  var TRACE = solve();
  var cells = [];
  var state;

  function build() {
    gridEl.innerHTML = '';
    cells = [];
    for (var r = 0; r < N; r++) for (var c = 0; c < N; c++) {
      var el = document.createElement('div');
      el.className = 'sg-cell';
      if (c < N - 1 && REGIONS[r][c] !== REGIONS[r][c + 1]) el.classList.add('r-edge');
      if (r < N - 1 && REGIONS[r][c] !== REGIONS[r + 1][c]) el.classList.add('b-edge');
      if (c === N - 1) el.classList.add('last-col');
      if (r === N - 1) el.classList.add('last-row');
      el.style.setProperty('--d', r + c);
      if (GIVENS[r][c]) { el.classList.add('is-given'); el.innerHTML = '<span>' + GIVENS[r][c] + '</span>'; }
      gridEl.appendChild(el);
      cells.push(el);
    }
  }

  function reset() {
    cancelAnimationFrame(state && state.raf);
    state = { i: 0, tries: 0, backs: 0, filled: 13, playing: false, done: false, raf: 0, last: 0, acc: 0, lastTry: -1 };
    build();
    render();
  }

  function show(el, v, cls) {
    el.classList.remove('is-try', 'is-set', 'is-undo');
    if (cls) { void el.offsetWidth; el.classList.add(cls); }
    el.innerHTML = v ? '<span>' + v + '</span>' : '';
  }

  function step() {
    var ev = TRACE[state.i++];
    var idx = ev[1] * N + ev[2], el = cells[idx];
    if (state.lastTry !== -1 && state.lastTry !== idx) {
      var prev = cells[state.lastTry];
      if (prev.classList.contains('is-try')) show(prev, 0);
    }
    if (ev[0] === 'try') { state.tries++; show(el, ev[3], 'is-try'); state.lastTry = idx; }
    else if (ev[0] === 'set') { state.filled++; show(el, ev[3], 'is-set'); state.lastTry = -1; }
    else { state.backs++; state.filled--; show(el, 0, 'is-undo'); state.lastTry = -1; }
  }

  function finish() {
    state.playing = false; state.done = true;
    cells.forEach(function (el) { el.classList.remove('is-try'); el.classList.add('is-done'); });
    render();
  }

  function frame(now) {
    if (!state.playing) return;
    state.acc += Math.min(now - (state.last || now), 64) * EVENTS_PER_SECOND / 1000;
    state.last = now;
    while (state.acc >= 1 && state.i < TRACE.length) { step(); state.acc--; }
    render();
    if (state.i >= TRACE.length) return finish();
    state.raf = requestAnimationFrame(frame);
  }

  function play() {
    if (state.done) reset();
    if (reduced) { while (state.i < TRACE.length) step(); return finish(); }
    state.playing = true; state.last = 0;
    state.raf = requestAnimationFrame(frame);
    render();
  }
  function pause() { state.playing = false; cancelAnimationFrame(state.raf); render(); }

  function render() {
    out.tries.textContent = state.tries;
    out.backs.textContent = state.backs;
    out.filled.textContent = state.filled + '/36';
    playBtn.textContent = state.done ? t('sg.replay') : state.playing ? t('sg.pause') : state.i ? t('sg.resume') : t('sg.play');
  }

  playBtn.addEventListener('click', function () { if (state.playing) pause(); else play(); });
  resetBtn.addEventListener('click', reset);
  document.addEventListener('langchange', render);

  reset();

  // Lancement automatique la première fois que la grille est bien visible.
  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) { io.disconnect(); setTimeout(function () { if (!state.i) play(); }, 400); }
    }, { threshold: 0.6 });
    io.observe(gridEl);
  }
})();
