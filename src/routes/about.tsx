import { Link } from "react-router-dom";
import { useSettings } from "../lib/content";
import { PageHead } from "../components/PageHead";
import { SectionReveal } from "../components/SectionReveal";
import { CTASection } from "../components/CTASection";

import aboutHero from "../assets/about-hero.jpg";
import aboutStory from "../assets/about-story.jpg";
import aboutMission from "../assets/about-mission.jpg";
import aboutJourney from "../assets/about-journey.jpg";
import aboutCertifications from "../assets/about-certifications.jpg";

const timeline = [
  { year: "2008", title: "Company Founded", desc: "Started operations in Bangalore with a dedicated team." },
  { year: "2011", title: "Class-I License", desc: "Obtained Government Class-I Electrical Contractor license." },
  { year: "2014", title: "Industrial Expansion", desc: "Expanded into large-scale industrial electrification." },
  { year: "2017", title: "ISO Certification", desc: "Achieved ISO 9001:2015 certification." },
  { year: "2020", title: "Government Projects", desc: "Secured major government infrastructure contracts." },
  { year: "2024", title: "PAN India Presence", desc: "Extended operations across multiple states." },
];

const certifications = [
  "Government Licensed Class-I Contractor",
  "ISO 9001:2015 Certified",
  "CPRI Approved Testing Lab",
  "BESCOM Registered Contractor",
  "KPTCL Empanelled Agency",
  "IE Rule Compliance Specialists",
];

