import Link from "next/link"
import Image from "next/image"

const footerSections = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "Browse Properties", href: "/buy" },
      { label: "Sell Your Property", href: "/sell" },
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Home Loans", href: "/home-loans" },
      { label: "EMI Calculator", href: "/home-loans#calculator" },
      { label: "Areas We Serve", href: "/buy" },
      { label: "RERA Information", href: "/about" },
      { label: "Enquiry Form", href: "/contact" },
    ],
  },
  {
    title: "Locations",
    links: [
      { label: "Ambernath", href: "/buy?q=Ambernath" },
      { label: "Badlapur", href: "/buy?q=Badlapur" },
      { label: "Ulhasnagar", href: "/buy?q=Ulhasnagar" },
      { label: "Thane", href: "/buy?q=Thane" },
      { label: "Mumbai", href: "/buy?q=Mumbai" },
      { label: "Navi Mumbai", href: "/buy?q=Navi+Mumbai" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "📞 7767805544", href: "tel:7767805544" },
      { label: "📞 9168588575", href: "tel:9168588575" },
      { label: "✉️ Email Us", href: "mailto:shreebalajienterprisesamb@gmail.com" },
      { label: "💬 WhatsApp", href: "https://wa.me/917767805544" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-foreground text-card mt-auto">
      <div className="mx-auto max-w-[1280px] px-4 py-12 md:py-16">
        {/* Footer links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-bold mb-4">{section.title}</h3>
              <ul className="flex flex-col gap-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-card/70 hover:text-card transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-card/20 pt-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2" aria-label="Shree Balaji Enterprises">
              <Image
                src="https://raw.githubusercontent.com/srinivasajan/shreebalajienterprises/main/images/logo.png"
                alt="Shree Balaji Enterprises Logo"
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
              />
              <span className="text-base font-bold text-card leading-tight">
                Shree <span className="text-primary">Balaji</span> Enterprises
              </span>
            </Link>

            {/* Legal links */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-card/60">
              <Link href="#" className="hover:text-card transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-card transition-colors">Terms of Use</Link>
              <a href="mailto:shreebalajienterprisesamb@gmail.com" className="hover:text-card transition-colors">Contact Us</a>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-xs text-card/50 mt-6 leading-relaxed max-w-3xl">
            Shree Balaji Enterprises is a RERA registered real estate agency based in Ambernath, Maharashtra. We are committed to helping you buy, sell, and rent residential, commercial &amp; industrial properties across the Mumbai Metropolitan Region with complete transparency and legal compliance.
            RERA Reg No: A51700023633
          </p>
          <p className="text-xs text-card/40 mt-4">
            &copy; 2026 Shree Balaji Enterprises. All Rights Reserved. &bull; Shop No. 6, Vallabh Bldg, Avdhoot Residency, Ambernath-West, 421505
          </p>
          <div className="mt-6 border-t border-card/10 pt-5 flex flex-col items-center gap-1 text-center">
            <p className="text-[10px] uppercase tracking-[0.2em] text-card/30 font-medium">Designed &amp; Developed by</p>
            <p className="text-base font-bold text-card/80 tracking-wide">
              <a href="mailto:srinivasajangiti@gmail.com" className="hover:text-primary transition-colors">Srinivas Jangiti</a>
            </p>
            <div className="flex items-center gap-3 mt-1">
              <a href="tel:+918767505121" className="text-xs text-card/50 hover:text-primary transition-colors font-medium">+91 8767505121</a>
              <span className="w-1 h-1 rounded-full bg-card/20 inline-block" />
              <a href="mailto:srinivasajangiti@gmail.com" className="text-xs text-card/50 hover:text-primary transition-colors font-medium">srinivasajangiti@gmail.com</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
