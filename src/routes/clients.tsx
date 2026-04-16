import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionReveal } from "../components/SectionReveal";
import { CTASection } from "../components/CTASection";

export const Route = createFileRoute("/clients")({
  head: () => ({
    meta: [
      { title: "Our Clients — Nataraj Electricals" },
      { name: "description", content: "Trusted by 200+ leading organizations including government bodies, industrial giants, and commercial enterprises." },
      { property: "og:title", content: "Our Clients — Nataraj Electricals" },
      { property: "og:description", content: "Trusted by leading organizations across India." },
    ],
  }),
  component: ClientsPage,
});

const clientLogos = [
  "Infosys", "Wipro", "HAL", "BEML", "KPTCL", "BEL",
  "BHEL", "L&T", "Embassy Group", "Phoenix Group",
  "Prestige Group", "Brigade Group", "Govt. of Karnataka",
  "Indian Railways", "DRDO", "Biocon",
];

const testimonials = [
  { quote: "Nataraj Electricals delivered our factory electrification on time and within budget. Their HT systems expertise is unmatched.", name: "Rajesh Kumar", role: "Plant Manager, BEML" },
  { quote: "Professional, reliable, and safety-conscious. They've handled our AMC for 5 years with zero downtime.", name: "Priya Sharma", role: "Facilities Head, Embassy Group" },
  { quote: "From design to commissioning, their project management made our IT park electrification seamless.", name: "Arun Patel", role: "CTO, Techpark Solutions" },
];

function ClientsPage() {
  return (
    <>
      <section className="section-dark">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-6 lg:py-20">
          <SectionReveal>
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider opacity-50">
              <Link to="/" className="hover:opacity-100">Home</Link><span>/</span><span>Clients</span>
            </div>
            <h1 className="mt-4 font-heading text-4xl font-extrabold md:text-5xl">Our Clients</h1>
            <p className="mt-3 max-w-xl text-base opacity-60">Trusted by 200+ industry leaders across India.</p>
          </SectionReveal>
        </div>
      </section>
      <div className="section-divider" />

      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <SectionReveal><h2 className="text-center font-heading text-3xl font-bold text-foreground">Organizations We Serve</h2></SectionReveal>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {clientLogos.map((name, i) => (
              <SectionReveal key={name} delay={i * 0.03}>
                <div className="flex h-24 items-center justify-center rounded border border-border bg-card px-6 transition-all hover:border-brand-red/20 hover:shadow-sm">
                  <span className="font-heading text-base font-bold text-muted-foreground">{name}</span>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface-elevated">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <SectionReveal>
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-red">Testimonials</span>
              <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">What Our Clients Say</h2>
            </div>
          </SectionReveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <SectionReveal key={t.name} delay={i * 0.1}>
                <div className="rounded border border-border bg-card p-6">
                  <div className="mb-3 flex gap-1">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="h-4 w-4 text-brand-red" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{t.quote}</p>
                  <div className="mt-4 border-t border-border pt-4">
                    <div className="text-sm font-bold text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection variant="red" />
    </>
  );
}