function AboutPage() {
  const { settings } = useSettings();
  return (
    <>
      <PageHead title="About Us — Nataraj Electricals" description="Learn about Nataraj Electricals — our journey since 2008, mission, vision, and commitment to quality." />

      {/* Hero with image */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={aboutHero}
            alt="High voltage electrical substation at golden hour"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand-dark/70 to-brand-dark/40" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:py-20 lg:px-6 lg:py-28">
          <SectionReveal>
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-white/60">
              <Link to="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-white/80">About Us</span>
            </div>
            <h1 className="mt-4 font-heading text-4xl font-extrabold text-white md:text-5xl lg:text-6xl">About Nataraj Electricals</h1>
            <p className="mt-4 max-w-2xl text-base text-white/70 sm:text-lg">{settings.statYears} years of powering progress across Karnataka and beyond with safety, precision, and reliability.</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/services" className="btn-yellow">
                Explore Services
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
              </Link>
              <Link to="/contact" className="btn-primary">
                Get a Quote
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            {/* Story Text */}
            <div className="lg:col-span-7">
              <SectionReveal>
                <div className="flex items-center gap-3">
                  <span className="h-[2px] w-8 bg-brand-red inline-block" />
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-red">Our Story</span>
                </div>
                <h2 className="mt-4 font-heading text-3xl font-extrabold text-foreground md:text-4xl leading-tight">
                  Redefining Infrastructure Development With Premium Solutions
                </h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground font-medium">
                  <p>
                    With the world's population expected to expand by three billion people over the next 40 years, efficient electrical power distribution needs to catch up at a blistering pace. To achieve this dream, Nataraj Electricals started with a humble beginning in the year 2008 in the Silicon Valley of India, Bangalore.
                  </p>
                  <p>
                    We are an exclusive one-stop solution for all types of electrical services. As Government Licensed Class-I Electrical Contractors, we are proficient in Design, Planning, Erection, Testing and Commissioning, AMC for H.T. & L.T Electrical works and execution of large turnkey projects.
                  </p>
                  <p>
                    Owing to our massive experience and relentless service in the field of electrical contracting, we are backed by a supportive, efficient, professional management and human resource team.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link to="/contact" className="btn-yellow">
                    Start Your Project
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                  </Link>
                  <Link to="/projects" className="btn-primary">
                    View Projects
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                  </Link>
                </div>
              </SectionReveal>
            </div>

            {/* Image + Stats */}
            <div className="lg:col-span-5 relative">
              <SectionReveal delay={0.15}>
                <div className="relative rounded-2xl overflow-hidden border border-border shadow-lg">
                  <img
                    src={aboutStory}
                    alt="Electrical engineering team reviewing blueprints on site"
                    loading="lazy"
                    className="w-full h-64 sm:h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block rounded bg-brand-yellow px-3 py-1 text-xs font-bold text-brand-yellow-foreground">On-site Excellence</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  {[
                    { val: settings.statProjects, label: "Projects Delivered", accent: "from-brand-red/20" },
                    { val: settings.statClients, label: "Clients Served", accent: "from-blue-500/10" },
                    { val: settings.statEngineers, label: "Expert Engineers", accent: "from-emerald-500/10" },
                    { val: settings.statYears, label: "Years of Trust", accent: "from-amber-500/10" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="relative overflow-hidden rounded-xl border border-border bg-card p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-brand-red/30"
                    >
                      <div className={`absolute -right-6 -bottom-6 h-20 w-20 rounded-full bg-gradient-to-br ${s.accent} to-transparent blur-xl -z-10`} />
                      <div className="font-heading text-2xl font-extrabold text-brand-red tracking-tight">{s.val}</div>
                      <div className="mt-1 text-xs font-bold text-foreground">{s.label}</div>
                    </div>
                  ))}
                </div>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision with banner image */}
      <section className="section-padding bg-surface-elevated">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <SectionReveal>
            <div className="relative rounded-2xl overflow-hidden mb-10">
              <img
                src={aboutMission}
                alt="Modern electrical control room with illuminated monitoring panels"
                loading="lazy"
                className="w-full h-56 sm:h-72 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 to-brand-dark/30" />
              <div className="absolute inset-0 flex items-center px-6 sm:px-10">
                <div>
                  <span className="inline-block rounded bg-brand-yellow px-3 py-1 text-xs font-bold text-brand-yellow-foreground mb-3">Driven by Purpose</span>
                  <h2 className="font-heading text-2xl font-extrabold text-white sm:text-3xl">Mission & Vision</h2>
                  <p className="mt-2 text-sm text-white/70 max-w-lg">Our commitment to safety, reliability, and innovation powers every project we undertake.</p>
                </div>
              </div>
            </div>
          </SectionReveal>

          <div className="grid gap-6 md:grid-cols-2">
            <SectionReveal>
              <div className="rounded-xl border border-border bg-card p-8 shadow-sm transition-all hover:border-brand-red/20">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-red/10 text-brand-red">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground">Our Vision</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">To achieve the dream of redefining infrastructure development with state-of-the-art electrical solutions, enabling efficient and safe power distribution across all sectors.</p>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <div className="rounded-xl border border-border bg-card p-8 shadow-sm transition-all hover:border-brand-red/20">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-brand-red/10 text-brand-red">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/></svg>
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground">Our Mission</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">To deliver safety, reliability, and cost-effectiveness in every project, maintaining the highest quality standards from design to commissioning and AMC services.</p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Strengths Section */}
      <section className="section-padding bg-surface">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            {/* Sticky Intro Side */}
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <SectionReveal>
                <div className="relative rounded-2xl overflow-hidden mb-6 border border-border shadow-md">
                  <img
                    src={aboutHero}
                    alt="Electrical substation infrastructure"
                    loading="lazy"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="inline-block rounded bg-brand-yellow px-2.5 py-0.5 text-[10px] font-bold text-brand-yellow-foreground">Built for Scale</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-[2px] w-8 bg-brand-red inline-block" />
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-red">Core Assets</span>
                </div>
                <h2 className="mt-4 font-heading text-3xl font-extrabold text-foreground md:text-4xl leading-tight">
                  Our Pillars of Strength
                </h2>
                <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                  Our massive experience and relentless service in the field of electrical contracting is built upon robust competencies.
                </p>
                <div className="mt-6">
                  <Link to="/contact" className="btn-yellow">
                    Work With Us
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                  </Link>
                </div>
              </SectionReveal>
            </div>

            {/* Strengths Cards Side */}
            <div className="lg:col-span-8">
              <div className="grid gap-6 sm:grid-cols-2">
                {[
                  {
                    title: "Leadership skills",
                    desc: "Visionary leadership guiding complex turnkey electrical projects to successful execution.",
                    icon: (
                      <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                        <circle cx="12" cy="12" r="1" fill="currentColor" />
                      </svg>
                    ),
                    color: "border-l-4 border-l-red-500"
                  },
                  {
                    title: "Customer focus & Satisfaction",
                    desc: "Prioritizing client requirements, delivering on-budget solutions and high-satisfaction service.",
                    icon: (
                      <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.708a3 3 0 012.94 3.582l-1.32 6A3 3 0 0117.382 22H7m7-12V3a1 1 0 00-1-1H9a1 1 0 00-1 1v7m0 0H3.3a1 1 0 00-1 1v7a1 1 0 001 1h3M14 10a1 1 0 00-1 1v7a1 1 0 001 1h3.382a1 1 0 00.894-.553l1.32-6A1 1 0 0018.708 11H14" />
                      </svg>
                    ),
                    color: "border-l-4 border-l-blue-500"
                  },
                  {
                    title: "Environment, Health & Safety",
                    desc: "Strict adherence to safety guidelines, code compliances, and zero-compromise security protocols.",
                    icon: (
                      <svg className="h-6 w-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    ),
                    color: "border-l-4 border-l-emerald-500"
                  },
                  {
                    title: "Corporate image",
                    desc: "Close to 15 years of built-up credibility, trust, and professional licensed contracting status.",
                    icon: (
                      <svg className="h-6 w-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    ),
                    color: "border-l-4 border-l-amber-500"
                  },
                  {
                    title: "Team spirit & Team work",
                    desc: "A supportive, efficient management and dedicated team of in-house specialists working in harmony.",
                    icon: (
                      <svg className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    ),
                    color: "border-l-4 border-l-indigo-500"
                  },
                ].map((strength, i) => (
                  <SectionReveal key={strength.title} delay={i * 0.06}>
                    <div className={`group flex flex-col p-6 rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-brand-red/35 ${strength.color}`}>
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-card border border-border shadow-sm group-hover:border-brand-red/20 group-hover:shadow-md transition-all duration-300">
                          {strength.icon}
                        </div>
                        <h3 className="font-heading text-base font-bold text-foreground transition-colors group-hover:text-brand-red">{strength.title}</h3>
                      </div>
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed font-medium">{strength.desc}</p>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline / Journey with image */}
      <section className="section-padding bg-surface-elevated">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="grid gap-10 lg:grid-cols-12 items-start">
            {/* Image + Intro */}
            <div className="lg:col-span-5">
              <SectionReveal>
                <div className="relative rounded-2xl overflow-hidden border border-border shadow-lg">
                  <img
                    src={aboutJourney}
                    alt="Aerial view of power plant at sunrise"
                    loading="lazy"
                    className="w-full h-72 sm:h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <span className="inline-block rounded bg-brand-yellow px-3 py-1 text-xs font-bold text-brand-yellow-foreground mb-2">Since 2008</span>
                    <h2 className="font-heading text-2xl font-extrabold text-white">Our Journey</h2>
                    <p className="mt-1 text-sm text-white/70">The growth and accomplishments of Nataraj Electricals</p>
                  </div>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link to="/contact" className="btn-yellow">
                    Partner With Us
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                  </Link>
                  <a href={`tel:${settings.phone.replace(/\s+/g, "")}`} className="btn-primary">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                    Call Now
                  </a>
                </div>
              </SectionReveal>
            </div>

            {/* Timeline Cards */}
            <div className="lg:col-span-7">
              <div className="grid gap-4 sm:grid-cols-2">
                {timeline.map((item, i) => (
                  <SectionReveal key={item.year} delay={i * 0.05}>
                    <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-brand-red/30">
                      <div className="absolute -right-6 -bottom-6 h-20 w-20 rounded-full bg-brand-red/5 blur-lg transition-colors group-hover:bg-brand-red/10" />

                      <div className="flex items-center justify-between mb-3">
                        <span className="inline-flex items-center justify-center rounded-lg bg-brand-red/10 px-3 py-1 text-xs font-extrabold text-brand-red">
                          {item.year}
                        </span>
                        <span className="text-xs font-bold opacity-30">Phase 0{i + 1}</span>
                      </div>

                      <h3 className="font-heading text-base font-bold text-foreground transition-colors group-hover:text-brand-red">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed font-medium">
                        {item.desc}
                      </p>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications with image */}
      <section className="section-padding bg-surface">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="grid gap-10 lg:grid-cols-12 items-center">
            {/* Image side */}
            <div className="lg:col-span-5">
              <SectionReveal>
                <div className="relative rounded-2xl overflow-hidden border border-border shadow-lg">
                  <img
                    src={aboutCertifications}
                    alt="ISO 9001:2015 quality management certificate"
                    loading="lazy"
                    className="w-full h-64 sm:h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/70 to-transparent" />
                  <div className="absolute top-5 left-5">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-red px-3 py-1 text-xs font-bold text-white">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                      Verified
                    </span>
                  </div>
                  <div className="absolute bottom-5 left-5">
                    <h3 className="font-heading text-xl font-extrabold text-white">Licenses & Accreditations</h3>
                    <p className="mt-1 text-sm text-white/70">Trusted by government and industry bodies</p>
                  </div>
                </div>
              </SectionReveal>
            </div>

            {/* Certifications grid */}
            <div className="lg:col-span-7">
              <SectionReveal>
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-[2px] w-8 bg-brand-red inline-block" />
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-red">Certifications</span>
                </div>
                <h2 className="font-heading text-3xl font-extrabold text-foreground mb-6">Why Clients Trust Us</h2>
              </SectionReveal>
              <div className="grid gap-3 sm:grid-cols-2">
                {certifications.map((s, i) => (
                  <SectionReveal key={s} delay={i * 0.05}>
                    <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-sm transition-all duration-300 hover:border-brand-red/20 hover:shadow-md">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-red/10 text-brand-red">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                      </div>
                      <span className="text-sm font-bold text-foreground">{s}</span>
                    </div>
                  </SectionReveal>
                ))}
              </div>
              <SectionReveal delay={0.3}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/contact" className="btn-yellow">
                    Request Documents
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                  </Link>
                  <Link to="/services" className="btn-primary">
                    Our Services
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                  </Link>
                </div>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>

      <CTASection variant="dark" />
    </>
  );
}

export default AboutPage;
