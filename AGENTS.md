# AGENTS.md — Instructions for Autonomous & Coding Agents

This document contains operational guidelines, architectural invariants, and safety protocols for AI coding assistants and developers maintaining the **Shree Balaji Enterprises (SBE)** codebase.

---

## 1. Core Architecture & Important Directories

The project is a Next.js 16 (Turbopack) App Router application written in TypeScript with Tailwind CSS 4 and Motion 14.

| Path | Purpose | Stability & Invariants |
| :--- | :--- | :--- |
| [`app/`](file:///c:/Programming/Personal%20Coding/Projects/final/SBE/app) | Next.js App Router pages and layouts | Contains 33 static and dynamic routes. All routes must prerender cleanly. |
| [`components/`](file:///c:/Programming/Personal%20Coding/Projects/final/SBE/components) | UI components and application widgets | Modular components. Use existing components before creating new ones. |
| [`components/core/`](file:///c:/Programming/Personal%20Coding/Projects/final/SBE/components/core) | Motion Primitives (`in-view.tsx`, `animated-group.tsx`, `scroll-progress.tsx`) | **Do not modify or delete**. These power the scroll and stagger animations. |
| [`components/brand-logo.tsx`](file:///c:/Programming/Personal%20Coding/Projects/final/SBE/components/brand-logo.tsx) | Centralized official brand logo | Uses `/images/logo.png`. Always use this component for the logo. |
| [`lib/data.ts`](file:///c:/Programming/Personal%20Coding/Projects/final/SBE/lib/data.ts) | Property listings, agent data, testimonials | Static dataset. Maintain schema integrity if adding/editing properties. |
| [`lib/admin-store.ts`](file:///c:/Programming/Personal%20Coding/Projects/final/SBE/lib/admin-store.ts) | LocalStorage client store for inquiries & properties | Preserves inquiry capture (`saveInquiry`). Do not alter data structure. |
| [`lib/admin-auth.ts`](file:///c:/Programming/Personal%20Coding/Projects/final/SBE/lib/admin-auth.ts) | Admin authentication & session persistence | Session storage auth helper for `/admin`. |
| [`public/images/logo.png`](file:///c:/Programming/Personal%20Coding/Projects/final/SBE/public/images/logo.png) | Authoritative official brand logo asset | Never delete or replace with a low-res or distorted image. |

---

## 2. Critical Files — Do Not Rewrite Casually

1. **[`app/globals.css`](file:///c:/Programming/Personal%20Coding/Projects/final/SBE/app/globals.css)**: Contains OKLCH color token definitions, dark mode variants, and custom keyframes for trending card transitions. Do not delete or overwrite with generic CSS.
2. **[`components/core/in-view.tsx`](file:///c:/Programming/Personal%20Coding/Projects/final/SBE/components/core/in-view.tsx)**: Motion Primitives intersection observer wrapper.
3. **[`components/core/animated-group.tsx`](file:///c:/Programming/Personal%20Coding/Projects/final/SBE/components/core/animated-group.tsx)**: Staggered animation wrapper for property cards and lists.
4. **[`components/core/scroll-progress.tsx`](file:///c:/Programming/Personal%20Coding/Projects/final/SBE/components/core/scroll-progress.tsx)**: Sticky scroll bar indicator.
5. **[`lib/admin-store.ts`](file:///c:/Programming/Personal%20Coding/Projects/final/SBE/lib/admin-store.ts)**: Inquiry persistence used across Contact, Sell, and Sign-in pages.
6. **[`app/contact/page.tsx`](file:///c:/Programming/Personal%20Coding/Projects/final/SBE/app/contact/page.tsx)**: Keep direct, minimal, and fully functional.

---

## 3. Functional Invariants

Every change made to this repository must respect the following invariants:

1. **Zero Functionality Regressions**:
   - Navigation links (`/buy`, `/rent`, `/sell`, `/home-loans`, `/agents`, `/about`, `/contact`) must always work.
   - Property filters and sorting must remain functional.
   - The inquiry form and WhatsApp integration (`wa.me`) must capture leads and redirect without errors.
   - The floating WhatsApp button must remain responsive and accessible.
2. **Brand Consistency**:
   - Never reference absolute Windows paths (`C:\...`) in code or assets. Always use `/images/logo.png` or `<BrandLogo />`.
   - Never distort the official logo (aspect ratio: 820x528, ~1.55:1).
   - Maintain the official primary blue (`#006AFF` / `oklch(0.51 0.19 260)`) and amber accent.
3. **Performance & Motion Preservation**:
   - Do not install heavy dependencies or CSS frameworks.
   - Do not remove or degrade existing Motion Primitives animations.
   - Ensure `next/image` is used for external and local images with appropriate sizing and priority.
4. **Build Verification**:
   - `npm run build` must complete with exit code 0 and zero static prerendering failures across all 33 routes.

---

## 4. Development & Build Commands

Always use the actual npm commands configured in `package.json`:

```bash
# Start local development server with Turbopack
npm run dev

# Run production build (verifies all 33 routes)
npm run build

# Run local production server
npm run start

# Run ESLint validation
npm run lint
```

---

## 5. Coding & Component Conventions

1. **Component Pattern**:
   - Use `"use client"` only for components requiring hooks (`useState`, `useEffect`, `useSearchParams`, `usePathname`) or interactive animations.
   - Wrap pages or components using `useSearchParams()` in a `<Suspense>` boundary to allow static prerendering.
2. **Styling with Tailwind CSS v4**:
   - Use utility classes with design tokens (`text-foreground`, `bg-card`, `border-border`, `text-primary`).
   - Use `cn()` from `@/lib/utils` for conditional class joining.
3. **Icons**:
   - Use [Lucide React](https://lucide.dev/) icons (`import { Phone, Mail, MapPin } from "lucide-react"`).
4. **Clickable Links**:
   - When generating documentation or assistant responses, always use Markdown links with `file:///` URLs with forward slashes for all files and symbols.

---

## 6. Safe Modification Workflow

When assigned a task:
1. **Audit First**: Inspect the target component and surrounding consumers before editing.
2. **Make Small, Focused Edits**: Prefer surgical replacements over file rewrites.
3. **Verify Locally**:
   - Run `npm run build` to confirm compilation.
   - Check the browser or use subagents to visually verify responsiveness and console logs.
4. **Commit with Clear Rationale**: Mention specific bug fixes or improvements without generic commit messages.
