import { useState, useMemo, createContext, useContext, useEffect } from "react";
import { Navigate, Link, NavLink, Outlet, useLocation } from "react-router-dom";
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
  SiteSettings,
  useSettings,
  saveSettings,
} from "../lib/content";
import { PageHead } from "../components/PageHead";
import { compressImage, CompressOptions } from "../lib/imageUpload";
import { useRef } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../components/ui/dropdown-menu";
import { Popover, PopoverTrigger, PopoverContent } from "../components/ui/popover";
import {
  LayoutGrid,
  Wrench,
  Users,
  MessageSquareQuote,
  Image as ImageIcon,
  Inbox,
  Search,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  ExternalLink,
} from "lucide-react";

type Tab = "projects" | "services" | "clients" | "testimonials" | "hero" | "inquiries" | "settings";

const TABS: { id: Tab; label: string; icon: typeof LayoutGrid; path: string }[] = [
  { id: "projects", label: "Projects", icon: LayoutGrid, path: "/admin/projects" },
  { id: "services", label: "Services", icon: Wrench, path: "/admin/services" },
  { id: "clients", label: "Leading Organizations", icon: Users, path: "/admin/clients" },
  { id: "testimonials", label: "Reviews", icon: MessageSquareQuote, path: "/admin/testimonials" },
  { id: "hero", label: "Hero", icon: ImageIcon, path: "/admin/hero" },
  { id: "inquiries", label: "Inquiries", icon: Inbox, path: "/admin/inquiries" },
  { id: "settings", label: "Settings", icon: Settings, path: "/admin/settings" },
];

// Microsoft Teams brand palette
const TEAMS = {
  rail: "#3d3e66",       // deep indigo rail
  railActive: "#4b53bc", // active purple
  topbar: "#5b5fc7",     // header purple
  panel: "#f5f5f5",      // app background
  card: "#ffffff",
};

// Search query shared across tabs
const SearchCtx = createContext<string>("");
export const useSearchQuery = () => useContext(SearchCtx);

