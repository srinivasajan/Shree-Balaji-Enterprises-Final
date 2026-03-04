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
    <section className="py-10 md:py-14 bg-muted/50">
      <div className="mx-auto max-w-[1280px] px-4">
        <h2 className="text-xl md:text-2xl font-bold text-foreground text-center mb-2">
          Your Trusted Real Estate Partner
        </h2>
        <p className="text-sm text-muted-foreground text-center mb-10 max-w-lg mx-auto text-pretty">
          Shree Balaji Enterprises – RERA registered agency serving Mumbai Metropolitan Region for 15+ years
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col items-center text-center p-6">
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 mb-4">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
