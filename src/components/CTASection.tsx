import { Link } from "react-router-dom";
import { SectionReveal } from "./SectionReveal";

interface CTASectionProps {
  title?: string;
  description?: string;
  variant?: "red" | "dark";
}

export function CTASection({
  title = "Ready to Power Your Next Project?",
  description = "Get in touch with our expert team for a free consultation and project estimate.",
  variant = "red",
}: CTASectionProps) {
  const isRed = variant === "red";
  return (
    <section className={isRed ? "section-red" : "section-dark"}>
      <div className="mx-auto max-w-4xl px-4 py-10 text-center sm:py-14 lg:px-6 lg:py-20">
        <SectionReveal>
          <h2 className="font-heading text-2xl font-bold sm:text-3xl md:text-4xl">{title}</h2>
          <p className="mt-3 text-sm opacity-75 sm:text-base md:text-lg">{description}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-8 sm:gap-4">
            <Link to="/contact" className={isRed ? "btn-white" : "btn-primary"}>
              Get a Quote
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
            </Link>
            <a href="tel:+919876543210" className="inline-flex items-center gap-2 whitespace-nowrap rounded border border-current/20 px-5 py-2.5 text-xs font-semibold opacity-80 transition-opacity hover:opacity-100 sm:px-6 sm:py-3 sm:text-sm">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              Call Now
            </a>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
