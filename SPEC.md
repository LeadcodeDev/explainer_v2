# Explainer v2 — Specification & Milestones

## 1. Overview

**Vision** : Un boilerplate monorepo permettant de generer des sites de documentation, blog et website, deployables independamment sur des sous-domaines distincts, avec un design system partage.

**Probleme** : Les outils existants imposent un monolithe tout-en-un ou forcent a maintenir des projets separes sans coherence graphique. Les developpeurs et entreprises ont besoin de flexibilite dans le deploiement sans sacrifier la coherence.

**Solution** : Un monorepo Astro + React avec 3 apps optionnelles (docs, blog, website) partageant un package UI commun, du contenu MDX, et une CI multi-target.

**Cible** : Developpeurs, entreprises, mainteneurs open-source.

---

## 2. Goals & Non-Goals

### Goals

- Permettre de deployer docs, blog et website independamment sur des sous-domaines
- Partager une charte graphique commune via un package UI interne
- Supporter le contenu MDX avec composants custom et coloration Shiki
- Supporter le multi-docs (plusieurs projets) et multi-versions (v1, v2...) dans la meme instance docs
- Supporter le multilingue par prefixe URL (`/fr/...`) avec detection automatique de la langue du navigateur
- Supporter le deploiement sur Vercel, Cloudflare Pages, GitHub Pages et Docker
- Chaque app est optionnelle — l'utilisateur fork et supprime ce qu'il ne veut pas

### Non-Goals

- Pas un framework installable via npm — c'est un boilerplate qu'on fork
- Pas de CMS ou d'interface d'administration
- Pas de SSR — tout est SSG (static site generation)
- Pas de systeme de commentaires ou d'analytics integre
- Pas de gestion d'authentification

---

## 3. User Stories

### Docs

- En tant que mainteneur, je veux documenter plusieurs projets dans une seule instance pour centraliser ma documentation
- En tant que mainteneur, je veux proposer plusieurs versions de ma doc pour que les utilisateurs trouvent la doc correspondant a leur version
- En tant que mainteneur, je veux ecrire ma doc en MDX avec des composants custom (callouts, tabs, code blocks) pour enrichir le contenu
- En tant que mainteneur, je veux organiser ma doc en dossiers imbriques profonds pour structurer des sujets complexes
- En tant que visiteur, je veux switcher de projet/version via un dropdown sans quitter la page
- En tant que visiteur, je veux que la langue soit automatiquement selectionnee selon mon navigateur
- En tant que visiteur, je veux pouvoir changer de langue manuellement

### Blog

- En tant que mainteneur, je veux publier des articles en MDX
- En tant que visiteur, je veux voir la liste des articles (index) et lire un article (show)

### Website

- En tant que developpeur, je veux un espace website libre (routing Astro standard) pour creer mon site vitrine sans contrainte
- En tant que developpeur, je veux reutiliser les composants du design system partage

### Transverse

- En tant que developpeur, je veux fork le repo et supprimer les apps dont je n'ai pas besoin
- En tant que developpeur, je veux build et deployer chaque app independamment via CI
- En tant que developpeur, je veux choisir mon target de deploiement (Vercel, Cloudflare, GH Pages, Docker)

---

## 4. Functional Requirements

### 4.1 — Structure monorepo

| Feature | Description | Priorite |
|---|---|---|
| Monorepo pnpm workspaces | `apps/docs`, `apps/blog`, `apps/website`, `packages/ui`, `packages/mdx` | Must |
| Package `@explainer/ui` | Composants React partages (shadcn/Tailwind 4), tokens de design | Must |
| Package `@explainer/mdx` | Composants MDX custom + config Shiki partagee | Must |
| Apps independantes | Chaque app a son propre `astro.config.ts`, build independant | Must |
| Suppression d'app | Supprimer un dossier `apps/*` ne casse pas le reste | Must |

### 4.2 — Docs (`apps/docs`)

| Feature | Description | Priorite |
|---|---|---|
| Home page | Page d'accueil de la doc | Must |
| Navigation imbriquee | Sidebar generee depuis la structure de dossiers, profondeur illimitee | Must |
| Multi-docs | Dropdown pour switcher entre projets (ex: `project-a`, `project-b`) | Must |
| Multi-versions | Dropdown pour switcher entre versions d'un projet (ex: `v1`, `v2`) | Must |
| Version `default` | Si la version est nommee `default`, elle est ignoree dans l'URL (pas de versionning) | Must |
| i18n par prefixe URL | `/fr/project-a/v1/getting-started` | Must |
| Detection langue navigateur | Redirect automatique vers la locale detectee, fallback anglais | Must |
| Switch langue manuel | Selecteur de langue dans le header/sidebar | Must |
| Recherche | Recherche full-text dans la doc | Should |
| Table of contents | TOC automatique depuis les headings MDX | Must |
| Pagination prev/next | Navigation sequentielle entre pages | Should |

