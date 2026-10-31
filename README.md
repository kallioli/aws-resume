# aws-resume

A modern, data-driven resume / CV theme for cloud engineers, styled after the AWS
console. Edit one YAML file, push, and GitHub Pages publishes your resume.

**Live demo:** <https://kallioli.github.io/aws-resume/>

- One data file (`src/data/resume.yaml`), validated at build time with clear error messages
- Light and dark mode (follows the OS, with a toggle that remembers the choice)
- Phone-first responsive layout, semantic HTML, WCAG AA contrast, keyboard friendly
- Print stylesheet: "Print → Save as PDF" gives a clean two-page A4 resume
- SEO ready: meta tags, Open Graph, JSON-LD `Person` structured data
- No tracking by default, no client-side framework: about 1 KB of inline JS for the theme toggle and print button
- Interface in English or French (easy to add more languages)
- Built with [Astro](https://astro.build) and TypeScript; deploys with the official GitHub Pages actions

| Light | Dark |
| --- | --- |
| ![Desktop, light mode](docs/screenshots/desktop-light.png) | ![Desktop, dark mode](docs/screenshots/desktop-dark.png) |

| Mobile (light) | Mobile (dark) | Print / PDF (page 1) |
| --- | --- | --- |
| ![Mobile, light mode](docs/screenshots/mobile-light.png) | ![Mobile, dark mode](docs/screenshots/mobile-dark.png) | ![Printed first page](docs/screenshots/print-page-1.png) |

> **Coming from the 2017 Jekyll version?** It is kept unchanged on the
> [`legacy/jekyll`](https://github.com/kallioli/aws-resume/tree/legacy/jekyll) branch.
> Version 2 is a full rewrite: the data format changed, so existing forks should copy
> their content into the new `resume.yaml` rather than merge.

## Quick start

1. Click **Use this template** (or **Fork**) at the top of this page and name the repository,
   for example `aws-resume` or `<your-user>.github.io`.
2. In your new repository open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Edit [`src/data/resume.yaml`](src/data/resume.yaml) on GitHub (pencil icon) and commit.
4. The **Deploy to GitHub Pages** workflow builds and publishes the site.
   It appears at `https://<your-user>.github.io/<repository>/` after a minute.

The workflow detects the right URL (project site, user site or custom domain) by itself,
so no configuration is needed for GitHub Pages.

### Run it locally

Requires Node.js 22.23 or newer (the version used in CI is in `.nvmrc`).

```sh
npm ci
npm run dev       # http://localhost:4321/aws-resume/ with live reload
npm run check     # type-check the project and the templates
npm run build     # static site in dist/
npm run preview   # serve dist/ locally
```

## Data file reference

Everything shown on the page comes from `src/data/resume.yaml`. Only `basics.name` and
`basics.title` are required; **every other section can be removed** and simply disappears
from the page.

- Dates are strings `"YYYY"`, `"YYYY-MM"` or `"YYYY-MM-DD"` (keep the quotes).
- Images (`photo`, `badge`) are either an absolute `https://` URL or the name of a file you
  put in `public/` (for example `photo: me.jpg` for `public/me.jpg`).
- Unknown keys are rejected, so typos are caught. A mistake stops the build with its exact location:

  ```text
  src/data/resume.yaml does not match the expected format:
    - experiences.0.start: Expected a date as YYYY, YYYY-MM or YYYY-MM-DD (quote it in YAML, e.g. "2024-03")
    - experiences.0: Unrecognized key: "hightlights"
  ```

- Editors with the YAML language server (VS Code + the *YAML* extension, JetBrains IDEs)
  get autocompletion from `src/data/resume.schema.json`. Regenerate it with `npm run schema`
  if you change `src/lib/schema.ts`.

### `basics` (required)

| Key | Type | Notes |
| --- | --- | --- |
| `name` | string | **Required.** |
| `title` | string | **Required.** Job title under the name. |
| `summary` | string | Paragraphs separated by a blank line (use `|` in YAML). |
| `photo` | URL or file | Square image. Omit to show initials. |
| `photoAlt` | string | Alternative text. Defaults to the name. |
| `location` | string | e.g. `Lausanne, Switzerland` |
| `availability` | string | Status line shown with a green dot, e.g. `Open to new roles`. |
| `email`, `phone` | string | Rendered as `mailto:` / `tel:` links. |
| `website` | URL | |
| `profiles` | list | `network` (`github`, `gitlab`, `linkedin`, `x`, `mastodon`, `bluesky`, `credly`, `website`, `blog`, `other`), `url`, optional `label`. |

### `experiences`

| Key | Type | Notes |
| --- | --- | --- |
| `company`, `role`, `start` | string / date | **Required.** |
| `end` | date | Omit for the current position ("Present"). Duration is computed. |
| `companyUrl` | URL | |
| `location`, `type` | string | `type` e.g. `Full-time`, `Contract`. |
| `summary` | string | One-line description. |
| `highlights` | list of strings | Achievements, shown as bullets. |
| `tags` | list of strings | Technologies, shown as chips. |

### `certifications`

| Key | Type | Notes |
| --- | --- | --- |
| `name`, `issued` | string / date | **Required.** |
| `issuer` | string | Defaults to `Amazon Web Services`. |
| `expires` | date | Omit if it does not expire. Expired certifications are greyed out and listed last. |
| `credentialId` | string | |
| `url` | URL | Public verification page (Credly, issuer portal). |
| `badge` | URL or file | Badge image. Omit to use the generic placeholder. |

AWS badge artwork is a trademark of Amazon and is **not** included in this repository.
To show your official badge, open your badge on [Credly](https://www.credly.com), copy the
image address and paste it as `badge`. The example data does this with the public badge images.

AWS renamed *SysOps Administrator – Associate* to **CloudOps Engineer – Associate** with the
SOA-C03 exam (September 2025). Use the name printed on your own certificate.

### `projects`

`name` and `description` (required), `url`, `repo`, `tags`.

### `education`

`institution` and `degree` (required), `field`, `url`, `location`, `start`, `end`, `details`.

### `skills`

A list of groups, each with a `name` and `items`. An item is either a plain string or
`{ name, level }` where `level` is an integer from 1 to 5 (shown as a meter).

```yaml
skills:
  - name: Infrastructure as code
    items:
      - { name: Terraform, level: 5 }
      - CloudFormation          # no meter
```

### `languages`

`name` (required), `fluency` (free text such as `Native` or `C1`), `level` (1–5).

### `interests`

A list of strings, or `{ name, url }` objects.

## Customisation

### Theme settings — `src/config.ts`

| Setting | Default | Description |
| --- | --- | --- |
| `lang` | `'en'` | Interface language and date format: `'en'` or `'fr'`. |
| `defaultTheme` | `'system'` | `'system'`, `'light'` or `'dark'` before the visitor uses the toggle. |
| `sections` | experiences, certifications, projects, education | Order of the main column. Remove an id to hide the section. |
| `sidebar` | skills, languages, interests | Order of the side column. |
| `pdf` | `null` | Path of a PDF in `public/` (e.g. `'resume.pdf'`) or a URL. Shows a **Download PDF** button. |
| `printButton` | `true` | Shows a **Print** button. |
| `description` | summary | Meta description for search engines. |
| `ogImage` | – | Social preview image (1200×630) in `public/` or a URL. |
| `analytics` | `null` | Optional analytics script, see below. |

### Colours, font and shape — `src/styles/global.css`

All colours are CSS custom properties at the top of the file: light values in `:root`,
dark values in the `prefers-color-scheme: dark` block and the `[data-theme='dark']` block
(keep those two identical). The defaults use the AWS palette — squid ink `#232F3E`,
orange `#FF9900` — and every text colour meets WCAG AA contrast in both modes.
`--radius` controls the card corners.

The font is [Inter](https://rsms.me/inter/) (SIL Open Font License), self-hosted through
`@fontsource-variable/inter`, so no request goes to a third-party font CDN. To use another
font, install its `@fontsource` package, change the import at the top of
`src/layouts/Base.astro` and update `--font-sans`.

### Interface labels and new languages — `src/i18n/ui.ts`

All the words the theme adds (section titles, "Present", "Verify", ...) are in this file.
To add a language, copy the `en` block under a new key (e.g. `de`), translate it, and set
`lang: 'de'` in `src/config.ts`. TypeScript flags any missing label.

### Sections and layout

Each section is a small component in `src/components/`. The page itself is
`src/pages/index.astro`; the HTML shell, top bar and meta tags are in `src/layouts/Base.astro`.

### Analytics (optional, off by default)

Nothing is tracked unless you enable it. To use a privacy-friendly, cookie-less service,
set `analytics` in `src/config.ts`; the theme adds a single deferred script tag:

```ts
// Plausible
analytics: { src: 'https://plausible.io/js/script.js', attributes: { 'data-domain': 'cv.example.com' } },
// Umami
analytics: { src: 'https://cloud.umami.is/script.js', attributes: { 'data-website-id': '<your-id>' } },
// GoatCounter
analytics: { src: 'https://gc.zgo.at/count.js', attributes: { 'data-goatcounter': 'https://<code>.goatcounter.com/count' } },
```

### PDF version

Open the site and use **Print** (or Ctrl/Cmd + P), choose **Save as PDF**, and enable
*Background graphics* for the badge colours. The print stylesheet hides the toolbar,
switches to a light, compact two-column layout and avoids splitting entries across pages.
To offer a ready-made file instead, put it in `public/` and set `pdf` in `src/config.ts`.

## Deployment

### GitHub Pages (recommended)

`.github/workflows/deploy.yml` runs on every push to `master`/`main`: it installs the
dependencies, builds with the URL reported by `actions/configure-pages`, and publishes with
`actions/upload-pages-artifact` + `actions/deploy-pages`. The only manual step is
**Settings → Pages → Source: GitHub Actions**. The workflow does not change that setting.

`.github/workflows/ci.yml` type-checks and builds every pull request. Dependabot opens
weekly update PRs for npm packages and GitHub Actions (`.github/dependabot.yml`).

### Custom domain

Add the domain in **Settings → Pages → Custom domain**. The deploy workflow then builds
for the domain root automatically. For a build outside GitHub Actions, set the URL yourself:

```sh
SITE=https://cv.example.com BASE_PATH=/ npm run build
```

The defaults (used when these variables are not set) are at the top of `astro.config.mjs`.

### Other hosts

`npm run build` produces a fully static site in `dist/` that any static host
(Netlify, Cloudflare Pages, S3 + CloudFront, ...) can serve. Set `SITE` and `BASE_PATH`
as above.

## Project structure

```text
src/
  data/resume.yaml          your content (the only file most people edit)
  data/resume.schema.json   JSON Schema for editor autocompletion (generated)
  config.ts                 theme settings (language, sections, PDF, analytics)
  i18n/ui.ts                interface labels (en, fr)
  lib/schema.ts             zod schema of the data file
  lib/resume.ts             loads and validates the data file
  components/               one component per section
  layouts/Base.astro        HTML shell, meta tags, top bar, theme toggle
  pages/index.astro         the resume page
  styles/global.css         design tokens, layout, dark mode, print
public/                     favicon, example avatar, placeholder badge, your files
```

## Credits

- Original layout: [online-cv](https://github.com/webjeda/online-cv) Jekyll theme by
  [webjeda](https://github.com/webjeda) (MIT). The 2017 version of this project was derived from it.
- Icons: [Lucide](https://lucide.dev) (ISC) and [Simple Icons](https://simpleicons.org) (CC0).
- Font: [Inter](https://rsms.me/inter/) by Rasmus Andersson (SIL Open Font License 1.1).
- AWS, the AWS logo and the AWS certification badges are trademarks of Amazon.com, Inc.
  or its affiliates. This project is not affiliated with or endorsed by Amazon Web Services.

## Licence

[MIT](LICENSE) — Copyright (c) 2016 webjeda, Copyright (c) 2017-2026 Kevin Allioli.
