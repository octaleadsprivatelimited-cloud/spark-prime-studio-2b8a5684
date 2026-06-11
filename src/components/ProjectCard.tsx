import { Link } from "react-router-dom";
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
      <Link to={`/projects/${id}`} className="project-card group glass">
        <div className="aspect-[4/3] overflow-hidden bg-muted">
          <img src={image} alt={title} className="h-full w-full object-cover" loading="lazy" />
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-brand-red" />
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-red">{category}</span>
          </div>
          <h3 className="mt-2 font-heading text-base font-bold text-card-foreground">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{client}</p>
        </div>
      </Link>
    </SectionReveal>
  );
}
