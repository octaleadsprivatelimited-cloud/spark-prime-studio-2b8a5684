import { useState, useMemo, FormEvent } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuthUser, adminSignOut } from "../lib/adminAuth";
import {
  useProjects,
  useServices,
  useClients,
  useTestimonials,
  useHeroSlides,
  useInquiries,
  saveDoc,
  removeDoc,
  seedCollection,
  DEFAULT_PROJECTS,
  DEFAULT_SERVICES,
  DEFAULT_CLIENTS,
  DEFAULT_TESTIMONIALS,
  DEFAULT_HERO_SLIDES,
  Project,
  Service,
  Client,
  Testimonial,
  HeroSlide,
} from "../lib/content";
import { PageHead } from "../components/PageHead";

type Tab = "projects" | "services" | "clients" | "testimonials" | "hero" | "inquiries";

const TABS: { id: Tab; label: string }[] = [
  { id: "projects", label: "Projects" },
  { id: "services", label: "Services" },
  { id: "clients", label: "Clients" },
  { id: "testimonials", label: "Testimonials" },
  { id: "hero", label: "Hero Slides" },
  { id: "inquiries", label: "Inquiries" },
];

export default function AdminPage() {
  const { user, loading } = useAuthUser();
  const [tab, setTab] = useState<Tab>("projects");

  if (loading) return <div className="min-h-screen" />;
  if (!user) return <Navigate to="/admin/login" replace />;

  return (
    <>
      <PageHead title="Admin — Nataraj Electricals" description="Content management" />
      <div className="min-h-screen bg-surface-elevated">
        <header className="border-b border-border bg-card">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-6">
            <div className="flex items-center gap-3">
              <Link to="/" className="font-heading text-lg font-extrabold text-foreground">Nataraj Admin</Link>
              <span className="rounded bg-brand-red/10 px-2 py-0.5 text-xs font-bold text-brand-red">CMS</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden text-xs text-muted-foreground sm:inline">{user.email}</span>
              <Link to="/" className="text-xs font-medium text-muted-foreground hover:text-foreground">View Site</Link>
              <button onClick={() => adminSignOut()} className="rounded border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-muted">
                Sign Out
              </button>
            </div>
          </div>
          <nav className="mx-auto max-w-7xl overflow-x-auto px-4 lg:px-6">
            <div className="flex gap-1 pb-1">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`whitespace-nowrap rounded-t px-4 py-2 text-sm font-medium transition-colors ${
                    tab === t.id
                      ? "border-b-2 border-brand-red text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </nav>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
          {tab === "projects" && <ProjectsAdmin />}
          {tab === "services" && <ServicesAdmin />}
          {tab === "clients" && <ClientsAdmin />}
          {tab === "testimonials" && <TestimonialsAdmin />}
          {tab === "hero" && <HeroAdmin />}
          {tab === "inquiries" && <InquiriesAdmin />}
        </main>
      </div>
    </>
  );
}

// ============= Shared UI =============
function Card(props: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-lg border border-border bg-card p-5 ${props.className ?? ""}`}>{props.children}</div>;
}

function Label({ children }: { children: React.ReactNode }) {
  return <span className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">{children}</span>;
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`mt-1 w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-brand-red ${props.className ?? ""}`}
    />
  );
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`mt-1 w-full rounded border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-brand-red ${props.className ?? ""}`}
    />
  );
}

function SeedNotice({ collectionName, defaults }: { collectionName: string; defaults: { id: string }[] }) {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  async function seed() {
    setLoading(true);
    setMsg(null);
    try {
      await seedCollection(collectionName, defaults as never);
      setMsg("Seeded successfully.");
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Failed");
    } finally {
      setLoading(false);
    }
  }
  return (
    <Card className="mb-5 border-dashed">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-foreground">Showing default content</p>
          <p className="text-xs text-muted-foreground">This collection is empty in Firestore. Seed defaults to start editing.</p>
        </div>
        <button onClick={seed} disabled={loading} className="btn-primary !py-2 !px-4 !text-xs disabled:opacity-50">
          {loading ? "Seeding…" : "Seed defaults"}
        </button>
      </div>
      {msg && <p className="mt-2 text-xs text-muted-foreground">{msg}</p>}
    </Card>
  );
}

