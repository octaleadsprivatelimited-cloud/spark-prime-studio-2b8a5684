import { Link } from "@tanstack/react-router";
import { SectionReveal } from "./SectionReveal";

interface CTASectionProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonTo?: string;
}

export function CTASection({
  title = "Ready to Power Your Next Project?",
  description = "Get in touch with our expert team for a free consultation and project estimate.",
  buttonText = "Get a Quote",
  buttonTo = "/contact",
}: CTASectionProps) {
  return (
    <section className="hero-gradient section-padding">
      <div className="mx-auto max-w-3xl text-center">
        <SectionReveal>
          <h2 className="font-heading text-3xl font-bold text-primary-foreground md:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-base text-primary-foreground/75 md:text-lg">
            {description}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to={buttonTo as "/contact"}
              className="inline-flex items-center rounded-xl bg-primary-foreground px-8 py-3.5 text-sm font-semibold text-primary transition-all hover:bg-primary-foreground/90"
            >
              {buttonText}
            </Link>
            <a
              href="tel:+919876543210"
              className="inline-flex items-center gap-2 rounded-xl border border-primary-foreground/20 px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-foreground/10"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              Call Now
            </a>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
