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
      <div className="card-hover group rounded-2xl border border-border bg-card p-6 md:p-8">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          {icon}
        </div>
        <h3 className="font-heading text-lg font-semibold text-card-foreground">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
        <Link
          to="/contact"
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-accent"
        >
          Get Quote
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>
    </SectionReveal>
  );
}
