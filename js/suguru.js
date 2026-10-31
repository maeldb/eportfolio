/* ==========================================================================
   Suguru — grille jouable + résolution automatique par backtracking.
   Grille 6×6 à solution unique (13 indices), vérifiée hors ligne.
   Jeu : clic ou flèches pour choisir une case, chiffre au clavier ou au pavé.
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
  var padBtns = Array.prototype.slice.call(root.querySelectorAll('[data-sg-num]'));
  var solveBtn = root.querySelector('[data-sg-solve]');
  var resetBtn = root.querySelector('[data-sg-reset]');
  var msgEl = root.querySelector('[data-sg-msg]');
  var labels = [1, 2, 3].map(function (k) { return root.querySelector('[data-sg-l' + k + ']'); });
  var values = [1, 2, 3].map(function (k) { return root.querySelector('[data-sg-v' + k + ']'); });
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var t = function (k) { return window.I18N ? window.I18N.t(k) : k; };

  // ---- Régions : taille et cases membres (index i = ligne * N + colonne)
  var size = {}, members = {};
  for (var r0 = 0; r0 < N; r0++) for (var c0 = 0; c0 < N; c0++) {
    var id = REGIONS[r0][c0];
    size[id] = (size[id] || 0) + 1;
    (members[id] = members[id] || []).push(r0 * N + c0);
  }
  function regionOf(i) { return REGIONS[(i / N) | 0][i % N]; }
  function given(i) { return GIVENS[(i / N) | 0][i % N]; }
  function neighbors(i) {
    var r = (i / N) | 0, c = i % N, out = [];
    for (var dr = -1; dr <= 1; dr++) for (var dc = -1; dc <= 1; dc++) {
      var rr = r + dr, cc = c + dc;
      if ((dr || dc) && rr >= 0 && rr < N && cc >= 0 && cc < N) out.push(rr * N + cc);
    }
    return out;
  }

  // ---- Solveur : même logique que la version C (parcours ligne par ligne, valeurs croissantes)
  function solve() {
    var grid = [];
    for (var i = 0; i < N * N; i++) grid.push(given(i));
    var order = [];
    for (i = 0; i < N * N; i++) if (!grid[i]) order.push(i);
    var trace = [];
    function ok(i, v) {
      return neighbors(i).every(function (j) { return grid[j] !== v; }) &&
        members[regionOf(i)].every(function (j) { return grid[j] !== v; });
    }
    function bt(k) {
      if (k === order.length) return true;
      var i = order[k];
      for (var v = 1; v <= size[regionOf(i)]; v++) {
        trace.push(['try', i, v]);
        if (!ok(i, v)) continue;
        grid[i] = v; trace.push(['set', i, v]);
        if (bt(k + 1)) return true;
        grid[i] = 0; trace.push(['undo', i, v]);
      }
      return false;
    }
    bt(0);
    return trace;
  }
  var TRACE = solve();

  // ---- Construction de la grille (une case = un bouton, focus « itinérant »)
  var cells = [], vals = [], S = null;
  for (var i0 = 0; i0 < N * N; i0++) {
    var r = (i0 / N) | 0, c = i0 % N;
    var el = document.createElement('button');
    el.type = 'button';
    el.className = 'sg-cell';
    if (c < N - 1 && REGIONS[r][c] !== REGIONS[r][c + 1]) el.classList.add('r-edge');
    if (r < N - 1 && REGIONS[r][c] !== REGIONS[r + 1][c]) el.classList.add('b-edge');
    if (c === N - 1) el.classList.add('last-col');
    if (r === N - 1) el.classList.add('last-row');
    if (GIVENS[r][c]) el.classList.add('is-given');
    el.style.setProperty('--rc', 'var(--sg-r' + REGIONS[r][c] + ')');
    el.style.setProperty('--d', r + c);
    el.dataset.i = i0;
    gridEl.appendChild(el);
    cells.push(el);
  }

  function label(i) {
    var r = (i / N) | 0, c = i % N;
    cells[i].setAttribute('aria-label', t('sg.cell').replace('%r', r + 1).replace('%c', c + 1)
      .replace('%n', size[regionOf(i)]).replace('%v', vals[i] || t('sg.empty')) + (given(i) ? t('sg.given') : ''));
  }
  function paint(i, cls) {
    var el = cells[i];
    el.classList.remove('is-try', 'is-set', 'is-undo');
    if (cls) { void el.offsetWidth; el.classList.add(cls); }
    el.innerHTML = vals[i] ? '<span>' + vals[i] + '</span>' : '';
    label(i);
  }
  function flash(el, cls) { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); }

  function msg(key, args) {
    S.msgKey = key; S.msgArgs = args || {};
    var text = key ? t(key) : '';
    Object.keys(S.msgArgs).forEach(function (k) { text = text.replace('%' + k, S.msgArgs[k]); });
    msgEl.textContent = text;
  }

  // ---- Chronomètre
  function fmtTime(ms) {
    var s = Math.floor(ms / 1000);
    return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
  }
  function startTimer() {
    S.t0 = Date.now() - S.elapsed;
    S.timer = setInterval(function () { S.elapsed = Date.now() - S.t0; render(); }, 1000);
  }
  function stopTimer() {
    if (!S || !S.timer) return;
    clearInterval(S.timer); S.timer = 0;
    S.elapsed = Date.now() - S.t0;
  }

  // ---- État
  function reset() {
    if (S) { stopTimer(); S.playing = false; cancelAnimationFrame(S.raf); }
    S = { mode: 'play', sel: -1, elapsed: 0, timer: 0, t0: 0, errors: 0,
          step: 0, tries: 0, backs: 0, raf: 0, last: 0, acc: 0, lastTry: -1, playing: false };
    for (var i = 0; i < N * N; i++) {
      vals[i] = given(i);
      cells[i].classList.remove('is-done', 'is-error', 'is-sel', 'is-region', 'is-shake');
      paint(i);
    }
    msg('');
    select(-1);
    render();
  }

  function select(i, focus) {
    if (S.mode !== 'play') i = -1;
    S.sel = i;
    var reg = i >= 0 ? regionOf(i) : -1;
    cells.forEach(function (el, k) {
      el.classList.toggle('is-sel', k === i);
      el.classList.toggle('is-region', i >= 0 && k !== i && regionOf(k) === reg);
      el.tabIndex = k === (i >= 0 ? i : 0) ? 0 : -1;
    });
    if (focus && i >= 0) cells[i].focus({ preventScroll: true });
    updatePad();
  }

  function input(v) {
    var i = S.sel;
    if (S.mode !== 'play' || i < 0) return;
    if (given(i) || v > size[regionOf(i)]) { flash(cells[i], 'is-shake'); return; }
    if (!S.timer) startTimer();
    vals[i] = v;
    paint(i, v ? 'is-set' : '');
    check();
  }

  function check() {
    var bad = {};
    for (var i = 0; i < N * N; i++) {
      if (!vals[i]) continue;
      neighbors(i).concat(members[regionOf(i)]).forEach(function (j) {
        if (j !== i && vals[j] === vals[i]) { bad[i] = true; bad[j] = true; }
      });
    }
    S.errors = Object.keys(bad).length;
    cells.forEach(function (el, k) { el.classList.toggle('is-error', !!bad[k]); });
    var filled = vals.filter(Boolean).length;
    if (filled === N * N && !S.errors) win();
    render();
  }

  function celebrate() { cells.forEach(function (el) { flash(el, 'is-done'); }); }

  function win() {
    stopTimer();
    S.mode = 'won';
    select(-1);
    celebrate();
    msg('sg.win', { t: fmtTime(S.elapsed) });
  }

  // ---- Résolution automatique (backtracking animé)
  function step() {
    var ev = TRACE[S.step++], i = ev[1];
    if (S.lastTry !== -1 && S.lastTry !== i && cells[S.lastTry].classList.contains('is-try')) {
      vals[S.lastTry] = 0; paint(S.lastTry);
    }
    if (ev[0] === 'try') { S.tries++; vals[i] = ev[2]; paint(i, 'is-try'); S.lastTry = i; }
    else if (ev[0] === 'set') { vals[i] = ev[2]; paint(i, 'is-set'); S.lastTry = -1; }
    else { S.backs++; vals[i] = 0; paint(i, 'is-undo'); S.lastTry = -1; }
  }
  function frame(now) {
    if (!S.playing) return;
    S.acc += Math.min(now - (S.last || now), 64) * EVENTS_PER_SECOND / 1000;
    S.last = now;
    while (S.acc >= 1 && S.step < TRACE.length) { step(); S.acc--; }
    if (S.step >= TRACE.length) return finishSolve();
    render();
    S.raf = requestAnimationFrame(frame);
  }
  function finishSolve() {
    S.playing = false;
    S.mode = 'solved';
    cells.forEach(function (el) { el.classList.remove('is-try'); });
    celebrate();
    msg('sg.solvedMsg', { a: S.tries, b: S.backs });
    render();
  }
  function onSolve() {
    if (S.mode === 'solve') {
      S.playing = !S.playing;
      if (S.playing) { S.last = 0; S.raf = requestAnimationFrame(frame); } else cancelAnimationFrame(S.raf);
      return render();
    }
    reset();
    S.mode = 'solve';
    select(-1);
    if (reduced) { while (S.step < TRACE.length) step(); return finishSolve(); }
    S.playing = true; S.last = 0;
    S.raf = requestAnimationFrame(frame);
    render();
  }

  // ---- Affichage des compteurs et des boutons
  function stat(k, key, v) { labels[k].textContent = t(key); values[k].textContent = v; }
  function render() {
    var filled = vals.filter(Boolean).length + '/' + N * N;
    if (S.mode === 'solve' || S.mode === 'solved') {
      stat(0, 'sg.tries', S.tries); stat(1, 'sg.backs', S.backs); stat(2, 'sg.filled', filled);
    } else {
      stat(0, 'sg.filled', filled); stat(1, 'sg.time', fmtTime(S.elapsed)); stat(2, 'sg.conflicts', S.errors);
    }
    solveBtn.textContent = S.mode === 'solve' ? t(S.playing ? 'sg.pause' : 'sg.resume')
      : S.mode === 'solved' ? t('sg.replay') : t('sg.solve');
    gridEl.classList.toggle('is-locked', S.mode !== 'play');
    updatePad();
  }
  function updatePad() {
    var i = S.sel, editable = S.mode === 'play' && i >= 0 && !given(i);
    var n = editable ? size[regionOf(i)] : 0;
    padBtns.forEach(function (b) {
      var v = +b.getAttribute('data-sg-num');
      b.disabled = !editable || v > n;
    });
  }

  // ---- Événements
  gridEl.addEventListener('click', function (e) {
    var el = e.target.closest('.sg-cell');
    if (el && S.mode === 'play') select(+el.dataset.i, true);
  });
  gridEl.addEventListener('focusin', function (e) {
    var el = e.target.closest('.sg-cell');
    if (el && S.mode === 'play' && S.sel !== +el.dataset.i) select(+el.dataset.i);
  });
  gridEl.addEventListener('keydown', function (e) {
    var el = e.target.closest('.sg-cell');
    if (!el) return;
    var i = +el.dataset.i, r = (i / N) | 0, c = i % N;
    var move = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] }[e.key];
    if (move) {
      e.preventDefault();
      var j = Math.min(N - 1, Math.max(0, r + move[0])) * N + Math.min(N - 1, Math.max(0, c + move[1]));
      if (S.mode === 'play') select(j, true); else cells[j].focus({ preventScroll: true });
    } else if (/^[1-9]$/.test(e.key)) { e.preventDefault(); input(+e.key); }
    else if (e.key === 'Backspace' || e.key === 'Delete' || e.key === '0') { e.preventDefault(); input(0); }
  });
  padBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      input(+b.getAttribute('data-sg-num'));
      if (S.sel >= 0) cells[S.sel].focus({ preventScroll: true });
    });
  });
  solveBtn.addEventListener('click', onSolve);
  resetBtn.addEventListener('click', reset);
  document.addEventListener('langchange', function () {
    cells.forEach(function (el, i) { label(i); });
    msg(S.msgKey, S.msgArgs);
    render();
  });

  reset();

  // Petite entrée en scène des cases la première fois que la grille apparaît.
  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      gridEl.classList.add('is-intro');
      setTimeout(function () { gridEl.classList.remove('is-intro'); }, 1400);
    }, { threshold: 0.4 });
    io.observe(gridEl);
  }
})();
