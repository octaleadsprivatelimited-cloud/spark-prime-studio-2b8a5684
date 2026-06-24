import { Link, NavLink, useLocation } from "react-router-dom";
import { useSettings } from "../lib/content";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
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
  const { settings } = useSettings();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(
    typeof window !== "undefined" && document.documentElement.classList.contains("dark"),
  );
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location.pathname]);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.removeItem("theme");
      setIsDark(false);
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="announcement-bar hidden items-center justify-center gap-4 px-4 py-2 md:flex">
        <span className="opacity-70">Government Licensed Class-I Electrical Contractor — Serving Karnataka Since 2008</span>
        <a href={`tel:${settings.phone.replace(/\s+/g, "")}`} className="flex items-center gap-1.5 font-semibold opacity-90 hover:opacity-100">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
          {settings.phone}
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
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  isActive
                    ? "px-3 py-2 text-[13px] font-semibold text-brand-red"
                    : "px-3 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a href={`tel:${settings.phone.replace(/\s+/g, "")}`} className="flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground hover:text-foreground">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              Call Us
            </a>
            <Link to="/contact" className="btn-primary !py-2.5 !px-5 !text-xs">
              Get a Quote
            </Link>
          </div>

          {/* Mobile toggle + theme toggle */}
          <div className="flex items-center gap-1 lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="flex h-10 w-10 items-center justify-center text-foreground" aria-label="Menu">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {isOpen ? <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/> : <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round"/>}
              </svg>
            </button>
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-red/10 text-brand-red transition-colors hover:bg-brand-red hover:text-brand-red-foreground"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isDark ? "moon" : "sun"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex"
                >
                  {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile menu (overlay, does not push hero) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="absolute left-0 right-0 top-full z-40 origin-top border-t border-border bg-background shadow-lg lg:hidden"
            >
              <nav className="flex flex-col px-4 py-3">
                {navLinks.map((link) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * navLinks.indexOf(link), duration: 0.2 }}
                  >
                    <NavLink to={link.to} end={link.to === "/"} className={({ isActive }) => isActive ? "block border-b border-border px-2 py-3 text-sm font-semibold text-brand-red" : "block border-b border-border px-2 py-3 text-sm font-medium text-muted-foreground"}>
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
                <Link to="/contact" className="btn-primary mt-4 text-center">Get a Quote</Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Floating theme toggle (desktop corner) */}
      <button
        onClick={toggleTheme}
        className="fixed bottom-24 right-6 z-[1000] hidden h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-lg transition-colors hover:bg-brand-red hover:text-brand-red-foreground lg:flex"
        aria-label="Toggle theme"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? "moon" : "sun"}
            initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.25 }}
            className="inline-flex"
          >
            {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </motion.span>
        </AnimatePresence>
      </button>
    </>
  );
}
