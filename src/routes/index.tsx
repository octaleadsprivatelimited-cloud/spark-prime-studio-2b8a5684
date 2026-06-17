import { Link } from "react-router-dom";
import { useRef, useState, type KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageHead } from "../components/PageHead";
import { HeroCarousel } from "../components/HeroCarousel";
import { SectionReveal } from "../components/SectionReveal";
import { ServiceCard } from "../components/ServiceCard";
import { AnimatedCounter } from "../components/AnimatedCounter";
import { ProjectCard } from "../components/ProjectCard";
import { CTASection } from "../components/CTASection";

const services = [
  {
    icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" /></svg>,
    title: "Designs",
    description: "Concurrent designs, engineering analysis early in design, scheduling, quality control and CAD support.",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80",
  },
  {
    icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>,
    title: "Electrification",
    description: "H.T. and L.T Installations, Industrial wiring, Electrical Designing, Annual Maintenance, and Approvals.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",
  },
  {
    icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5V18M15 7.5V18M3 16.811V8.69c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061A1.125 1.125 0 013 16.811z" /></svg>,
    title: "Complete power solution",
    description: "Proficient in load audits, code compliance installations, and obtaining pre-commissioning approvals.",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&q=80",
  },
  {
    icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" /></svg>,
    title: "Project management",
    description: "End-to-end management, site construction engineering, cable pulling, scaffolding, and light protection.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
  },
  {
    icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.66-5.66M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    title: "AMC management",
    description: "Preventive, breakdown, and routine maintenance contracts for critical electrical installations.",
    image: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=600&q=80",
  },
  {
    icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
    title: "Bescom Approvals",
    description: "Liaisoning and obtaining inspected approvals from BESCOM for H.T. installations.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&q=80",
  },
];

