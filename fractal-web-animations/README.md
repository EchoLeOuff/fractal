# Fractal Web — Next.js (App Router, TypeScript, Tailwind, atomic design)

Front statique qui consomme `newsletter_data.json` (produit par le pipeline Python).
Les nouveaux articles apparaissent **sans reconstruction** : la home, la recherche
et la page article relisent le JSON côté navigateur à chaque visite.

## Démarrer

    npm install
    npm run dev        # http://localhost:3000

## Construire le site statique

    npm run build      # génère le dossier out/ (HTML/CSS/JS pur)

Le dossier `out/` se sert tel quel avec nginx sur le Pi.

## Mettre les données à jour

Ton pipeline écrit `newsletter_data.json`. Copie-le dans `public/` (en dev) et
dans `out/` (en prod servi par nginx) — ou fais pointer nginx pour servir le JSON
depuis l'emplacement où le Pi l'écrit. Aucun rebuild nécessaire pour de nouveaux articles.

## Structure (atomic design)

- components/atoms      — Button, Badge, Input, Logo, RadarBar
- components/molecules  — SearchBar, AssetChips, RadarGroup
- components/organisms  — Header, ArticleCard, ArticleList
- components/templates  — HomeTemplate, SearchTemplate, ArticleTemplate
- app/                  — routes (page d'accueil, /recherche, /article?slug=...)
- hooks/                — useArticles (fetch live), useSearch (filtre O(N))
- lib/data.ts           — accès données + slug
- types/article.ts      — types calqués sur le JSON du pipeline
