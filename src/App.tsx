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
import ProductList from "./pages/products/ProductList";
import ProductDetail from "./pages/products/ProductDetail";
import RfqList from "./pages/rfq/RfqList";
import RfqDetail from "./pages/rfq/RfqDetail";
import SupplierDetail from "./pages/suppliers/SupplierDetail";
import SupplierPortal from "./pages/SupplierPortal";
import AiPlatform from "./pages/AiPlatform";
import Settings from "./pages/Settings";

import Home from "./pages/site/Home";
import About from "./pages/site/About";
import Industries from "./pages/site/Industries";
// Renders the "Products & Capabilities" hub at /products-capabilities — filename kept as
// Services.tsx per D2 (ETA-Blueprint/13-DECISIONS/ETA-WEBSITE-ARCHITECTURE-DECISION-RESOLUTION-RECORD.md)
// to avoid import churn; file rename deferred to a future refactor.
import ProductsCapabilities from "./pages/site/Services";
import EquipmentSupply from "./pages/site/EquipmentSupply";
import SteelTrading from "./pages/site/SteelTrading";
import SupplierNetwork from "./pages/site/SupplierNetwork";
import PlatformOverview from "./pages/site/PlatformOverview";
import Contact from "./pages/site/Contact";

export default function App() {
  return (
    <Routes>
      {/* Public website — ETA-Blueprint 20-BRANDING/03-Website/Sitemap.md, superseded for
          current-phase nav/structure by D1-D4 (ETA-Blueprint/13-DECISIONS/DECISIONS.md and
          .../ETA-WEBSITE-ARCHITECTURE-DECISION-RESOLUTION-RECORD.md).
          /products-capabilities is the renamed former /services (D1); /services now redirects.
          /equipment-supply, /steel-trading, /supplier-network are its child pages, added per
          CR-001 (D2). */}
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/products-capabilities" element={<ProductsCapabilities />} />
        <Route path="/services" element={<Navigate to="/products-capabilities" replace />} />
        <Route path="/equipment-supply" element={<EquipmentSupply />} />
        <Route path="/steel-trading" element={<SteelTrading />} />
        <Route path="/supplier-network" element={<SupplierNetwork />} />
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
        {/* Procurement — RFQ implements ETA-Blueprint ETA-ENT-RFQ-001 (Approved);
            Products implements ETA-ENT-PRODUCT-001 (Approved). */}
        <Route path="/rfq" element={<RfqList />} />
        <Route path="/rfq/:id" element={<RfqDetail />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/procurement/rfq" element={<Navigate to="/rfq" replace />} />
        <Route path="/procurement/products" element={<Navigate to="/products" replace />} />
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
