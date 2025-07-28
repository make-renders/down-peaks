# Copilot Instructions for AI Agents

## Project Overview

- This is a Next.js 14+ app using TypeScript, TailwindCSS, and Radix UI components.
- The main app structure is under `src/app/`, with reusable UI and logic in `src/components/`, `src/hooks/`, and `src/lib/`.
- The app is designed for Spanish-speaking users (see `lang="es"` in `layout.tsx`).
- Theming is handled via `ThemeProvider` and `next-themes`.
- Google Analytics is integrated using `@next/third-parties/google`.

## Key Workflows

- **Development:**
  - Start dev server: `npm run dev`
  - Build: `npm run build`
  - Lint: `npm run lint`
  - Production: `npm run start`
- **Deployment:**
  - Deploys are optimized for Vercel. See README for Vercel links and docs.

## Architectural Patterns

- **App Routing:** Uses Next.js App Router (`src/app/(pages)/`).
- **Component Organization:**
  - UI components: `src/components/ui/`
  - Navigation: `src/components/nav-menu/`
  - Forms: `src/components/contact-form.tsx`, hooks in `src/hooks/`
  - State management: `src/stores/` (likely using Zustand or similar)
- **Styling:**
  - TailwindCSS config in `tailwind.config.ts`
  - Custom utility function `cn` for classnames in `src/lib/utils.ts`
- **Assets:**
  - Images and videos in `public/`

## Conventions & Patterns

- Use `cn` from `src/lib/utils.ts` for merging class names.
- Prefer Radix UI primitives for interactive components.
- All pages/components should support dark theme by default.
- Spanish language and locale are default; ensure new content matches.
- Use environment variables for secrets and analytics IDs (see `.env*`).

## Integration Points

- Third-party libraries: Radix UI, Embla Carousel, Framer Motion, Lucide React.
- Analytics: Google Analytics via `@next/third-parties/google`.
- Theming: `next-themes` and custom `ThemeProvider`.

## Examples

- See `src/app/layout.tsx` for app shell, theming, analytics, and navigation setup.
- See `src/components/ui/input.tsx` for UI component conventions.
- See `package.json` for available scripts and dependencies.

## Special Notes

- Do not modify files in `public/` except for adding/removing assets.
- Follow existing file/folder naming conventions (kebab-case for folders, camelCase for files).
- Always check for usage of custom hooks and stores before introducing new state logic.

---

For questions or unclear patterns, ask for clarification or review related files in `src/components/`, `src/app/`, and `src/stores/`.
