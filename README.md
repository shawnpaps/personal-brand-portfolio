# Shawn Paps Media Monorepo

This workspace houses the marketing website and headless CMS for Shawn Paps Media.

- **apps/cms** – Payload CMS (SQLite by default) providing structured content for services, pages, media, and contact submissions.
- **apps/web** – Astro.js frontend with Tailwind CSS delivering the marketing site experience.

## Getting started

1. Install dependencies for the entire monorepo:

```bash
npm install
```

2. Copy the environment template for Payload and update secrets as needed:

```bash
cp apps/cms/.env.example apps/cms/.env
```

3. Run CMS and web dev servers in parallel:

```bash
npm run dev
```

- Payload admin: <http://localhost:3001/admin>
- Marketing site: <http://localhost:4321>

## Project scripts

| Command           | Description                                          |
| ----------------- | ---------------------------------------------------- |
| `npm run dev`     | Starts Payload (`3001`) and Astro (`4321`) together. |
| `npm run dev:cms` | Runs only the Payload CMS.                           |
| `npm run dev:web` | Runs only the Astro frontend.                        |
| `npm run build`   | Builds both workspaces.                              |
| `npm run lint`    | Type-checks both workspaces.                         |
| `npm run format`  | Checks code formatting with Prettier.                |

## Content model overview

### Collections

- **Users** – Authentication for Payload admin.
- **Media** – Upload collection with responsive image sizes.
- **Service Categories** – High-level groupings such as Marketing or Visual Media.
- **Services** – Individual offerings linked to categories for subpages.
- **Pages** – Flexible marketing pages with hero content and modular sections.
- **Contact Submissions** – Stores inquiries from the site contact form.

### Globals

- **Site Settings** – Primary navigation, brand metadata, and contact info.

## Frontend architecture

- Dark theme with vivid accent palette, powered by Tailwind and custom gradients.
- Shared hero, section, and service grid components for marketing pages.
- Contact form posts to an Astro API route that proxies submissions into Payload.
- Fallback content ensures the site renders even before CMS data is published.

## Next steps

- Customize copy, imagery, and accent colors directly in Payload.
- Add authentication for preview or gated pages if needed.
- Hook up analytics or marketing integrations within `apps/web` as the brand evolves.