**Structure de contenu docs :**

```
apps/docs/src/content/
  {project}/
    {version}/
      {locale}/
        {section}/
          page.mdx
```

**Routing docs :**

```
Version nommee   : /{locale}/{project}/{version}/{...path}
Version "default": /{locale}/{project}/{...path}

Exemples:
  content/my-lib/default/en/guides/install.mdx  -> /en/my-lib/guides/install
  content/my-lib/v2/en/guides/install.mdx       -> /en/my-lib/v2/guides/install
```

Le dropdown de versions n'apparait que si le projet a au moins une version autre que `default`.

**Frontmatter MDX docs :**

```yaml
---
title: Installation
description: Guide d'installation de my-lib
permalink: /custom-path/install   # Optionnel — ecrase le path auto-genere
icon: rocket                      # Optionnel — icone affichee dans la sidebar (Lucide)
order: 2                          # Position dans sa categorie (tri ascendant, fallback alphabetique)
---
```

**Frontmatter dossiers (categories) via `_meta.yaml` :**

```yaml
title: Guides
icon: book-open
order: 1
```

### 4.3 — Blog (`apps/blog`)

| Feature | Description | Priorite |
|---|---|---|
| Index articles | Liste paginee des articles avec titre, date, excerpt, tags | Must |
| Show article | Page de lecture d'un article MDX | Must |
| Tags/categories | Filtrage par tag sur l'index | Should |
| RSS feed | Flux RSS auto-genere | Should |
| i18n | Meme systeme que docs (`/fr/mon-article`) | Could |

**Structure de contenu blog :**

```
apps/blog/src/content/
  {locale}/
    article-slug.mdx
```

### 4.4 — Website (`apps/website`)

| Feature | Description | Priorite |
|---|---|---|
| Structure libre | Routing Astro standard, pas de structure imposee | Must |
| Acces au design system | Import `@explainer/ui` | Must |
| Pages Astro + React | Islands architecture Astro standard | Must |

### 4.5 — MDX & Composants custom

| Feature | Description | Priorite |
|---|---|---|
| Override elements MD | Remplacement de `h1`, `h2`, `p`, `a`, `code`, `pre`, etc. par des composants custom | Must |
| Coloration Shiki | Syntax highlighting via Shiki avec support de themes | Must |
| Composants custom | Callout/Admonition, Tabs, Steps, Card, CodeGroup | Must |
| Auto-import MDX | Les composants custom sont disponibles sans import explicite dans les fichiers MDX | Should |

### 4.6 — CI / Deploiement

| Feature | Description | Priorite |
|---|---|---|
| GitHub Actions workflow | Build independant par app (`build:docs`, `build:blog`, `build:website`) | Must |
| Adapter Vercel | Config Vercel pour chaque app | Must |
| Adapter Cloudflare Pages | Config CF pour chaque app | Must |
| Adapter GitHub Pages | Workflow GH Pages par app | Must |
| Dockerfile | Multi-stage build, serveur statique (nginx/caddy) | Must |
| Build conditionnel | La CI ne rebuild que les apps dont le code a change (path filter) | Should |

---

## 5. Non-Functional Requirements

- **Performance** : Score Lighthouse > 95 sur chaque app (SSG = statique)
- **Accessibilite** : Conformite WCAG 2.1 AA minimum
- **SEO** : Sitemap auto-genere, meta tags, Open Graph, structured data pour les articles
- **Bundle** : Minimal JS client — Astro islands, React uniquement la ou necessaire
- **DX** : Hot reload, TypeScript strict, linting (ESLint + Prettier)

---

## 6. Technical Architecture

### Stack

| Couche | Choix | Raison |
|---|---|---|
| Meta-framework | Astro | SSG natif, content collections, MDX, multi-adapter |
| UI | React | Ecosysteme riche, shadcn compatible |
| Design system | shadcn/ui + Tailwind CSS 4 | Composants copiables, tokens CSS natifs |
| MDX | `@astrojs/mdx` + Shiki | Integration native Astro, Shiki performant |
| Monorepo | pnpm workspaces + Turborepo | Builds paralleles, cache, dependances partagees |
| CI | GitHub Actions | Standard, gratuit pour l'open-source |

