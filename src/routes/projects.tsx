import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SectionReveal } from "../components/SectionReveal";
import { ProjectCard } from "../components/ProjectCard";
import { CTASection } from "../components/CTASection";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Our Projects — Nataraj Electricals" },
      { name: "description", content: "Explore our portfolio of industrial, government, and commercial electrical projects across Karnataka." },
      { property: "og:title", content: "Our Projects — Nataraj Electricals" },
      { property: "og:description", content: "500+ completed electrical projects across industrial, commercial, and government sectors." },
    ],
  }),
  component: ProjectsPage,
});

export const projectsData = [
  { id: "1", title: "BEML Factory Electrification", client: "BEML Limited", category: "Industrial", image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80", description: "Complete HT/LT electrification for BEML manufacturing facility including 33kV substation." },
  { id: "2", title: "Vidhana Soudha Renovation", client: "Government of Karnataka", category: "Government", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&q=80", description: "Electrical renovation and modernization of heritage government building." },
  { id: "3", title: "Phoenix Mall Electrical", client: "Phoenix Group", category: "Commercial", image: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=600&q=80", description: "Complete electrical infrastructure for 500,000 sq ft commercial complex." },
  { id: "4", title: "HAL Power Distribution", client: "Hindustan Aeronautics", category: "Industrial", image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=600&q=80", description: "Power distribution network for HAL aerospace manufacturing division." },
  { id: "5", title: "IT Park Electrification", client: "Embassy Group", category: "Commercial", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80", description: "Complete electrical design and execution for 10-storey IT park." },
  { id: "6", title: "Government Hospital Power", client: "Dept. of Health", category: "Government", image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&q=80", description: "24/7 uninterrupted power supply system for 500-bed government hospital." },
];

const categories = ["All", "Industrial", "Government", "Commercial"];

function ProjectsPage() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? projectsData : projectsData.filter((p) => p.category === filter);

  return (
    <>
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
