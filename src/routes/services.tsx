import { createFileRoute } from '@tanstack/react-router'
import { createFileRoute } from "@tantml/react-router";
import { ServiceCard } from "../components/ServiceCard";
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
    icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" /></svg>,
    title: "Electrical Design",
    description: "Complete electrical system design including load calculations, SLD preparation, equipment selection, and compliance documentation for industrial, commercial, and residential projects.",
    useCases: ["Factory layouts", "Commercial complexes", "Residential townships", "Hospital electrical systems"],
  },
  {
    icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>,
    title: "HT/LT Electrification",
    description: "High tension (11kV/33kV/66kV) and low tension electrification services including transformer installation, panel erection, cable laying, and commissioning with safety compliance.",
    useCases: ["Industrial plants", "Power distribution", "Substation erection", "Cable network installation"],
  },
  {
    icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5V18M15 7.5V18M3 16.811V8.69c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061A1.125 1.125 0 013 16.811z" /></svg>,
    title: "Power Solutions",
    description: "Comprehensive power backup solutions including DG set installation, UPS systems, solar power integration, and power quality management for uninterrupted operations.",
    useCases: ["DG set installation", "UPS systems", "Solar power plants", "Power factor correction"],
  },
  {
    icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" /></svg>,
    title: "Project Management",
    description: "End-to-end electrical project management from planning, estimation, and procurement to execution, testing, and commissioning with strict timeline adherence.",
    useCases: ["Turnkey projects", "Multi-site rollouts", "Government tenders", "Infrastructure projects"],
  },
  {
    icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.66-5.66M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    title: "AMC Services",
    description: "Annual maintenance contracts with preventive and breakdown maintenance, periodic inspections, thermal scanning, and 24/7 emergency response for all electrical systems.",
    useCases: ["Preventive maintenance", "Breakdown response", "Thermal scanning", "System audits"],
  },
  {
    icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
    title: "BESCOM Approvals",
    description: "Complete assistance for BESCOM approvals including new power connections, load enhancement, CT/PT metering, and all statutory clearances with documentation support.",
    useCases: ["New connections", "Load enhancement", "CT/PT metering", "Statutory clearances"],
  },
];

function ServicesPage() {
  return (
    <>
      <section className="hero-gradient section-padding">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionReveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/60">Our Services</span>
            <h1 className="mt-3 max-w-2xl font-heading text-4xl font-bold text-primary-foreground md:text-5xl">
              Complete Electrical Solutions
            </h1>
            <p className="mt-4 max-w-xl text-base text-primary-foreground/70">
              From design and planning to execution and maintenance — we cover every aspect of electrical contracting.
            </p>
          </SectionReveal>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="space-y-16">
            {allServices.map((service, i) => (
              <SectionReveal key={service.title}>
                <div className={`grid items-center gap-10 md:grid-cols-2 ${i % 2 === 1 ? "md:direction-rtl" : ""}`}>
                  <div className={i % 2 === 1 ? "md:order-2" : ""}>
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      {service.icon}
                    </div>
                    <h2 className="font-heading text-2xl font-bold text-foreground">{service.title}</h2>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground">{service.description}</p>
                    <div className="mt-4">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-primary">Use Cases</h4>
                      <ul className="mt-2 grid grid-cols-2 gap-2">
                        {service.useCases.map((uc) => (
                          <li key={uc} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <svg className="h-3 w-3 shrink-0 text-primary" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/></svg>
                            {uc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className={`rounded-2xl bg-primary/5 p-12 ${i % 2 === 1 ? "md:order-1" : ""}`}>
                    <div className="flex items-center justify-center text-primary opacity-20">
                      <svg className="h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="0.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                      </svg>
                    </div>
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
