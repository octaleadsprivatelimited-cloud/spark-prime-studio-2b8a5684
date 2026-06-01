import { Link } from "@tanstack/react-router";
import { SectionReveal } from "./SectionReveal";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

export function ServiceCard({ icon, title, description, delay = 0 }: ServiceCardProps) {
  return (
    <SectionReveal delay={delay}>
    <div className="service-card group glass">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded bg-brand-red/10 text-brand-red transition-colors group-hover:bg-brand-red group-hover:text-brand-red-foreground">
          {icon}
        </div>
        <h3 className="font-heading text-lg font-bold text-card-foreground">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
        <Link to="/contact" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-red hover:underline">
          Get Quote
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
        </Link>
      </div>
    </SectionReveal>
  );
}
