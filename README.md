# Shree Balaji Enterprises — Real Estate Web Platform

Official website and digital property platform for **Shree Balaji Enterprises**, a premier RERA-registered real estate agency in Ambernath-West, Maharashtra (MahaRERA Reg. Certificate: **A51700023633**).

The platform serves buyers, sellers, tenants, and investors across Ambernath, Badlapur, Ulhasnagar, Kalyan, Dombivli, Thane, Navi Mumbai, and Mumbai.

---

## Technology Stack

The codebase is built on the modern React and Next.js ecosystem:

- **Framework**: [Next.js 16.1.6](https://nextjs.org/) (App Router, Turbopack, React Server Components)
- **Runtime / UI Library**: [React 19.2.4](https://react.dev/) & React DOM 19.2.4
- **Styling**: [Tailwind CSS 4.2.0](https://tailwindcss.com/) with OKLCH theme variables and CSS modules
- **Animations**: [Motion 14.6.0](https://motion.dev/) (Motion Primitives, spring transitions, interactive hover cards)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) unstyled primitives & [Lucide React](https://lucide.dev/) icons
- **Form & Validation**: React Hook Form, Zod schema validation
- **Type Safety**: [TypeScript 5.7.3](https://www.typescriptlang.org/) in strict mode
- **Analytics & Deployment**: [@vercel/analytics](https://vercel.com/analytics), deployed on Vercel

---

## Key Features

1. **Property Discovery & Search**
   - Residential (1 BHK, 2 BHK, 3 BHK, Villas, Penthouses)
   - Commercial (Offices, Retail Showrooms, Industrial Sheds, Godowns)
   - Filter by location, price, property type, and configuration
   - Detailed property pages with verified RERA certificates, image galleries, floor plans, and amenities

2. **Sell & Rent Portals**
   - Valuation request and listing submission workflows
   - Step-by-step property intake forms with direct lead capture

3. **Home Loan Facilitation**
   - Interactive EMI and loan eligibility calculator
   - Direct integration with premier lending partners (SBI, HDFC, ICICI, Axis Bank, LIC HFL, PNB Housing)

4. **Streamlined Contact & Lead Management**
   - Ultra-direct, zero-friction Contact page
   - One-tap WhatsApp inquiry initiation (`wa.me/917767805544`)
   - Clickable `tel:` and `mailto:` communication channels

5. **Internal Admin Portal (`/admin`)**
   - Pin-protected administration dashboard (`/admin/login`)
   - Property inventory management, status toggles (Available / Under Offer / Sold)
   - Inquiry tracking and lead management

6. **Motion & Visual Design**
   - Curated motion primitives (`InView`, `AnimatedGroup`, `ScrollProgress`)
   - Fluid responsive layouts across mobile, tablet, and desktop
   - Official brand logo integration across all touchpoints

---

## Repository Structure

```
SBE/
├── app/                        # Next.js App Router routes & layouts
│   ├── about/                  # Company history, founder dossier & milestones
│   ├── admin/                  # Protected admin portal & authentication
│   ├── agents/                 # Advisory team directory & profile pages
│   ├── api/imagekit/upload/    # ImageKit upload endpoint for admin media
│   ├── buy/                    # Residential and commercial acquisition listings
│   ├── contact/                # Direct contact page & inquiry form
│   ├── home-loans/             # Mortgage calculator & lending partner directory
│   ├── locations/              # Micro-market neighbourhood guides
│   ├── privacy/                # Privacy policy documentation
│   ├── rent/                   # Residential & commercial leasing portal
│   ├── research-paper/         # Market intelligence & real estate insights
│   ├── sell/                   # Property disposition & valuation intake
│   ├── sign-in/                # Customer callback request
│   ├── sign-up/                # Client registration & requirement dossier
│   ├── terms/                  # Terms & conditions documentation
│   ├── globals.css             # Tailwind v4 theme variables & keyframe animations
│   ├── layout.tsx              # Root HTML structure, fonts, metadata & analytics
│   ├── page.tsx                # Homepage with hero, featured listings & reviews
│   ├── robots.ts               # Automated search crawler directives
│   └── sitemap.ts              # Dynamic search engine sitemap
├── components/                 # Reusable UI & domain components
│   ├── admin/                  # Admin sidebar, table widgets & property forms
│   ├── core/                   # Motion primitives (InView, AnimatedGroup, ScrollProgress)
│   ├── ui/                     # Radix UI design tokens (Button, Dialog, Select, etc.)
│   ├── brand-logo.tsx          # Centralized official brand logo component
│   ├── header.tsx              # Sticky desktop & mobile navigation bar
│   ├── footer.tsx              # Comprehensive footer with legal & RERA info
│   ├── explore-types.tsx       # Property category showcase
│   ├── featured-listings.tsx   # Verified property showcase with interactive cards
│   ├── hero.tsx                # High-impact hero section with property search
│   └── whatsapp-button.tsx     # Floating WhatsApp quick-action button
├── lib/                        # Business logic, stores & utilities
│   ├── admin-auth.ts           # Admin session management & authentication
│   ├── admin-store.ts          # LocalStorage persistent store for properties & leads
│   ├── data.ts                 # Authoritative property listings & agent records
│   └── utils.ts                # Classname merging (cn) utility
├── public/                     # Static production assets
│   ├── images/                 # Optimized property photographs, bank logos & logo
│   │   └── logo.png            # Authoritative official brand logo (820x528)
│   ├── favicon.ico             # 48x48 Multi-resolution browser favicon
│   ├── apple-icon.png          # 180x180 iOS touch icon
│   └── icon-dark-32x32.png     # 32x32 PNG favicon
├── .agent/                     # Agent execution rules & performance standards
├── .design/                    # Design tokens, color palette, typography & motion spec
├── docs/                       # Architecture, maintenance & deployment guides
├── .env.example                # Safe environment variable template
├── components.json             # Shadcn component configuration
├── package.json                # Project dependencies, scripts & metadata
└── tsconfig.json               # TypeScript compiler configuration
```

---

## Prerequisites

- **Node.js**: `v18.18.0` or higher (Recommended: `v20.x` or `v22.x LTS`)
- **Package Manager**: `npm` (v9+) or `pnpm` (v8+)

---

## Installation & Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/srinivasjangiti/sbe-2.0.git
   cd sbe-2.0
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy the example environment configuration:
   ```bash
   cp .env.example .env.local
   ```
   *(Optional: Add `IMAGEKIT_PRIVATE_KEY` if testing property image uploads in `/admin`)*

4. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts Next.js development server with Turbopack fast refresh |
| `npm run build` | Compiles an optimized production build across all static & dynamic routes |
| `npm run start` | Serves the compiled production build locally |
| `npm run lint` | Runs ESLint analysis across the TypeScript and React codebase |

---

## Testing & Production Build Verification

Always verify that the production build passes cleanly before pushing changes:

```bash
npm run build
```

Expected output:
```
▲ Next.js 16.1.6 (Turbopack)
  Creating an optimized production build ...
✓ Compiled successfully
✓ Generating static pages using 15 workers (33/33)
  Finalizing page optimization ...
```

---

## Deployment Instructions

### Vercel (Recommended)
The project is optimized for zero-configuration deployment on **Vercel**:
1. Connect the GitHub repository `srinivasjangiti/sbe-2.0` in the Vercel Dashboard.
2. Framework Preset: **Next.js**.
3. Build Command: `next build`.
4. Output Directory: `.next`.
5. Environment Variables: If photo uploads are enabled in the admin panel, add `IMAGEKIT_PRIVATE_KEY` in Project Settings &rarr; Environment Variables.
6. Deploy.

### Self-Hosted Node.js Server
1. Build the application: `npm run build`
2. Start the production server: `npm run start -p 3000`
3. Use a process manager like PM2: `pm2 start npm --name "sbe-web" -- start`

---

## Official Brand Identity

- **Authoritative Logo**: Located at [`public/images/logo.png`](file:///c:/Programming/Personal%20Coding/Projects/final/SBE/public/images/logo.png).
- **Component**: Always use `<BrandLogo className="..." />` from [`components/brand-logo.tsx`](file:///c:/Programming/Personal%20Coding/Projects/final/SBE/components/brand-logo.tsx).
- **Rule**: Never reference absolute Windows file paths in runtime code. Do not stretch or distort the logo aspect ratio (~1.55:1).

---

## License & Compliance

&copy; 2026 Shree Balaji Enterprises. All rights reserved.  
**MahaRERA Registration Number**: `A51700023633`  
**Registered Address**: Shop No. 6, Vallabh Building, Avdhoot Residency, Opp. Shiv Mandir Road, Ambernath-West, District Thane, Maharashtra – 421505.
