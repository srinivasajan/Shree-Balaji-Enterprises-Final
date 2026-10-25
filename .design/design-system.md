# Shree Balaji Enterprises — Design System Specification

This document outlines the visual language, design tokens, component patterns, and motion standards derived directly from the production codebase.

---

## 1. Brand Identity & Logo Specification

- **Authoritative Asset**: [`public/images/logo.png`](file:///c:/Programming/Personal%20Coding/Projects/final/SBE/public/images/logo.png) (and mirrored at `public/logo.png`)
- **Native Dimensions**: 820 &times; 528 pixels (aspect ratio: **1.5529 : 1**)
- **Color Depth**: 32-bit RGBA with full alpha transparency
- **Visual Elements**: Gold architectural temple/spire emblem with royal blue geometric backing and Shree Balaji Enterprises typography
- **Component**: Always use [`components/brand-logo.tsx`](file:///c:/Programming/Personal%20Coding/Projects/final/SBE/components/brand-logo.tsx):
  ```tsx
  import { BrandLogo } from "@/components/brand-logo"

  // Standard navbar / footer size
  <BrandLogo className="h-8 w-8" />

  // Larger display (auth / admin / hero)
  <BrandLogo className="h-12 w-16" priority />
  ```
- **Rules**:
  1. Never stretch, distort, or modify the logo proportions.
  2. Always maintain `object-contain` on the underlying `next/image` element.
  3. Never reference absolute Windows filesystem paths in code or assets.

---

## 2. Color Palette (OKLCH Tokens)

All colors are defined as CSS variables in [`app/globals.css`](file:///c:/Programming/Personal%20Coding/Projects/final/SBE/app/globals.css) using the high-gamut OKLCH color space:

| Token | OKLCH Value | Hex / Visual Equivalent | Role |
| :--- | :--- | :--- | :--- |
| `--primary` | `oklch(0.51 0.19 260)` | `#006AFF` | Signature SBE Royal Blue (primary actions, brand accents) |
| `--primary-foreground` | `oklch(1 0 0)` | `#FFFFFF` | Text on primary buttons |
| `--background` | `oklch(0.985 0 0)` | `#FAFAFA` | Page body background |
| `--foreground` | `oklch(0.15 0.005 260)` | `#1E2433` | Primary body and heading text |
| `--card` | `oklch(1 0 0)` | `#FFFFFF` | Card, container, and dialog background |
| `--card-foreground` | `oklch(0.15 0.005 260)` | `#1E2433` | Text inside cards |
| `--muted` | `oklch(0.96 0.003 260)` | `#F2F4F7` | Subtle input and tag backgrounds |
| `--muted-foreground` | `oklch(0.5 0.01 260)` | `#64748B` | Secondary text, captions, and placeholders |
| `--border` | `oklch(0.91 0.005 260)` | `#E2E8F0` | Subtle container and card borders |
| `--accent-gold` | Tailwind `text-amber-500` | `#F59E0B` | "Shree" brand text, star ratings, premium badges |
| `--whatsapp-green` | Tailwind `bg-emerald-600` | `#059669` | WhatsApp buttons, verified checkmarks |

---

## 3. Typography

- **Font Family**: [Inter](https://fonts.google.com/specimen/Inter) (`--font-inter`) loaded via Next.js Google Fonts with Latin subset.
- **Hierarchy**:

| Style | Classes | Usage |
| :--- | :--- | :--- |
| **Hero Title** | `text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground` | Hero headings |
| **Page Title** | `text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground` | Contact, Buy, Rent, About page headers |
| **Section Header**| `text-2xl sm:text-3xl font-bold tracking-tight text-foreground` | Major section titles |
| **Card Heading** | `text-lg sm:text-xl font-bold text-foreground` | Property card titles, widget headers |
| **Body Text** | `text-sm sm:text-base text-muted-foreground leading-relaxed` | General descriptive copy |
| **Meta / Badge** | `text-xs font-semibold uppercase tracking-wider text-muted-foreground` | Category pills, timestamps, RERA labels |

---

## 4. Spacing & Container Conventions

- **Page Container**:
  ```tsx
  <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
  ```
- **Section Padding**:
  - Compact sections: `py-10 sm:py-14`
  - Standard sections: `py-16 sm:py-20`
- **Border Radius**:
  - Cards & Modals: `rounded-2xl` (`1rem`)
  - Buttons & Form Inputs: `rounded-xl` (`0.75rem`)
  - Badges & Pills: `rounded-lg` or `rounded-full`

---

## 5. UI Component Patterns

### Primary Button
```tsx
<button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all shadow-xs disabled:opacity-50 cursor-pointer">
  Submit Enquiry
</button>
```

### Outline / Secondary Button
```tsx
<button className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-border rounded-xl text-sm font-semibold text-foreground hover:bg-muted transition-colors cursor-pointer">
  Directions
</button>
```

### WhatsApp Action Button
```tsx
<a
  href="https://wa.me/917767805544?text=..."
  target="_blank"
  rel="noopener noreferrer"
  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors shadow-xs"
>
  <MessageSquare className="h-4 w-4" />
  <span>Chat on WhatsApp</span>
</a>
```

### Form Input Field
```tsx
<input
  type="text"
  className="w-full px-3.5 py-2.5 border border-border rounded-xl bg-background text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
/>
```

### Card Container
```tsx
<div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
  {/* Card Content */}
</div>
```

---

## 6. Motion & Animation Standards

1. **Scroll Entrance (`InView`)**:
   Used for section headers, features, and cards when scrolling into the viewport:
   ```tsx
   <InView
     variants={{
       hidden: { opacity: 0, y: 24 },
       visible: { opacity: 1, y: 0 }
     }}
     transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
   >
     {children}
   </InView>
   ```

2. **Staggered Groups (`AnimatedGroup`)**:
   Used for grids of property listings, testimonials, and explore categories:
   ```tsx
   <AnimatedGroup preset="fade-in-up" stagger={0.08}>
     {items.map(item => <Card key={item.id} />)}
   </AnimatedGroup>
   ```

3. **Hover Micro-Interactions**:
   Card elevations use subtle vertical translation:
   ```css
   transition: transform 250ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 250ms ease;
   ```
