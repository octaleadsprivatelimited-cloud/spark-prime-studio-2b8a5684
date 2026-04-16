import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionReveal } from "../components/SectionReveal";
import { CTASection } from "../components/CTASection";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Nataraj Electricals" },
      { name: "description", content: "Learn about Nataraj Electricals — our journey since 2008, mission, vision, and commitment to quality." },
      { property: "og:title", content: "About Us — Nataraj Electricals" },
      { property: "og:description", content: "Government Licensed Class-I Electrical Contractor serving Karnataka since 2008." },
    ],
  }),
  component: AboutPage,
});

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
  return (
    <>
      {/* Page Header */}
      <section className="section-dark">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-6 lg:py-20">
          <SectionReveal>
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider opacity-50">
              <Link to="/" className="hover:opacity-100">Home</Link>
              <span>/</span>
              <span>About Us</span>
            </div>
            <h1 className="mt-4 font-heading text-4xl font-extrabold md:text-5xl">About Nataraj Electricals</h1>
            <p className="mt-3 max-w-xl text-base opacity-60">15+ years of powering progress across Karnataka and beyond.</p>
          </SectionReveal>
        </div>
      </section>
      <div className="section-divider" />

      {/* Story */}
      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <SectionReveal>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-red">Our Story</span>
              <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">From Humble Beginnings to Industry Leadership</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Founded in 2008, Nataraj Electricals began with a vision to provide world-class electrical contracting services in Bangalore. What started as a small operation has grown into a full-scale electrical engineering firm serving industrial, commercial, and government clients.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Today, we are proud to be a Government Licensed Class-I Electrical Contractor with ISO certification, 50+ skilled engineers, and over 500 successfully completed projects across Karnataka and beyond.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { val: "500+", label: "Projects Delivered" },
                  { val: "200+", label: "Clients Served" },
                  { val: "50+", label: "Expert Engineers" },
                  { val: "15+", label: "Years of Trust" },
                ].map((s) => (
                  <div key={s.label} className="rounded border border-border bg-card p-6 text-center">
                    <div className="font-heading text-3xl font-extrabold text-brand-red">{s.val}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-surface-elevated">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="grid gap-6 md:grid-cols-2">
            <SectionReveal>
              <div className="rounded border border-border bg-card p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded bg-brand-red/10 text-brand-red">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground">Our Vision</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">To be India's most trusted electrical contracting company, known for excellence, safety, and sustainable solutions.</p>
              </div>
            </SectionReveal>
            <SectionReveal delay={0.1}>
              <div className="rounded border border-border bg-card p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded bg-brand-red/10 text-brand-red">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/></svg>
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground">Our Mission</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">To deliver safe, reliable, and cost-effective electrical solutions while maintaining the highest standards of workmanship and customer satisfaction.</p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding">
        <div className="mx-auto max-w-3xl px-4 lg:px-6">
          <SectionReveal>
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-red">Our Journey</span>
              <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">Key Milestones</h2>
            </div>
          </SectionReveal>
          <div className="mt-12">
            {timeline.map((item, i) => (
              <SectionReveal key={item.year} delay={i * 0.05}>
                <div className="relative flex gap-6 pb-8 last:pb-0">
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-brand-red text-xs font-bold text-brand-red-foreground">
                      {item.year.slice(2)}
                    </div>
                    {i < timeline.length - 1 && <div className="w-px flex-1 bg-border" />}
                  </div>
                  <div className="pb-4">
                    <div className="text-xs font-bold text-brand-red">{item.year}</div>
                    <h3 className="font-heading text-base font-bold text-foreground">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-padding bg-surface-elevated">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <SectionReveal>
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-red">Certifications</span>
              <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">Licenses & Accreditations</h2>
            </div>
          </SectionReveal>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((s, i) => (
              <SectionReveal key={s} delay={i * 0.05}>
                <div className="flex items-center gap-3 rounded border border-border bg-card p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-brand-red text-brand-red-foreground">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <span className="text-sm font-medium text-foreground">{s}</span>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection variant="dark" />
    </>
  );
}
