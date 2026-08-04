import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, Menu, X } from "lucide-react";
import {
  LayoutDashboard,
  Building2,
  Users,
  TrendingUp,
  ShoppingBag,
  Package,
  Globe,
  Sparkles,
  Inbox,
} from "lucide-react";

const quickLinks = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/crm/companies", icon: Building2, label: "Companies" },
  { to: "/crm/contacts", icon: Users, label: "Contacts" },
  { to: "/crm/inquiries", icon: Inbox, label: "Inquiries" },
  { to: "/crm/deals", icon: TrendingUp, label: "Deals" },
  { to: "/procurement/orders", icon: ShoppingBag, label: "Purchase Orders" },
  { to: "/suppliers", icon: Package, label: "Suppliers" },
  { to: "/supplier-portal", icon: Globe, label: "Supplier Portal" },
  { to: "/ai-platform", icon: Sparkles, label: "AI Platform" },
];

export function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const filtered = query
    ? quickLinks.filter((l) => l.label.toLowerCase().includes(query.toLowerCase()))
    : quickLinks;

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-surface-200 glass px-4 lg:px-6">
        <button
          onClick={onMenuClick}
          className="lg:hidden rounded-lg p-2 text-surface-600 hover:bg-surface-100"
        >
          <Menu size={20} />
        </button>

        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center gap-2 rounded-lg border border-surface-200 bg-white px-3 h-9 text-sm text-surface-400 hover:border-surface-300 transition-colors w-full max-w-md"
        >
          <Search size={15} />
          <span className="flex-1 text-left">Search or jump to...</span>
          <kbd className="hidden sm:inline-flex items-center rounded border border-surface-200 bg-surface-50 px-1.5 py-0.5 text-[10px] font-medium text-surface-400">
            ⌘K
          </kbd>
        </button>

        <div className="flex items-center gap-2 ml-auto">
          <button className="relative rounded-lg p-2 text-surface-600 hover:bg-surface-100 transition-colors">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-copper-500" />
          </button>
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-copper-500 to-copper-700 flex items-center justify-center text-white text-xs font-medium">
            ETA
          </div>
        </div>
      </header>

      {/* Command Palette */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
          <div
            className="absolute inset-0 bg-surface-950/40 backdrop-blur-sm animate-fade-in"
            onClick={() => setSearchOpen(false)}
          />
          <div className="relative w-full max-w-xl rounded-2xl border border-surface-200 bg-white shadow-elevated animate-scale-in overflow-hidden">
            <div className="flex items-center gap-3 border-b border-surface-200 px-4 py-3">
              <Search size={18} className="text-surface-400" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pages, modules..."
                className="flex-1 bg-transparent text-sm text-surface-900 placeholder:text-surface-400 focus:outline-none"
              />
              <button onClick={() => setSearchOpen(false)} className="text-surface-400 hover:text-surface-600">
                <X size={16} />
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {filtered.map((link) => (
                <button
                  key={link.to}
                  onClick={() => {
                    navigate(link.to);
                    setSearchOpen(false);
                    setQuery("");
                  }}
                  className="flex items-center gap-3 w-full rounded-lg px-3 py-2 text-sm text-surface-700 hover:bg-surface-50 transition-colors text-left"
                >
                  <link.icon size={16} className="text-surface-400" />
                  {link.label}
                </button>
              ))}
              {filtered.length === 0 && (
                <p className="px-3 py-8 text-center text-sm text-surface-400">No results found</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