### Arborescence

```
explainer-v2/
├── apps/
│   ├── docs/
│   │   ├── astro.config.ts
│   │   ├── src/
│   │   │   ├── components/       # Composants propres aux docs
│   │   │   ├── layouts/
│   │   │   ├── pages/
│   │   │   └── content/          # Content collections (MDX)
│   │   └── package.json
│   ├── blog/
│   │   ├── astro.config.ts
│   │   ├── src/
│   │   │   ├── components/       # Composants propres au blog
│   │   │   ├── layouts/
│   │   │   ├── pages/
│   │   │   └── content/
│   │   └── package.json
│   └── website/                  # Optionnel
│       ├── astro.config.ts
│       ├── src/
│       └── package.json
├── packages/
│   ├── ui/                       # @explainer/ui
│   │   ├── src/
│   │   │   ├── components/       # Boutons, Cards, Dropdowns, etc.
│   │   │   ├── styles/           # Tailwind config, tokens, globals
│   │   │   └── index.ts
│   │   └── package.json
│   └── mdx/                      # @explainer/mdx
│       ├── src/
│       │   ├── components/       # Callout, Tabs, Steps, CodeGroup
│       │   ├── overrides/        # h1, h2, a, pre, code overrides
│       │   └── shiki.ts          # Config Shiki partagee
│       └── package.json
├── .github/
│   └── workflows/
│       ├── deploy-docs.yml
│       ├── deploy-blog.yml
│       └── deploy-website.yml
├── Dockerfile
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

---

## 7. Constraints & Assumptions

**Constraints :**

- Boilerplate forke — pas de systeme de mise a jour automatique
- pnpm obligatoire (workspaces)
- Node.js 20+
- Contenu en MDX uniquement

**Assumptions :**

- L'utilisateur sait utiliser Git, pnpm, et a des bases Astro/React
- L'utilisateur gere ses propres DNS pour les sous-domaines
- Les versions de docs sont gerees par dossiers, pas par branches git

---

## 8. Risks & Mitigations

| Risque | Impact | Mitigation |
|---|---|---|
| Complexite routing docs (project/version/locale/path) | Eleve | Prototyper le routing en premier, valider avec des cas edge |
| Maintenance 4 adapters de deploy | Moyen | Templates CI bien documentes, tests de build en CI pour chaque adapter |
| Divergence des apps apres fork | Faible | Centraliser le maximum dans `packages/ui` et `packages/mdx` |
| Tailwind 4 encore recent | Faible | Fallback possible vers v3 si blocage |

---

## 9. Success Metrics

- Un utilisateur peut fork, supprimer le website, et deployer docs + blog en moins de 30 minutes
- Score Lighthouse > 95 out of the box
- La doc d'Explainer v2 elle-meme est construite avec Explainer v2 (dogfooding)
- Adoption : stars GitHub, forks, issues ouvertes par la communaute

---

## 10. Open Questions

1. Nom du projet : Explainer v2 ou nouveau nom ?
2. Recherche docs : integree (Pagefind) ou externe (Algolia) ?
3. Theme clair/sombre : supporte des v1 ?

---

---

# Milestones

## Roadmap

| # | Name | Goal | Effort | Dependances |
|---|---|---|---|---|
| M1 | Monorepo Foundation | Structure monorepo, packages UI et MDX fonctionnels | M | Aucune |
| M2 | Docs Core | App docs avec routing, sidebar, content collections | L | M1 |
| M3 | Docs Advanced | Multi-docs, multi-versions, i18n, dropdown switchers | L | M2 |
| M4 | Blog | App blog complete (index + show) | S | M1 |
| M5 | Website | App website scaffold libre | S | M1 |
| M6 | Deploy & CI | 4 adapters + GitHub Actions workflows | M | M2, M4 |
| M7 | Polish & Dogfood | Documenter Explainer v2 avec lui-meme, polish DX | M | M3, M4, M6 |

**Effort total estime : L-XL**

---

### M1 : Monorepo Foundation

**Goal :** Avoir la structure monorepo fonctionnelle avec les deux packages partages prets a consommer.

**Deliverables :**

- Monorepo pnpm workspaces + Turborepo configure
- `packages/ui` : Tailwind 4 config, tokens, premiers composants shadcn (Button, Card, Dropdown, ThemeProvider)
- `packages/mdx` : composants d'override (h1-h6, a, pre, code, p), composants custom (Callout, Tabs, Steps, CodeGroup), config Shiki
- TypeScript strict, ESLint, Prettier configures a la racine
- Une app minimale `apps/docs` qui importe les deux packages et affiche une page MDX de test

**Key Tasks :**

- Init pnpm workspace + turbo.json
- Setup Tailwind 4 avec tokens partages dans `packages/ui`
- Integrer shadcn/ui dans le package, adapter pour Tailwind 4
- Creer les composants MDX override + custom dans `packages/mdx`
- Configurer Shiki (themes, langages)
- Verifier que le build Astro d'une app consommant les deux packages fonctionne

**Dependencies :** Aucune

**Acceptance Criteria :**

- `pnpm build` depuis la racine build tous les packages et l'app de test
- Un fichier MDX utilisant des composants custom + code blocks Shiki s'affiche correctement
- Les composants UI sont importables via `@explainer/ui`
- Les composants MDX sont importables via `@explainer/mdx`

**Effort :** M

**Risques :** Compatibilite Tailwind 4 + shadcn (verifier la stabilite).

---

### M2 : Docs Core

**Goal :** App docs fonctionnelle avec une seule doc, une seule version, une seule langue — routing, sidebar, content collections.

**Deliverables :**

- Content collection Astro avec schema (title, description, permalink, icon, order)
- Support `_meta.yaml` pour les dossiers
- Routing dynamique `[...slug].astro`
- Sidebar auto-generee depuis la structure de fichiers, triee par `order`
- Layout docs : sidebar, TOC (table of contents), contenu, pagination prev/next
- Support `permalink` custom dans le frontmatter
- Icones dans la sidebar (Lucide)

**Key Tasks :**

- Definir le schema Zod de la content collection docs
- Parser `_meta.yaml` pour les categories
- Construire l'arbre de navigation depuis le filesystem
- Implementer le tri par `order` avec fallback alphabetique
- Routing `[...slug]` avec support `permalink` override
- Composant Sidebar recursif (profondeur illimitee)
- Composant TOC extrait des headings
- Layout avec responsive (sidebar collapsible mobile)

**Dependencies :** M1

**Acceptance Criteria :**

- Une doc mono-projet/mono-version/mono-langue s'affiche avec sidebar correcte
- Les dossiers imbriques sur 4+ niveaux fonctionnent
- `order` trie correctement, fallback alphabetique si absent
- `permalink` custom fonctionne et override le path
- Les icones s'affichent dans la sidebar
- TOC generee automatiquement
- Navigation prev/next fonctionne

**Effort :** L

**Risques :** La generation d'arbre de navigation recursif depuis les content collections Astro peut necessiter un helper custom.

---

### M3 : Docs Advanced

**Goal :** Ajouter multi-docs, multi-versions (avec regle `default`), i18n, et les switchers.

**Deliverables :**

- Routing etendu : `/{locale}/{project}/{version?}/{...path}`
- Regle `default` : si version = `default`, pas de segment version dans l'URL
- Dropdown switcher projet
- Dropdown switcher version (masque si seul `default` existe)
- Selecteur de langue
- Detection automatique de la langue navigateur + redirect
- Fallback anglais si la page n'existe pas dans la locale demandee

**Key Tasks :**

- Refactorer le routing pour integrer locale/project/version
- Implementer la logique `default` version (exclusion du segment URL)
- Construire les composants dropdown (project switcher, version switcher, lang switcher)
- Middleware Astro pour detection `Accept-Language` et redirect
- Systeme de fallback : si `/fr/.../page` n'existe pas -> redirect `/en/.../page`
- Adapter la sidebar pour filtrer par project/version/locale actifs
- Mettre a jour la content collection pour indexer project/version/locale

**Dependencies :** M2

**Acceptance Criteria :**

- `content/lib-a/default/en/...` accessible a `/en/lib-a/...` (pas de `/default/`)
- `content/lib-a/v2/en/...` accessible a `/en/lib-a/v2/...`
- Dropdown version n'apparait pas si seul `default` existe
- Dropdown version apparait des qu'une version nommee existe
- Switcher projet fonctionne, change la sidebar
- Visite sans locale -> redirect vers la locale du navigateur
- Page absente en FR -> fallback EN

**Effort :** L

**Risques :** Complexite routing elevee — prototyper en isolation avant d'integrer.

---

### M4 : Blog

**Goal :** App blog complete et fonctionnelle.

**Deliverables :**

- Content collection blog avec schema (title, date, excerpt, tags, cover)
- Page index : liste paginee des articles
- Page show : lecture d'un article MDX
- Filtrage par tags
- RSS feed
- Integration `@explainer/ui` et `@explainer/mdx`

**Key Tasks :**

- Definir le schema content collection blog
- Page index avec pagination
- Page `[slug].astro` pour les articles
- Composant tag filter
- Generation RSS via `@astrojs/rss`
- Layout blog (header, article, footer)

**Dependencies :** M1

**Acceptance Criteria :**

- Index affiche les articles tries par date, pagines
- Clic sur un article -> page de lecture complete avec MDX rendu
- Filtrage par tag fonctionne
- Flux RSS valide genere au build

**Effort :** S

**Risques :** Faible.

---

### M5 : Website

**Goal :** Scaffold de l'app website optionnel, pret a customiser.

**Deliverables :**

- App `apps/website` minimale avec routing Astro standard
- Page d'exemple utilisant `@explainer/ui`
- Documentation dans un README expliquant que c'est libre de structure

**Key Tasks :**

- Init app Astro dans `apps/website`
- Page d'exemple (hero, features) avec composants `@explainer/ui`
- Config Tailwind pointant vers le package partage

**Dependencies :** M1

**Acceptance Criteria :**

- `pnpm --filter website build` fonctionne
- La suppression de `apps/website` ne casse pas le build des autres apps
- Les composants `@explainer/ui` sont utilisables

**Effort :** S

**Risques :** Aucun.

---

### M6 : Deploy & CI

**Goal :** Pouvoir deployer chaque app independamment sur les 4 targets.

**Deliverables :**

- GitHub Actions : 3 workflows (docs, blog, website) avec path filters
- Config Vercel par app (vercel.json ou adapter Astro)
- Config Cloudflare Pages par app
- Config GitHub Pages par app
- Dockerfile multi-stage (nginx) avec arg pour choisir l'app a build
- Documentation des options de deploiement

**Key Tasks :**

- Workflow GH Actions avec `paths` filter pour build conditionnel
- Tester `@astrojs/vercel`, `@astrojs/cloudflare`, adapter static pour GH Pages
- Dockerfile : `ARG APP_NAME` -> build uniquement l'app ciblee -> copie du dist dans nginx
- Documenter la config DNS sous-domaines pour chaque hebergeur

**Dependencies :** M2, M4

**Acceptance Criteria :**

- Push sur `apps/docs/` uniquement -> seul le workflow docs se declenche
- Chaque app build avec succes pour les 4 adapters
- `docker build --build-arg APP=docs .` produit une image fonctionnelle
- Documentation claire pour chaque target

**Effort :** M

**Risques :** Specificites de chaque adapter (redirects i18n sur Cloudflare, limitations GH Pages).

---

### M7 : Polish & Dogfood

**Goal :** Documenter Explainer v2 avec lui-meme et polir la DX.

**Deliverables :**

- Documentation complete d'Explainer v2 ecrite dans `apps/docs`
- Recherche integree (Pagefind)
- Theme clair/sombre
- README racine, CONTRIBUTING, LICENSE
- Template GitHub (issue templates, PR template)
- Nettoyage, audit Lighthouse, fix accessibilite

**Key Tasks :**

- Ecrire la doc : getting started, structure, configuration, deploiement, composants MDX
- Integrer Pagefind (post-build indexing)
- Implementer le toggle dark/light mode dans `@explainer/ui`
- Audit Lighthouse sur chaque app, corriger jusqu'a > 95
- Audit accessibilite (contraste, navigation clavier, aria)

**Dependencies :** M3, M4, M6

**Acceptance Criteria :**

- La doc d'Explainer est lisible et complete, construite avec le boilerplate lui-meme
- Recherche fonctionne sur la doc
- Theme clair/sombre fonctionne sur toutes les apps
- Lighthouse > 95 sur les 3 apps
- Un nouveau contributeur peut fork, configurer et deployer en suivant la doc

**Effort :** M

**Risques :** Le dogfooding revelera des frictions — prevoir du temps pour les corrections.
