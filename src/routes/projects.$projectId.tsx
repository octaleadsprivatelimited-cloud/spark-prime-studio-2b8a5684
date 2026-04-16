import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionReveal } from "../components/SectionReveal";
import { CTASection } from "../components/CTASection";
import { projectsData } from "./projects";

export const Route = createFileRoute("/projects/$projectId")({
  head: ({ params }) => {
    const project = projectsData.find((p) => p.id === params.projectId);
    return {
      meta: [
        { title: `${project?.title ?? "Project"} — Nataraj Electricals` },
        { name: "description", content: project?.description ?? "View project details" },
        { property: "og:title", content: `${project?.title ?? "Project"} — Nataraj Electricals` },
        { property: "og:description", content: project?.description ?? "View project details" },
      ],
    };
  },
  component: ProjectDetailPage,
  notFoundComponent: ProjectNotFound,
});

function ProjectNotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <h1 className="font-heading text-4xl font-bold text-foreground">Project Not Found</h1>
        <p className="mt-2 text-muted-foreground">This project doesn't exist.</p>
        <Link to="/projects" className="btn-gradient mt-6 inline-flex rounded-xl px-6 py-3 text-sm font-semibold">
          View All Projects
        </Link>
      </div>
    </div>
  );
}

function ProjectDetailPage() {
  const { projectId } = Route.useParams();
  const project = projectsData.find((p) => p.id === projectId);

  if (!project) {
    return <ProjectNotFound />;
  }

  return (
    <>
      <section className="hero-gradient section-padding">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionReveal>
            <Link to="/projects" className="mb-4 inline-flex items-center gap-1 text-sm text-primary-foreground/60 hover:text-primary-foreground">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
              Back to Projects
            </Link>
            <span className="mt-2 inline-block rounded-full border border-primary-foreground/20 px-3 py-1 text-xs font-medium text-primary-foreground/70">
              {project.category}
            </span>
            <h1 className="mt-3 max-w-2xl font-heading text-4xl font-bold text-primary-foreground md:text-5xl">
              {project.title}
            </h1>
            <p className="mt-2 text-base text-primary-foreground/60">{project.client}</p>
          </SectionReveal>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="grid gap-10 md:grid-cols-3">
            <div className="md:col-span-2">
              <SectionReveal>
                <div className="overflow-hidden rounded-2xl">
                  <img src={project.image} alt={project.title} className="w-full object-cover" loading="lazy" />
                </div>
                <h2 className="mt-8 font-heading text-2xl font-bold text-foreground">Project Overview</h2>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{project.description}</p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  This project involved comprehensive electrical engineering and contracting services including design, procurement, installation, testing, and commissioning. Our team ensured strict compliance with Indian Electricity Rules and BESCOM regulations throughout the project lifecycle.
                </p>

                <h3 className="mt-8 font-heading text-xl font-bold text-foreground">Scope of Work</h3>
                <ul className="mt-3 space-y-2">
                  {["Electrical system design and SLD preparation", "HT/LT panel supply and installation", "Cable laying and termination", "Earthing and lightning protection", "Testing, commissioning, and handover"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <svg className="h-4 w-4 shrink-0 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </SectionReveal>
            </div>
            <div>
              <SectionReveal delay={0.1}>
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-muted-foreground">Project Details</h4>
                  <dl className="mt-4 space-y-4">
                    <div>
                      <dt className="text-xs text-muted-foreground">Client</dt>
                      <dd className="mt-0.5 text-sm font-medium text-foreground">{project.client}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-muted-foreground">Category</dt>
                      <dd className="mt-0.5 text-sm font-medium text-foreground">{project.category}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-muted-foreground">Location</dt>
                      <dd className="mt-0.5 text-sm font-medium text-foreground">Bangalore, Karnataka</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-muted-foreground">Status</dt>
                      <dd className="mt-0.5 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Completed</dd>
                    </div>
                  </dl>
                  <Link to="/contact" className="btn-gradient mt-6 flex w-full items-center justify-center rounded-xl py-3 text-sm font-semibold">
                    Get a Quote
                  </Link>
                </div>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
