# astrolus

A page template built with astro and tailwindcss using tailus blocks.

![Tailus astro based theme](./public/astrolus-light.png)
![Tailus astro based dark theme](./public/astrolus-dark.png)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```
/
├── public/
# Cybercrime Reporting — Astro + Express Starter

This repository contains:

- An Express/EJS backend (API, auth, report handling) in `app.js` and `routes/`.
- An Astro frontend template (under `src/`) adapted from the Astrolus theme.

Goal: run the Astro frontend during development while keeping the Express backend as the API and server for authentication and report processing.

Quick start

1. Copy `.env.example` -> `.env` and configure your DB credentials.
2. Install dependencies:

```powershell
npm install
```

3. Build Tailwind CSS (optional, template CSS already provided):

```powershell
npm run build:css
```

4. Start both servers in development:

```powershell
npm run dev
```

This runs `nodemon app.js` (Express) and `astro dev` concurrently.

Production notes

- Build the Astro site with `npm run build`. The build output goes to `dist/`.
- When `dist/` exists, the Express server is configured to serve the built Astro site as static files.

Next steps / migration checklist

- Review `package.astro-theme.json` and `package.json` to fine-tune dependencies before deploying.
- If you want Tailwind utilities fully enabled for the Astro components, we can finish the Tailwind/PostCSS integration (I started the config files but Tailwind v4 changes require adding `@tailwindcss/postcss` or adjusting the setup).
- Convert any remaining server-rendered EJS admin pages to Astro pages if you want a fully static frontend.

If you'd like, I can complete the Tailwind integration so the Astro theme renders exactly like the template — say "Finish Tailwind" and I'll complete that next.
