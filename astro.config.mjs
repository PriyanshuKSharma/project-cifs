import { defineConfig } from 'astro/config';

// Use PostCSS/Tailwind via the project's PostCSS config.
// The template previously referenced '@tailwindcss/vite' which isn't installed.
// Astro will pick up Tailwind through PostCSS when you build the CSS separately
// (we provide npm scripts `build:css` / `watch:css`). Keep the config minimal.
export default defineConfig({
  output: 'static',
});