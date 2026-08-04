import { Outlet } from "react-router-dom";
import { TriangleAlert } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { MobileNav, useMobileNav } from "./MobileNav";

function DemoDataBanner() {
  return (
    <div className="flex items-center justify-center gap-2 border-b border-amber-200 bg-amber-50 px-4 py-1.5 text-center text-xs font-medium text-amber-800">
      <TriangleAlert size={13} className="shrink-0" />
      Demo data — all companies, suppliers, and contacts shown are fictional and for illustration only.
    </div>
  );
}

export function AppLayout() {
  const { open, setOpen } = useMobileNav();

  return (
    <div className="flex h-screen overflow-hidden bg-surface-50">
      <Sidebar />
      <MobileNav open={open} onClose={() => setOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DemoDataBanner />
        <Header onMenuClick={() => setOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8 lg:py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
