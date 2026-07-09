# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Angular 19 (standalone components, no NgModules) marketing/content site for "TV Tecno ITD" — a student TV station for Instituto Tecnológico de Durango. Spanish-language UI. Pages: inicio (home), programación (schedule), en vivo (live), videoteca (video library), acerca (about).

## Commands

```bash
npm start                # ng serve — dev server at http://localhost:4200/
ng build                 # production build to dist/tv-tecno-itd
ng build --configuration development
ng test                  # Karma/Jasmine unit tests (watches by default)
ng generate component features/<feature>/components/<name>   # scaffold a component in the right place
```

Run a single spec file: `ng test --include='**/navbar.component.spec.ts'`

There is no e2e framework, no linter config, and no environments/ folder configured in this repo.

## Architecture

**Feature-based structure**, not layer-based. Everything lives under `src/app/`:

- `features/<feature>/pages/<page>/` — route-level components (e.g. `features/home/pages/index/`)
- `features/<feature>/components/<name>/` — components used only within that feature (e.g. `features/programacion/components/selector-dias/`)
- `features/<feature>/models/` — TypeScript interfaces/types for that feature (e.g. `programacion/models/programa.model.ts`)
- `shared/components/` — cross-feature components (`navbar`, `footer`)
- `app.routes.ts` — all routes use `loadComponent()` for lazy loading, one per feature page
- `app.config.ts` — application-level providers (router with in-memory scroll restoration)

Every component is standalone (`imports: [...]` directly on the `@Component` decorator, no NgModules anywhere). Each component has its own `.ts`, `.html`, `.css` (and usually `.spec.ts`) as siblings.

**No backend/API layer.** There are no services, no HttpClient usage, and no environment files. All content (schedule data, news, etc.) is hardcoded as static TypeScript constants directly inside the page/component files that use it (see `features/programacion/pages/programacion/programacion.component.ts` for the pattern: a `Record<number, T[]>` module-level constant plus a component that derives view state via getters). When adding data-driven features, follow this same static-data-in-component pattern unless the user asks for a real backend integration.

**Styling**: plain CSS per component (no Tailwind, no CSS framework). Global design tokens (colors, fonts) are defined as CSS custom properties in `src/styles.css` under `:root` (e.g. `--tv-wine`, `--tv-pink`, `--tv-live`, `--font-titulo`). Reuse these variables in component CSS rather than hardcoding colors/fonts. Primary font is Raleway, loaded via Google Fonts `@import` in `styles.css`.

**TypeScript config** is strict: `strict`, `noImplicitOverride`, `noPropertyAccessFromIndexSignature`, `noImplicitReturns`, `noFallthroughCasesInSwitch` are all on, plus Angular's `strictTemplates`, `strictInjectionParameters`, `strictInputAccessModifiers`. Write template-safe, fully-typed code accordingly.

**Formatting**: 2-space indent, single quotes in `.ts` files (enforced by `.editorconfig`).
