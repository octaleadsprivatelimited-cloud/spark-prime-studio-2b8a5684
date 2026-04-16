import { Link } from "@tanstack/react-router";
import { SectionReveal } from "./SectionReveal";

interface ProjectCardProps {
  id: string;
  title: string;
  client: string;
  category: string;
  image: string;
  delay?: number;
}

export function ProjectCard({ id, title, client, category, image, delay = 0 }: ProjectCardProps) {
  return (
    <SectionReveal delay={delay}>
      <Link to="/projects/$projectId" params={{ projectId: id }} className="card-hover group block overflow-hidden rounded-2xl border border-border bg-card">
        <div className="aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="p-5">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {category}
          </span>
          <h3 className="mt-2 font-heading text-base font-semibold text-card-foreground">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{client}</p>
        </div>
      </Link>
    </SectionReveal>
  );
}
