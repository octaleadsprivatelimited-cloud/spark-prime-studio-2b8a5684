import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { HeroCarousel } from "../components/HeroCarousel";
import { SectionReveal } from "../components/SectionReveal";
import { ServiceCard } from "../components/ServiceCard";
import { AnimatedCounter } from "../components/AnimatedCounter";
import { ProjectCard } from "../components/ProjectCard";
import { CTASection } from "../components/CTASection";

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
    description: "Comprehensive system design — load calculations, SLD preparation, and compliance documentation.",
  },
  {
    icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>,
    title: "HT/LT Electrification",
    description: "High and low tension electrification with transformer installation, panel erection, and safety compliance.",
  },
  {
    icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5V18M15 7.5V18M3 16.811V8.69c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061A1.125 1.125 0 013 16.811z" /></svg>,
    title: "Power Solutions",
    description: "DG sets, UPS systems, solar integration, and power quality management for uninterrupted operations.",
  },
  {
    icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" /></svg>,
    title: "Project Management",
    description: "End-to-end project management from planning and procurement to execution and commissioning.",
  },
  {
    icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.66-5.66M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    title: "AMC Services",
    description: "Annual maintenance with preventive care, thermal scanning, and 24/7 emergency response.",
  },
  {
    icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
    title: "BESCOM Approvals",
    description: "Hassle-free BESCOM approval for new connections, load enhancement, and statutory clearances.",
  },
];

const featuredProjects = [
  { id: "1", title: "BEML Factory Electrification", client: "BEML Limited", category: "Industrial", image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80" },
  { id: "3", title: "Phoenix Mall Electrical", client: "Phoenix Group", category: "Commercial", image: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=600&q=80" },
  { id: "2", title: "Vidhana Soudha Renovation", client: "Govt. of Karnataka", category: "Government", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&q=80" },
];

const serviceCategories = ["All Services", "Industrial", "Commercial", "Government", "Residential"];

const clients = ["Infosys", "Wipro", "HAL", "BEML", "KPTCL", "BEL", "BHEL", "L&T"];

function HomePage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
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

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <ServiceCard key={s.title} {...s} delay={i * 0.05} />
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* About Preview */}
      <section className="section-padding bg-surface-elevated">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <SectionReveal>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-red">About Nataraj</span>
              <h2 className="mt-2 font-heading text-3xl font-bold text-foreground md:text-4xl">
                Building Trust Through Quality & Reliability
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Since 2008, Nataraj Electricals has been at the forefront of electrical contracting in Karnataka. As a Government Licensed Class-I Contractor, we deliver solutions that meet the highest standards of safety and performance.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {[
                  { label: "ISO Certified", value: "9001:2015" },
                  { label: "License", value: "Class-I" },
                  { label: "Support", value: "24/7" },
                  { label: "Operations", value: "PAN India" },
                ].map((item) => (
                  <div key={item.label} className="rounded border border-border bg-card p-4">
                    <div className="font-heading text-xl font-extrabold text-brand-red">{item.value}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground">{item.label}</div>
                  </div>
                ))}
              </div>
              <Link to="/about" className="btn-primary mt-6">
                Learn More About Us
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
              </Link>
            </SectionReveal>
            <SectionReveal delay={0.15}>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: "⚡", title: "Government Licensed", desc: "Class-I contractor for projects of any scale" },
                  { icon: "🛡️", title: "Safety First", desc: "Strict adherence to IS standards" },
                  { icon: "⏱️", title: "On-Time Delivery", desc: "Committed to project deadlines" },
                  { icon: "🔧", title: "End-to-End", desc: "Design to commissioning under one roof" },
                ].map((item) => (
                  <div key={item.title} className="rounded border border-border bg-card p-5 transition-colors hover:border-brand-red/30">
                    <span className="text-2xl">{item.icon}</span>
                    <h4 className="mt-3 font-heading text-sm font-bold text-foreground">{item.title}</h4>
                    <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
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
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((p, i) => (
              <ProjectCard key={p.id} {...p} delay={i * 0.08} />
            ))}
          </div>
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
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {clients.map((c, i) => (
              <SectionReveal key={c} delay={i * 0.04}>
                <div className="flex h-20 items-center justify-center rounded border border-border bg-card px-6 transition-all hover:border-brand-red/20 hover:shadow-sm">
                  <span className="font-heading text-lg font-bold text-muted-foreground">{c}</span>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-dark">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-6 lg:py-20">
          <SectionReveal>
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-red">Why Choose Us</span>
              <h2 className="mt-2 font-heading text-3xl font-bold md:text-4xl">The Nataraj Advantage</h2>
            </div>
          </SectionReveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Government Licensed", desc: "Class-I licensed for projects of any scale and voltage." },
              { title: "15+ Years Experience", desc: "Proven track record since 2008 in complex projects." },
              { title: "Safety Compliance", desc: "Strict adherence to IS standards and protocols." },
              { title: "On-Time Delivery", desc: "Efficient management and deadline commitment." },
              { title: "End-to-End Solutions", desc: "Design to commissioning under one roof." },
              { title: "24/7 Emergency Support", desc: "Round-the-clock maintenance and response." },
            ].map((item, i) => (
              <SectionReveal key={item.title} delay={i * 0.05}>
                <div className="flex items-start gap-4 rounded border border-brand-dark-foreground/10 p-5">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded bg-brand-red text-brand-red-foreground">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-bold">{item.title}</h3>
                    <p className="mt-1 text-xs opacity-60">{item.desc}</p>
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
