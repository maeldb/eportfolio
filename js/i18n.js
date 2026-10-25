/* ==========================================================================
   i18n — bascule FR / EN
   Le français est lu directement dans le HTML ; l'anglais vit ici.
   Pour modifier un texte anglais, chercher sa clé data-i18n dans index.html.
   ========================================================================== */
(function () {
  'use strict';

  var EN = {
    'a11y.skip': 'Skip to content',
    'a11y.top': 'Back to top',
    'nav.welcome': 'Welcome', 'nav.engineering': 'Engineering', 'nav.mobility': 'Mobility',
    'nav.sustainability': 'Sustainability', 'nav.sport': 'Sport', 'nav.career': 'Career', 'nav.contact': 'Get in touch',
    'tab.welcome': 'Welcome', 'tab.engineering': 'Engineering course', 'tab.mobility': 'International mobility',
    'tab.sustainability': 'Sustainability &amp; civic engagement', 'tab.sport': 'Sport &amp; other activities',
    'tab.career': 'Career development',

    'hero.pill': 'Engineering student · ENSEEIHT · Computer Science',
    'hero.t1': 'I make systems',
    'hero.words': 'faster.|more efficient.|leaner.|more reliable.',
    'hero.lead': 'My name is <strong>Maël Daoud-Beurteaux</strong>. A first-year engineering student at ENSEEIHT (Toulouse INP), I am heading towards high-performance computing and Big Data: making the programs that science and industry rely on run faster, using less energy.',
    'hero.cta1': 'See my projects', 'hero.cta2': 'Download my CV', 'hero.cvHref': 'CV_EN.pdf',
    'hero.pitch': 'Watch my video pitch',
    'hero.alt': 'Portrait of Maël Daoud-Beurteaux',
    'hero.caption': 'Toulouse, France · available for an internship (summer 2027)',
    'hero.scroll': 'Scroll', 'hero.scrollTxt': 'Scroll',
    'stat.1': 'efficiency reached in my TIPE research project, up from 66 %',
    'stat.2': 'rank in the CCINP entrance exam, after MP2I–MPI preparatory classes',
    'stat.2.suf': 'th',
    'stat.3': 'average grade in the French baccalauréat, with honours',
    'stat.4': 'languages: native French, C1 English, B1 Spanish',

    'about.eyebrow': 'About', 'about.title': 'Who am I?',
    'about.statement': 'After two years of MP2I–MPI preparatory classes, I enjoy problems that put up a fight: understanding where a system loses time or energy, measuring, then optimising. My goal: bring that rigour to high-performance computing and massive data.',
    'pillar.1.t': 'Performance', 'pillar.1.p': 'Measure before optimising: +11 efficiency points in my TIPE, an 8×8 grid solved in under a second.',
    'pillar.2.t': 'Rigour', 'pillar.2.p': 'Two years of scientific preparatory classes: reason, prove, check every step.',
    'pillar.3.t': 'Curiosity', 'pillar.3.p': 'From C to OCaml to Ada: every language is a new way to think about a problem.',

    'eng.title': 'An education built around computing and data.',
    'eng.lead': 'Engineering degree at ENSEEIHT, Computer Science track (Sciences du Numérique), after two years of MP2I – MPI preparatory classes at Lycée Carnot in Dijon.',
    'eng.sub1': 'Roadmap', 'eng.sub2': 'Projects &amp; productions', 'eng.sub3': 'Skills',
    'road.title': 'Roadmap 2024 → 2029',
    'road.1.t': 'French baccalauréat — with honours', 'road.1.p': 'Average grade: 15.81/20.',
    'road.2.t': 'MP2I – MPI preparatory classes', 'road.2.p': 'CCINP rank: 338. TIPE on energy efficiency and a Suguru solver in C.',
    'road.3.d': 'Since Sept. 2026', 'road.now': 'Ongoing',
    'road.3.t': 'Engineering degree — 1<sup>st</sup> year', 'road.3.p': 'Computer Science track (Sciences du Numérique).',
    'road.4.d': 'Summer 2027', 'road.4.t': '1<sup>st</sup>-year internship (S6)', 'road.4.pl': 'Currently searching',
    'road.4.p': 'A first experience in a company or a research lab.',
    'road.5.t': '2<sup>nd</sup> year: HPC &amp; Big Data track', 'road.5.pl': 'ENSEEIHT · intended track',
    'road.5.p': 'Parallel computing, architectures and massive data, with an internship in S8.',
    'road.6.d': 'Autumn 2028', 'road.6.t': 'International mobility (S9)', 'road.6.pl': '17 weeks minimum',
    'road.6.p': 'See my 3 mobility projects',
    'road.7.t': 'Engineering degree', 'road.7.p': 'Goal: join an HPC or data team.',

    'proj.title': 'Projects &amp; productions',
    'tipe.t': 'Optimising the energy efficiency of a mechanical system',
    'tipe.p': 'Building a rubber-band-powered model car, then hunting down losses to turn more of the stored energy into motion.',
    'tipe.before': 'Before', 'tipe.after': 'After',
    'tipe.tag1': 'Physics', 'tipe.tag2': 'Measurement', 'tipe.tag3': 'Optimisation',
    'star.open': 'See the details (STAR method)',
    'star.s': 'Situation', 'star.t': 'Task', 'star.a': 'Action', 'star.r': 'Result', 'star.n': 'And beyond?',
    'tipe.s': 'TIPE research project in preparatory classes, on the energy efficiency of a simple mechanical system: a model car powered by a rubber band.',
    'tipe.ta': 'Understand where the energy stored in the rubber band is lost, and increase the share actually converted into motion.',
    'tipe.a': 'Identified the main sources of loss, then optimised the system to reduce them.',
    'tipe.r': 'Efficiency raised from 66 % to 77 %: losses drop from 34 % to 23 % of the stored energy.',
    'tipe.n': 'A method I also apply to code: measure before optimising, and tackle the biggest losses first.',

    'sg.label': 'Prep-class project · 2024 – 2025',
    'sg.t': 'A Suguru puzzle solver in C',
    'sg.p': 'Representing, displaying and checking grids, then solving them by brute force, a greedy algorithm and backtracking: an 8×8 grid solved in under a second.',
    'sg.tag2': 'Algorithms', 'sg.tab1': 'Interactive demo', 'sg.tab2': 'The idea in C',
    'sg.s': 'Programming project in MP2I preparatory classes.',
    'sg.ta': 'Represent, display and check Suguru grids, then solve them automatically.',
    'sg.a': 'Implemented and compared three approaches in C: brute force, greedy and backtracking.',
    'sg.r': 'An 8×8 grid solved in under a second.',
    'sg.n': 'Comparing several algorithms on the same problem gave me a taste for performance, the very heart of HPC.',
    'sg.aria': '6×6 Suguru grid solved step by step with backtracking',
    'sg.reset': 'Reset', 'sg.st1': 'Attempts', 'sg.st2': 'Backtracks', 'sg.st3': 'Cells filled',
    'sg.rules': 'Rule: a region of n cells holds the digits 1 to n, and two neighbouring cells, even diagonally, never hold the same digit.',

    'skills.title': 'Technical skills',
    'skills.lang': 'Language', 'skills.data': 'Data', 'skills.tool': 'Tool', 'skills.sys': 'System',
    'skills.c': 'Suguru solver, systems programming',
    'skills.ocaml': 'Functional programming in MP2I – MPI',
    'skills.ada': 'Imperative programming at ENSEEIHT',
    'skills.sql': 'Relational databases',
    'skills.web': 'Web pages and interfaces',
    'skills.git': 'Version control and teamwork',
    'skills.linux': 'Everyday working environment',

    'mob.title': 'Opening up to the world, in line with my project.',
    'mob.lead': 'At least 17 weeks of mobility are planned in S9. I am preparing them now, in line with my HPC &amp; Big Data track and with the profiles that inspire me.',
    'mob.sub1': 'Languages (incl. LV2)', 'mob.sub2': 'Mobility projects',
    'lang.title': 'Languages', 'lang.note': 'Levels according to the Common European Framework of Reference (CEFR).',
    'lang.fr': 'French', 'lang.native': 'Native', 'lang.en': 'English', 'lang.es': 'Spanish (LV2)',
    'mp.title': '3 potential mobility projects',
    'mp.sub': 'Each one is aligned with one of my three role models (see Career development).',
    'todo.tbd': 'To be defined', 'todo.fill': 'To be completed', 'todo.add': 'To be added',
    'mp.1.l': 'HPC profile', 'mp.1.t': 'Internship in a European supercomputing centre',
    'mp.1.p': 'Help optimise scientific codes on large parallel machines (EuroHPC network).',
    'mp.link1': 'Linked to role model #1',
    'mp.2.l': 'Data profile', 'mp.2.t': 'Data engineering internship abroad',
    'mp.2.p': 'Design processing pipelines able to absorb massive data volumes, within an international team.',
    'mp.link2': 'Linked to role model #2',
    'mp.3.l': 'Research profile', 'mp.3.t': 'Exchange semester in scientific computing',
    'mp.3.p': 'Deepen numerical simulation and parallel computing at an English-speaking partner university.',
    'mp.link3': 'Linked to role model #3',

    'sus.title': 'Optimising also means consuming less.',
    'sus.lead': 'My TIPE taught me that an efficiency gain is first and foremost an energy saving. In computing, the stakes are the same: computing centres use huge amounts of electricity, and every optimisation counts.',
    'sus.stat': 'energy losses in my TIPE: they drop from 34 % to 23 % of the stored energy.',
    'sus.1.t': 'Digital sobriety',
    'sus.1.p': 'Efficient code means less useless computation, hence less energy used. It is one of the guiding threads of my move towards HPC.',
    'sus.2.t': 'Measure to decide',
    'sus.2.p': 'Run time, memory, energy: measuring first makes it possible to target the optimisations that truly shrink a program\'s footprint.',
    'sus.3.t': 'Civic engagement',
    'sus.3.p': '40 hours of civic engagement must be completed by S9: tutoring, student associations, volunteering… This section will grow with my actions.',

    'sport.title': 'Team spirit, starting on the pitch.',
    'sport.lead': 'Sport taught me consistency and collective play, two qualities I find again in team projects.',
    'sport.label': 'Club football · high school', 'sport.unit': ' years',
    'sport.p': 'Three seasons in a club during high school: a taste for teamwork, consistency and shared effort.',
    'sport.other': 'Other activities',
    'sport.otherP': 'ENSEEIHT clubs and associations, personal projects, interests: this section will grow over the three years.',

    'car.title': 'Building my career project, step by step.',
    'car.lead': 'From first experiences to a career project: internships, networking, and how I present what I can bring.',
    'car.sub1': 'Experience', 'car.sub2': 'Internships',
    'exp.label': 'Summer 2022 · Summer job',
    'exp.t': 'Hotel-restaurant — Jura Hôtel Restaurant Le Panoramic',
    'exp.p': 'Dishwashing, cleaning and setting up the dining room for breakfast service.',
    'exp.n': 'What I took away: rigour, speed and teamwork, in a service where everything has to be ready on time.',
    'int.title': 'Internships', 'int.1.d': 'summer 2027',
    'int.1.t': '1<sup>st</sup>-year internship: research lab or company, computing and data',
    'int.search': 'Searching',
    'int.2.t': '2<sup>nd</sup>-year internship, related to the HPC &amp; Big Data track',
    'int.soon': 'Upcoming',

    'cp.eyebrow': 'Deliverables · CAM module',
    'cp.lead': 'My video pitch, my CVs, my LinkedIn profile and the three role models that shape my project.',
    'pitch.soon': 'Video being filmed, available soon',
    'pitch.t': 'My pitch in English, in 2 to 3 minutes',
    'pitch.s1': 'Present', 'pitch.s1p': 'Engineering student in Computer Science at ENSEEIHT',
    'pitch.s2': 'Past', 'pitch.s2p': 'MP2I – MPI prep classes, TIPE and Suguru solver',
    'pitch.s3': 'Future', 'pitch.s3p': 'HPC &amp; Big Data, 3 role models, 3 mobility projects',
    'doc.cvfr': 'CV in French', 'doc.cven': 'CV in English', 'doc.dl': 'Download',
    'doc.infr': 'LinkedIn in French', 'doc.inen': 'LinkedIn in English', 'doc.view': 'View profile',
    'rm.title': '3 role models analysed',
    'rm.name': 'First Last — position, company',
    'rm.src': 'Source', 'rm.srcv': 'My Job Glasses or alumni interview',
    'rm.path': 'Background', 'rm.keep': 'Key takeaways',
    'rm.mob1': 'Mobility project #1', 'rm.mob2': 'Mobility project #2', 'rm.mob3': 'Mobility project #3',

    'contact.title': 'Let\'s talk.',
    'contact.lead': 'An internship, a project, a question? I would be glad to answer.',
    'contact.copy': 'Copy address', 'contact.write': 'Write to me', 'contact.linkedin': 'Follow me on LinkedIn',
    'foot.tag': 'Engineering student in Computer Science · ENSEEIHT, Toulouse INP',
    'foot.pitch': 'Video pitch',
    'foot.version': 'Version 1.0 · S5 “Launch” · October 2026',
    'foot.static': 'Static site, no cookies'
  };

  // Textes générés par le JavaScript (boutons de la démo, notifications…)
  var DYN = {
    fr: { 'sg.play': 'Lancer la résolution', 'sg.pause': 'Pause', 'sg.resume': 'Reprendre', 'sg.replay': 'Relancer',
          'copy.ok': 'Adresse copiée', 'lang.aria': 'Switch to English', 'pitch.none': 'La vidéo arrive bientôt.' },
    en: { 'sg.play': 'Solve the grid', 'sg.pause': 'Pause', 'sg.resume': 'Resume', 'sg.replay': 'Run again',
          'copy.ok': 'Address copied', 'lang.aria': 'Passer en français', 'pitch.none': 'The video is coming soon.' }
  };

  var root = document.documentElement;
  var FR = {};
  var cvEnAvailable = null;
  var html = { get: function (el) { return el.innerHTML; }, set: function (el, v) { el.innerHTML = v; } };
  function attr(name) {
    return { get: function (el) { return el.getAttribute(name); }, set: function (el, v) { el.setAttribute(name, v); } };
  }
  var BINDINGS = {
    'data-i18n': html, 'data-i18n-html': html,
    'data-i18n-aria': attr('aria-label'), 'data-i18n-alt': attr('alt'),
    'data-i18n-href': attr('href'), 'data-i18n-words': attr('data-words')
  };

  function each(fn) {
    Object.keys(BINDINGS).forEach(function (a) {
      document.querySelectorAll('[' + a + ']').forEach(function (el) { fn(a, BINDINGS[a], el, el.getAttribute(a)); });
    });
  }

  // Le français d'origine est mémorisé avant toute modification (et avant le découpage des titres).
  each(function (a, b, el, key) { if (!((a + '|' + key) in FR)) FR[a + '|' + key] = b.get(el); });

  function checkCvEn() {
    if (cvEnAvailable !== null || !/^https?:/.test(location.protocol)) return;
    fetch('CV_EN.pdf', { method: 'HEAD' }).then(function (r) { cvEnAvailable = r.ok; }, function () { cvEnAvailable = false; })
      .then(function () { if (!cvEnAvailable && root.lang === 'en') fixCvLinks(); });
  }
  function fixCvLinks() {
    document.querySelectorAll('[data-i18n-href="hero.cvHref"]').forEach(function (a) { a.setAttribute('href', 'CV.pdf'); });
  }

  function apply(lang, silent) {
    each(function (a, b, el, key) {
      var v = lang === 'en' ? EN[key] : FR[a + '|' + key];
      if (v != null) b.set(el, v);
    });
    root.lang = lang;
    var toggle = document.querySelector('[data-lang-toggle]');
    if (toggle) toggle.setAttribute('aria-label', DYN[lang]['lang.aria']);
    try { localStorage.setItem('lang', lang); } catch (e) { /* stockage indisponible : sans conséquence */ }
    if (lang === 'en') { if (cvEnAvailable === false) fixCvLinks(); else checkCvEn(); }
    if (!silent) document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));
  }

  var saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) { /* idem */ }
  var initial = saved || (/^fr\b/i.test(navigator.language || 'fr') ? 'fr' : 'en');
  if (initial === 'en') apply('en', true);

  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-lang-toggle]')) apply(root.lang === 'en' ? 'fr' : 'en');
  });

  window.I18N = {
    lang: function () { return root.lang === 'en' ? 'en' : 'fr'; },
    t: function (key) { return (DYN[root.lang === 'en' ? 'en' : 'fr'])[key] || key; },
    apply: apply
  };
})();
