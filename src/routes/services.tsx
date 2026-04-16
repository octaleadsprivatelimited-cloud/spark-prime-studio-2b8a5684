import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionReveal } from "../components/SectionReveal";
import { CTASection } from "../components/CTASection";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Our Services — Nataraj Electricals" },
      { name: "description", content: "Comprehensive electrical services: HT/LT electrification, power solutions, electrical design, project management, AMC, and BESCOM approvals." },
      { property: "og:title", content: "Our Services — Nataraj Electricals" },
      { property: "og:description", content: "Full-range electrical contracting services for industrial, commercial, and government projects." },
    ],
  }),
  component: ServicesPage,
});

const allServices = [
  {
    title: "Electrical Design",
    description: "Complete electrical system design including load calculations, SLD preparation, equipment selection, and compliance documentation for projects of any scale.",
    useCases: ["Factory layouts", "Commercial complexes", "Residential townships", "Hospital electrical systems"],
  },
  {
    title: "HT/LT Electrification",
    description: "High tension (11kV/33kV/66kV) and low tension electrification including transformer installation, panel erection, cable laying, and commissioning.",
    useCases: ["Industrial plants", "Power distribution", "Substation erection", "Cable networks"],
  },
  {
    title: "Power Solutions",
    description: "Comprehensive power backup — DG set installation, UPS systems, solar integration, and power quality management for uninterrupted operations.",
    useCases: ["DG sets", "UPS systems", "Solar plants", "Power factor correction"],
  },
  {
    title: "Project Management",
    description: "End-to-end electrical project management from planning, estimation, and procurement to execution, testing, and commissioning.",
    useCases: ["Turnkey projects", "Multi-site rollouts", "Government tenders", "Infrastructure"],
  },
  {
    title: "AMC Services",
    description: "Annual maintenance contracts with preventive and breakdown maintenance, periodic inspections, thermal scanning, and 24/7 emergency response.",
    useCases: ["Preventive maintenance", "Breakdown response", "Thermal scanning", "System audits"],
  },
  {
    title: "BESCOM Approvals",
    description: "Complete assistance for BESCOM approvals — new connections, load enhancement, CT/PT metering, and statutory clearances with documentation support.",
    useCases: ["New connections", "Load enhancement", "CT/PT metering", "Clearances"],
  },
];

function ServicesPage() {
  return (
    <>
      <section className="section-dark">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-6 lg:py-20">
          <SectionReveal>
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider opacity-50">
              <Link to="/" className="hover:opacity-100">Home</Link><span>/</span><span>Services</span>
            </div>
            <h1 className="mt-4 font-heading text-4xl font-extrabold md:text-5xl">Our Services</h1>
            <p className="mt-3 max-w-xl text-base opacity-60">Complete electrical solutions from design to maintenance.</p>
          </SectionReveal>
        </div>
      </section>
      <div className="section-divider" />

      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="space-y-12">
            {allServices.map((service, i) => (
              <SectionReveal key={service.title}>
                <div className={`grid items-start gap-8 rounded border border-border bg-card p-6 md:grid-cols-5 md:p-8`}>
                  <div className="md:col-span-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded bg-brand-red text-sm font-bold text-brand-red-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2 className="font-heading text-xl font-bold text-foreground">{service.title}</h2>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                    <Link to="/contact" className="btn-primary mt-5 !text-xs !py-2.5 !px-5">
                      Get Quote
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                    </Link>
                  </div>
                  <div className="md:col-span-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-brand-red">Applications</h4>
                    <ul className="mt-3 space-y-2">
                      {service.useCases.map((uc) => (
                        <li key={uc} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
                          {uc}
                        </li>
                      ))}
                    </ul>
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
