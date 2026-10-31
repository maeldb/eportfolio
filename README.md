# ePortfolio — Maël Daoud-Beurteaux

Site statique (HTML, CSS, JavaScript sans framework) qui suit le cadre ePortfolio N7 2026-2027 :
6 onglets (Accueil, Parcours ingénieur, Mobilité internationale, Développement durable & engagement,
Sport & activités, Développement de carrière) et une section **Career Project** (CV FR/EN, LinkedIn FR/EN,
pitch vidéo, 3 role models, 3 projets de mobilité).

- Bilingue FR/EN (bouton en haut à droite ; l'anglais s'affiche d'office si le navigateur n'est pas en français).
- Mode clair / sombre (suit l'appareil, puis le choix du visiteur est mémorisé).
- Grille de Suguru jouable, avec la résolution automatique par backtracking.

## Aperçu en local

```bash
python -m http.server 5500
```

Puis ouvrir http://localhost:5500 (Ctrl+F5 si une ancienne version s'affiche).

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | Tout le contenu, en français |
| `js/i18n.js` | Les textes anglais (même clé `data-i18n` que dans le HTML) |
| `css/base.css` | Couleurs (thème clair et sombre), typographie, boutons, navigation |
| `css/sections.css` | Mise en page de chaque section, version mobile |
| `css/motion.css` | Animations (intro, apparitions, curseur, changement de thème) |
| `js/main.js` | Effets au scroll et au survol, thème, menu |
| `js/hero.js` | Champ de points animé de l'accueil |
| `js/suguru.js` | Jeu de Suguru et résolution automatique |
| `assets/cv/` | CV en PDF (FR et EN) |
| `assets/img/photo.jpg` | Photo (recadrée en carré par le CSS) |

Pour changer un texte : le modifier dans `index.html` **et** sa traduction dans `js/i18n.js`.
Pour mettre à jour un CV : remplacer le PDF dans `assets/cv/` en gardant le même nom de fichier.

## À compléter avant le 1er novembre

- [ ] **Pitch vidéo** (2–3 min, en anglais) : renseigner `data-video` sur le bouton `.pitch__frame`
      (lien YouTube, ou chemin d'un fichier comme `assets/video/pitch.mp4`).
- [x] Role models (prénoms seuls) : Pascal (Airbus), Guillaume (Thales Alenia Space), Olivier (Richemont).
      Relire les rubriques « Ce que j'en retiens » de Guillaume et d'Olivier, rédigées à partir de leurs profils.
- [x] Mobilité : EPFL, Imperial College London, Georgia Tech (programmes liés aux parcours HPC / systèmes).
- [x] Développement durable : Fresque du Climat, Le procès de King-Kong, festival Futur Proche.
- [ ] **Engagement citoyen** (40 h d'ici le S9) et **autres activités** (clubs, associations) : à venir.
- [ ] **LinkedIn en anglais** : ajouter un profil secondaire en anglais sur LinkedIn (le lien `?locale=en_US` l'affiche).
- [ ] **Relire les textes rédigés à partir du CV** (rubriques « Et après ? », savoir-être, centres d'intérêt),
      et remplacer l'extrait de code C par le tien si tu le souhaites.

## En ligne (GitHub Pages)

- Site : **https://maeldb.github.io/eportfolio/** (le lien à déposer sur Moodle)
- Dépôt : https://github.com/maeldb/eportfolio (déploiement depuis la branche `main`, dossier racine)

Pour publier une modification, depuis ce dossier :

```bash
git add -A
git commit -m "Décris ta modification"
git push
```

Le site se met à jour une à deux minutes après l'envoi. Le `.gitignore` empêche de publier
le PDF du cours (`FISE_…pdf`) et le dossier `.claude/`.

## Crédits des images

- Logos des langages et outils : projet [Devicon](https://devicon.dev) (licence MIT) ; logo Ada : Wikimedia Commons (CC0) ;
  icône SQL et drapeaux : dessinés pour ce site.
- Photos d'illustration (`assets/img/activites/`), Wikimedia Commons :
  [Fresque du climat](https://commons.wikimedia.org/wiki/File:Fresque_du_climat.jpg) — Xfigpower, CC BY-SA 3.0 ;
  [rideau de scène](https://commons.wikimedia.org/wiki/File:Curtain-939464.jpg) — tommybuddy, CC0 ;
  [Fête de la science à Reims](https://commons.wikimedia.org/wiki/File:Fete_de_la_science_Reims_1.jpg) — Protogonos69, CC BY-SA 4.0.
  Les crédits sont aussi affichés sur chaque photo du site : à conserver si tu gardes ces images.

## Notes

- Les animations sont désactivées si l'appareil demande à réduire les animations (accessibilité).
- Les polices viennent de Google Fonts. Pour un site 100 % hébergé dans l'UE (RGPD), les télécharger
  dans `assets/fonts/` et remplacer la balise `<link>` correspondante par des `@font-face`.
- Le numéro de téléphone n'est pas affiché sur le site (il reste dans les PDF des CV).
