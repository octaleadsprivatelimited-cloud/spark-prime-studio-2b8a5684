import { createFileRoute } from "@tanstack/react-router";
import { SectionReveal } from "../components/SectionReveal";
import { CTASection } from "../components/CTASection";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Nataraj Electricals" },
      { name: "description", content: "Learn about Nataraj Electricals — our journey since 2008, mission, vision, and commitment to quality electrical contracting." },
      { property: "og:title", content: "About Us — Nataraj Electricals" },
      { property: "og:description", content: "Government Licensed Class-I Electrical Contractor serving Karnataka since 2008." },
    ],
  }),
  component: AboutPage,
});

const timeline = [
  { year: "2008", title: "Company Founded", desc: "Started operations in Bangalore with a small team of dedicated electricians." },
  { year: "2011", title: "Class-I License", desc: "Obtained Government Class-I Electrical Contractor license." },
  { year: "2014", title: "Industrial Expansion", desc: "Expanded into large-scale industrial electrification projects." },
  { year: "2017", title: "ISO Certification", desc: "Achieved ISO 9001:2015 certification for quality management." },
  { year: "2020", title: "Government Projects", desc: "Secured major government infrastructure electrification contracts." },
  { year: "2024", title: "PAN India Presence", desc: "Extended operations across multiple states with 50+ engineers." },
];

const strengths = [
  "Government Licensed Class-I Contractor",
  "ISO 9001:2015 Certified",
  "CPRI Approved Testing Lab",
  "BESCOM Registered Contractor",
  "KPTCL Empanelled Agency",
  "IE Rule Compliance Specialists",
];

function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-gradient section-padding">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionReveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/60">About Us</span>
            <h1 className="mt-3 max-w-2xl font-heading text-4xl font-bold text-primary-foreground md:text-5xl">
              15+ Years of Powering Progress
            </h1>
            <p className="mt-4 max-w-xl text-base text-primary-foreground/70">
              From humble beginnings to becoming one of Karnataka's most trusted electrical contractors.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2">
            <SectionReveal>
              <h2 className="font-heading text-3xl font-bold text-foreground">Our Story</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Nataraj Electricals was founded in 2008 with a vision to provide world-class electrical contracting services in Bangalore. What started as a small operation has grown into a full-scale electrical engineering firm serving industrial, commercial, and government clients across Karnataka and beyond.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Today, we are proud to be a Government Licensed Class-I Electrical Contractor with ISO certification, a team of 50+ skilled engineers, and over 500 successfully completed projects.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-border bg-card p-6 text-center">
                  <div className="font-heading text-3xl font-bold text-primary">500+</div>
                  <div className="mt-1 text-sm text-muted-foreground">Projects</div>
                </div>
                <div className="rounded-2xl border border-border bg-card p-6 text-center">
                  <div className="font-heading text-3xl font-bold text-primary">200+</div>
                  <div className="mt-1 text-sm text-muted-foreground">Clients</div>
                </div>
                <div className="rounded-2xl border border-border bg-card p-6 text-center">
                  <div className="font-heading text-3xl font-bold text-primary">50+</div>
                  <div className="mt-1 text-sm text-muted-foreground">Engineers</div>
                </div>
                <div className="rounded-2xl border border-border bg-card p-6 text-center">
                  <div className="font-heading text-3xl font-bold text-primary">15+</div>
                  <div className="mt-1 text-sm text-muted-foreground">Years</div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-secondary/50">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2">
            <SectionReveal>
              <div className="rounded-2xl border border-border bg-card p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground">Our Vision</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  To be India's most trusted and innovative electrical contracting company, known for excellence, safety, and sustainable solutions.
                </p>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <div className="rounded-2xl border border-border bg-card p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/></svg>
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground">Our Mission</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  To deliver safe, reliable, and cost-effective electrical solutions while maintaining the highest standards of workmanship and customer satisfaction.
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <SectionReveal>
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">Our Journey</span>
              <h2 className="mt-3 font-heading text-3xl font-bold text-foreground">Milestones</h2>
            </div>
          </SectionReveal>
          <div className="mt-12 space-y-0">
            {timeline.map((item, i) => (
              <SectionReveal key={item.year} delay={i * 0.05}>
                <div className="relative flex gap-6 pb-8 last:pb-0">
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {item.year.slice(2)}
                    </div>
                    {i < timeline.length - 1 && <div className="w-px flex-1 bg-border" />}
                  </div>
                  <div className="pb-4">
                    <div className="text-xs font-medium text-primary">{item.year}</div>
                    <h3 className="font-heading text-base font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-padding bg-secondary/50">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionReveal>
            <div className="text-center">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary">Certifications</span>
              <h2 className="mt-3 font-heading text-3xl font-bold text-foreground">Licenses & Accreditations</h2>
            </div>
          </SectionReveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {strengths.map((s, i) => (
              <SectionReveal key={s} delay={i * 0.05}>
                <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  </div>
                  <span className="text-sm font-medium text-foreground">{s}</span>
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
