import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  setDoc,
  deleteDoc,
  addDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";


// ============= Types =============
export type Project = {
  id: string;
  title: string;
  client: string;
  category: string; // "Completed" | "Ongoing"
  image: string;
  description: string;
  order?: number;
  featured?: boolean;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  useCases: string[];
  order?: number;
};

export type Client = {
  id: string;
  name: string;
  logo?: string; // data URL or remote URL
  order?: number;
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  order?: number;
};

export type HeroSlide = {
  id: string;
  image: string;
  subtitle: string;
  title: string;
  description: string;
  cta: string;
  ctaLink: string;
  order?: number;
};

export type Inquiry = {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  createdAt?: Timestamp;
  source?: string;
};

// ============= Defaults (used when Firestore collection empty) =============
export const DEFAULT_PROJECTS: Project[] = [
  { id: "o1", title: "Bannergatta Biological Park Electrification", client: "Bannergatta Biological Park", category: "Ongoing", image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600&q=80", description: "Ongoing electrical infrastructure development, cable routing and lighting solutions." },
  { id: "o2", title: "Cyient DLM Mysore Ongoing Phase", client: "Cyient DLM, Mysore", category: "Ongoing", image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80", description: "Ongoing turnkey electrical layout, panel boards installation, and machinery power setup." },
  { id: "o3", title: "SLN Vlog Office Setup", client: "SLN Vlog", category: "Ongoing", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80", description: "Ongoing comprehensive wiring, switchgear setup, and testing." },
  { id: "c1", title: "Tatsuno India Facility Electrification", client: "Tatsuno India Pvt. Ltd", category: "Completed", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80", description: "Turnkey electrical setup and H.T/L.T installations." },
  { id: "c2", title: "Oilco India Electrification Project", client: "Oilco India Pvt. Ltd.", category: "Completed", image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=600&q=80", description: "Complete industrial cabling, safety earthing and approvals." },
  { id: "c3", title: "GKB Vision Rx Lab Setup", client: "GKB Vision Rx Lab", category: "Completed", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80", description: "Specialized precision laboratory wiring and cleanroom electrical setup." },
  { id: "c4", title: "Mettlor Toledo Facility Electrification", client: "Mettlor Toledo Pvt. Ltd.", category: "Completed", image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&q=80", description: "High-grade industrial power solution and control panel setup." },
  { id: "c5", title: "Havells India Bangalore Facility", client: "Havells India Pvt. Ltd.", category: "Completed", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80", description: "Turnkey warehouse and corporate workspace electrification." },
  { id: "c22", title: "TVS Motor Factory Electrification", client: "TVS Motor Company Ltd.", category: "Completed", image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80", description: "Heavy machinery control boards, load balancing and sub-stations." },
  { id: "c23", title: "BIRA BIAL Airport Project", client: "BIAL, Bangalore", category: "Completed", image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80", description: "Aviation sector specialized power grid setup and high tension cable layout." },
];

export const DEFAULT_SERVICES: Service[] = [
  { id: "designs", title: "Designs", description: "Our engineers offer valuable design assistance. Keeping in mind today's hi-tech construction challenges, our experienced team provides timely solutions to owners and general contractors.", useCases: ["Concurrent designs", "Value engineering analysis", "Scheduling & Quality control", "Project peer reviews", "CAD design support"] },
  { id: "electrification", title: "Electrification", description: "We provide all types of electrical and related services ranging from H.T. and L.T Electrical Installations, Industrial wiring, Electrical Designing, Annual Maintenance, Approvals and the complete power solution.", useCases: ["H.T. & L.T. Electrical Installations", "Industrial wiring", "Electrical Designing", "Annual Maintenance", "Approvals & Liaisoning"] },
  { id: "power", title: "Complete power solution", description: "Proficient in delivering complete power solutions for industrial, residential and commercial buildings. We carry out load audits, complete installation as per code compliance and obtain approvals before commissioning.", useCases: ["Load audits", "Code compliance check", "Industrial buildings", "Commercial & residential complexes", "Pre-commissioning approvals"] },
  { id: "pm", title: "Project management", description: "Complete project management from installation to planning, inspection and testing. Our site engineer handles construction activities and major decisions on contract works.", useCases: ["Site-based management", "Cable pulling & wiring", "Heavy lifting & scaffolding", "Lightning protection", "Slab work"] },
  { id: "amc", title: "AMC management", description: "Regular maintenance services through our Annual Maintenance Contract (AMC) Services program. Preventive, breakdown and routine maintenance for critical electrical installations.", useCases: ["Preventive maintenance", "Breakdown maintenance", "Routine inspections", "Custom AMC packages"] },
  { id: "bescom", title: "Bescom Approvals", description: "Every infrastructure or government project we handle is undertaken after electrical inspected approval from BESCOM for HT connections.", useCases: ["BESCOM HT approvals", "Liaisoning with inspectors", "Statutory clearances", "Inspection audits"] },
];

export const DEFAULT_CLIENTS: Client[] = [
  { name: "Infosys", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/200px-Infosys_logo.svg.png" },
  { name: "Wipro", logo: "https://logo.clearbit.com/wipro.com" },
  { name: "HAL", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Hindustan_Aeronautics_Limited_Logo.svg/180px-Hindustan_Aeronautics_Limited_Logo.svg.png" },
  { name: "BEML", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8a/BEML_Logo.svg/240px-BEML_Logo.svg.png" },
  { name: "KPTCL", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/45/Karnataka_Power_Transmission_Corporation_Limited_Logo.png/200px-Karnataka_Power_Transmission_Corporation_Limited_Logo.png" },
  { name: "BEL", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/87/Bharat_Electronics_Logo.svg/220px-Bharat_Electronics_Logo.svg.png" },
  { name: "BHEL", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/Bharat_Heavy_Electricals_Limited_logo.svg/220px-Bharat_Heavy_Electricals_Limited_logo.svg.png" },
  { name: "L&T", logo: "https://logo.clearbit.com/larsentoubro.com" },
  { name: "Embassy Group", logo: "https://logo.clearbit.com/embassyindia.com" },
  { name: "Phoenix Group", logo: "https://logo.clearbit.com/thephoenixmills.com" },
  { name: "Prestige Group", logo: "https://logo.clearbit.com/prestigeconstructions.com" },
  { name: "Brigade Group", logo: "https://logo.clearbit.com/brigadegroup.com" },
  { name: "Govt. of Karnataka", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Seal_of_Karnataka.svg/200px-Seal_of_Karnataka.svg.png" },
  { name: "Indian Railways", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Indian_Railways.svg/200px-Indian_Railways.svg.png" },
  { name: "DRDO", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/79/Defence_Research_and_Development_Organisation_Logo.svg/200px-Defence_Research_and_Development_Organisation_Logo.svg.png" },
  { name: "Biocon", logo: "https://logo.clearbit.com/biocon.com" },
].map((c, i) => ({ id: `client-${i}`, name: c.name, logo: c.logo, order: i }));

const DEFAULT_CLIENT_LOGOS_BY_NAME = new Map(
  DEFAULT_CLIENTS.map((client) => [client.name.toLowerCase(), client.logo])
);

export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  { id: "t1", quote: "Nataraj Electricals delivered our factory electrification on time and within budget. Their HT systems expertise is unmatched.", name: "Rajesh Kumar", role: "Plant Manager, BEML" },
  { id: "t2", quote: "Professional, reliable, and safety-conscious. They've handled our AMC for 5 years with zero downtime.", name: "Priya Sharma", role: "Facilities Head, Embassy Group" },
  { id: "t3", quote: "From design to commissioning, their project management made our IT park electrification seamless.", name: "Arun Patel", role: "CTO, Techpark Solutions" },
];

export const DEFAULT_HERO_SLIDES: HeroSlide[] = [
  { id: "h1", image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1400&q=80", subtitle: "Government Licensed Class-I Contractor", title: "Powering India's\nInfrastructure", description: "Premium electrical contracting for industrial, commercial, and government projects across Karnataka.", cta: "Get a Quote", ctaLink: "/contact" },
  { id: "h2", image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1400&q=80", subtitle: "HT/LT Electrification Experts", title: "Precision.\nPerformance.\nPower.", description: "State-of-the-art switchgear and panel solutions with certified safety compliance.", cta: "Our Services", ctaLink: "/services" },
  { id: "h3", image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1400&q=80", subtitle: "15+ Years of Excellence", title: "Expert Team.\nExpert Solutions.", description: "50+ skilled engineers delivering end-to-end electrical project management.", cta: "View Projects", ctaLink: "/projects" },
];

// ============= Generic subscribe hook =============
function useCollection<T extends { id: string }>(
  name: string,
  defaults: T[],
  orderField: string = "order",
  orderDirection: "asc" | "desc" = "asc"
): { items: T[]; loading: boolean; isFromFirestore: boolean } {
  const [items, setItems] = useState<T[]>(defaults);
  const [loading, setLoading] = useState(true);
  const [isFromFirestore, setIsFromFirestore] = useState(false);

  useEffect(() => {
    const q = query(collection(db, name), orderBy(orderField, orderDirection));
    const unsub = onSnapshot(
      q,
      (snap) => {
        if (snap.empty) {
          setItems(defaults);
          setIsFromFirestore(false);
        } else {
          const docs = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<T, "id">) })) as T[];
          setItems(docs);
          setIsFromFirestore(true);
        }
        setLoading(false);
      },
      () => {
        // On permission error or otherwise, keep defaults
        setLoading(false);
      }
    );
    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  return { items, loading, isFromFirestore };
}

// ============= Public hooks =============
export const useProjects = () => useCollection<Project>("site_projects", DEFAULT_PROJECTS, "order", "desc");
export const useServices = () => useCollection<Service>("site_services", DEFAULT_SERVICES);
export const useClients = () => {
  const result = useCollection<Client>("site_clients", DEFAULT_CLIENTS);

  // One-time heal: if Firestore docs are missing a `logo` but we have a
  // default for that client name, write the logo back to Firestore so
  // Firebase becomes the source of truth.
  useEffect(() => {
    if (!result.isFromFirestore) return;
    const missing = result.items.filter(
      (c) => !c.logo && DEFAULT_CLIENT_LOGOS_BY_NAME.get(c.name.toLowerCase())
    );
    if (missing.length === 0) return;
    missing.forEach((c) => {
      const logo = DEFAULT_CLIENT_LOGOS_BY_NAME.get(c.name.toLowerCase());
      if (!logo) return;
      setDoc(
        doc(db, "site_clients", c.id),
        { logo, updatedAt: serverTimestamp() },
        { merge: true }
      ).catch(() => {
        /* ignore — falls back to client-side merge below */
      });
    });
  }, [result.isFromFirestore, result.items]);

  return {
    ...result,
    items: result.items.map((client) => ({
      ...client,
      logo: client.logo || DEFAULT_CLIENT_LOGOS_BY_NAME.get(client.name.toLowerCase()),
    })),
  };
};
export const useTestimonials = () => useCollection<Testimonial>("site_testimonials", DEFAULT_TESTIMONIALS);
export const useHeroSlides = () => useCollection<HeroSlide>("site_hero_slides", DEFAULT_HERO_SLIDES);

export function useInquiries() {
  const [items, setItems] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const q = query(collection(db, "contact_submissions"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Inquiry, "id">) })));
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
    return unsub;
  }, []);
  return { items, loading, error };
}

// ============= Admin CRUD helpers =============
export async function saveDoc<T extends { id: string }>(
  collectionName: string,
  item: T
) {
  const { id, ...rest } = item;
  await setDoc(doc(db, collectionName, id), {
    ...rest,
    updatedAt: serverTimestamp(),
  });
}

export async function createDoc<T extends Record<string, unknown>>(
  collectionName: string,
  data: T
) {
  const ref = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function removeDoc(collectionName: string, id: string) {
  await deleteDoc(doc(db, collectionName, id));
}

// Seed defaults into a collection (used by admin "Initialize" button)
export async function seedCollection<T extends { id: string }>(
  collectionName: string,
  defaults: T[]
) {
  for (let i = 0; i < defaults.length; i++) {
    const { id, ...rest } = defaults[i];
    await setDoc(doc(db, collectionName, id), {
      ...rest,
      order: (rest as { order?: number }).order ?? i,
      createdAt: serverTimestamp(),
    });
  }
}

// ============= Settings =============
export type SiteSettings = {
  id: string;
  phone: string;
  email: string;
  address: string;
  gstNumber: string;
  regNumber: string;
  whatsappNumber: string;
  statYears: string;
  statProjects: string;
  statClients: string;
  statEngineers: string;
};

export const DEFAULT_SETTINGS: SiteSettings = {
  id: "main",
  phone: "+91 99020 12565",
  email: "Sarvesh@natarajelectricals.in",
  address: "#243/3/1/, 1st main, 1st cross, BEML layout 5th stage, Rajarajeshwarinagar, Bangalore – 560098",
  gstNumber: "29AICPC8434G1ZC",
  regNumber: "Govt.Lic.Class-I, 1CL120193BNG",
  whatsappNumber: "919902012565",
  statYears: "15+",
  statProjects: "500+",
  statClients: "200+",
  statEngineers: "50+",
};

export function useSettings() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "site_settings", "main"),
      (docSnap) => {
        if (docSnap.exists()) {
          setSettings({
            ...DEFAULT_SETTINGS,
            ...(docSnap.data() as Omit<SiteSettings, "id">),
            id: "main",
          });
        } else {
          setSettings(DEFAULT_SETTINGS);
        }
        setLoading(false);
      },
      () => {
        setLoading(false);
      }
    );
    return unsub;
  }, []);

  return { settings, loading };
}

export async function saveSettings(settings: SiteSettings) {
  const { id, ...rest } = settings;
  await setDoc(doc(db, "site_settings", "main"), {
    ...rest,
    updatedAt: serverTimestamp(),
  });
}