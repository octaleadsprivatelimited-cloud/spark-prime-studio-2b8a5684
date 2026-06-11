import { Link } from "react-router-dom";
import { PageHead } from "../components/PageHead";
import { useState } from "react";
import { SectionReveal } from "../components/SectionReveal";
import { ProjectCard } from "../components/ProjectCard";
import { CTASection } from "../components/CTASection";
import { useProjects } from "../lib/content";

const categories = ["All", "Completed", "Ongoing"];

function ProjectsPage() {
  const { items: projectsData } = useProjects();
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? projectsData : projectsData.filter((p) => p.category === filter);

  return (
    <>
      <PageHead title="Our Projects — Nataraj Electricals" description="Explore our portfolio of industrial, government, and commercial electrical projects across Karnataka." />

      <section className="section-dark">
        <div className="mx-auto max-w-7xl px-4 py-16 lg:px-6 lg:py-20">
          <SectionReveal>
            <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider opacity-50">
              <Link to="/" className="hover:opacity-100">Home</Link><span>/</span><span>Projects</span>
            </div>
            <h1 className="mt-4 font-heading text-4xl font-extrabold md:text-5xl">Our Projects</h1>
            <p className="mt-3 max-w-xl text-base opacity-60">500+ successfully completed electrical projects.</p>
          </SectionReveal>
        </div>
      </section>
      <div className="section-divider" />

      <section className="section-padding">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          {/* Filter tabs */}
          <div className="tab-nav mb-10">
            {categories.map((c) => (
              <button key={c} onClick={() => setFilter(c)} className={`tab-item ${filter === c ? "active" : ""}`}>
                {c}
              </button>
            ))}
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} {...p} delay={i * 0.05} />
            ))}
          </div>
        </div>
      </section>

      <CTASection variant="dark" />
    </>
  );
}

export default ProjectsPage;
