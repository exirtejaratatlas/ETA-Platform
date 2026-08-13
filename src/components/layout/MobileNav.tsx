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
  Inbox,
  Boxes,
  FileText,
} from "lucide-react";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/crm/companies", icon: Building2, label: "Companies" },
  { to: "/crm/contacts", icon: Users, label: "Contacts" },
  { to: "/crm/inquiries", icon: Inbox, label: "Inquiries" },
  { to: "/crm/deals", icon: TrendingUp, label: "Deals" },
  { to: "/rfq", icon: FileText, label: "RFQ Workflow" },
  { to: "/products", icon: Boxes, label: "Products" },
  { to: "/procurement/orders", icon: ShoppingBag, label: "Purchase Orders" },
  { to: "/suppliers", icon: Package, label: "Suppliers" },
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
            <img src="/Logo.svg" alt="Exir Tejarat Atlas" className="h-8 w-auto" />
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
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive ? "bg-copper-50 text-copper-700" : "text-surface-600 hover:bg-surface-50"
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
