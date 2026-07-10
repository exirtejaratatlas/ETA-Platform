import { Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Companies from "./pages/crm/Companies";
import Contacts from "./pages/crm/Contacts";
import Deals from "./pages/crm/Deals";
import PurchaseOrders from "./pages/procurement/PurchaseOrders";
import Suppliers from "./pages/procurement/Suppliers";
import SupplierPortal from "./pages/SupplierPortal";
import AiPlatform from "./pages/AiPlatform";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/crm/companies" element={<Companies />} />
        <Route path="/crm/contacts" element={<Contacts />} />
        <Route path="/crm/deals" element={<Deals />} />
        <Route path="/procurement/orders" element={<PurchaseOrders />} />
        <Route path="/procurement/suppliers" element={<Suppliers />} />
        <Route path="/supplier-portal" element={<SupplierPortal />} />
        <Route path="/ai-platform" element={<AiPlatform />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </AppLayout>
  );
}
