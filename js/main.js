/* ==========================================================================
   Main — effets au scroll et au survol
   Intro · texte découpé · révélations · compteurs · nav active · progression
   scroll horizontal · texte « éclairé » au scroll · marquee · tilt · magnétisme
   curseur · scramble · STAR · onglets · menu mobile · copie · vidéo
   ========================================================================== */
(function () {
  'use strict';

  var doc = document.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var desktop = window.matchMedia('(min-width: 901px)');
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  var t = function (k) { return window.I18N ? window.I18N.t(k) : k; };
  var lang = function () { return window.I18N ? window.I18N.lang() : 'fr'; };

  doc.classList.add('js-ready');
  if (reduced) {
    doc.classList.add('reduced');
    $$('svg').forEach(function (s) { if (s.pauseAnimations) s.pauseAnimations(); });
  }

  /* ---------- Découpage des titres en mots ---------- */
  function unsplit(el) {
    $$('.w', el).forEach(function (w) { w.replaceWith(document.createTextNode(w.textContent)); });
    el.normalize();
  }
  function split(el, mask) {
    unsplit(el);
    var i = 0;
    (function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (child) {
        if (child.nodeType === 1) { if (!child.hasAttribute('data-nosplit')) walk(child); return; }
        if (child.nodeType !== 3 || !child.textContent.trim()) return;
        var frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach(function (part) {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
          var w = document.createElement('span');
          w.className = mask ? 'w w--mask' : 'w';
          if (mask) {
            var inner = document.createElement('span');
            inner.className = 'w__i'; inner.style.setProperty('--i', i);
            inner.textContent = part; w.appendChild(inner);
          } else { w.textContent = part; }
          i++;
          frag.appendChild(w);
        });
        child.replaceWith(frag);
      });
    })(el);
  }
  function splitAll() {
    $$('[data-split]').forEach(function (el) { split(el, true); });
    $$('[data-scrub]').forEach(function (el) { split(el, false); });
    scrubWords = $$('[data-scrub] .w');
  }
  var scrubWords = [];
  splitAll();

  /* ---------- Échelonnement des enfants ---------- */
  $$('[data-stagger]').forEach(function (p) {
    Array.prototype.forEach.call(p.children, function (c, i) { c.style.setProperty('--si', i); });
  });

  /* ---------- Révélations au scroll ---------- */
  var revealIO = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      revealIO.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 }) : null;

  function observeReveals() {
    $$('[data-reveal], [data-split], [data-stagger]').forEach(function (el) {
      if (el.classList.contains('is-in')) return;
      if (revealIO && !reduced) revealIO.observe(el); else el.classList.add('is-in');
    });
  }

  /* ---------- Compteurs ---------- */
  function fmt(v, dec) {
    return v.toLocaleString(lang() === 'en' ? 'en-GB' : 'fr-FR', { minimumFractionDigits: dec, maximumFractionDigits: dec });
  }
  function countUp(el) {
    var to = parseFloat(el.dataset.count), from = parseFloat(el.dataset.from || 0);
    var dec = parseInt(el.dataset.decimals || 0, 10), pre = el.dataset.prefix || '';
    el.dataset.done = '1';
    if (reduced) { el.textContent = pre + fmt(to, dec); return; }
    var start = performance.now(), dur = 1800;
    (function tick(now) {
      var p = clamp((now - start) / dur, 0, 1), e = 1 - Math.pow(2, -10 * p);
      el.textContent = pre + fmt(from + (to - from) * (p === 1 ? 1 : e), dec);
      if (p < 1) requestAnimationFrame(tick);
    })(start);
  }
  var countIO = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { countIO.unobserve(e.target); countUp(e.target); } });
  }, { threshold: 0.6 }) : null;

  /* ---------- Mot qui tourne dans le titre ---------- */
  var rot = { el: $('.rotator'), timer: 0, i: 0 };
  function rotatorInit(animateIn) {
    if (!rot.el) return;
    clearInterval(rot.timer);
    var words = (rot.el.getAttribute('data-words') || '').split('|');
    rot.i = 0;
    rot.el.innerHTML = '';
    var w = document.createElement('span');
    w.className = 'rotator__word'; w.textContent = words[0];
    rot.el.appendChild(w);
    rot.el.style.width = w.offsetWidth + 'px';
    if (animateIn) {
      w.classList.add('is-in-start');
      setTimeout(function () { w.classList.remove('is-in-start'); }, 650);
    }
    if (reduced || words.length < 2) return;
    rot.timer = setInterval(function () {
      var cur = rot.el.lastElementChild;
      rot.i = (rot.i + 1) % words.length;
      var next = document.createElement('span');
      next.className = 'rotator__word is-in-start'; next.textContent = words[rot.i];
      rot.el.appendChild(next);
      rot.el.style.width = next.offsetWidth + 'px';
      void next.offsetWidth;
      next.classList.remove('is-in-start');
      cur.classList.add('is-out');
      setTimeout(function () { cur.remove(); }, 800);
    }, 2600);
  }

  /* ---------- Intro ---------- */
  var started = false;
  function startPage() {
    if (started) return;
    started = true;
    doc.classList.add('is-loaded');
    setTimeout(function () {
      observeReveals();
      rotatorInit(true);
      $$('[data-count]').forEach(function (el) { if (countIO && !reduced) countIO.observe(el); else countUp(el); });
    }, reduced ? 0 : 450);
  }
  var t0 = performance.now();
  window.addEventListener('load', function () { setTimeout(startPage, Math.max(0, 1100 - (performance.now() - t0))); });
  setTimeout(startPage, 2200);
  if (reduced) startPage();

  /* ---------- Navigation : état, section active, indicateur ---------- */
  var nav = $('[data-nav]');
  var links = $$('.nav__link');
  var indicator = $('.nav__indicator');
  var activeLink = null;
  function moveIndicator() {
    if (!indicator) return;
    if (!activeLink || !activeLink.offsetWidth) { indicator.style.opacity = 0; return; }
    indicator.style.opacity = 1;
    indicator.style.width = activeLink.offsetWidth + 'px';
    indicator.style.transform = 'translateX(' + activeLink.offsetLeft + 'px)';
  }
  if ('IntersectionObserver' in window) {
    var secIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        activeLink = links.filter(function (l) { return l.getAttribute('href') === '#' + e.target.id; })[0] || null;
        links.forEach(function (l) { l.classList.toggle('is-active', l === activeLink); });
        moveIndicator();
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('[data-section]').forEach(function (s) { secIO.observe(s); });
  }

  /* ---------- Scroll horizontal de la feuille de route ---------- */
  var hs = { el: $('[data-hscroll]'), dist: 0, top: 0, h: 0 };
  if (hs.el) {
    hs.track = $('[data-hs-track]', hs.el);
    hs.fill = $('[data-hs-fill]', hs.el);
    hs.cur = $('[data-hs-current]', hs.el);
    hs.vp = $('.hscroll__viewport', hs.el);
    hs.n = hs.track.children.length;
  }
  function layoutHS() {
    if (!hs.el) return;
    if (!desktop.matches) { hs.el.style.removeProperty('--hs-h'); hs.track.style.transform = ''; hs.dist = 0; return; }
    var padLeft = parseFloat(getComputedStyle(hs.vp).paddingLeft) || 0;
    hs.dist = Math.max(0, hs.track.scrollWidth + padLeft - window.innerWidth);
    hs.el.style.setProperty('--hs-h', (hs.dist + window.innerHeight) + 'px');
    hs.top = hs.el.getBoundingClientRect().top + window.scrollY;
    hs.h = hs.el.offsetHeight;
  }
  // Au clavier, amener la carte qui reçoit le focus dans le cadre visible
  // (le navigateur fait défiler le conteneur masqué : on annule et on pilote le scroll vertical).
  if (hs.el) {
    var sticky = $('.hscroll__sticky', hs.el);
    sticky.addEventListener('scroll', function () { if (sticky.scrollLeft) sticky.scrollLeft = 0; });
    hs.track.addEventListener('focusin', function (e) {
      if (!hs.dist) return;
      var i = Array.prototype.indexOf.call(hs.track.children, e.target.closest('.tl-card'));
      if (i < 0) return;
      setTimeout(function () { sticky.scrollLeft = 0; }, 0);
      window.scrollTo({ top: hs.top + (i / (hs.n - 1)) * (hs.h - window.innerHeight), behavior: reduced || document.hidden ? 'instant' : 'smooth' });
    });
  }
  function updateHS() {
    if (!hs.el || !hs.dist) return;
    var p = clamp((window.scrollY - hs.top) / (hs.h - window.innerHeight), 0, 1);
    hs.track.style.transform = 'translate3d(' + (-p * hs.dist).toFixed(1) + 'px,0,0)';
    hs.fill.style.setProperty('--p', p.toFixed(4));
    var idx = Math.min(hs.n, Math.floor(p * hs.n) + 1);
    hs.cur.textContent = (idx < 10 ? '0' : '') + idx;
  }

  /* ---------- Marquee (vitesse liée au scroll) ---------- */
  var mq = { el: $('[data-marquee]'), x: 0, half: 0, dir: 1, boost: 0, on: true };
  if (mq.el && !reduced) {
    var items = Array.prototype.slice.call(mq.el.children);
    items.forEach(function (n) { mq.el.appendChild(n.cloneNode(true)); });
    mq.half = mq.el.scrollWidth / 2;
    if ('IntersectionObserver' in window) new IntersectionObserver(function (en) { mq.on = en[0].isIntersecting; }).observe(mq.el);
    var lastT = performance.now();
    (function run(now) {
      var dt = Math.min(now - lastT, 50); lastT = now;
      if (!mq.on) { requestAnimationFrame(run); return; }
      mq.boost *= 0.92;
      mq.x -= (0.045 + mq.boost) * dt * mq.dir;
      if (mq.x <= -mq.half) mq.x += mq.half;
      if (mq.x > 0) mq.x -= mq.half;
      mq.el.style.transform = 'translate3d(' + mq.x.toFixed(2) + 'px,0,0)';
      requestAnimationFrame(run);
    })(lastT);
  }

  /* ---------- Boucle de scroll ---------- */
  var progress = $('.progress');
  var totop = $('.totop');
  var lastY = window.scrollY, ticking = false;
  function onScroll() {
    var y = window.scrollY, max = doc.scrollHeight - window.innerHeight;
    var p = max > 0 ? y / max : 0;
    progress.style.setProperty('--p', p.toFixed(4));
    totop.style.setProperty('--p', p.toFixed(4));
    totop.classList.toggle('is-on', y > window.innerHeight * 0.8);
    nav.classList.toggle('is-scrolled', y > 8);
    var delta = y - lastY;
    if (!doc.classList.contains('menu-open')) nav.classList.toggle('is-hidden', delta > 4 && y > 480 ? true : delta < -4 ? false : nav.classList.contains('is-hidden'));
    mq.dir = delta < 0 ? -1 : delta > 0 ? 1 : mq.dir;
    mq.boost = Math.min(mq.boost + Math.abs(delta) * 0.004, 0.6);
    lastY = y;
    updateHS();
    if (scrubWords.length) {
      var box = scrubWords[0].parentNode.getBoundingClientRect();
      var sp = reduced ? 1 : clamp((window.innerHeight * 0.85 - box.top) / (box.height + window.innerHeight * 0.3), 0, 1);
      var lit = Math.round(sp * scrubWords.length);
      scrubWords.forEach(function (w, i) { w.classList.toggle('is-lit', i < lit); });
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });

  function relayout() { layoutHS(); moveIndicator(); onScroll(); }
  var rsz = 0;
  window.addEventListener('resize', function () { clearTimeout(rsz); rsz = setTimeout(relayout, 120); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(relayout);
  relayout();

  /* ---------- Survol : tilt 3D + reflet qui suit la souris ---------- */
  if (finePointer && !reduced) {
    $$('[data-tilt]').forEach(function (el) {
      var max = el.classList.contains('photo') ? 7 : 4;
      el.addEventListener('pointerenter', function () { el.classList.add('is-tilting'); });
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        el.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
        el.style.setProperty('--my', (py * 100).toFixed(1) + '%');
        el.style.transform = 'perspective(1100px) rotateX(' + ((0.5 - py) * max).toFixed(2) + 'deg) rotateY(' + ((px - 0.5) * max).toFixed(2) + 'deg)';
      });
      el.addEventListener('pointerleave', function () { el.classList.remove('is-tilting'); el.style.transform = ''; });
    });

    /* Boutons magnétiques */
    $$('[data-magnetic]').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        el.style.translate = (dx * 0.22).toFixed(1) + 'px ' + (dy * 0.32).toFixed(1) + 'px';
      });
      el.addEventListener('pointerleave', function () { el.style.translate = ''; });
    });

    /* Puces flottantes du portrait : parallaxe à la souris */
    var chips = $$('.chip-float');
    var hero = $('.hero');
    hero.addEventListener('pointermove', function (e) {
      var mx = e.clientX / window.innerWidth - 0.5, my = e.clientY / window.innerHeight - 0.5;
      chips.forEach(function (c) {
        var d = parseFloat(c.dataset.depth) || 0;
        c.style.setProperty('--tx', (mx * d).toFixed(1) + 'px');
        c.style.setProperty('--ty', (my * d).toFixed(1) + 'px');
      });
    });

    /* Curseur personnalisé */
    var cur = $('.cursor'), ring = $('.cursor__ring'), label = $('.cursor__label');
    var pos = { x: -100, y: -100 }, rp = { x: -100, y: -100 };
    window.addEventListener('pointermove', function (e) {
      pos.x = e.clientX; pos.y = e.clientY;
      cur.classList.remove('is-hidden');
      var target = e.target.closest ? e.target : null;
      var lab = target && target.closest('[data-cursor-label]');
      var hot = target && target.closest('a, button, [data-tilt], .ledger__row, .tl-card');
      cur.classList.toggle('has-label', !!lab);
      if (lab) label.textContent = lab.getAttribute('data-cursor-label');
      cur.classList.toggle('is-hover', !!hot && !lab);
    }, { passive: true });
    document.addEventListener('pointerdown', function () { cur.classList.add('is-down'); });
    document.addEventListener('pointerup', function () { cur.classList.remove('is-down'); });
    document.addEventListener('mouseout', function (e) { if (!e.relatedTarget) cur.classList.add('is-hidden'); });
    (function follow() {
      rp.x += (pos.x - rp.x) * 0.2; rp.y += (pos.y - rp.y) * 0.2;
      ring.style.transform = 'translate3d(' + rp.x.toFixed(1) + 'px,' + rp.y.toFixed(1) + 'px,0)';
      requestAnimationFrame(follow);
    })();

    /* Liens de navigation : lettres brouillées au survol */
    var GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=<>';
    $$('[data-scramble]').forEach(function (el) {
      var busy = false;
      el.addEventListener('mouseenter', function () {
        if (busy) return;
        busy = true;
        var text = el.textContent, frame = 0, total = 14;
        (function tick() {
          el.textContent = text.split('').map(function (ch, i) {
            if (ch === ' ' || i < (frame / total) * text.length) return ch;
            return GLYPHS[(Math.random() * GLYPHS.length) | 0];
          }).join('');
          if (++frame <= total) requestAnimationFrame(tick); else { el.textContent = text; busy = false; }
        })();
      });
    });
  }

  /* ---------- Détails STAR (accordéon) ---------- */
  $$('.star-toggle').forEach(function (btn) {
    var panel = document.getElementById(btn.getAttribute('aria-controls'));
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') !== 'true';
      btn.setAttribute('aria-expanded', open);
      panel.classList.toggle('is-open', open);
      setTimeout(relayout, 750);
    });
  });

  /* ---------- Onglets segmentés (démo / code) ---------- */
  $$('[data-seg]').forEach(function (seg) {
    var btns = $$('.seg__btn', seg), pill = $('.seg__pill', seg);
    function place(b) { pill.style.width = b.offsetWidth + 'px'; pill.style.transform = 'translateX(' + b.offsetLeft + 'px)'; }
    function select(b) {
      btns.forEach(function (x) {
        var on = x === b, panel = document.getElementById(x.getAttribute('aria-controls'));
        x.classList.toggle('is-active', on); x.setAttribute('aria-selected', on);
        panel.hidden = !on;
        if (on && panel.classList.contains('code')) {
          $$('.ln', panel).forEach(function (l, i) { l.style.setProperty('--i', i); });
          panel.classList.remove('is-typed'); void panel.offsetWidth; panel.classList.add('is-typed');
        }
      });
      place(b);
    }
    btns.forEach(function (b) { b.addEventListener('click', function () { select(b); }); });
    place(btns[0]);
    document.addEventListener('langchange', function () { place($('.seg__btn.is-active', seg)); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { place($('.seg__btn.is-active', seg)); });
  });

  /* ---------- Menu mobile ---------- */
  var burger = $('[data-burger]'), mnav = $('[data-mnav]');
  $$('a', mnav).forEach(function (a, i) { a.style.setProperty('--i', i); });
  function setMenu(open) {
    burger.setAttribute('aria-expanded', open);
    doc.classList.toggle('menu-open', open);
    if (open) { mnav.hidden = false; nav.classList.remove('is-hidden'); requestAnimationFrame(function () { mnav.classList.add('is-open'); }); }
    else { mnav.classList.remove('is-open'); setTimeout(function () { if (!mnav.classList.contains('is-open')) mnav.hidden = true; }, 600); }
  }
  burger.addEventListener('click', function () { setMenu(burger.getAttribute('aria-expanded') !== 'true'); });
  mnav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && doc.classList.contains('menu-open')) setMenu(false); });

  /* ---------- Copier l'adresse e-mail ---------- */
  var toast = $('[data-toast]'), toastTimer = 0;
  function notify(msg) {
    toast.textContent = msg; toast.classList.add('is-on');
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { toast.classList.remove('is-on'); }, 2200);
  }
  $$('[data-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(function () { notify(t('copy.ok')); }, function () { notify(text); });
      else notify(text);
    });
  });

  /* ---------- Pitch vidéo ---------- */
  $$('.pitch__frame').forEach(function (frame) {
    frame.addEventListener('click', function () {
      var src = (frame.getAttribute('data-video') || '').trim();
      if (!src) { notify(t('pitch.none')); return; }
      var yt = src.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);
      var media;
      if (yt) {
        media = document.createElement('iframe');
        media.src = 'https://www.youtube-nocookie.com/embed/' + yt[1] + '?autoplay=1&rel=0';
        media.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        media.title = 'Elevator pitch';
      } else {
        media = document.createElement('video');
        media.src = src; media.controls = true; media.autoplay = true; media.playsInline = true;
      }
      frame.replaceWith(Object.assign(document.createElement('div'), { className: 'pitch__frame' }));
      $('#pitch .pitch__frame').appendChild(media);
    });
  });

  /* ---------- Changement de langue ---------- */
  document.addEventListener('langchange', function () {
    var revealed = $$('[data-split]').map(function (el) { return el.classList.contains('is-in'); });
    splitAll();
    $$('[data-split]').forEach(function (el, i) {
      if (!revealed[i]) return;
      el.classList.remove('is-in'); void el.offsetWidth; el.classList.add('is-in');
    });
    rotatorInit(true);
    $$('[data-count]').forEach(function (el) {
      if (el.dataset.done) el.textContent = (el.dataset.prefix || '') + fmt(parseFloat(el.dataset.count), parseInt(el.dataset.decimals || 0, 10));
    });
    relayout();
  });
})();
