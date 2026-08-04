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
  Settings,
  ArrowLeft,
  Inbox,
} from "lucide-react";

const navSections = [
  {
    label: "Overview",
    items: [
      { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    ],
  },
  {
    label: "CRM",
    items: [
      { to: "/crm/companies", icon: Building2, label: "Companies" },
      { to: "/crm/contacts", icon: Users, label: "Contacts" },
      { to: "/crm/inquiries", icon: Inbox, label: "Inquiries" },
      { to: "/crm/deals", icon: TrendingUp, label: "Deals" },
    ],
  },
  {
    label: "Procurement",
    items: [
      { to: "/procurement/orders", icon: ShoppingBag, label: "Purchase Orders" },
      { to: "/suppliers", icon: Package, label: "Suppliers" },
    ],
  },
  {
    label: "Portal",
    items: [
      { to: "/supplier-portal", icon: Globe, label: "Supplier Portal" },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { to: "/ai-platform", icon: Sparkles, label: "AI Platform" },
    ],
  },
];

export function Sidebar() {
  return (
    <aside className="hidden lg:flex w-60 flex-col border-r border-surface-200 bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2.5 px-5 border-b border-surface-200">
        <img src="/Logo.svg" alt="Exir Tejarat Atlas" className="h-8 w-auto" />
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold text-surface-900">Exir Tejarat Atlas</span>
          <span className="text-[10px] text-surface-400 font-medium tracking-wide uppercase">Enterprise Platform</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {navSections.map((section) => (
          <div key={section.label}>
            <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-surface-400">
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150 ${
                      isActive
                        ? "bg-copper-50 text-copper-700"
                        : "text-surface-600 hover:bg-surface-50 hover:text-surface-900"
                    }`
                  }
                >
                  <item.icon size={16} className="shrink-0" />
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-surface-200 p-3 space-y-0.5">
        <NavLink
          to="/"
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-surface-500 hover:bg-surface-50 hover:text-surface-900 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Website
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isActive ? "bg-copper-50 text-copper-700" : "text-surface-600 hover:bg-surface-50"
            }`
          }
        >
          <Settings size={16} />
          Settings
        </NavLink>
      </div>
    </aside>
  );
}
