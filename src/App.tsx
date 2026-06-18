import { Routes, Route, Link, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ScrollProgress } from "./components/ScrollProgress";
import { WhatsAppButton } from "./components/WhatsAppButton";
import ScrollToTop from "./components/ScrollToTop";
import { usePageTracking } from "./lib/analytics";

import HomePage from "./routes/index";
import AboutPage from "./routes/about";
import ServicesPage from "./routes/services";
import ClientsPage from "./routes/clients";
import ContactPage from "./routes/contact";
import ProjectsPage from "./routes/projects";
import ProjectDetailPage from "./routes/projects.$projectId";
import AdminPage, {
  ProjectsAdmin,
  ServicesAdmin,
  ClientsAdmin,
  TestimonialsAdmin,
  HeroAdmin,
  InquiriesAdmin,
} from "./routes/admin";
import { Navigate } from "react-router-dom";
import AdminLoginPage from "./routes/admin.login";

function NotFound() {
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

export default function App() {
  usePageTracking();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  return (
    <>
      <ScrollToTop />
      {!isAdmin && <ScrollProgress />}
      {!isAdmin && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminPage />}>
            <Route index element={<Navigate to="/admin/projects" replace />} />
            <Route path="projects" element={<ProjectsAdmin />} />
            <Route path="services" element={<ServicesAdmin />} />
            <Route path="clients" element={<ClientsAdmin />} />
            <Route path="testimonials" element={<TestimonialsAdmin />} />
            <Route path="hero" element={<HeroAdmin />} />
            <Route path="inquiries" element={<InquiriesAdmin />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <WhatsAppButton />}
    </>
  );
}