function ErrorBox({ message }: { message: string }) {
  return <div className="mb-4 rounded bg-brand-red/10 px-3 py-2 text-xs text-brand-red">{message}</div>;
}

function useSaveHandler() {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  async function run(fn: () => Promise<void>) {
    setSaving(true);
    setError(null);
    try {
      await fn();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed");
    } finally {
      setSaving(false);
    }
  }
  return { saving, error, run };
}

function genId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}`;
}

// ============= Projects =============
function ProjectsAdmin() {
  const { items, isFromFirestore } = useProjects();
  const [editing, setEditing] = useState<Project | null>(null);
  return (
    <div>
      {!isFromFirestore && <SeedNotice collectionName="site_projects" defaults={DEFAULT_PROJECTS} />}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-heading text-xl font-bold text-foreground">Projects ({items.length})</h2>
        <button
          onClick={() => setEditing({ id: genId("p"), title: "", client: "", category: "Completed", image: "", description: "", order: items.length })}
          className="btn-primary !py-2 !px-4 !text-xs"
        >
          + Add Project
        </button>
      </div>
      <div className="grid gap-3">
        {items.map((p) => (
          <Card key={p.id} className="flex items-center gap-4">
            <img src={p.image} alt="" className="h-14 w-20 shrink-0 rounded object-cover" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="rounded bg-brand-red/10 px-2 py-0.5 text-[10px] font-bold uppercase text-brand-red">{p.category}</span>
                <p className="truncate text-sm font-bold text-foreground">{p.title}</p>
              </div>
              <p className="truncate text-xs text-muted-foreground">{p.client}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditing({ ...p })} className="rounded border border-border bg-background px-3 py-1.5 text-xs hover:bg-muted">Edit</button>
              {isFromFirestore && (
                <button
                  onClick={async () => { if (confirm(`Delete "${p.title}"?`)) await removeDoc("site_projects", p.id); }}
                  className="rounded border border-brand-red/30 bg-background px-3 py-1.5 text-xs text-brand-red hover:bg-brand-red/10"
                >
                  Delete
                </button>
              )}
            </div>
          </Card>
        ))}
      </div>
      {editing && (
        <ProjectEditor
          initial={editing}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}

function ProjectEditor({ initial, onClose }: { initial: Project; onClose: () => void }) {
  const [p, setP] = useState<Project>(initial);
  const { saving, error, run } = useSaveHandler();
  async function save() {
    await run(async () => {
      await saveDoc("site_projects", p);
      onClose();
    });
  }
  return (
    <Modal title={initial.title ? "Edit Project" : "Add Project"} onClose={onClose}>
      {error && <ErrorBox message={error} />}
      <div className="space-y-3">
        <div><Label>Title</Label><Input value={p.title} onChange={(e) => setP({ ...p, title: e.target.value })} /></div>
        <div><Label>Client</Label><Input value={p.client} onChange={(e) => setP({ ...p, client: e.target.value })} /></div>
        <div>
          <Label>Category</Label>
          <select value={p.category} onChange={(e) => setP({ ...p, category: e.target.value })} className="mt-1 w-full rounded border border-border bg-background px-3 py-2 text-sm">
            <option>Completed</option>
            <option>Ongoing</option>
          </select>
        </div>
        <div><Label>Image URL</Label><Input value={p.image} onChange={(e) => setP({ ...p, image: e.target.value })} placeholder="https://..." /></div>
        <div><Label>Description</Label><TextArea rows={4} value={p.description} onChange={(e) => setP({ ...p, description: e.target.value })} /></div>
        <div><Label>Order</Label><Input type="number" value={p.order ?? 0} onChange={(e) => setP({ ...p, order: Number(e.target.value) })} /></div>
      </div>
      <ModalActions onCancel={onClose} onSave={save} saving={saving} />
    </Modal>
  );
}

// ============= Services =============
function ServicesAdmin() {
  const { items, isFromFirestore } = useServices();
  const [editing, setEditing] = useState<Service | null>(null);
  return (
    <div>
      {!isFromFirestore && <SeedNotice collectionName="site_services" defaults={DEFAULT_SERVICES} />}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-heading text-xl font-bold text-foreground">Services ({items.length})</h2>
        <button onClick={() => setEditing({ id: genId("s"), title: "", description: "", useCases: [], order: items.length })} className="btn-primary !py-2 !px-4 !text-xs">+ Add Service</button>
      </div>
      <div className="grid gap-3">
        {items.map((s) => (
          <Card key={s.id}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-bold text-foreground">{s.title}</p>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{s.description}</p>
                <p className="mt-1 text-[10px] text-muted-foreground">{s.useCases.length} applications</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button onClick={() => setEditing({ ...s, useCases: [...s.useCases] })} className="rounded border border-border bg-background px-3 py-1.5 text-xs">Edit</button>
                {isFromFirestore && (
                  <button onClick={async () => { if (confirm(`Delete "${s.title}"?`)) await removeDoc("site_services", s.id); }} className="rounded border border-brand-red/30 bg-background px-3 py-1.5 text-xs text-brand-red">Delete</button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
      {editing && <ServiceEditor initial={editing} onClose={() => setEditing(null)} />}
    </div>
  );
}

function ServiceEditor({ initial, onClose }: { initial: Service; onClose: () => void }) {
  const [s, setS] = useState<Service>(initial);
  const [casesText, setCasesText] = useState(initial.useCases.join("\n"));
  const { saving, error, run } = useSaveHandler();
  async function save() {
    await run(async () => {
      const useCases = casesText.split("\n").map((x) => x.trim()).filter(Boolean);
      await saveDoc("site_services", { ...s, useCases });
      onClose();
    });
  }
  return (
    <Modal title={initial.title ? "Edit Service" : "Add Service"} onClose={onClose}>
      {error && <ErrorBox message={error} />}
      <div className="space-y-3">
        <div><Label>Title</Label><Input value={s.title} onChange={(e) => setS({ ...s, title: e.target.value })} /></div>
        <div><Label>Description</Label><TextArea rows={4} value={s.description} onChange={(e) => setS({ ...s, description: e.target.value })} /></div>
        <div><Label>Applications (one per line)</Label><TextArea rows={5} value={casesText} onChange={(e) => setCasesText(e.target.value)} /></div>
        <div><Label>Order</Label><Input type="number" value={s.order ?? 0} onChange={(e) => setS({ ...s, order: Number(e.target.value) })} /></div>
      </div>
      <ModalActions onCancel={onClose} onSave={save} saving={saving} />
    </Modal>
  );
}

// ============= Clients =============
function ClientsAdmin() {
  const { items, isFromFirestore } = useClients();
  const [editing, setEditing] = useState<Client | null>(null);
  return (
    <div>
      {!isFromFirestore && <SeedNotice collectionName="site_clients" defaults={DEFAULT_CLIENTS} />}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-heading text-xl font-bold text-foreground">Clients ({items.length})</h2>
        <button onClick={() => setEditing({ id: genId("c"), name: "", order: items.length })} className="btn-primary !py-2 !px-4 !text-xs">+ Add Client</button>
      </div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c) => (
          <Card key={c.id} className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">{c.name}</span>
            <div className="flex gap-1">
              <button onClick={() => setEditing({ ...c })} className="rounded border border-border bg-background px-2 py-1 text-xs">Edit</button>
              {isFromFirestore && (
                <button onClick={async () => { if (confirm(`Delete ${c.name}?`)) await removeDoc("site_clients", c.id); }} className="rounded border border-brand-red/30 bg-background px-2 py-1 text-xs text-brand-red">Delete</button>
              )}
            </div>
          </Card>
        ))}
      </div>
      {editing && (
        <Modal title={initialTitle(editing.name, "Client")} onClose={() => setEditing(null)}>
          <ClientForm initial={editing} onClose={() => setEditing(null)} />
        </Modal>
      )}
    </div>
  );
}

function ClientForm({ initial, onClose }: { initial: Client; onClose: () => void }) {
  const [c, setC] = useState(initial);
  const { saving, error, run } = useSaveHandler();
  return (
    <>
      {error && <ErrorBox message={error} />}
      <div className="space-y-3">
        <div><Label>Name</Label><Input value={c.name} onChange={(e) => setC({ ...c, name: e.target.value })} /></div>
        <div><Label>Order</Label><Input type="number" value={c.order ?? 0} onChange={(e) => setC({ ...c, order: Number(e.target.value) })} /></div>
      </div>
      <ModalActions onCancel={onClose} saving={saving} onSave={() => run(async () => { await saveDoc("site_clients", c); onClose(); })} />
    </>
  );
}

// ============= Testimonials =============
function TestimonialsAdmin() {
  const { items, isFromFirestore } = useTestimonials();
  const [editing, setEditing] = useState<Testimonial | null>(null);
  return (
    <div>
      {!isFromFirestore && <SeedNotice collectionName="site_testimonials" defaults={DEFAULT_TESTIMONIALS} />}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-heading text-xl font-bold text-foreground">Testimonials ({items.length})</h2>
        <button onClick={() => setEditing({ id: genId("t"), quote: "", name: "", role: "", order: items.length })} className="btn-primary !py-2 !px-4 !text-xs">+ Add Testimonial</button>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {items.map((t) => (
          <Card key={t.id}>
            <p className="text-sm text-muted-foreground">"{t.quote}"</p>
            <p className="mt-3 text-sm font-bold text-foreground">{t.name}</p>
            <p className="text-xs text-muted-foreground">{t.role}</p>
            <div className="mt-3 flex gap-2">
              <button onClick={() => setEditing({ ...t })} className="rounded border border-border bg-background px-3 py-1.5 text-xs">Edit</button>
              {isFromFirestore && (
                <button onClick={async () => { if (confirm("Delete?")) await removeDoc("site_testimonials", t.id); }} className="rounded border border-brand-red/30 bg-background px-3 py-1.5 text-xs text-brand-red">Delete</button>
              )}
            </div>
          </Card>
        ))}
      </div>
      {editing && (
        <Modal title={initialTitle(editing.name, "Testimonial")} onClose={() => setEditing(null)}>
          <TestimonialForm initial={editing} onClose={() => setEditing(null)} />
        </Modal>
      )}
    </div>
  );
}

function TestimonialForm({ initial, onClose }: { initial: Testimonial; onClose: () => void }) {
  const [t, setT] = useState(initial);
  const { saving, error, run } = useSaveHandler();
  return (
    <>
      {error && <ErrorBox message={error} />}
      <div className="space-y-3">
        <div><Label>Quote</Label><TextArea rows={4} value={t.quote} onChange={(e) => setT({ ...t, quote: e.target.value })} /></div>
        <div><Label>Name</Label><Input value={t.name} onChange={(e) => setT({ ...t, name: e.target.value })} /></div>
        <div><Label>Role</Label><Input value={t.role} onChange={(e) => setT({ ...t, role: e.target.value })} /></div>
        <div><Label>Order</Label><Input type="number" value={t.order ?? 0} onChange={(e) => setT({ ...t, order: Number(e.target.value) })} /></div>
      </div>
      <ModalActions onCancel={onClose} saving={saving} onSave={() => run(async () => { await saveDoc("site_testimonials", t); onClose(); })} />
    </>
  );
}

// ============= Hero =============
function HeroAdmin() {
  const { items, isFromFirestore } = useHeroSlides();
  const [editing, setEditing] = useState<HeroSlide | null>(null);
  return (
    <div>
      {!isFromFirestore && <SeedNotice collectionName="site_hero_slides" defaults={DEFAULT_HERO_SLIDES} />}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-heading text-xl font-bold text-foreground">Hero Slides ({items.length})</h2>
        <button onClick={() => setEditing({ id: genId("h"), image: "", subtitle: "", title: "", description: "", cta: "Get a Quote", ctaLink: "/contact", order: items.length })} className="btn-primary !py-2 !px-4 !text-xs">+ Add Slide</button>
      </div>
      <div className="grid gap-3">
        {items.map((h) => (
          <Card key={h.id} className="flex gap-4">
            <img src={h.image} alt="" className="h-20 w-32 shrink-0 rounded object-cover" />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase text-brand-red">{h.subtitle}</p>
              <p className="truncate font-bold text-foreground">{h.title.replace(/\n/g, " · ")}</p>
              <p className="line-clamp-2 text-xs text-muted-foreground">{h.description}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button onClick={() => setEditing({ ...h })} className="rounded border border-border bg-background px-3 py-1.5 text-xs">Edit</button>
              {isFromFirestore && (
                <button onClick={async () => { if (confirm("Delete slide?")) await removeDoc("site_hero_slides", h.id); }} className="rounded border border-brand-red/30 bg-background px-3 py-1.5 text-xs text-brand-red">Delete</button>
              )}
            </div>
          </Card>
        ))}
      </div>
      {editing && <HeroEditor initial={editing} onClose={() => setEditing(null)} />}
    </div>
  );
}

function HeroEditor({ initial, onClose }: { initial: HeroSlide; onClose: () => void }) {
  const [h, setH] = useState(initial);
  const { saving, error, run } = useSaveHandler();
  return (
    <Modal title={initial.title ? "Edit Slide" : "Add Slide"} onClose={onClose}>
      {error && <ErrorBox message={error} />}
      <div className="space-y-3">
        <div><Label>Image URL</Label><Input value={h.image} onChange={(e) => setH({ ...h, image: e.target.value })} /></div>
        <div><Label>Subtitle (small tag)</Label><Input value={h.subtitle} onChange={(e) => setH({ ...h, subtitle: e.target.value })} /></div>
        <div><Label>Title (use \n for line breaks)</Label><TextArea rows={3} value={h.title} onChange={(e) => setH({ ...h, title: e.target.value })} /></div>
        <div><Label>Description</Label><TextArea rows={3} value={h.description} onChange={(e) => setH({ ...h, description: e.target.value })} /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><Label>CTA Text</Label><Input value={h.cta} onChange={(e) => setH({ ...h, cta: e.target.value })} /></div>
          <div><Label>CTA Link</Label><Input value={h.ctaLink} onChange={(e) => setH({ ...h, ctaLink: e.target.value })} /></div>
        </div>
        <div><Label>Order</Label><Input type="number" value={h.order ?? 0} onChange={(e) => setH({ ...h, order: Number(e.target.value) })} /></div>
      </div>
      <ModalActions onCancel={onClose} saving={saving} onSave={() => run(async () => { await saveDoc("site_hero_slides", h); onClose(); })} />
    </Modal>
  );
}

// ============= Inquiries =============
function InquiriesAdmin() {
  const { items, loading, error } = useInquiries();
  const sorted = useMemo(() => items, [items]);
  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-heading text-xl font-bold text-foreground">Contact Inquiries ({items.length})</h2>
      </div>
      {error && <ErrorBox message={`${error}. Ensure Firestore rules allow authenticated reads of "contact_submissions".`} />}
      {loading && <p className="text-sm text-muted-foreground">Loading…</p>}
      <div className="grid gap-3">
        {sorted.map((i) => (
          <Card key={i.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-bold text-foreground">{i.name}</p>
                <p className="text-xs text-muted-foreground">
                  <a href={`tel:${i.phone}`} className="hover:text-brand-red">{i.phone}</a>
                  {" · "}
                  <a href={`mailto:${i.email}`} className="hover:text-brand-red">{i.email}</a>
                </p>
              </div>
              <span className="text-[10px] text-muted-foreground">
                {i.createdAt?.toDate ? i.createdAt.toDate().toLocaleString() : ""}
              </span>
            </div>
            <p className="mt-3 whitespace-pre-wrap text-sm text-muted-foreground">{i.message}</p>
            <div className="mt-3 flex gap-2">
              <button onClick={async () => { if (confirm("Delete this inquiry?")) await removeDoc("contact_submissions", i.id); }} className="rounded border border-brand-red/30 bg-background px-3 py-1.5 text-xs text-brand-red">Delete</button>
            </div>
          </Card>
        ))}
        {!loading && items.length === 0 && !error && (
          <p className="text-sm text-muted-foreground">No inquiries yet.</p>
        )}
      </div>
    </div>
  );
}

// ============= Modal =============
function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg border border-border bg-card p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-heading text-lg font-bold text-foreground">{title}</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function ModalActions({ onCancel, onSave, saving }: { onCancel: () => void; onSave: () => void; saving: boolean }) {
  return (
    <div className="mt-5 flex justify-end gap-2 border-t border-border pt-4">
      <button onClick={onCancel} className="rounded border border-border bg-background px-4 py-2 text-xs font-medium hover:bg-muted">Cancel</button>
      <button onClick={onSave} disabled={saving} className="btn-primary !py-2 !px-4 !text-xs disabled:opacity-50">{saving ? "Saving…" : "Save"}</button>
    </div>
  );
}

function initialTitle(name: string, kind: string) {
  return name ? `Edit ${kind}` : `Add ${kind}`;
}