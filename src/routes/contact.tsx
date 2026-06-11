import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SectionReveal } from "../components/SectionReveal";
import { submitContactForm, trackEvent } from "../lib/firebase";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Nataraj Electricals" },
      { name: "description", content: "Get in touch with Nataraj Electricals for electrical contracting in Bangalore. Free quote available." },
      { property: "og:title", content: "Contact Us — Nataraj Electricals" },
      { property: "og:description", content: "Contact us for a free consultation and project estimate." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section className="section-dark">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-6 lg:py-20">
          <SectionReveal>
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider opacity-50">
              <Link to="/" className="hover:opacity-100">Home</Link><span>/</span><span>Contact</span>
            </div>
            <h1 className="mt-4 font-heading text-4xl font-extrabold md:text-5xl">Contact Us</h1>
            <p className="mt-3 max-w-xl text-base opacity-60">Get a free consultation and project estimate.</p>
          </SectionReveal>
        </div>
      </section>
      <div className="section-divider" />

      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Form */}
            <div className="lg:col-span-3">
              <SectionReveal>
                <div className="rounded border border-border bg-card p-6 md:p-8">
                  <h2 className="font-heading text-2xl font-bold text-foreground">Send Us a Message</h2>
                  <p className="mt-1 text-sm text-muted-foreground">We'll get back to you within 24 hours.</p>

                  {submitted ? (
                    <div className="mt-8 rounded bg-brand-red/5 p-8 text-center">
                      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-red text-brand-red-foreground">
                        <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                      </div>
                      <h3 className="font-heading text-xl font-bold text-foreground">Thank You!</h3>
                      <p className="mt-2 text-sm text-muted-foreground">We've received your message and will contact you shortly.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Full Name</label>
                          <input type="text" required maxLength={100} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-brand-red focus:ring-1 focus:ring-brand-red/20" placeholder="Your name" />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone Number</label>
                          <input type="tel" required maxLength={15} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-brand-red focus:ring-1 focus:ring-brand-red/20" placeholder="+91 98765 43210" />
                        </div>
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email Address</label>
                        <input type="email" required maxLength={255} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-brand-red focus:ring-1 focus:ring-brand-red/20" placeholder="you@example.com" />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Message</label>
                        <textarea required maxLength={1000} rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full resize-none rounded border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-brand-red focus:ring-1 focus:ring-brand-red/20" placeholder="Tell us about your project..." />
                      </div>
                      <button type="submit" className="btn-primary w-full justify-center">Send Message</button>
                    </form>
                  )}
                </div>
              </SectionReveal>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <SectionReveal delay={0.1}>
                <div className="space-y-5">
                  <div className="rounded border border-border bg-card p-6">
                    <h3 className="font-heading text-lg font-bold text-foreground">Office Address</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      #243/3/1/, 1st main, 1st cross,<br />
                      BEML layout 5th stage, Rajarajeshwarinagar,<br />
                      Bangalore – 560098, Karnataka, India
                    </p>
                  </div>
                  <div className="rounded border border-border bg-card p-6">
                    <h3 className="font-heading text-lg font-bold text-foreground">Quick Contact</h3>
                    <div className="mt-3 space-y-3">
                      <a href="tel:+919902012565" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground">
                        <span className="flex h-9 w-9 items-center justify-center rounded bg-brand-red/10 text-brand-red">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                        </span>
                        +91 99020 12565
                      </a>
                      <a href="mailto:Sarveshkumarbc90@gmail.com" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground">
                        <span className="flex h-9 w-9 items-center justify-center rounded bg-brand-red/10 text-brand-red">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                        </span>
                        Sarveshkumarbc90@gmail.com
                      </a>
                      <a href="https://wa.me/919902012565" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground">
                        <span className="flex h-9 w-9 items-center justify-center rounded bg-brand-red/10 text-brand-red">
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        </span>
                        WhatsApp Us
                      </a>
                    </div>
                  </div>
                  <div className="rounded border border-border bg-card p-6">
                    <h3 className="font-heading text-lg font-bold text-foreground">Statutory Details</h3>
                    <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                      <div className="flex justify-between gap-4"><span>Reg. Number</span><span className="font-semibold text-foreground text-right">Govt.Lic.Class-I, 1CL120193BNG</span></div>
                      <div className="flex justify-between gap-4"><span>GST Number</span><span className="font-semibold text-foreground text-right">29AICPC8434G1ZC</span></div>
                      <div className="flex justify-between gap-4"><span>PAN Card</span><span className="font-semibold text-foreground text-right">AICPC 8434 G</span></div>
                      <div className="flex justify-between gap-4"><span>Bank</span><span className="font-semibold text-foreground text-right">Indian Bank, Basavanagudi</span></div>
                    </div>
                  </div>
                  <div className="rounded border border-border bg-card p-6">
                    <h3 className="font-heading text-lg font-bold text-foreground">Business Hours</h3>
                    <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                      <div className="flex justify-between"><span>Mon – Sat</span><span className="font-medium text-foreground">9:00 AM – 6:00 PM</span></div>
                      <div className="flex justify-between"><span>Sunday</span><span className="font-medium text-foreground">Closed</span></div>
                      <div className="flex justify-between"><span>Emergency</span><span className="font-bold text-brand-red">24/7 Available</span></div>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            </div>
          </div>

          <SectionReveal>
            <div className="mt-12 overflow-hidden rounded border border-border">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.1!2d77.5!3d13.03!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAyJzI0LjAiTiA3N8KwMzAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1" width="100%" height="350" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Office Location" />
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
