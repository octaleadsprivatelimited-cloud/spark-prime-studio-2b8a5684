import { Link, useLocation } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { to: "/" as const, label: "Home" },
  { to: "/about" as const, label: "About" },
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
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`glass-nav fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${scrolled ? "shadow-md" : ""}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-primary-foreground">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <span className="font-heading text-lg font-bold text-foreground leading-tight block">Nataraj</span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">Electricals</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "rounded-md px-3 py-2 text-sm font-medium text-primary bg-primary/5" }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="btn-gradient ml-3 rounded-lg px-5 py-2.5 text-sm font-semibold"
          >
            Get a Quote
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground md:hidden"
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {isOpen ? (
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round"/>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <nav className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary"
                  activeProps={{ className: "rounded-lg px-4 py-3 text-sm font-medium text-primary bg-primary/5" }}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="btn-gradient mt-2 rounded-lg px-5 py-3 text-center text-sm font-semibold"
              >
                Get a Quote
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
