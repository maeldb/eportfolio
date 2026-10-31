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
    'todo.soon': 'Coming soon',

    'hero.pill': 'Computer Science Engineering Student · ENSEEIHT',
    'hero.lead': 'I enjoy programming in all its forms, and I am heading towards high-performance computing and Big Data.',
    'hero.cta1': 'See my projects', 'hero.cta2': 'Download my CV',
    'hero.cvHref': 'assets/cv/Mael-Daoud-Beurteaux-CV-EN.pdf',
    'hero.pitch': 'Watch my video pitch',
    'hero.alt': 'Portrait of Maël Daoud-Beurteaux',
    'hero.caption': 'Toulouse · looking for an operator internship, June – August 2027',
    'hero.scroll': 'Scroll', 'hero.scrollTxt': 'Scroll',
    'mq.algo': 'Algorithms',

    'about.eyebrow': 'About', 'about.title': 'Who am I?',
    'about.statement': 'After two years of MP2I – MPI preparatory classes, I joined ENSEEIHT, a selective public engineering school (“Grande École”) within Toulouse INP, in its Computer Science and Telecommunications department.',
    'soft.title': 'Soft skills',
    'soft.1.t': 'Rigour', 'soft.1.p': 'Two years of preparatory classes: reason, prove, check every step.',
    'soft.2.t': 'Adaptability', 'soft.2.p': 'Switching from one language or environment to another without losing the thread.',
    'soft.3.t': 'Creativity', 'soft.3.p': 'Looking for several approaches before picking the right one.',
    'soft.4.t': 'Teamwork', 'soft.4.p': 'Moving forward together, on a pitch as in a project.',

    'eng.title': 'An education built around computing and data.',
    'eng.lead': 'From preparatory classes to the engineering degree: the key steps of my education, and those still ahead.',
    'eng.sub1': 'Roadmap', 'eng.sub2': 'Projects &amp; productions', 'eng.sub3': 'Skills',
    'road.title': 'Roadmap 2024 → 2029',
    'road.1.t': 'French baccalauréat — with honours',
    'road.1.p': 'Specialty subjects: Mathematics and Physics-Chemistry. Average grade: 15.81/20.',
    'road.2.t': 'Grandes Écoles preparatory classes – MP2I / MPI',
    'road.2.p': 'Ranked 338th in the CCINP national entrance exam.',
    'road.3.d': 'Since Sept. 2026', 'road.now': 'Ongoing',
    'road.3.t': 'Engineering degree — 1<sup>st</sup> year', 'road.3.p': 'Computer Science and Telecommunications department.',
    'road.4.d': 'June – August 2027', 'road.4.t': 'Operator internship (S6)', 'road.4.pl': 'Currently searching',
    'road.4.p': '6 to 8 weeks in a company.',
    'road.5.t': '2<sup>nd</sup> year: HPC &amp; Big Data track', 'road.5.pl': 'ENSEEIHT · target track',
    'road.5.p': 'Other option considered: System Architecture &amp; Networks. Internship in S8.',
    'road.6.d': 'Autumn 2028', 'road.6.t': 'International mobility (S9)', 'road.6.pl': '17 weeks minimum',
    'road.6.p': 'See my mobility projects',
    'road.7.t': 'Engineering degree', 'road.7.p': 'Engineering degree, Master’s level.',

    'proj.title': 'Projects &amp; productions',
    'tipe.t': 'Optimising the energy efficiency of a mechanical system',
    'tipe.p': 'Building a rubber-band-powered model car, then hunting down losses to turn more of the stored energy into motion.',
    'tipe.before': 'Before', 'tipe.after': 'After',
    'tipe.tag1': 'Physics', 'tipe.tag2': 'Measurement', 'tipe.tag3': 'Optimisation',
    'star.open': 'See the details (STAR method)',
    'star.s': 'Situation', 'star.t': 'Task', 'star.a': 'Action', 'star.r': 'Result', 'star.n': 'And beyond?',
    'tipe.s': 'TIPE, a supervised research project in preparatory classes, on the energy efficiency of a simple mechanical system: a model car powered by a rubber band.',
    'tipe.ta': 'Understand where the energy stored in the rubber band is lost, and increase the share actually converted into motion.',
    'tipe.a': 'Identified the main sources of loss, then optimised the system to reduce them.',
    'tipe.r': 'Efficiency raised from 66 % to 77 %: losses drop from 34 % to 23 % of the stored energy.',
    'tipe.n': 'A method I also apply to code: measure before optimising, and tackle the biggest losses first.',

    'sg.label': 'Preparatory class project · 2024 – 2025',
    'sg.t': 'A Suguru puzzle solver in C',
    'sg.p': 'Representing, displaying and checking grids, then solving them by brute force, a greedy algorithm and backtracking: an 8×8 grid solved in under a second.',
    'sg.tag2': 'Algorithms', 'sg.tab1': 'Play', 'sg.tab2': 'The idea in C',
    'sg.s': 'Programming project in MP2I preparatory classes.',
    'sg.ta': 'Represent, display and check Suguru grids, then solve them automatically.',
    'sg.a': 'Implemented and compared three approaches in C: brute force, greedy and backtracking.',
    'sg.r': 'An 8×8 grid solved in under a second.',
    'sg.n': 'Comparing several algorithms on the same problem taught me to assess the cost of each approach.',
    'sg.hint': 'Your turn: click a cell, then type a digit or use the keypad.',
    'sg.aria': '6×6 Suguru grid to fill in', 'sg.padAria': 'Keypad', 'sg.erase': 'Clear the cell',
    'sg.reset': 'Start over',
    'sg.rules': 'Rule: a region of n cells holds the digits 1 to n, and two neighbouring cells, even diagonally, never hold the same digit.',

    'skills.title': 'Technical skills',
    'skills.lang': 'Language', 'skills.data': 'Data', 'skills.tool': 'Tool', 'skills.sys': 'System', 'skills.os': 'Systems',
    'skills.c': 'Imperative programming, in MP2I – MPI prep classes',
    'skills.ocaml': 'Functional programming, in MP2I – MPI prep classes',
    'skills.ada': 'Imperative programming, at ENSEEIHT',
    'skills.sql': 'Relational databases',
    'skills.git': 'Version control and teamwork',
    'skills.web': 'Web pages and interfaces',
    'lvl.2': 'Level 2 out of 5', 'lvl.3': 'Level 3 out of 5', 'lvl.4': 'Level 4 out of 5',

    'mob.title': 'Opening up to the world, in line with my project.',
    'mob.lead': 'At least 17 weeks of mobility are planned in S9. I am preparing them now, in line with my track and with the profiles that inspire me.',
    'mob.sub1': 'Languages (incl. LV2)', 'mob.sub2': 'Mobility projects',
    'lang.title': 'Languages', 'lang.note': 'Levels according to the Common European Framework of Reference (CEFR).',
    'lang.fr': 'French', 'lang.native': 'Native', 'lang.en': 'English', 'lang.es': 'Spanish (LV2)',
    'mp.title': 'My mobility projects',
    'mp.sub': 'Three Master’s options abroad, in line with the tracks I am considering at ENSEEIHT: HPC &amp; Big Data first, or System Architecture &amp; Networks.',
    'mp.spec': 'Specializations I am interested in', 'mp.prog': 'Programmes I am interested in',
    'mp.1.l': 'Switzerland · Lausanne',
    'mp.1.p': 'An MSc in Computer Science, through a “free mover” exchange with ENSEEIHT.',
    'mp.1.s1': 'Operating systems, architecture, distributed and networked systems, data management.',
    'mp.1.s2': 'Machine learning and data science, including large-scale processing.',
    'mp.2.l': 'United Kingdom · London',
    'mp.2.p': 'A one-year Master’s (MSc), with two possible programmes.',
    'mp.2.s1': 'Numerical methods, C++, machine learning and high-performance computing.',
    'mp.2.s2': 'Advanced computing modules of my choice, followed by a major individual project.',
    'mp.3.l': 'United States · Atlanta',
    'mp.3.p': 'The MS in Computer Science, taken with a specialization of my choice.',
    'mp.3.s1': 'Parallel and high-performance computing, algorithms for science and engineering.',
    'mp.3.s2': 'Operating systems, networks, computer architecture, databases.',

    'sus.title': 'Understanding the challenges of our time.',
    'sus.lead': 'From my first year, ENSEEIHT gave me the opportunity to take part in several awareness-raising initiatives, on climate as well as on gender-based and sexual violence.',
    'sus.1.l': 'Workshop · 1<sup>st</sup> year', 'sus.1.t': 'Climate Fresk',
    'sus.1.p': 'A collaborative workshop with other ENSEEIHT students, to understand the mechanisms of climate change and grasp the challenges we will face as engineers.',
    'sus.2.l': 'Interactive theatre · 1<sup>st</sup> year', 'sus.2.t': 'The Trial of King Kong',
    'sus.2.p': 'An interactive play about gender-based and sexual violence and its consequences, which I attended and took part in.',
    'sus.3.l': 'Festival · Toulouse', 'sus.3.t': 'The “Futur Proche” festival',
    'sus.3.p': 'With ENSEEIHT and the universities of Toulouse: talks, workshops and presentations on climate issues, approached from a scientific angle through existing innovations and ones still in development.',
    'sus.4': 'Civic engagement: 40 hours to complete by S9.',
    'sus.1.alt': 'A completed Climate Fresk: cards linked by arrows on a large sheet (illustrative photo)',
    'sus.2.alt': 'Red stage curtain lit by a spotlight (illustrative photo)',
    'sus.3.alt': 'A talk in a lecture hall during a science festival (illustrative photo)',

    'sport.title': 'On the pitch, and beyond.',
    'sport.lead': 'Football taught me consistency and collective play. My hobbies, in turn, feed my curiosity.',
    'sport.label': 'Club football · high school', 'sport.unit': ' years',
    'sport.p': 'Three seasons in a club during high school: a taste for teamwork, consistency and shared effort.',
    'hob.label': 'Interest',
    'hob.games.t': 'Video games', 'hob.games.p': 'Mostly exploration and puzzle games.',
    'hob.read.t': 'Reading', 'hob.read.p': 'Novels, for the pleasure of it.',
    'sport.other': 'Other activities',
    'sport.otherP': 'ENSEEIHT clubs and associations, personal projects: this section will grow over the three years.',

    'car.title': 'Building my career project, step by step.',
    'car.lead': 'From first experiences to a career project: internships, networking, and how I present what I can bring.',
    'car.sub1': 'Experience', 'car.sub2': 'Internships',
    'exp.label': 'Summer 2022 · Summer job',
    'exp.t': 'Hotel-restaurant Le Panoramic',
    'exp.p': 'Dishwashing, cleaning and dining-room set-up for breakfast service.',
    'exp.n': 'What I took away: rigour, speed and teamwork, in a service where everything has to be ready on time.',
    'int.title': 'Internships', 'int.1.d': 'June – August 2027',
    'int.1.t': '6- to 8-week operator internship',
    'int.search': 'Searching',
    'int.2.t': '2<sup>nd</sup>-year internship, related to the chosen track',
    'int.soon': 'Upcoming',

    'cp.lead': 'My video pitch, my CVs, my LinkedIn profile and the three role models that shape my project.',
    'pitch.soon': 'Video being filmed, available soon',
    'pitch.t': 'My pitch in English, in 2 to 3 minutes',
    'pitch.s1': 'Present', 'pitch.s1p': 'Computer Science engineering student at ENSEEIHT',
    'pitch.s2': 'Past', 'pitch.s2p': 'Two years of MP2I – MPI prep classes in Dijon',
    'pitch.s3': 'Future', 'pitch.s3p': 'My 3 role models and my 3 mobility projects',
    'doc.cvfr': 'CV in French', 'doc.cven': 'CV in English', 'doc.dl': 'Download',
    'doc.infr': 'LinkedIn in French', 'doc.inen': 'LinkedIn in English', 'doc.view': 'View profile',
    'rm.title': 'My role models',
    'rm.path': 'Background', 'rm.keep': 'Key takeaways', 'rm.keep2': 'What I take from it',
    'rm.role': 'Position', 'rm.missions': 'Responsibilities', 'rm.alumni': 'ENSEEIHT graduate',
    'rm.edu': 'Education', 'rm.roles': 'Roles',
    'rm.mjg': 'Interview via My Job Glasses', 'rm.profile': 'Analysed profile',
    'rm.1.edu': 'ENSEEIHT, PhD at LAAS, UCLA.',
    'rm.1.path': 'An entire career at Airbus in embedded systems: designing the A320’s fly-by-wire flight controls, safety, architecture and certification, then the A380 assembly line.',
    'rm.1.roles': 'Team and project management, expert, architect. Until retiring in 2023: defining Airbus’s innovation strategy for autonomy technologies and putting it into practice.',
    'rm.1.keep': 'A clearer view of the aerospace industry and of how an engineering career can evolve, along with valuable advice for what comes next.',
    'rm.2.role': 'Head of design for satellite cryptographic equipment.',
    'rm.2.missions': 'Specifying, building and testing equipment that secures communications between satellites and Earth, up to leading the test team.',
    'rm.2.path': 'Testing first: an international corporate volunteering contract (VIE) at Renault in Turkey, then electrical testing of complete satellites in Cannes and testing of cryptographic equipment in Toulouse, before moving into design.',
    'rm.2.keep': 'An experience abroad as a starting point, then a progression from testing to design: a concrete career path in embedded systems and security.',
    'rm.3.role': 'Head of Group Data Security.',
    'rm.3.missions': 'Group-wide data protection strategy, policies and procedures, risk management, compliance with data privacy regulations.',
    'rm.3.keep': 'Data seen through the lens of security, governance and compliance: a Big Data career path that goes beyond pure technique.',

    'contact.title': 'Let’s talk.',
    'contact.lead': 'An internship, a project, a question? I would be glad to answer.',
    'contact.copy': 'Copy address', 'contact.write': 'Write to me', 'contact.linkedin': 'Follow me on LinkedIn',
    'foot.tag': 'Computer Science Engineering Student · ENSEEIHT, Toulouse INP',
    'foot.pitch': 'Video pitch',
    'foot.version': 'Version 1.2 · S5 “Launch” · October 2026',
    'foot.static': 'Static site, no cookies'
  };

  // Textes générés par le JavaScript (jeu de Suguru, thème, notifications…)
  var DYN = {
    fr: {
      'copy.ok': 'Adresse copiée', 'lang.aria': 'Switch to English', 'pitch.none': 'La vidéo arrive bientôt.',
      'theme.dark': 'Passer en mode sombre', 'theme.light': 'Passer en mode clair',
      'sg.solve': 'Voir la résolution automatique', 'sg.pause': 'Pause', 'sg.resume': 'Reprendre', 'sg.replay': 'Rejouer la résolution',
      'sg.filled': 'Cases remplies', 'sg.time': 'Temps', 'sg.conflicts': 'Conflits', 'sg.tries': 'Essais', 'sg.backs': 'Retours arrière',
      'sg.win': 'Bravo, grille résolue en %t !', 'sg.solvedMsg': 'Résolu par backtracking : %a essais, %b retours arrière.',
      'sg.cell': 'Ligne %r, colonne %c, région de %n cases : %v', 'sg.empty': 'vide', 'sg.given': ' (chiffre donné)'
    },
    en: {
      'copy.ok': 'Address copied', 'lang.aria': 'Passer en français', 'pitch.none': 'The video is coming soon.',
      'theme.dark': 'Switch to dark mode', 'theme.light': 'Switch to light mode',
      'sg.solve': 'Watch the automatic solver', 'sg.pause': 'Pause', 'sg.resume': 'Resume', 'sg.replay': 'Replay the solver',
      'sg.filled': 'Cells filled', 'sg.time': 'Time', 'sg.conflicts': 'Conflicts', 'sg.tries': 'Attempts', 'sg.backs': 'Backtracks',
      'sg.win': 'Well done, grid solved in %t!', 'sg.solvedMsg': 'Solved by backtracking: %a attempts, %b backtracks.',
      'sg.cell': 'Row %r, column %c, region of %n cells: %v', 'sg.empty': 'empty', 'sg.given': ' (given)'
    }
  };

  var root = document.documentElement;
  var FR = {};
  var html = { get: function (el) { return el.innerHTML; }, set: function (el, v) { el.innerHTML = v; } };
  function attr(name) {
    return { get: function (el) { return el.getAttribute(name); }, set: function (el, v) { el.setAttribute(name, v); } };
  }
  var BINDINGS = {
    'data-i18n': html, 'data-i18n-html': html,
    'data-i18n-aria': attr('aria-label'), 'data-i18n-alt': attr('alt'), 'data-i18n-href': attr('href')
  };

  function each(fn) {
    Object.keys(BINDINGS).forEach(function (a) {
      document.querySelectorAll('[' + a + ']').forEach(function (el) { fn(a, BINDINGS[a], el, el.getAttribute(a)); });
    });
  }

  // Le français d'origine est mémorisé avant toute modification (et avant le découpage des titres).
  each(function (a, b, el, key) { if (!((a + '|' + key) in FR)) FR[a + '|' + key] = b.get(el); });

  function apply(lang, silent) {
    each(function (a, b, el, key) {
      var v = lang === 'en' ? EN[key] : FR[a + '|' + key];
      if (v != null) b.set(el, v);
    });
    root.lang = lang;
    var toggle = document.querySelector('[data-lang-toggle]');
    if (toggle) toggle.setAttribute('aria-label', DYN[lang]['lang.aria']);
    try { localStorage.setItem('lang', lang); } catch (e) { /* stockage indisponible : sans conséquence */ }
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
