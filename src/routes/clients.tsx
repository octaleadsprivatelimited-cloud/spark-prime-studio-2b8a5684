import { Link } from "react-router-dom";
import { PageHead } from "../components/PageHead";
import { SectionReveal } from "../components/SectionReveal";
import { CTASection } from "../components/CTASection";
import { useClients, useTestimonials } from "../lib/content";

function ClientsPage() {
  const { items: clientLogosList } = useClients();
  const { items: testimonials } = useTestimonials();
  return (
    <>
      <PageHead title="Our Clients — Nataraj Electricals" description="Trusted by 200+ leading organizations including government bodies, industrial giants, and commercial enterprises." />

      <section className="section-dark">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:py-14 lg:px-6 lg:py-20">
          <SectionReveal>
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider opacity-50">
              <Link to="/" className="hover:opacity-100">Home</Link><span>/</span><span>Clients</span>
            </div>
            <h1 className="mt-4 font-heading text-4xl font-extrabold md:text-5xl">Our Clients</h1>
            <p className="mt-3 max-w-xl text-base opacity-60">Trusted by 200+ industry leaders across India.</p>
          </SectionReveal>
        </div>
      </section>
      <div className="section-divider" />

      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <SectionReveal><h2 className="text-center font-heading text-3xl font-bold text-foreground">Organizations We Serve</h2></SectionReveal>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {clientLogosList.map((c, i) => (
              <SectionReveal key={c.id} delay={i * 0.03}>
                <div className="flex h-24 items-center justify-center rounded border border-border bg-card px-6 transition-all hover:border-brand-red/20 hover:shadow-sm">
                  {c.logo ? (
                    <img
                      src={c.logo}
                      alt={c.name}
                      className="max-h-16 max-w-full object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <span className="font-heading text-base font-bold text-muted-foreground">{c.name}</span>
                  )}
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface-elevated overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <SectionReveal>
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-red">Testimonials</span>
              <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">What Our Clients Say</h2>
            </div>
          </SectionReveal>

          {/* Mobile: auto-scrolling marquee */}
          <div className="mt-10 md:hidden">
            <div className="flex w-[max-content] animate-marquee gap-5">
              {[...testimonials, ...testimonials].map((t, i) => (
                <div
                  key={`${t.id}-${i}`}
                  className="w-[280px] shrink-0 rounded-xl border border-border bg-card p-5 shadow-sm"
                >
                  <div className="mb-3 flex gap-1">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="h-4 w-4 text-brand-red" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{t.quote}</p>
                  <div className="mt-4 border-t border-border pt-4">
                    <div className="text-sm font-bold text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: 3-column grid */}
          <div className="mt-10 hidden gap-5 md:grid md:grid-cols-3">
            {testimonials.map((t, i) => (
              <SectionReveal key={t.id} delay={i * 0.1}>
                <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                  <div className="mb-3 flex gap-1">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="h-4 w-4 text-brand-red" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{t.quote}</p>
                  <div className="mt-4 border-t border-border pt-4">
                    <div className="text-sm font-bold text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
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

export default ClientsPage;
