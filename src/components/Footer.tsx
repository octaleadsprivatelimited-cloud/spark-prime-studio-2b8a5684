import { Link } from "@tanstack/react-router";
import logoImg from "../assets/logo.png";

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
    <footer className="section-dark">
      <div className="mx-auto max-w-7xl px-4 py-14 lg:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <img src={logoImg} alt="Nataraj Electricals Logo" className="h-14 w-auto bg-white p-1 rounded shadow-sm" />
            </div>
            <p className="text-sm leading-relaxed opacity-60">
              Government Licensed Class-I Electrical Contractor. Serving Bangalore and Karnataka with excellence since 2008.
            </p>
            <div className="mt-5 flex gap-3">
              {["ISO 9001", "Class-I", "BESCOM"].map((badge) => (
                <span key={badge} className="rounded border border-brand-dark-foreground/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider opacity-50">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest opacity-40">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm opacity-60 transition-opacity hover:opacity-100">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest opacity-40">Services</h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s} className="text-sm opacity-60">{s}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest opacity-40">Contact</h4>
            <ul className="space-y-3 text-sm opacity-60">
              <li className="flex items-start gap-2">
                <svg className="mt-0.5 h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                <span>#243/3/1/, 1st main, 1st cross, BEML layout 5th stage, Rajarajeshwarinagar, Bangalore – 560098</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                <a href="tel:+919902012565" className="hover:text-foreground">+91 99020 12565</a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                <a href="mailto:Sarveshkumarbc90@gmail.com" className="hover:text-foreground">Sarveshkumarbc90@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-brand-dark-foreground/10 pt-8 md:flex-row">
          <p className="text-xs opacity-40">
            © {new Date().getFullYear()} Nataraj Electricals. All rights reserved.
          </p>
          <p className="text-xs opacity-40">
            Developed by{" "}
            <a href="https://www.octaleads.com" target="_blank" rel="noopener noreferrer" className="underline opacity-70 hover:opacity-100">
              Octaleads Pvt Ltd
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
