import { Link, useLocation } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "../assets/logo.png";

const navLinks = [
  { to: "/" as const, label: "Home" },
  { to: "/about" as const, label: "About Us" },
  { to: "/services" as const, label: "Services" },
  { to: "/projects" as const, label: "Projects" },
  { to: "/clients" as const, label: "Clients" },
  { to: "/contact" as const, label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  return (
    <>
      {/* Announcement Bar */}
      <div className="announcement-bar hidden items-center justify-center gap-4 px-4 py-2 md:flex">
        <span className="opacity-70">Government Licensed Class-I Electrical Contractor — Serving Karnataka Since 2008</span>
        <a href="tel:+919902012565" className="flex items-center gap-1.5 font-semibold opacity-90 hover:opacity-100">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
          +91 99020 12565
        </a>
      </div>

      {/* Main Nav */}
      <header className={`nav-main sticky top-0 z-50 ${scrolled ? "scrolled" : ""}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logoImg} alt="Nataraj Electricals Logo" className="h-12 w-auto bg-white p-1 rounded shadow-sm" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-3 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "px-3 py-2 text-[13px] font-semibold text-brand-red" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

            {/* Dark mode toggle */}
            <button
              onClick={() => {
                const html = document.documentElement;
                if (html.classList.contains('dark')) {
                  html.classList.remove('dark');
                  localStorage.removeItem('theme');
                } else {
                  html.classList.add('dark');
                  localStorage.setItem('theme', 'dark');
                }
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-red/10 text-brand-red hover:bg-brand-red hover:text-brand-red-foreground"
              aria-label="Toggle dark mode"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 3v2M12 19v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                <circle cx="12" cy="12" r="5" />
              </svg>
            </button>
          <div className="hidden items-center gap-3 lg:flex">
            <a href="tel:+919902012565" className="flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground hover:text-foreground">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              Call Us
            </a>
            <Link to="/contact" className="btn-primary !py-2.5 !px-5 !text-xs">
              Get a Quote
            </Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="flex h-10 w-10 items-center justify-center lg:hidden" aria-label="Menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {isOpen ? <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/> : <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round"/>}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden border-t border-border lg:hidden">
              <nav className="flex flex-col px-4 py-3">
                {navLinks.map((link) => (
                  <Link key={link.to} to={link.to} className="border-b border-border px-2 py-3 text-sm font-medium text-muted-foreground" activeProps={{ className: "border-b border-border px-2 py-3 text-sm font-semibold text-brand-red" }}>
                    {link.label}
                  </Link>
                ))}
                <Link to="/contact" className="btn-primary mt-4 text-center">Get a Quote</Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
