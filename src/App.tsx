import { Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { SiteLayout } from "./components/site/SiteLayout";

import Dashboard from "./pages/Dashboard";
import Companies from "./pages/crm/Companies";
import Contacts from "./pages/crm/Contacts";
import Deals from "./pages/crm/Deals";
import Inquiries from "./pages/crm/Inquiries";
import PurchaseOrders from "./pages/procurement/PurchaseOrders";
import SupplierList from "./pages/suppliers/SupplierList";
import SupplierDetail from "./pages/suppliers/SupplierDetail";
import SupplierPortal from "./pages/SupplierPortal";
import AiPlatform from "./pages/AiPlatform";
import Settings from "./pages/Settings";

import Home from "./pages/site/Home";
import About from "./pages/site/About";
import Industries from "./pages/site/Industries";
import Services from "./pages/site/Services";
import PlatformOverview from "./pages/site/PlatformOverview";
import Contact from "./pages/site/Contact";

export default function App() {
  return (
    <Routes>
      {/* Public website — ETA-Blueprint 20-BRANDING/03-Website/Sitemap.md */}
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/services" element={<Services />} />
        <Route path="/platform" element={<PlatformOverview />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Internal platform app */}
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/crm/companies" element={<Companies />} />
        <Route path="/crm/contacts" element={<Contacts />} />
        <Route path="/crm/deals" element={<Deals />} />
        <Route path="/crm/inquiries" element={<Inquiries />} />
        <Route path="/procurement/orders" element={<PurchaseOrders />} />
        <Route path="/suppliers" element={<SupplierList />} />
        <Route path="/suppliers/:id" element={<SupplierDetail />} />
        <Route path="/procurement/suppliers" element={<Navigate to="/suppliers" replace />} />
        <Route path="/supplier-portal" element={<SupplierPortal />} />
        <Route path="/ai-platform" element={<AiPlatform />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
