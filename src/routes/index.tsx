import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionReveal } from "../components/SectionReveal";
import { ServiceCard } from "../components/ServiceCard";
import { AnimatedCounter } from "../components/AnimatedCounter";
import { CTASection } from "../components/CTASection";
import heroBg from "../assets/hero-bg.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nataraj Electricals — Premium Electrical Contractor in Bangalore" },
      { name: "description", content: "Government Licensed Class-I Electrical Contractor in Bangalore. HT/LT electrification, power solutions, BESCOM approvals, and AMC services since 2008." },
      { property: "og:title", content: "Nataraj Electricals — Premium Electrical Contractor in Bangalore" },
      { property: "og:description", content: "Government Licensed Class-I Electrical Contractor specializing in industrial and commercial electrical solutions." },
    ],
  }),
  component: HomePage,
});

const services = [
  {
    icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" /></svg>,
    title: "Electrical Design",
    description: "Comprehensive electrical system design for industrial, commercial, and residential projects.",
  },
  {
    icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>,
    title: "HT/LT Electrification",
    description: "High tension and low tension electrification services with safety compliance.",
  },
  {
    icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5V18M15 7.5V18M3 16.811V8.69c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061A1.125 1.125 0 013 16.811z" /></svg>,
    title: "Power Solutions",
    description: "DG sets, UPS systems, and power backup solutions for uninterrupted operations.",
  },
  {
    icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.66-5.66a8 8 0 1111.32 0l-5.66 5.66z" /><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L16 21h-2l-2.58-3.83" /></svg>,
    title: "Project Management",
    description: "End-to-end electrical project management from planning to commissioning.",
  },
  {
    icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.66-5.66M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    title: "AMC Services",
    description: "Annual maintenance contracts to keep your electrical systems running efficiently.",
  },
  {
    icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
    title: "BESCOM Approvals",
    description: "Hassle-free BESCOM approval assistance for new connections and load enhancements.",
  },
];

const clients = [
  "Infosys", "Wipro", "HAL", "BEML", "KPTCL", "BEL", "BHEL", "L&T",
];

function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[90vh] items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 hero-gradient opacity-85" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 md:px-6">
          <SectionReveal>
            <span className="inline-block rounded-full border border-primary-foreground/20 px-4 py-1.5 text-xs font-medium text-primary-foreground/80">
              Government Licensed Class-I Contractor
            </span>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <h1 className="mt-6 max-w-3xl font-heading text-4xl font-bold leading-tight text-primary-foreground md:text-6xl lg:text-7xl">
              Powering India's
              <br />
              <span className="text-glow">Infrastructure</span>
            </h1>
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/75 md:text-lg">
              Premium electrical contracting services for industrial, commercial, and government projects across Karnataka since 2008.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/contact" className="inline-flex items-center rounded-xl bg-primary-foreground px-8 py-3.5 text-sm font-semibold text-primary transition-all hover:bg-primary-foreground/90">
                Get a Quote
              </Link>
              <Link to="/projects" className="inline-flex items-center gap-2 rounded-xl border border-primary-foreground/20 px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-foreground/10">
                View Projects
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding border-b border-border">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4">
          <AnimatedCounter end={15} suffix="+" label="Years Experience" />
          <AnimatedCounter end={500} suffix="+" label="Projects Completed" />
          <AnimatedCounter end={200} suffix="+" label="Happy Clients" />
          <AnimatedCounter end={50} suffix="+" label="Expert Engineers" />
        </div>
      </section>

      {/* About preview */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <SectionReveal>
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">About Us</span>
              <h2 className="mt-3 font-heading text-3xl font-bold text-foreground md:text-4xl">
                Building Trust Through Quality & Reliability
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Nataraj Electricals has been at the forefront of electrical contracting in Karnataka for over 15 years. As a Government Licensed Class-I Contractor, we deliver end-to-end electrical solutions that meet the highest standards of safety and performance.
              </p>
              <Link to="/about" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent">
                Learn More
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
              </Link>
            </SectionReveal>
            <SectionReveal delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-primary/5 p-6">
                  <div className="font-heading text-2xl font-bold text-primary">ISO</div>
                  <div className="mt-1 text-sm text-muted-foreground">Certified Company</div>
                </div>
                <div className="rounded-2xl bg-primary/5 p-6">
                  <div className="font-heading text-2xl font-bold text-primary">Class-I</div>
                  <div className="mt-1 text-sm text-muted-foreground">Licensed Contractor</div>
                </div>
                <div className="rounded-2xl bg-primary/5 p-6">
                  <div className="font-heading text-2xl font-bold text-primary">24/7</div>
                  <div className="mt-1 text-sm text-muted-foreground">Emergency Support</div>
                </div>
                <div className="rounded-2xl bg-primary/5 p-6">
                  <div className="font-heading text-2xl font-bold text-primary">PAN</div>
                  <div className="mt-1 text-sm text-muted-foreground">India Operations</div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-secondary/50">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionReveal>
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">Our Services</span>
              <h2 className="mt-3 font-heading text-3xl font-bold text-foreground md:text-4xl">
                Comprehensive Electrical Solutions
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground">
                From design to execution, we offer a complete range of electrical services for every scale of project.
              </p>
            </div>
          </SectionReveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <ServiceCard key={s.title} {...s} delay={i * 0.05} />
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionReveal>
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">Trusted By</span>
              <h2 className="mt-3 font-heading text-3xl font-bold text-foreground md:text-4xl">
                Leading Organizations
              </h2>
            </div>
          </SectionReveal>
          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {clients.map((c, i) => (
              <SectionReveal key={c} delay={i * 0.05}>
                <div className="flex h-20 items-center justify-center rounded-xl border border-border bg-card px-6 transition-shadow hover:shadow-md">
                  <span className="font-heading text-lg font-semibold text-muted-foreground">{c}</span>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-secondary/50">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionReveal>
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">Why Choose Us</span>
              <h2 className="mt-3 font-heading text-3xl font-bold text-foreground md:text-4xl">
                The Nataraj Advantage
              </h2>
            </div>
          </SectionReveal>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Government Licensed", desc: "Class-I licensed contractor approved for projects of any scale and voltage." },
              { title: "15+ Years Experience", desc: "Proven track record delivering complex electrical projects since 2008." },
              { title: "Safety First", desc: "Strict adherence to IS standards and international safety protocols." },
              { title: "On-Time Delivery", desc: "Committed to deadlines with efficient project management and execution." },
              { title: "End-to-End Solutions", desc: "From design and estimation to execution and commissioning under one roof." },
              { title: "24/7 Support", desc: "Round-the-clock emergency support and maintenance services." },
            ].map((item, i) => (
              <SectionReveal key={item.title} delay={i * 0.05}>
                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
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
