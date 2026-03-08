import { TrendingUp, Shield, Users, Calculator } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "RERA Registered",
    description: "Reg No: A51700023633. Complete transparency and legal compliance guaranteed in every transaction.",
  },
  {
    icon: Users,
    title: "1000+ Happy Clients",
    description: "Trusted by families across the Mumbai Metropolitan Region for their property needs.",
  },
  {
    icon: TrendingUp,
    title: "15+ Years Experience",
    description: "Deep local market knowledge ensuring you get the best deals on residential, commercial and industrial properties.",
  },
  {
    icon: Calculator,
    title: "Secure Transactions",
    description: "All dealings with proper documentation and legal assistance for your complete peace of mind.",
  },
]

export function ValueProposition() {
  return (
    <section className="py-14 md:py-20 bg-muted/40">
      <div className="mx-auto max-w-[1280px] px-4">
        <p className="text-primary text-xs font-extrabold uppercase tracking-[0.25em] mb-4">Why Choose Us</p>
        <h2 className="text-2xl md:text-4xl font-black text-foreground mb-3">
          Your Trusted Real Estate Partner
        </h2>
        <p className="text-sm text-muted-foreground mb-10 max-w-lg text-pretty">
          Shree Balaji Enterprises – RERA registered agency serving Mumbai Metropolitan Region for 15+ years
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col gap-3 p-6 rounded-2xl border border-border bg-card hover:border-primary/40 hover:shadow-md transition-all">
              <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-base font-black text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
