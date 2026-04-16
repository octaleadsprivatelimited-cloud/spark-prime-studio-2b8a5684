import { createFileRoute } from "@tanstack/react-router";
import { SectionReveal } from "../components/SectionReveal";
import { CTASection } from "../components/CTASection";

export const Route = createFileRoute("/clients")({
  head: () => ({
    meta: [
      { title: "Our Clients — Nataraj Electricals" },
      { name: "description", content: "Trusted by 200+ leading organizations including government bodies, industrial giants, and commercial enterprises." },
      { property: "og:title", content: "Our Clients — Nataraj Electricals" },
      { property: "og:description", content: "Trusted by leading organizations across India for premium electrical contracting." },
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
  {
    quote: "Nataraj Electricals delivered our factory electrification project on time and within budget. Their team's expertise in HT systems is unmatched.",
    name: "Rajesh Kumar",
    role: "Plant Manager, BEML",
  },
  {
    quote: "Professional, reliable, and safety-conscious. They've been handling our AMC for 5 years with zero downtime incidents.",
    name: "Priya Sharma",
    role: "Facilities Head, Embassy Group",
  },
  {
    quote: "From design to commissioning, their end-to-end project management capability made our IT park electrification seamless.",
    name: "Arun Patel",
    role: "CTO, Techpark Solutions",
  },
];

function ClientsPage() {
  return (
    <>
      <section className="hero-gradient section-padding">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionReveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/60">Our Clients</span>
            <h1 className="mt-3 max-w-2xl font-heading text-4xl font-bold text-primary-foreground md:text-5xl">
              Trusted by Industry Leaders
            </h1>
            <p className="mt-4 max-w-xl text-base text-primary-foreground/70">
              200+ organizations trust us for their electrical infrastructure needs.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Logo Wall */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionReveal>
            <div className="text-center">
              <h2 className="font-heading text-3xl font-bold text-foreground">Organizations We Serve</h2>
            </div>
          </SectionReveal>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {clientLogos.map((name, i) => (
              <SectionReveal key={name} delay={i * 0.03}>
                <div className="card-hover flex h-24 items-center justify-center rounded-xl border border-border bg-card px-6">
                  <span className="font-heading text-base font-semibold text-muted-foreground">{name}</span>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-secondary/50">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionReveal>
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">Testimonials</span>
              <h2 className="mt-3 font-heading text-3xl font-bold text-foreground">What Our Clients Say</h2>
            </div>
          </SectionReveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <SectionReveal key={t.name} delay={i * 0.1}>
                <div className="rounded-2xl border border-border bg-card p-6">
                  <svg className="mb-3 h-8 w-8 text-primary/30" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                  <p className="text-sm leading-relaxed text-muted-foreground">{t.quote}</p>
                  <div className="mt-4 border-t border-border pt-4">
                    <div className="text-sm font-semibold text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
