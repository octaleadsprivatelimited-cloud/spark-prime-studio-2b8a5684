import { Link } from "@tanstack/react-router";

const quickLinks = [
  { to: "/about" as const, label: "About Us" },
  { to: "/services" as const, label: "Services" },
  { to: "/projects" as const, label: "Projects" },
  { to: "/clients" as const, label: "Clients" },
  { to: "/contact" as const, label: "Contact" },
];

const services = [
  "Electrical Design",
  "HT/LT Electrification",
  "Power Solutions",
  "Project Management",
  "AMC Services",
  "BESCOM Approvals",
];

export function Footer() {
  return (
    <footer className="hero-gradient text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-foreground/10">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-primary-foreground">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <span className="font-heading text-base font-bold leading-tight block">Nataraj Electricals</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed opacity-75">
              Government Licensed Class-I Electrical Contractor serving Bangalore and Karnataka since 2008.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider opacity-60">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm opacity-75 transition-opacity hover:opacity-100">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider opacity-60">Services</h4>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s} className="text-sm opacity-75">{s}</li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider opacity-60">Contact</h4>
            <ul className="space-y-3 text-sm opacity-75">
              <li className="flex items-start gap-2">
                <svg className="mt-0.5 h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                Bangalore, Karnataka, India
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                +91 98765 43210
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                info@natarajelectricals.com
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/10 pt-8 md:flex-row">
          <p className="text-xs opacity-50">
            © {new Date().getFullYear()} Nataraj Electricals. All rights reserved.
          </p>
          <p className="text-xs opacity-50">
            Developed by{" "}
            <a
              href="https://www.octaleads.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline opacity-75 hover:opacity-100"
            >
              Octaleads Pvt Ltd
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
