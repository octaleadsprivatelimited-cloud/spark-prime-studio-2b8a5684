import { Link } from "react-router-dom";
import { PageHead } from "../components/PageHead";
import { useState } from "react";
import { SectionReveal } from "../components/SectionReveal";
import { ProjectCard } from "../components/ProjectCard";
import { CTASection } from "../components/CTASection";

export const projectsData = [
  // Ongoing
  { id: "o1", title: "Bannergatta Biological Park Electrification", client: "Bannergatta Biological Park", category: "Ongoing", image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600&q=80", description: "Ongoing electrical infrastructure development, cable routing and lighting solutions." },
  { id: "o2", title: "Cyient DLM Mysore Ongoing Phase", client: "Cyient DLM, Mysore", category: "Ongoing", image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80", description: "Ongoing turnkey electrical layout, panel boards installation, and machinery power setup." },
  { id: "o3", title: "SLN Vlog Office Setup", client: "SLN Vlog", category: "Ongoing", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80", description: "Ongoing comprehensive wiring, switchgear setup, and testing." },

  // Completed
  { id: "c1", title: "Tatsuno India Facility Electrification", client: "Tatsuno India Pvt. Ltd", category: "Completed", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80", description: "Turnkey electrical setup and H.T/L.T installations." },
  { id: "c2", title: "Oilco India Electrification Project", client: "Oilco India Pvt. Ltd.", category: "Completed", image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=600&q=80", description: "Complete industrial cabling, safety earthing and approvals." },
  { id: "c3", title: "GKB Vision Rx Lab Setup", client: "GKB Vision Rx Lab", category: "Completed", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80", description: "Specialized precision laboratory wiring and cleanroom electrical setup." },
  { id: "c4", title: "Mettlor Toledo Facility Electrification", client: "Mettlor Toledo Pvt. Ltd.", category: "Completed", image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&q=80", description: "High-grade industrial power solution and control panel setup." },
  { id: "c5", title: "Havells India Bangalore Facility", client: "Havells India Pvt. Ltd.", category: "Completed", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80", description: "Turnkey warehouse and corporate workspace electrification." },
  { id: "c6", title: "Excubator Consultants Office", client: "Excubator Consultants", category: "Completed", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80", description: "Modern IT consultancy office electrical fit-outs and internal cabling." },
  { id: "c7", title: "FTD Infocom Corporate Office", client: "FTD Infocom Pvt. Ltd.", category: "Completed", image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&q=80", description: "Power backup systems, server room wiring, and workspace lighting." },
  { id: "c8", title: "Vision Eye Tech Hospital Setup", client: "Vision Eye Tech", category: "Completed", image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&q=80", description: "Critical care medical grade power supply system installation." },
  { id: "c9", title: "GKB Lense Mysore Factory", client: "GKB Lense Pvt. Ltd.", category: "Completed", image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80", description: "Industrial machinery electrification and utility power supply." },
  { id: "c10", title: "RTO Nelamangala Government Project", client: "RTO, Nelamangala", category: "Completed", image: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=600&q=80", description: "Government office complete electrification and lighting setup." },
  { id: "c11", title: "DC Office Kolar Electrification", client: "DC office, Kolara", category: "Completed", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80", description: "District Commissioner's office HT substation and LT distribution panels." },
  { id: "c12", title: "ITI College Sidlagatta Infrastructure", client: "ITI college, Sidlagatta", category: "Completed", image: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80", description: "Educational campus wiring, laboratory electrical boards and safety checks." },
  { id: "c13", title: "CISF 4th Reserve Battalion Base", client: "CISF 4th Reserve Battalion, Karaikudi", category: "Completed", image: "https://images.unsplash.com/photo-1508847154043-be12a62861c1?w=600&q=80", description: "Large-scale barracks lighting, security grids power management, and cabling." },
  { id: "c14", title: "Sonata Software Hyderabad Office", client: "Sonata Software", category: "Completed", image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80", description: "State-of-the-art software park workspace distribution boards and lighting design." },
  { id: "c15", title: "TAPCMC Complex Development", client: "TAPCMC complex, Hosakote", category: "Completed", image: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=600&q=80", description: "Commercial market yard HT transformer installation and exterior illumination." },
  { id: "c16", title: "ITI College Gudibande Setup", client: "ITI college, Gudibande", category: "Completed", image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=80", description: "Campus-wide cabling, workshop setups, and statutory BESCOM safety clearances." },
  { id: "c17", title: "SVC Bank Hosakote Branch", client: "SVC bank, Hosakote", category: "Completed", image: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=600&q=80", description: "Banking sector safe room, UPS installation, and backup energy setup." },
  { id: "c18", title: "TCARD Bank Chikkaballapur Branch", client: "TCARD Bank ltd., Chikkaballapur", category: "Completed", image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&q=80", description: "Complete building renovation wiring and statutory approvals." },
  { id: "c19", title: "Inframart Realtech Commercial Hub", client: "Inframart Realtech India Pvt Ltd.", category: "Completed", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80", description: "Commercial space design, planning, erection, and commissioning." },
  { id: "c20", title: "Inart Infrastructure Projects", client: "Inart Infrastructure", category: "Completed", image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80", description: "Turnkey infrastructure power setups and high-voltage panels." },
  { id: "c21", title: "KSSFCL Corporate Office", client: "KSSFCL, Bangalore", category: "Completed", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80", description: "State government building internal wiring and power panels setup." },
  { id: "c22", title: "TVS Motor Factory Electrification", client: "TVS Motor Company Ltd.", category: "Completed", image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80", description: "Heavy machinery control boards, load balancing and sub-stations." },
  { id: "c23", title: "BIRA BIAL Airport Project", client: "BIAL, Bangalore", category: "Completed", image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80", description: "Aviation sector specialized power grid setup and high tension cable layout." },
  { id: "c24", title: "Cargo Godown BIAL Setup", client: "BIAL, Bangalore", category: "Completed", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80", description: "High bay lighting solutions, backup generators and distribution grids." },
  { id: "c25", title: "Gokaldas Exports Factory Setup", client: "Gokaldas Exports Ltd.", category: "Completed", image: "https://images.unsplash.com/photo-1558441719-ff34b0524a24?w=600&q=80", description: "Industrial plant lighting grids, main switcher setups, and security compliance." },
  { id: "c26", title: "Paloma Factory Electrification", client: "Paloma Co. Pvt. Ltd", category: "Completed", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80", description: "Complete electrical planning, installation, testing and commissioning." },
  { id: "c27", title: "DC Office Hospet Infrastructure", client: "DC Office, Hospet", category: "Completed", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80", description: "Administrative headquarters structural wiring, BESCOM liaison and setup." },
  { id: "c28", title: "AC and SP Quarters Hospet", client: "AC and SP Quarters, Hospet", category: "Completed", image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80", description: "Government residential complex complete electrification." },
  { id: "c29", title: "Sonata Software Bangalore Campus", client: "Sonata Software, Bangalore", category: "Completed", image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&q=80", description: "Campus-wide uninterrupted power solution setup and building distribution systems." },
  { id: "c30", title: "Cyient Foundation Project", client: "Cyient Foundation", category: "Completed", image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=80", description: "CSR initiative community structures complete electrical layout." },
  { id: "c31", title: "Cyient DLM Mysore Plant Phase-I", client: "Cyient DLM, Mysore", category: "Completed", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80", description: "Erection of HT yards, transformer integration and safety audit clearance." }
];

const categories = ["All", "Completed", "Ongoing"];

function ProjectsPage() {
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