export default function AdminPage() {
  const { user, loading } = useAuthUser();
  const [query, setQuery] = useState("");
  const { items: inquiryItems } = useInquiries();
  const unread = inquiryItems.length;
  const location = useLocation();

  if (loading) return <div className="min-h-screen" />;
  if (!user) return <Navigate to="/admin/login" replace />;

  // Redirect bare /admin → /admin/projects
  if (location.pathname === "/admin" || location.pathname === "/admin/") {
    return <Navigate to="/admin/projects" replace />;
  }

  const ActiveTab =
    TABS.find((t) => location.pathname.startsWith(t.path)) ?? TABS[0];

  async function seedAll() {
    await Promise.all([
      seedCollection("site_projects", DEFAULT_PROJECTS as never),
      seedCollection("site_services", DEFAULT_SERVICES as never),
      seedCollection("site_clients", DEFAULT_CLIENTS as never),
      seedCollection("site_testimonials", DEFAULT_TESTIMONIALS as never),
      seedCollection("site_hero_slides", DEFAULT_HERO_SLIDES as never),
    ]);
    alert("Seeded all default content.");
  }

  return (
    <>
      <PageHead title="Admin — Nataraj Electricals" description="Content management" />
      <div className="flex h-screen w-full flex-col overflow-hidden" style={{ background: TEAMS.panel }}>
        {/* Top command bar */}
        <header
          className="flex h-12 shrink-0 items-center gap-3 px-3 text-white"
          style={{ background: TEAMS.topbar }}
        >
          <Link to="/" className="flex items-center gap-2 pr-3 font-semibold tracking-tight">
            <span className="grid h-7 w-7 place-items-center rounded bg-white/15 text-[11px] font-extrabold">
              N
            </span>
            <span className="hidden sm:inline">Nataraj Workspace</span>
          </Link>
          <div className="mx-auto flex max-w-xl flex-1 items-center gap-2 rounded bg-white/15 px-3 py-1.5 text-sm text-white/90 focus-within:bg-white focus-within:text-foreground">
            <Search className="h-4 w-4" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${ActiveTab.label.toLowerCase()}…`}
              className="w-full bg-transparent text-sm placeholder-white/70 outline-none focus:placeholder-muted-foreground"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-xs opacity-70 hover:opacity-100"
                title="Clear"
              >
                ✕
              </button>
            )}
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <button
                className="relative grid h-8 w-8 place-items-center rounded hover:bg-white/15"
                title="Notifications"
              >
                <Bell className="h-4 w-4" />
                {unread > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand-red px-1 text-[10px] font-bold leading-none text-white">
                    {unread > 9 ? "9+" : unread}
                  </span>
                )}
              </button>
            </PopoverTrigger>
              <PopoverContent align="end" className="w-80 p-0">
                <div className="flex items-center justify-between border-b px-3 py-2">
                  <p className="text-sm font-semibold">Notifications</p>
                  <Link
                    to="/admin/inquiries"
                    className="text-xs text-primary hover:underline"
                  >
                    View all
                  </Link>
                </div>
              <div className="max-h-72 overflow-y-auto">
                {inquiryItems.length === 0 && (
                  <p className="px-3 py-6 text-center text-xs text-muted-foreground">
                    No new inquiries.
                  </p>
                )}
                  {inquiryItems.slice(0, 6).map((i) => (
                    <Link
                      key={i.id}
                      to="/admin/inquiries"
                      className="block w-full border-b px-3 py-2 text-left hover:bg-muted"
                    >
                      <p className="text-xs font-semibold text-foreground">{i.name}</p>
                      <p className="line-clamp-1 text-[11px] text-muted-foreground">{i.message}</p>
                    </Link>
                  ))}
              </div>
            </PopoverContent>
          </Popover>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="grid h-8 w-8 place-items-center rounded hover:bg-white/15"
                title="Settings"
              >
                <Settings className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Workspace settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={seedAll}>
                <LayoutGrid className="h-4 w-4" /> Seed all defaults
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/">
                  <ExternalLink className="h-4 w-4" /> View site
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="https://console.firebase.google.com/" target="_blank" rel="noreferrer">
                  <HelpCircle className="h-4 w-4" /> Firebase console
                </a>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => adminSignOut()}>
                <LogOut className="h-4 w-4" /> Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            to="/"
            className="hidden items-center gap-1.5 rounded px-2 py-1 text-xs hover:bg-white/15 sm:flex"
            title="View site"
          >
            <ExternalLink className="h-3.5 w-3.5" /> View site
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="grid h-8 w-8 place-items-center rounded-full bg-white/20 text-xs font-bold uppercase hover:bg-white/30"
                title={user.email ?? ""}
              >
                {(user.email ?? "?").slice(0, 1)}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
              <div className="px-2 py-2">
                <p className="text-sm font-semibold text-foreground">Signed in</p>
                <p className="truncate text-xs text-muted-foreground">{user.email}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/">
                  <ExternalLink className="h-4 w-4" /> View site
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => adminSignOut()}>
                <LogOut className="h-4 w-4" /> Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Main shell: left rail + content */}
        <div className="flex min-h-0 flex-1">
          {/* Activity rail (Teams style) */}
          <nav
            className="flex w-[68px] shrink-0 flex-col items-stretch justify-between py-2 text-white"
            style={{ background: TEAMS.rail }}
          >
            <ul className="flex flex-col">
              {TABS.map((t) => {
                const Icon = t.icon;
                return (
                  <li key={t.id} className="relative">
                    <NavLink
                      to={t.path}
                      className={({ isActive }) =>
                        `flex w-full flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors ${
                          isActive
                            ? "bg-white/10 text-white"
                            : "text-white/80 hover:bg-white/5 hover:text-white"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {isActive && (
                            <span
                              className="absolute left-0 top-1/2 h-7 w-[3px] -translate-y-1/2 rounded-r"
                              style={{ background: "#ffffff" }}
                            />
                          )}
                          <Icon className="h-5 w-5" strokeWidth={isActive ? 2.4 : 1.8} />
                          <span className="leading-tight">{t.label}</span>
                        </>
                      )}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
            <ul className="flex flex-col">
              <li>
                <a
                  href="https://console.firebase.google.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full flex-col items-center gap-1 py-2.5 text-[11px] font-medium text-white/80 hover:bg-white/5 hover:text-white"
                  title="Help"
                >
                  <HelpCircle className="h-5 w-5" strokeWidth={1.8} />
                  <span>Help</span>
                </a>
              </li>
              <li>
                <button
                  onClick={() => adminSignOut()}
                  className="flex w-full flex-col items-center gap-1 py-2.5 text-[11px] font-medium text-white/80 hover:bg-white/5 hover:text-white"
                >
                  <LogOut className="h-5 w-5" strokeWidth={1.8} />
                  <span>Sign out</span>
                </button>
              </li>
            </ul>
          </nav>

          {/* Content surface */}
          <section className="flex min-w-0 flex-1 flex-col">
            {/* Subheader (channel header in Teams) */}
            <div
              className="flex h-14 shrink-0 items-center justify-between border-b px-6"
              style={{ background: TEAMS.card, borderColor: "#e1e1e1" }}
            >
              <div className="flex items-center gap-3">
                <ActiveTab.icon className="h-5 w-5" style={{ color: TEAMS.topbar }} />
                <div>
                  <h1 className="text-[15px] font-semibold leading-tight text-foreground">
                    {ActiveTab.label}
                  </h1>
                  <p className="text-[11px] leading-tight text-muted-foreground">
                    Manage your {ActiveTab.label.toLowerCase()} content
                  </p>
                </div>
              </div>
              <span className="hidden text-[11px] text-muted-foreground md:inline">
                Signed in as <span className="font-medium text-foreground">{user.email}</span>
              </span>
            </div>

            {/* Scroll body */}
            <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
              <div className="mx-auto max-w-6xl">
                <SearchCtx.Provider value={query}>
                  <Outlet />
                </SearchCtx.Provider>
              </div>
            </div>
          </section>
        </div>
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

// ============= Image upload (auto-compress) =============
function ImageUploadField({
  label = "Image",
  value,
  onChange,
  compress,
  aspect = "video",
}: {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  compress?: CompressOptions;
  aspect?: "video" | "square" | "wide";
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setErr(null);
    setBusy(true);
    try {
      const dataUrl = await compressImage(file, compress);
      onChange(dataUrl);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }

  const aspectClass =
    aspect === "square" ? "aspect-square" : aspect === "wide" ? "aspect-[21/9]" : "aspect-video";

  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-1 space-y-2">
        {value && (
          <div className={`relative overflow-hidden rounded border border-border bg-muted ${aspectClass}`}>
            <img src={value} alt="" className="h-full w-full object-cover" />
          </div>
        )}
        <div className="flex flex-wrap items-center gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={busy}
            className="rounded border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-muted disabled:opacity-50"
          >
            {busy ? "Compressing…" : value ? "Replace image" : "Upload image"}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="rounded border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted"
            >
              Remove
            </button>
          )}
        </div>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Or paste image URL"
          className="w-full rounded border border-border bg-background px-3 py-2 text-xs text-foreground outline-none focus:border-brand-red"
        />
        {err && <p className="text-xs text-brand-red">{err}</p>}
        <p className="text-[10px] text-muted-foreground">
          Images are auto-compressed in your browser before saving.
        </p>
      </div>
    </div>
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

export function ProjectsAdmin() {
  const { items, isFromFirestore } = useProjects();
  const [editing, setEditing] = useState<Project | null>(null);
  const q = useSearchQuery().toLowerCase();
  const bulkInputRef = useRef<HTMLInputElement | null>(null);
  const [bulkProgress, setBulkProgress] = useState<string | null>(null);

  const maxOrder = useMemo(() => {
    if (items.length === 0) return 0;
    return Math.max(...items.map((item) => item.order ?? 0));
  }, [items]);

  const filtered = q
    ? items.filter((p) =>
        [p.title, p.client, p.category, p.description].some((x) => (x ?? "").toLowerCase().includes(q)),
      )
    : items;

  async function handleBulkUpload(files: FileList | null) {
    if (!files || files.length === 0) return;
    setBulkProgress(`Uploading 0/${files.length} images...`);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setBulkProgress(`Compressing & saving ${i + 1}/${files.length}: ${file.name}...`);
        const dataUrl = await compressImage(file, { maxWidth: 1280, maxHeight: 900, quality: 0.78 });
        
        // Clean up file name to use as title
        const cleanName = file.name
          .replace(/\.[^/.]+$/, "") // remove extension
          .replace(/[-_]+/g, " ")  // replace hyphens/underscores with spaces
          .split(" ")
          .map(w => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ")
          .trim();

        const newProject: Project = {
          id: genId("p"),
          title: cleanName || `Project ${items.length + i + 1}`,
          client: "Nataraj Electricals",
          category: "Completed",
          image: dataUrl,
          description: "Project details to be updated.",
          order: maxOrder + (files.length - i),
        };
        await saveDoc("site_projects", newProject);
      }
      setBulkProgress(null);
      alert(`Successfully added ${files.length} project(s).`);
    } catch (err) {
      console.error(err);
      setBulkProgress(null);
      alert(`Error uploading files: ${err instanceof Error ? err.message : err}`);
    }
  }

  return (
    <div>
      {!isFromFirestore && <SeedNotice collectionName="site_projects" defaults={DEFAULT_PROJECTS} />}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-heading text-xl font-bold text-foreground">
          Projects ({filtered.length}
          {q && filtered.length !== items.length ? ` of ${items.length}` : ""})
        </h2>
        <div className="flex items-center gap-2">
          <input
            ref={bulkInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleBulkUpload(e.target.files)}
          />
          <button
            onClick={() => bulkInputRef.current?.click()}
            disabled={!!bulkProgress}
            className="rounded border border-border bg-background px-3 py-2 text-xs font-medium text-foreground disabled:opacity-50"
          >
            {bulkProgress ? "Uploading..." : "+ Bulk Add Images"}
          </button>
          <button
            onClick={() => setEditing({ id: genId("p"), title: "", client: "", category: "Completed", image: "", description: "", order: maxOrder + 1 })}
            className="btn-primary !py-2 !px-4 !text-xs"
          >
            + Add Project
          </button>
        </div>
      </div>
      {bulkProgress && (
        <div className="mb-4 rounded bg-brand-red/10 px-4 py-3 text-xs text-brand-red animate-pulse font-medium">
          {bulkProgress}
        </div>
      )}
      <div className="grid gap-3">
        {filtered.map((p) => (
          <Card key={p.id} className="flex items-center gap-4">
            <img src={p.image} alt="" className="h-14 w-20 shrink-0 rounded object-cover" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="rounded bg-brand-red/10 px-2 py-0.5 text-[10px] font-bold uppercase text-brand-red">{p.category}</span>
                {p.featured && <span className="rounded bg-brand-yellow/20 px-2 py-0.5 text-[10px] font-bold uppercase text-brand-yellow-foreground">Featured</span>}
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
        <ImageUploadField
          label="Project Image"
          value={p.image}
          onChange={(v) => setP({ ...p, image: v })}
          compress={{ maxWidth: 1280, maxHeight: 900, quality: 0.78 }}
        />
        <div><Label>Description</Label><TextArea rows={4} value={p.description} onChange={(e) => setP({ ...p, description: e.target.value })} /></div>
        <div className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            id="project-featured"
            checked={!!p.featured}
            onChange={(e) => setP({ ...p, featured: e.target.checked })}
            className="rounded border-border text-brand-red focus:ring-brand-red h-4 w-4"
          />
          <label htmlFor="project-featured" className="text-xs font-bold uppercase tracking-wider text-muted-foreground cursor-pointer">Show on Home Page (Featured)</label>
        </div>
        <div><Label>Order</Label><Input type="number" value={p.order ?? 0} onChange={(e) => setP({ ...p, order: Number(e.target.value) })} /></div>
      </div>
      <ModalActions onCancel={onClose} onSave={save} saving={saving} />
    </Modal>
  );
}

// ============= Services =============
export function ServicesAdmin() {
  const { items, isFromFirestore } = useServices();
  const [editing, setEditing] = useState<Service | null>(null);
  const q = useSearchQuery().toLowerCase();
  const filtered = q
    ? items.filter((s) =>
        [s.title, s.description, ...(s.useCases ?? [])].some((x) => (x ?? "").toLowerCase().includes(q)),
      )
    : items;
  return (
    <div>
      {!isFromFirestore && <SeedNotice collectionName="site_services" defaults={DEFAULT_SERVICES} />}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-heading text-xl font-bold text-foreground">
          Services ({filtered.length}
          {q && filtered.length !== items.length ? ` of ${items.length}` : ""})
        </h2>
        <button onClick={() => setEditing({ id: genId("s"), title: "", description: "", useCases: [], order: items.length })} className="btn-primary !py-2 !px-4 !text-xs">+ Add Service</button>
      </div>
      <div className="grid gap-3">
        {filtered.map((s) => (
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
export function ClientsAdmin() {
  const { items, isFromFirestore } = useClients();
  const [editing, setEditing] = useState<Client | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState<string | null>(null);
  const q = useSearchQuery().toLowerCase();
  const filtered = q ? items.filter((c) => c.name.toLowerCase().includes(q)) : items;

  async function resyncLogos() {
    setSyncing(true);
    setSyncMsg(null);
    try {
      const byName = new Map(
        DEFAULT_CLIENTS.map((c) => [c.name.toLowerCase(), c.logo])
      );
      let updated = 0;
      for (const c of items) {
        const defaultLogo = byName.get(c.name.toLowerCase());
        if (defaultLogo && c.logo !== defaultLogo) {
          await saveDoc("site_clients", { ...c, logo: defaultLogo });
          updated++;
        }
      }
      // Also add any default clients that are missing from Firestore
      const existing = new Set(items.map((c) => c.name.toLowerCase()));
      let added = 0;
      for (const d of DEFAULT_CLIENTS) {
        if (!existing.has(d.name.toLowerCase())) {
          await saveDoc("site_clients", { ...d, order: items.length + added });
          added++;
        }
      }
      setSyncMsg(`Synced. Updated ${updated} logo${updated === 1 ? "" : "s"}, added ${added} missing client${added === 1 ? "" : "s"}.`);
    } catch (e) {
      setSyncMsg(`Error: ${(e as Error).message}`);
    } finally {
      setSyncing(false);
    }
  }

  return (
    <div>
      {!isFromFirestore && <SeedNotice collectionName="site_clients" defaults={DEFAULT_CLIENTS} />}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-heading text-xl font-bold text-foreground">
          Leading Organizations ({filtered.length}
          {q && filtered.length !== items.length ? ` of ${items.length}` : ""})
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={resyncLogos}
            disabled={syncing}
            className="rounded border border-border bg-background px-3 py-2 text-xs font-medium text-foreground disabled:opacity-50"
            title="Push default logo URLs from code into Firestore for matching client names, and add any defaults that aren't in Firestore yet."
          >
            {syncing ? "Syncing…" : "Resync logos"}
          </button>
          <button onClick={() => setEditing({ id: genId("c"), name: "", order: items.length })} className="btn-primary !py-2 !px-4 !text-xs">+ Add Client</button>
        </div>
      </div>
      {syncMsg && (
        <div className="mb-3 rounded border border-border bg-muted/40 px-3 py-2 text-xs text-foreground">{syncMsg}</div>
      )}
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <Card key={c.id} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              {c.logo ? (
                <img src={c.logo} alt="" className="h-8 w-12 shrink-0 rounded object-contain bg-white p-0.5 border" />
              ) : (
                <div className="h-8 w-12 shrink-0 rounded bg-muted flex items-center justify-center text-[9px] font-bold text-muted-foreground">No Logo</div>
              )}
              <span className="truncate text-sm font-medium text-foreground">{c.name}</span>
            </div>
            <div className="flex shrink-0 gap-1">
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
        <ImageUploadField
          label="Logo (optional)"
          value={c.logo ?? ""}
          onChange={(v) => setC({ ...c, logo: v })}
          aspect="square"
          compress={{ maxWidth: 400, maxHeight: 400, quality: 0.85, mimeType: "image/webp" }}
        />
        <div><Label>Order</Label><Input type="number" value={c.order ?? 0} onChange={(e) => setC({ ...c, order: Number(e.target.value) })} /></div>
      </div>
      <ModalActions onCancel={onClose} saving={saving} onSave={() => run(async () => { await saveDoc("site_clients", c); onClose(); })} />
    </>
  );
}

// ============= Testimonials =============
export function TestimonialsAdmin() {
  const { items, isFromFirestore } = useTestimonials();
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const q = useSearchQuery().toLowerCase();
  const filtered = q
    ? items.filter((t) => [t.name, t.role, t.quote].some((x) => (x ?? "").toLowerCase().includes(q)))
    : items;
  return (
    <div>
      {!isFromFirestore && <SeedNotice collectionName="site_testimonials" defaults={DEFAULT_TESTIMONIALS} />}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-heading text-xl font-bold text-foreground">
          Testimonials ({filtered.length}
          {q && filtered.length !== items.length ? ` of ${items.length}` : ""})
        </h2>
        <button onClick={() => setEditing({ id: genId("t"), quote: "", name: "", role: "", order: items.length })} className="btn-primary !py-2 !px-4 !text-xs">+ Add Testimonial</button>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {filtered.map((t) => (
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
export function HeroAdmin() {
  const { items, isFromFirestore } = useHeroSlides();
  const [editing, setEditing] = useState<HeroSlide | null>(null);
  const q = useSearchQuery().toLowerCase();
  const filtered = q
    ? items.filter((h) => [h.title, h.subtitle, h.description].some((x) => (x ?? "").toLowerCase().includes(q)))
    : items;
  return (
    <div>
      {!isFromFirestore && <SeedNotice collectionName="site_hero_slides" defaults={DEFAULT_HERO_SLIDES} />}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-heading text-xl font-bold text-foreground">
          Hero Slides ({filtered.length}
          {q && filtered.length !== items.length ? ` of ${items.length}` : ""})
        </h2>
        <button onClick={() => setEditing({ id: genId("h"), image: "", subtitle: "", title: "", description: "", cta: "Get a Quote", ctaLink: "/contact", order: items.length })} className="btn-primary !py-2 !px-4 !text-xs">+ Add Slide</button>
      </div>
      <div className="grid gap-3">
        {filtered.map((h) => (
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
        <ImageUploadField
          label="Slide Image"
          value={h.image}
          onChange={(v) => setH({ ...h, image: v })}
          aspect="wide"
          compress={{ maxWidth: 1600, maxHeight: 900, quality: 0.78 }}
        />
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
export function InquiriesAdmin() {
  const { items, loading, error } = useInquiries();
  const q = useSearchQuery().toLowerCase();
  const sorted = useMemo(
    () =>
      q
        ? items.filter((i) =>
            [i.name, i.email, i.phone, i.message].some((x) => (x ?? "").toLowerCase().includes(q)),
          )
        : items,
    [items, q],
  );
  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-heading text-xl font-bold text-foreground">
          Contact Inquiries ({sorted.length}
          {q && sorted.length !== items.length ? ` of ${items.length}` : ""})
        </h2>
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

// ============= Settings =============
export function SettingsAdmin() {
  const { settings, loading } = useSettings();
  const [s, setS] = useState<SiteSettings | null>(null);
  const { saving, error, run } = useSaveHandler();

  useEffect(() => {
    if (!loading && settings) {
      setS(settings);
    }
  }, [loading, settings]);

  if (loading || !s) {
    return <p className="text-sm text-muted-foreground">Loading settings…</p>;
  }

  async function save() {
    await run(async () => {
      if (s) {
        await saveSettings(s);
        alert("Settings saved successfully.");
      }
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-xl font-bold text-foreground">General Settings</h2>
        <button
          onClick={save}
          disabled={saving}
          className="btn-primary !py-2 !px-6 !text-xs disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>

      {error && <ErrorBox message={error} />}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Contact info card */}
        <Card className="space-y-4">
          <h3 className="font-bold text-foreground text-sm border-b pb-2 mb-3">Contact Information</h3>
          <div>
            <Label>Phone Number (Display)</Label>
            <Input value={s.phone} onChange={(e) => setS({ ...s, phone: e.target.value })} />
          </div>
          <div>
            <Label>Email Address</Label>
            <Input value={s.email} onChange={(e) => setS({ ...s, email: e.target.value })} />
          </div>
          <div>
            <Label>WhatsApp Number (Country code + number, e.g. 919902012565)</Label>
            <Input value={s.whatsappNumber} onChange={(e) => setS({ ...s, whatsappNumber: e.target.value })} />
          </div>
          <div>
            <Label>Office Address</Label>
            <TextArea rows={3} value={s.address} onChange={(e) => setS({ ...s, address: e.target.value })} />
          </div>
        </Card>

        {/* Statutory info card */}
        <Card className="space-y-4">
          <h3 className="font-bold text-foreground text-sm border-b pb-2 mb-3">Statutory Details</h3>
          <div>
            <Label>GST Number</Label>
            <Input value={s.gstNumber} onChange={(e) => setS({ ...s, gstNumber: e.target.value })} />
          </div>
          <div>
            <Label>Registration / License Number</Label>
            <Input value={s.regNumber} onChange={(e) => setS({ ...s, regNumber: e.target.value })} />
          </div>
        </Card>

        {/* Stats card */}
        <Card className="space-y-4 md:col-span-2">
          <h3 className="font-bold text-foreground text-sm border-b pb-2 mb-3">Homepage Statistics Counters</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <Label>Years Experience (e.g. 15+)</Label>
              <Input value={s.statYears} onChange={(e) => setS({ ...s, statYears: e.target.value })} />
            </div>
            <div>
              <Label>Projects Completed (e.g. 500+)</Label>
              <Input value={s.statProjects} onChange={(e) => setS({ ...s, statProjects: e.target.value })} />
            </div>
            <div>
              <Label>Happy Clients (e.g. 200+)</Label>
              <Input value={s.statClients} onChange={(e) => setS({ ...s, statClients: e.target.value })} />
            </div>
            <div>
              <Label>Expert Engineers (e.g. 50+)</Label>
              <Input value={s.statEngineers} onChange={(e) => setS({ ...s, statEngineers: e.target.value })} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}