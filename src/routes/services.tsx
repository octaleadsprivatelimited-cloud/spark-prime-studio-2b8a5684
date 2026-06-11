import { Link } from "react-router-dom";
import { PageHead } from "../components/PageHead";
import { SectionReveal } from "../components/SectionReveal";
import { CTASection } from "../components/CTASection";

const allServices = [
  {
    title: "Designs",
    description: "Our engineers offer valuable design assistance. Keeping in mind today’s hi-tech construction challenges, our experienced team provides timely solutions to owners and general contractors. We offer reduced project duration through concurrent designs, valuable engineering analysis early in the design process, scheduling, quality control, project peer reviews and CAD design support.",
    useCases: ["Concurrent designs", "Value engineering analysis", "Scheduling & Quality control", "Project peer reviews", "CAD design support"],
  },
  {
    title: "Electrification",
    description: "In terms of electrical contracting, we provide all types of electrical and related services to our clients ranging from H.T. and L.T Electrical Installations, Industrial wiring, Electrical Designing, Annual Maintenance, Approvals and the complete power solution.",
    useCases: ["H.T. & L.T. Electrical Installations", "Industrial wiring", "Electrical Designing", "Annual Maintenance", "Approvals & Liaisoning"],
  },
  {
    title: "Complete power solution",
    description: "Not just electrical installations, we are also proficient in delivering complete power solutions for industrial, residential and commercial buildings. We carry out load audits, offer complete installation as per code compliance and obtain approvals before commissioning.",
    useCases: ["Load audits", "Code compliance check", "Industrial buildings", "Commercial & residential complexes", "Pre-commissioning approvals"],
  },
  {
    title: "Project management",
    description: "We provide complete project management from installation to planning, inspection and testing. Our site-based management personnel take care of every requirement. Our site engineer handles the entire construction activities and takes major decisions on contract works. We also have sub-contractors that handle cable pulling, scaffolding, heavy lifting, lightning protection, wiring, and slab work.",
    useCases: ["Site-based management", "Cable pulling & wiring", "Heavy lifting & scaffolding", "Lightning protection", "Slab work"],
  },
  {
    title: "AMC management",
    description: "Besides the service of electrical installations, we at Nataraj Electricals also provide regular maintenance services through our Annual Maintenance Contract (AMC) Services program. We provide AMC for all the services offered by us. We believe preventive, breakdown and routine maintenance is a must for critical electrical installations.",
    useCases: ["Preventive maintenance", "Breakdown maintenance", "Routine inspections", "Custom AMC packages"],
  },
  {
    title: "Bescom Approvals",
    description: "Every infrastructure or government project we handle is only undertaken after electrical inspected approval from BESCOM (Bangalore Electricity Supply Company Limited) for HT connections.",
    useCases: ["BESCOM HT approvals", "Liaisoning with inspectors", "Statutory clearances", "Inspection audits"],
  },
];

function ServicesPage() {
  return (
    <>
      <PageHead title="Our Services — Nataraj Electricals" description="Comprehensive electrical services: HT/LT electrification, power solutions, electrical design, project management, AMC, and BESCOM approvals." />

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

export default ServicesPage;
