import { Link } from "react-router-dom";
import { SectionReveal } from "./SectionReveal";

interface ProjectCardProps {
  id: string;
  title: string;
  client: string;
  category: string;
  image: string;
  location?: string;
  delay?: number;
}

export function ProjectCard({ id, title, client, category, image, location, delay = 0 }: ProjectCardProps) {
  const isOngoing = category === "Ongoing";

  return (
    <SectionReveal delay={delay}>
      <Link to={`/projects/${id}`} className="project-card group block overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/30 hover:shadow-lg">
        {/* Image container with overlay */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          {/* Dark gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

          {/* Category badge — top-left */}
          <div className="absolute left-3 top-3">
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur-sm ${isOngoing ? "bg-brand-red text-white" : "bg-brand-yellow text-brand-yellow-foreground"}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${isOngoing ? "bg-white animate-pulse" : "bg-brand-yellow-foreground"}`} />
              {category}
            </span>
          </div>

          {/* Hover CTA — bottom center */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
            <span className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-brand-dark shadow-lg">
              View Details
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <h3 className="font-heading text-base font-bold text-card-foreground transition-colors group-hover:text-brand-red sm:text-lg">
            {title}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg>
              {client}
            </span>
            {location && (
              <span className="inline-flex items-center gap-1.5">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>
                {location}
              </span>
            )}
          </div>
        </div>
      </Link>
    </SectionReveal>
  );
}