const featuredProjects = [
  { id: "o1", title: "Bannergatta Biological Park Electrification", client: "Bannergatta Biological Park", category: "Ongoing", location: "Bangalore", image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600&q=80" },
  { id: "c22", title: "TVS Motor Factory Electrification", client: "TVS Motor Company Ltd.", category: "Completed", location: "Hosur", image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80" },
  { id: "c23", title: "BIRA BIAL Airport Project", client: "BIAL, Bangalore", category: "Completed", location: "Bangalore", image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80" },
];

const serviceCategories = ["All Services", "Designs", "Electrification", "Project management"];
const projectCategories = ["All Projects", "Ongoing", "Completed"];

const clients = [
  { name: "TVS Motor", domain: "tvsmotor.com", initials: "TVS", color: "#1a4b8c" },
  { name: "Havells India", domain: "havells.com", initials: "HV", color: "#c41230" },
  { name: "Mettler Toledo", domain: "mt.com", initials: "MT", color: "#003d79" },
  { name: "Cyient DLM", domain: "cyientdlm.com", initials: "CD", color: "#5a189a" },
  { name: "BIAL", domain: "bengaluruairport.com", initials: "BL", color: "#9d0208" },
  { name: "Biocon", domain: "biocon.com", initials: "BC", color: "#0077b6" },
  { name: "Tatsuno India", domain: "tatsuno-corporation.com", initials: "TI", color: "#0a3d62" },
  { name: "GKB Vision", domain: "gkb.net", initials: "GK", color: "#e85d04" },
];

function ClientLogo({ client, size = "md" }: { client: typeof clients[number]; size?: "sm" | "md" }) {
  const [failed, setFailed] = useState(false);
  const dims = size === "sm" ? "h-7" : "h-10";
  const initialsSize = size === "sm" ? "h-8 w-8 text-[10px]" : "h-9 w-9 text-xs";
  if (failed) {
    return (
      <span
        className={`flex ${initialsSize} shrink-0 items-center justify-center rounded-full font-extrabold text-white`}
        style={{ backgroundColor: client.color }}
      >
        {client.initials}
      </span>
    );
  }
  return (
    <img
      src={`https://logo.clearbit.com/${client.domain}`}
      alt={`${client.name} logo`}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`${dims} w-auto max-w-[110px] object-contain`}
    />
  );
}

function HomePage() {
  const [activeTab, setActiveTab] = useState(0);
  const [openService, setOpenService] = useState<number | null>(0);
  const [projectFilter, setProjectFilter] = useState(0);
  const [openAdvantage, setOpenAdvantage] = useState<number | null>(0);
  const advantageButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const handleAdvantageKeyDown = (
    e: KeyboardEvent<HTMLButtonElement>,
    index: number,
    count: number,
  ) => {
    let next = index;
    switch (e.key) {
      case "ArrowDown":
        next = (index + 1) % count;
        break;
      case "ArrowUp":
        next = (index - 1 + count) % count;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = count - 1;
        break;
      default:
        return;
    }
    e.preventDefault();
    advantageButtonRefs.current[next]?.focus();
  };

  const filteredProjects = projectFilter === 0
    ? featuredProjects
    : featuredProjects.filter(p => p.category === projectCategories[projectFilter]);

  return (
    <>
      <PageHead title="Nataraj Electricals — Premium Electrical Contractor in Bangalore" description="Government Licensed Class-I Electrical Contractor in Bangalore. HT/LT electrification, power solutions, BESCOM approvals, and AMC services since 2008." />

      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Stats Bar */}
      <section className="stats-bar">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-0 divide-x divide-brand-dark-foreground/10 md:grid-cols-4">
          {[
            { value: "15+", label: "Years Experience" },
            { value: "500+", label: "Projects Completed" },
            { value: "200+", label: "Happy Clients" },
            { value: "50+", label: "Expert Engineers" },
          ].map((stat) => (
            <div key={stat.label} className="px-4 py-6 text-center md:py-8">
              <div className="font-heading text-2xl font-extrabold md:text-3xl">{stat.value}</div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider opacity-50">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section with Tabs */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <SectionReveal>
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-red">Our Services</span>
                <h2 className="mt-2 font-heading text-3xl font-bold text-foreground md:text-4xl">
                  What We Do Best
                </h2>
              </div>
              <Link to="/services" className="btn-outline !py-2 !px-5 !text-xs">
                View All Services
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </SectionReveal>

          {/* Tab Navigation */}
          <div className="tab-nav mt-8">
            {serviceCategories.map((cat, i) => (
              <button key={cat} onClick={() => setActiveTab(i)} className={`tab-item ${activeTab === i ? "active" : ""}`}>
                {cat}
              </button>
            ))}
          </div>

          {/* Desktop grid */}
          <div className="mt-8 hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <ServiceCard
                key={s.title}
                icon={s.icon}
                title={s.title}
                description={s.description}
                delay={i * 0.05}
              />
            ))}
          </div>

          {/* Mobile collapsible cards with images */}
          <div className="mt-6 flex flex-col gap-3 sm:hidden">
            {services.map((s, i) => {
              const isOpen = openService === i;
              return (
                <div
                  key={s.title}
                  className="overflow-hidden rounded-lg border border-border bg-card shadow-sm"
                >
                  <button
                    onClick={() => setOpenService(isOpen ? null : i)}
                    className="flex w-full items-center gap-3 p-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-red/10 text-brand-red">
                      {s.icon}
                    </div>
                    <h3 className="flex-1 font-heading text-base font-bold text-card-foreground">
                      {s.title}
                    </h3>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="text-muted-foreground"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4">
                          <div className="relative mb-3 aspect-[16/9] overflow-hidden rounded-md bg-muted">
                            <img
                              src={s.image}
                              alt={s.title}
                              loading="lazy"
                              className="absolute inset-0 h-full w-full object-cover"
                            />
                          </div>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {s.description}
                          </p>
                          <Link
                            to="/contact"
                            className="btn-yellow mt-4 !py-2.5 !px-5 !text-sm"
                          >
                            Get Quote
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Mobile CTA — yellow medium button */}
          <div className="mt-6 flex justify-center sm:hidden">
            <Link to="/services" className="btn-yellow !py-3 !px-6 !text-sm">
              View All Services
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* About Preview */}
      <section className="section-padding bg-surface-elevated">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Left: Image side */}
            <SectionReveal>
              <div className="relative">
                {/* Main image */}
                <div className="relative overflow-hidden rounded-xl shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80"
                    alt="Nataraj Electricals - Industrial electrical work"
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                {/* Floating experience badge */}
                <div className="absolute -bottom-4 -right-2 rounded-xl bg-brand-red p-4 shadow-lg sm:-right-4 sm:p-5">
                  <div className="text-center text-brand-red-foreground">
                    <div className="font-heading text-3xl font-extrabold sm:text-4xl">15+</div>
                    <div className="mt-0.5 text-[10px] font-medium uppercase tracking-wider opacity-90 sm:text-xs">Years Experience</div>
                  </div>
                </div>
                {/* Secondary small image */}
                <div className="absolute -left-2 -top-3 hidden w-28 overflow-hidden rounded-lg border-2 border-white shadow-lg sm:block sm:w-32 md:w-36">
                  <img
                    src="https://images.unsplash.com/photo-1621905251189-3b35935955c0?w=400&q=80"
                    alt="Electrical team at work"
                    loading="lazy"
                    className="aspect-square w-full object-cover"
                  />
                </div>
              </div>
            </SectionReveal>

            {/* Right: Content side */}
            <SectionReveal delay={0.15}>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-red">About Nataraj</span>
              <h2 className="mt-2 font-heading text-3xl font-bold text-foreground md:text-4xl">
                Building Trust Through Quality & Reliability
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Founded in 2008 in Bangalore, Nataraj Electricals began with the aim of redefining the infrastructure development domain with new electrical solutions. As Government Licensed Class-I Electrical Contractors, we are an exclusive one-stop solution for all types of electrical services including Design, Planning, Erection, Testing, Commissioning, and AMC for H.T. & L.T works.
              </p>

              {/* Stats grid with icons */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  {
                    label: "ISO Certified",
                    value: "9001:2015",
                    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"/></svg>,
                  },
                  {
                    label: "License",
                    value: "Class-I",
                    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
                  },
                  {
                    label: "Support",
                    value: "24/7",
                    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
                  },
                  {
                    label: "Operations",
                    value: "PAN India",
                    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>,
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:border-brand-red/30 sm:p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-red/10 text-brand-red sm:h-11 sm:w-11">
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-heading text-lg font-extrabold text-foreground sm:text-xl">{item.value}</div>
                      <div className="text-[11px] text-muted-foreground sm:text-xs">{item.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Feature highlights row */}
              <div className="mt-5 flex flex-wrap gap-2">
                {["Govt. Licensed", "ISI Standards", "On-Time Delivery", "End-to-End"].map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1.5 rounded-full bg-brand-yellow/15 px-3 py-1.5 text-xs font-semibold text-brand-yellow-foreground">
                    <svg className="h-3 w-3 text-brand-red" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3">
                <Link to="/about" className="btn-primary !py-2.5 !px-4 !text-xs sm:!py-2.5 sm:!px-5 sm:!text-sm">
                  Learn More
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                </Link>
                <Link to="/contact" className="btn-yellow !py-2.5 !px-4 !text-xs sm:!py-2.5 sm:!px-5 sm:!text-sm">
                  Get In Touch
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>
                </Link>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <SectionReveal>
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-red">Featured Projects</span>
                <h2 className="mt-2 font-heading text-3xl font-bold text-foreground md:text-4xl">
                  Our Recent Work
                </h2>
              </div>
              <Link to="/projects" className="btn-outline !py-2 !px-5 !text-xs">
                View All Projects
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </SectionReveal>

          {/* Project filter tabs */}
          <div className="tab-nav mt-8">
            {projectCategories.map((cat, i) => (
              <button key={cat} onClick={() => setProjectFilter(i)} className={`tab-item ${projectFilter === i ? "active" : ""}`}>
                {cat}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((p, i) => (
              <ProjectCard key={p.id} {...p} delay={i * 0.08} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="mt-8 rounded-lg border border-border bg-card py-12 text-center">
              <p className="text-muted-foreground">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Clients */}
      <section className="section-padding bg-surface-elevated">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <SectionReveal>
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-red">Trusted By</span>
              <h2 className="mt-2 font-heading text-3xl font-bold text-foreground md:text-4xl">
                Leading Organizations
              </h2>
            </div>
          </SectionReveal>
          {/* Desktop grid */}
          <div className="mt-10 hidden grid-cols-4 gap-4 sm:grid">
            {clients.map((c, i) => (
              <SectionReveal key={c.name} delay={i * 0.04}>
                <div className="flex h-24 items-center justify-center rounded border border-border bg-white px-4 transition-all hover:border-brand-red/30 hover:shadow-sm">
                  <ClientLogo client={c} />
                </div>
              </SectionReveal>
            ))}
          </div>

          {/* Mobile zig-zag scrolling marquee */}
          <div className="mt-8 sm:hidden overflow-hidden relative -mx-4">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-surface-elevated to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-surface-elevated to-transparent" />
            <div className="flex w-max animate-marquee gap-3 py-4">
              {[...clients, ...clients].map((c, i) => (
                <div
                  key={`${c.name}-${i}`}
                  className="flex h-16 w-32 shrink-0 items-center justify-center rounded border border-border bg-white px-3"
                  style={{ transform: `translateY(${i % 2 === 0 ? "-10px" : "10px"})` }}
                >
                  <ClientLogo client={c} size="sm" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-dark">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:py-14 lg:px-6 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            {/* Left: Image side */}
            <SectionReveal>
              <div className="relative">
                <div className="relative overflow-hidden rounded-xl border-2 border-brand-red/20 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                    alt="Nataraj Electricals team at work"
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-dark/60 via-transparent to-transparent" />
                </div>
                {/* Floating stat card */}
                <div className="absolute -bottom-4 -right-2 rounded-xl bg-brand-yellow p-4 shadow-lg sm:-right-4 sm:p-5">
                  <div className="text-center text-brand-yellow-foreground">
                    <div className="font-heading text-3xl font-extrabold sm:text-4xl">500+</div>
                    <div className="mt-0.5 text-[10px] font-medium uppercase tracking-wider opacity-80 sm:text-xs">Projects Done</div>
                  </div>
                </div>
                {/* Small overlay badge */}
                <div className="absolute -left-2 top-4 hidden rounded-lg bg-brand-red px-3 py-2 shadow-lg sm:block">
                  <div className="flex items-center gap-2 text-white">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    <span className="text-xs font-bold">ISO 9001:2015</span>
                  </div>
                </div>
              </div>
            </SectionReveal>

            {/* Right: Content side */}
            <div>
              <SectionReveal>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-red">Why Choose Us</span>
                <h2 className="mt-2 font-heading text-3xl font-bold md:text-4xl">The Nataraj Advantage</h2>
                <p className="mt-3 text-sm leading-relaxed opacity-60 sm:text-base">
                  We combine technical expertise with unwavering commitment to deliver electrical solutions that power India's growth safely and efficiently.
                </p>
              </SectionReveal>

              {/* Mobile: accordion cards */}
              <div
                className="mt-8 flex flex-col gap-3 sm:hidden"
                role="region"
                aria-label="Why choose Nataraj"
              >
                {([
                  {
                    title: "Government Licensed",
                    desc: "Class-I licensed for projects of any scale and voltage.",
                    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
                  },
                  {
                    title: "15+ Years Experience",
                    desc: "Proven track record since 2008 in complex projects.",
                    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
                  },
                  {
                    title: "Safety Compliance",
                    desc: "Strict adherence to ISI standards and safety protocols.",
                    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>,
                  },
                  {
                    title: "On-Time Delivery",
                    desc: "Efficient project management and deadline commitment.",
                    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/></svg>,
                  },
                  {
                    title: "End-to-End Solutions",
                    desc: "Design to commissioning under one trusted roof.",
                    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5"/></svg>,
                  },
                  {
                    title: "24/7 Emergency Support",
                    desc: "Round-the-clock maintenance and rapid response team.",
                    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg>,
                  },
                ] as const).map((item, i, arr) => {
                  const isOpen = openAdvantage === i;
                  const headingId = `advantage-header-${i}`;
                  const panelId = `advantage-panel-${i}`;
                  return (
                    <div
                      key={item.title}
                      className="overflow-hidden rounded-lg border border-brand-dark-foreground/10 bg-brand-dark-foreground/5"
                    >
                      <button
                        ref={(el) => {
                          advantageButtonRefs.current[i] = el;
                        }}
                        id={headingId}
                        type="button"
                        onClick={() => setOpenAdvantage(isOpen ? null : i)}
                        onKeyDown={(e) => handleAdvantageKeyDown(e, i, arr.length)}
                        className="flex w-full items-center gap-3 p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-red text-brand-red-foreground">
                          {item.icon}
                        </div>
                        <h3 className="flex-1 font-heading text-sm font-bold">{item.title}</h3>
                        <motion.span
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.25 }}
                          className="opacity-50"
                          aria-hidden="true"
                        >
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </motion.span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="content"
                            id={panelId}
                            role="region"
                            aria-labelledby={headingId}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="px-4 pb-4 text-sm opacity-60">{item.desc}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Desktop: always expanded cards */}
              <div className="mt-8 hidden gap-3 sm:grid sm:grid-cols-2 sm:gap-4">
                {[
                  {
                    title: "Government Licensed",
                    desc: "Class-I licensed for projects of any scale and voltage.",
                    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
                  },
                  {
                    title: "15+ Years Experience",
                    desc: "Proven track record since 2008 in complex projects.",
                    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
                  },
                  {
                    title: "Safety Compliance",
                    desc: "Strict adherence to ISI standards and safety protocols.",
                    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>,
                  },
                  {
                    title: "On-Time Delivery",
                    desc: "Efficient project management and deadline commitment.",
                    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/></svg>,
                  },
                  {
                    title: "End-to-End Solutions",
                    desc: "Design to commissioning under one trusted roof.",
                    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5"/></svg>,
                  },
                  {
                    title: "24/7 Emergency Support",
                    desc: "Round-the-clock maintenance and rapid response team.",
                    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg>,
                  },
                ].map((item, i) => (
                  <SectionReveal key={item.title} delay={i * 0.05}>
                    <div className="flex items-start gap-3 rounded-lg border border-brand-dark-foreground/10 bg-brand-dark-foreground/5 p-4 transition-colors hover:border-brand-red/30 hover:bg-brand-dark-foreground/10">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand-red text-brand-red-foreground">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-heading text-sm font-bold sm:text-base">{item.title}</h3>
                        <p className="mt-0.5 text-xs opacity-60 sm:text-sm">{item.desc}</p>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection variant="red" />
    </>
  );
}

export default HomePage;
