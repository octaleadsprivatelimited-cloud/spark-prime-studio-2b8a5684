import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ScrollProgress } from "../components/ScrollProgress";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { usePageTracking } from "../lib/analytics";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-heading text-8xl font-extrabold text-brand-red">404</h1>
        <h2 className="mt-4 font-heading text-xl font-bold text-foreground">Page Not Found</h2>
        <p className="mt-2 text-sm text-muted-foreground">The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn-primary mt-6 inline-flex">Go Home</Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Nataraj Electricals — Government Licensed Class-I Electrical Contractor" },
      { name: "description", content: "Nataraj Electricals is a Government Licensed Class-I Electrical Contractor in Bangalore specializing in HT/LT electrification, power solutions, and electrical project management." },
      { name: "author", content: "Nataraj Electricals" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Nataraj Electricals — Government Licensed Class-I Electrical Contractor" },
      { name: "twitter:title", content: "Nataraj Electricals — Government Licensed Class-I Electrical Contractor" },
      { property: "og:description", content: "Nataraj Electricals is a Government Licensed Class-I Electrical Contractor in Bangalore specializing in HT/LT electrification, power solutions, and electrical project management." },
      { name: "twitter:description", content: "Nataraj Electricals is a Government Licensed Class-I Electrical Contractor in Bangalore specializing in HT/LT electrification, power solutions, and electrical project management." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/30ad82fa-f9e7-4add-8289-22100276644a/id-preview-c00df28f--96a9fa82-8173-479b-a47a-a7b61dd4d624.lovable.app-1781171155850.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/30ad82fa-f9e7-4add-8289-22100276644a/id-preview-c00df28f--96a9fa82-8173-479b-a47a-a7b61dd4d624.lovable.app-1781171155850.png" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  usePageTracking();
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main><Outlet /></main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
