import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BookOpen, Download, FileText, Globe, Shield, Sparkles } from "lucide-react"

const siteUrl = "https://www.shreebalajienterprises.live"

export const metadata: Metadata = {
  title: "Research Paper",
  description:
    "Read the published research paper on Shree Balaji Enterprises, MMR decentralization, and the site's PropTech architecture.",
  openGraph: {
    title: "Research Paper | Shree Balaji Enterprises",
    description:
      "A published research paper covering the MMR corridor, Shree Balaji Enterprises, and the platform architecture behind the site.",
    url: `${siteUrl}/research-paper`,
    type: "article",
  },
}

const highlights = [
  {
    title: "MMR growth corridor",
    body:
      "The paper frames Ambernath, Badlapur, Kalyan, and Ulhasnagar as the region's central suburban growth engine, driven by infrastructure, industrial activity, and residential demand.",
  },
  {
    title: "Local market expertise",
    body:
      "It positions Shree Balaji Enterprises as a hyper-local advisory firm with deep regional knowledge across residential, commercial, industrial, and financial transactions.",
  },
  {
    title: "PropTech execution",
    body:
      "The manuscript also documents the site's Next.js SSR architecture, structured data strategy, and client-side UX patterns used to support discovery and conversion.",
  },
]

const sections = [
  {
    title: "Abstract and Introduction",
    body:
      "The paper introduces the MMR's decentralization away from the island city and argues that the eastern suburban corridor now needs a market operator with strong local reach, legal discipline, and operational clarity.",
  },
  {
    title: "Macro-Economic Analysis",
    body:
      "It examines Ambernath, Badlapur, Kalyan, and Ulhasnagar as distinct yet connected micro-markets, each shaped by industrial clusters, premium housing demand, trade activity, and major infrastructure projects.",
  },
  {
    title: "Corporate Architecture",
    body:
      "This section describes the firm's RERA-backed trust model, its end-to-end real estate services, and the role of Anju Jangiti in building a referral-driven business over 15 years.",
  },
  {
    title: "Digital Transformation",
    body:
      "The site is presented as a modern, SEO-friendly Next.js platform with server-rendered property pages, JSON-LD schemas, and WhatsApp-first conversion paths.",
  },
  {
    title: "Impact and Conclusion",
    body:
      "The final sections argue that the firm is helping shape property ownership, wealth creation, and regional confidence across the Mumbai Metropolitan Region.",
  },
]

export default function ResearchPaperPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    name: "The Ultimate Hyper-Local Monolith",
    author: {
      "@type": "Organization",
      name: "Shree Balaji Enterprises",
    },
    url: `${siteUrl}/research-paper`,
    publisher: {
      "@type": "Organization",
      name: "Shree Balaji Enterprises",
    },
    about: ["MMR", "Real Estate", "PropTech", "Next.js"],
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-background via-background to-muted/30">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 right-[-8rem] h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute top-40 left-[-6rem] h-80 w-80 rounded-full bg-amber-400/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-[1440px] px-4 py-20 md:py-28">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-primary mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              Published Research
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-[1.02] tracking-tight text-foreground mb-5">
              The Research Paper on Shree Balaji Enterprises and the MMR Corridor
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
              A public-facing version of the manuscript that maps the eastern Mumbai Metropolitan
              Region corridor, documents the firm's operating model, and explains the site's
              digital architecture.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/research-paper.pdf"
                download="Shree_Balaji_Enterprises_Research_Paper.pdf"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 shadow-sm"
              >
                <Download className="h-4 w-4" /> Download PDF (310 KB)
              </a>
              <Link
                href="/buy"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 text-sm font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                Explore Properties <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 text-sm font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                Contact the Team <FileText className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-4">
          <div className="grid gap-4 md:grid-cols-3">
            {highlights.map((item) => (
              <article key={item.title} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <BookOpen className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-bold text-foreground mb-2">{item.title}</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 border-y border-border bg-muted/25">
        <div className="mx-auto max-w-[1440px] px-4">
          <div className="max-w-3xl mb-10">
            <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-primary mb-3">Abstract</p>
            <h2 className="text-3xl md:text-4xl font-black text-foreground mb-5">
              Why this paper exists
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              The manuscript presents Shree Balaji Enterprises as a hyper-local real estate
              advisory firm built for the Ambernath, Badlapur, Kalyan, and Ulhasnagar corridor.
              It combines market narrative, operational analysis, and site architecture into a
              single published document.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {sections.map((section) => (
              <article key={section.title} className="rounded-3xl border border-border bg-card p-6 md:p-8">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-foreground/70">
                  <Shield className="h-3.5 w-3.5 text-primary" />
                  Section
                </div>
                <h3 className="text-xl font-black text-foreground mb-3">{section.title}</h3>
                <p className="text-sm md:text-base leading-relaxed text-muted-foreground">{section.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-4">
          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr] items-start">
            <article className="rounded-3xl border border-border bg-card p-6 md:p-8">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-primary mb-4">
                <Globe className="h-3.5 w-3.5" />
                Publication Notes
              </div>
              <h2 className="text-3xl font-black text-foreground mb-4">What readers will find here</h2>
              <p className="text-sm md:text-base leading-relaxed text-muted-foreground">
                This page publishes the paper as a readable web article so it can be accessed
                directly from the site, indexed by search engines, and shared with clients or
                collaborators without needing a LaTeX viewer. You can also download the complete
                academic manuscript as an IEEE-formatted PDF.
              </p>
              <div className="mt-5">
                <a
                  href="/research-paper.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
                >
                  <Download className="h-4 w-4" /> Download Academic PDF (310 KB)
                </a>
              </div>
            </article>

            <aside className="rounded-3xl border border-border bg-foreground p-6 md:p-8 text-card">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-card/70 mb-3">Next Step</p>
              <h3 className="text-2xl font-black mb-3">Need the property listings too?</h3>
              <p className="text-sm leading-relaxed text-card/70 mb-6">
                Move from the paper into the live inventory and see the listings described by the
                research.
              </p>
              <Link
                href="/buy"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-card px-5 text-sm font-bold text-foreground transition-opacity hover:opacity-90"
              >
                View Listings <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}