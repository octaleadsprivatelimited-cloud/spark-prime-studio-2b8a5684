import { Link, useParams } from "react-router-dom";
import { SectionReveal } from "../components/SectionReveal";
import { CTASection } from "../components/CTASection";
import { PageHead } from "../components/PageHead";
import { useProjects } from "../lib/content";

function ProjectNotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <h1 className="font-heading text-4xl font-extrabold text-foreground">Project Not Found</h1>
        <Link to="/projects" className="btn-primary mt-6 inline-flex">View All Projects</Link>
      </div>
    </div>
  );
}

export default function ProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const { items: projectsData, loading } = useProjects();
  const project = projectsData.find((p) => p.id === projectId);
  if (loading && !project) return <div className="min-h-[60vh]" />;
  if (!project) return <ProjectNotFound />;

  return (
    <>
      <PageHead
        title={`${project.title} — Nataraj Electricals`}
        description={project.description}
        image={project.image}
      />
      <section className="section-dark">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-6 lg:py-20">
          <SectionReveal>
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider opacity-50">
              <Link to="/" className="hover:opacity-100">Home</Link><span>/</span>
              <Link to="/projects" className="hover:opacity-100">Projects</Link><span>/</span>
              <span>{project.title}</span>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <span className="rounded bg-brand-red px-3 py-1 text-xs font-bold uppercase text-brand-red-foreground">{project.category}</span>
            </div>
            <h1 className="mt-3 font-heading text-4xl font-extrabold md:text-5xl">{project.title}</h1>
            <p className="mt-2 text-base opacity-60">{project.client}</p>
          </SectionReveal>
        </div>
      </section>
      <div className="section-divider" />

      <section className="section-padding">
        <div className="mx-auto max-w-5xl px-4 lg:px-6">
          <div className="grid gap-10 md:grid-cols-3">
            <div className="md:col-span-2">
              <SectionReveal>
                <div className="overflow-hidden rounded">
                  <img src={project.image} alt={project.title} className="w-full object-cover" loading="lazy" />
                </div>
                <h2 className="mt-8 font-heading text-2xl font-bold text-foreground">Project Overview</h2>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground">{project.description}</p>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  This project involved comprehensive electrical engineering and contracting services including design, procurement, installation, testing, and commissioning with strict compliance to Indian Electricity Rules.
                </p>
                <h3 className="mt-8 font-heading text-xl font-bold text-foreground">Scope of Work</h3>
                <ul className="mt-3 space-y-2">
                  {["Electrical system design and SLD preparation", "HT/LT panel supply and installation", "Cable laying and termination", "Earthing and lightning protection", "Testing, commissioning, and handover"].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-brand-red/10 text-brand-red">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </SectionReveal>
            </div>
            <div>
              <SectionReveal delay={0.1}>
                <div className="rounded border border-border bg-card p-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Project Details</h4>
                  <dl className="mt-4 space-y-4">
                    {[
                      { dt: "Client", dd: project.client },
                      { dt: "Category", dd: project.category },
                      { dt: "Location", dd: "Bangalore, Karnataka" },
                    ].map((item) => (
                      <div key={item.dt}>
                        <dt className="text-xs text-muted-foreground">{item.dt}</dt>
                        <dd className="mt-0.5 text-sm font-medium text-foreground">{item.dd}</dd>
                      </div>
                    ))}
                    <div>
                      <dt className="text-xs text-muted-foreground">Status</dt>
                      <dd className="mt-0.5"><span className="inline-block rounded bg-brand-red/10 px-3 py-1 text-xs font-bold text-brand-red">Completed</span></dd>
                    </div>
                  </dl>
                  <Link to="/contact" className="btn-primary mt-6 w-full justify-center">Get a Quote</Link>
                </div>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>

      <CTASection variant="red" />
    </>
  );
}
