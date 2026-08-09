import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

// Nav per D3 (ETA-Blueprint/13-DECISIONS/ETA-WEBSITE-ARCHITECTURE-DECISION-RESOLUTION-RECORD.md):
// flat, 6 items, no mega-menu. Child capability pages (equipment-supply/steel-trading/
// supplier-network) are reached from the Products & Capabilities hub page, not listed here.
const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products-capabilities", label: "Products & Capabilities" },
  { to: "/industries", label: "Industries" },
  { to: "/platform", label: "Platform Vision" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-surface-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5 shrink-0" onClick={() => setOpen(false)}>
          <img src="/Logo.svg" alt="Exir Tejarat Atlas" className="h-8 w-auto" />
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-surface-900">Exir Tejarat Atlas</span>
            <span className="text-[10px] text-surface-400 font-medium tracking-wide uppercase">
              Industrial Procurement &amp; AI
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 ml-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-body-sm font-medium transition-colors ${
                  isActive ? "text-copper-500" : "text-surface-600 hover:text-surface-900"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto hidden lg:flex items-center gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-copper-600 px-4 h-9 text-body-sm font-semibold text-white shadow-soft hover:bg-copper-700 transition-colors"
          >
            Request a Quote
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="ml-auto lg:hidden rounded-lg p-2 text-surface-600 hover:bg-surface-100"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-surface-200 bg-white px-4 py-3 space-y-0.5">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block rounded-lg px-3 py-2.5 text-body-sm font-medium ${
                  isActive ? "bg-copper-50 text-copper-500" : "text-surface-600 hover:bg-surface-50"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center justify-center rounded-lg bg-copper-600 px-4 h-10 text-body-sm font-semibold text-white"
          >
            Request a Quote
          </Link>
        </nav>
      )}
    </header>
  );
}
