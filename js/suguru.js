/* ==========================================================================
   Suguru — grille jouable + résolution automatique animée.
   Grille 6×6 à solution unique (13 indices), vérifiée hors ligne.
   Jeu : clic ou flèches pour choisir une case, chiffre au clavier ou au pavé.
   Résolution : propagation de contraintes (case à une seule possibilité,
   chiffre à une seule place dans sa région), hypothèses + retour arrière
   seulement si plus rien ne se déduit.
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

  var gridEl = root.querySelector('.sg__grid');
  var padBtns = Array.prototype.slice.call(root.querySelectorAll('[data-sg-num]'));
  var solveBtn = root.querySelector('[data-sg-solve]');
  var resetBtn = root.querySelector('[data-sg-reset]');
  var msgEl = root.querySelector('[data-sg-msg]');
  var labels = [1, 2, 3].map(function (k) { return root.querySelector('[data-sg-l' + k + ']'); });
  var values = [1, 2, 3].map(function (k) { return root.querySelector('[data-sg-v' + k + ']'); });
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var t = function (k) { return window.I18N ? window.I18N.t(k) : k; };

  // ---- Régions, voisinage et « pairs » (cases qui ne peuvent pas porter le même chiffre)
  var size = {}, members = {};
  for (var r0 = 0; r0 < N; r0++) for (var c0 = 0; c0 < N; c0++) {
    var id = REGIONS[r0][c0];
    size[id] = (size[id] || 0) + 1;
    (members[id] = members[id] || []).push(r0 * N + c0);
  }
  var REGION_IDS = Object.keys(members).map(Number);
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
  var PEERS = [];
  for (var p0 = 0; p0 < N * N; p0++) {
    PEERS.push(neighbors(p0).concat(members[regionOf(p0)]).filter(function (j, k, a) {
      return j !== p0 && a.indexOf(j) === k;
    }));
  }
  function dist(a, b) {
    return Math.max(Math.abs(((a / N) | 0) - ((b / N) | 0)), Math.abs((a % N) - (b % N)));
  }

  // ---- Résolveur : produit la liste des étapes à animer
  function smartSolve() {
    var g = [], cand = [];
    for (var i = 0; i < N * N; i++) g.push(given(i));
    function candsFor(i) {
      var out = [];
      for (var v = 1; v <= size[regionOf(i)]; v++) {
        if (PEERS[i].every(function (j) { return g[j] !== v; })) out.push(v);
      }
      return out;
    }
    for (i = 0; i < N * N; i++) cand.push(g[i] ? [] : candsFor(i));
    var ev = [{ t: 'cands', cand: cand.map(function (c) { return c.slice(); }) }];
    var st = { d: 0, h: 0, k: 0 };
    var turn = 0;

    function place(i, v) {
      g[i] = v; cand[i] = [];
      var hit = [];
      PEERS[i].forEach(function (j) {
        var at = cand[j].indexOf(v);
        if (!g[j] && at >= 0) { cand[j].splice(at, 1); hit.push(j); }
      });
      return hit;
    }
    function byCell() {
      for (var i = 0; i < N * N; i++) if (!g[i] && cand[i].length === 1) return { kind: 'cell', i: i, v: cand[i][0] };
      return null;
    }
    function byRegion() {
      for (var a = 0; a < REGION_IDS.length; a++) {
        var reg = REGION_IDS[a], ms = members[reg];
        for (var v = 1; v <= size[reg]; v++) {
          if (ms.some(function (j) { return g[j] === v; })) continue;
          var spots = ms.filter(function (j) { return !g[j] && cand[j].indexOf(v) >= 0; });
          if (spots.length === 1) return { kind: 'region', i: spots[0], v: v, r: reg };
        }
      }
      return null;
    }
    function contradiction() {
      for (var i = 0; i < N * N; i++) if (!g[i] && !cand[i].length) return i;
      for (var a = 0; a < REGION_IDS.length; a++) {
        var reg = REGION_IDS[a], ms = members[reg];
        for (var v = 1; v <= size[reg]; v++) {
          if (!ms.some(function (j) { return g[j] === v || (!g[j] && cand[j].indexOf(v) >= 0); })) return ms[0];
        }
      }
      return -1;
    }
    function step(kind, i, v, r) {
      ev.push({ t: 'focus', kind: kind, i: i, v: v, r: r });
      ev.push({ t: 'place', kind: kind, i: i, v: v });
      ev.push({ t: 'elim', i: i, v: v, cells: place(i, v) });
    }
    function propagate() {
      for (;;) {
        var bad = contradiction();
        if (bad >= 0) { ev.push({ t: 'contra', i: bad }); return false; }
        // On alterne les deux raisonnements pour une animation plus variée.
        var a = turn % 2 ? byRegion() || byCell() : byCell() || byRegion();
        if (!a) return true;
        turn++; st.d++;
        step(a.kind, a.i, a.v, a.r);
      }
    }
    function search() {
      if (!propagate()) return false;
      if (g.every(Boolean)) return true;
      var best = -1;
      for (var i = 0; i < N * N; i++) if (!g[i] && (best < 0 || cand[i].length < cand[best].length)) best = i;
      var options = cand[best].slice();
      for (var k = 0; k < options.length; k++) {
        var saveG = g.slice(), saveC = cand.map(function (c) { return c.slice(); });
        st.h++;
        step('guess', best, options[k]);
        if (search()) return true;
        st.k++;
        g = saveG; cand = saveC;
        ev.push({ t: 'undo', g: g.slice(), cand: cand.map(function (c) { return c.slice(); }) });
      }
      return false;
    }
    search();
    return { events: ev, stats: st };
  }
  var SOLUTION = smartSolve();

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
  var SOLVE_CLASSES = ['is-focus', 'is-scan', 'is-hit', 'is-placed', 'is-guess', 'is-contra'];

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
    Object.keys(S.msgArgs).forEach(function (k) { text = text.split('%' + k).join(S.msgArgs[k]); });
    msgEl.textContent = text;
  }

  // ---- Chronomètre (mode jeu)
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
    if (S) { stopTimer(); S.playing = false; clearTimeout(S.next); }
    S = { mode: 'play', sel: -1, elapsed: 0, timer: 0, t0: 0, errors: 0,
          step: 0, ded: 0, elims: 0, playing: false, next: 0 };
    gridEl.classList.remove('is-scanning');
    for (var i = 0; i < N * N; i++) {
      vals[i] = given(i);
      cells[i].classList.remove('is-done', 'is-error', 'is-sel', 'is-region', 'is-shake');
      SOLVE_CLASSES.forEach(function (k) { cells[i].classList.remove(k); });
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
      PEERS[i].forEach(function (j) { if (vals[j] === vals[i]) { bad[i] = true; bad[j] = true; } });
    }
    S.errors = Object.keys(bad).length;
    cells.forEach(function (el, k) { el.classList.toggle('is-error', !!bad[k]); });
    if (vals.filter(Boolean).length === N * N && !S.errors) win();
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

  // ---- Animation de la résolution
  function pencil(i, list) {
    var html = '<span class="pm" aria-hidden="true">';
    for (var v = 1; v <= size[regionOf(i)]; v++) {
      html += '<i data-v="' + v + '"' + (list.indexOf(v) < 0 ? ' class="is-off"' : '') + '>' + v + '</i>';
    }
    cells[i].innerHTML = html + '</span>';
  }
  function big(i, v) { cells[i].innerHTML = '<span class="big">' + v + '</span>'; }
  function clearMarks() {
    cells.forEach(function (el) {
      el.classList.remove('is-focus', 'is-scan');
      var solo = el.querySelector('.is-solo');
      if (solo) solo.classList.remove('is-solo');
    });
  }
  // Applique une étape et renvoie sa durée (ms, avant accélération).
  function show(ev) {
    clearMarks();
    switch (ev.t) {
      case 'cands':
        for (var i = 0; i < N * N; i++) if (!vals[i]) pencil(i, ev.cand[i]);
        flash(gridEl, 'is-scanning');
        return 1400;
      case 'focus':
        gridEl.classList.remove('is-scanning');
        cells[ev.i].classList.add('is-focus');
        if (ev.kind === 'region') members[ev.r].forEach(function (j) { cells[j].classList.add('is-scan'); });
        var mark = cells[ev.i].querySelector('i[data-v="' + ev.v + '"]');
        if (mark) mark.classList.add('is-solo');
        return ev.kind === 'guess' ? 900 : ev.kind === 'region' ? 520 : 440;
      case 'place':
        vals[ev.i] = ev.v;
        big(ev.i, ev.v);
        cells[ev.i].classList.toggle('is-guess', ev.kind === 'guess');
        flash(cells[ev.i], 'is-placed');
        label(ev.i);
        if (ev.kind !== 'guess') S.ded++;
        return 260;
      case 'elim':
        ev.cells.forEach(function (j) {
          var d = cells[j].querySelector('i[data-v="' + ev.v + '"]');
          if (d) d.classList.add('is-out');
          cells[j].style.setProperty('--hd', (dist(ev.i, j) - 1) * 70 + 'ms');
          flash(cells[j], 'is-hit');
        });
        S.elims += ev.cells.length;
        return ev.cells.length ? 380 : 120;
      case 'contra':
        flash(cells[ev.i], 'is-contra');
        return 800;
      case 'undo':
        for (var k = 0; k < N * N; k++) {
          if (given(k)) continue;
          vals[k] = ev.g[k];
          if (ev.g[k]) big(k, ev.g[k]); else pencil(k, ev.cand[k]);
          cells[k].classList.remove('is-guess');
          label(k);
        }
        return 700;
    }
    return 0;
  }

  function tick() {
    if (!S.playing) return;
    if (S.step >= SOLUTION.events.length) return finishSolve();
    var d = show(SOLUTION.events[S.step++]);
    render();
    // Les trois premières déductions vont lentement, ensuite le rythme accélère.
    S.next = setTimeout(tick, S.ded < 3 ? d : d / 1.9);
  }

  function finishSolve() {
    S.playing = false;
    S.mode = 'solved';
    clearMarks();
    gridEl.classList.remove('is-scanning');
    cells.forEach(function (el) { el.classList.remove('is-guess'); });
    celebrate();
    render();
  }

  function onSolve() {
    if (S.mode === 'solve') {
      S.playing = !S.playing;
      if (S.playing) tick(); else clearTimeout(S.next);
      return render();
    }
    reset();
    S.mode = 'solve';
    select(-1);
    if (reduced) {
      while (S.step < SOLUTION.events.length) show(SOLUTION.events[S.step++]);
      return finishSolve();
    }
    S.playing = true;
    tick();
  }

  // ---- Affichage des compteurs et des boutons
  function stat(k, key, v) { labels[k].textContent = t(key); values[k].textContent = v; }
  function render() {
    var filled = vals.filter(Boolean).length + '/' + N * N;
    if (S.mode === 'solve' || S.mode === 'solved') {
      stat(0, 'sg.deduce', S.ded); stat(1, 'sg.elim', S.elims); stat(2, 'sg.filled', filled);
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
