import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  TrendingUp,
  Package,
  ShoppingBag,
  Globe,
  Sparkles,
  X,
} from "lucide-react";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: "/crm/companies", icon: Building2, label: "Companies" },
  { to: "/crm/contacts", icon: Users, label: "Contacts" },
  { to: "/crm/deals", icon: TrendingUp, label: "Deals" },
  { to: "/procurement/orders", icon: ShoppingBag, label: "Purchase Orders" },
  { to: "/procurement/suppliers", icon: Package, label: "Suppliers" },
  { to: "/supplier-portal", icon: Globe, label: "Supplier Portal" },
  { to: "/ai-platform", icon: Sparkles, label: "AI Platform" },
];

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-surface-950/40 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-elevated animate-slide-in-right overflow-y-auto">
        <div className="flex h-16 items-center justify-between px-5 border-b border-surface-200">
          <div className="flex items-center gap-2.5">
            <img src="/logo.svg" alt="ETA" className="h-8 w-8" />
            <span className="text-sm font-semibold text-surface-900">Exir Tejarat Atlas</span>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-surface-400 hover:bg-surface-100">
            <X size={18} />
          </button>
        </div>
        <nav className="p-3 space-y-0.5">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive ? "bg-brand-50 text-brand-700" : "text-surface-600 hover:bg-surface-50"
                }`
              }
            >
              <item.icon size={16} />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}

export function useMobileNav() {
  const [open, setOpen] = useState(false);
  return { open, setOpen };
}
