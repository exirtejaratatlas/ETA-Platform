import { Link } from "react-router-dom";

// Per D3/D4 (ETA-Blueprint/13-DECISIONS/ETA-WEBSITE-ARCHITECTURE-DECISION-RESOLUTION-RECORD.md):
// "Services" relabeled to "Products & Capabilities"; internal-app links (Dashboard, Supplier
// Intelligence, Supplier Portal) removed from public-facing footer — no present-tense
// capability-access links until those are actually implemented. Only Platform Vision remains.
const columns = [
  {
    heading: "Company",
    links: [
      { to: "/about", label: "About ETA" },
      { to: "/industries", label: "Industries" },
      { to: "/products-capabilities", label: "Products & Capabilities" },
      { to: "/equipment-supply", label: "Industrial Equipment Supply" },
      { to: "/steel-trading", label: "Steel Sheet Trading" },
      { to: "/supplier-network", label: "Supplier Network" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "ETA Platform",
    links: [
      { to: "/platform", label: "Platform Vision" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-surface-200 bg-surface-900 text-surface-300">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <img src="/Logo.svg" alt="Exir Tejarat Atlas" className="h-8 w-auto" />
              <span className="text-sm font-semibold text-white">Exir Tejarat Atlas</span>
            </Link>
            <p className="mt-3 max-w-sm text-body-sm text-surface-400">
              Industrial Procurement &middot; Engineering &middot; Artificial Intelligence
            </p>
            <p className="mt-4 text-body-sm text-surface-400">
              Engineering Intelligence. Enterprise Procurement. Powered by AI.
            </p>
          </div>

          <div>
            <p className="text-caption font-semibold uppercase text-surface-500 mb-3">
              Offices
            </p>
            <div className="space-y-4 text-body-sm text-surface-400">
              <div>
                <p className="text-surface-300 font-medium">Tehran — Head Office</p>
                <p>Dastgardi Street, Building 70, Unit 5</p>
                <p>+98 912 733 8131</p>
              </div>
              <div>
                <p className="text-surface-300 font-medium">United Arab Emirates</p>
                <p>No. 104, Al Makhazan Stores, Investment Park 2</p>
                <p>+971 444 58 394</p>
              </div>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <p className="text-caption font-semibold uppercase text-surface-500 mb-3">
                {col.heading}
              </p>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-body-sm text-surface-400 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-surface-800 pt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-caption text-surface-500">
            &copy; {new Date().getFullYear()} Exir Tejarat Atlas. All Rights Reserved.
          </p>
          <p className="text-caption text-surface-500">www.exiratlas.com</p>
        </div>
      </div>
    </footer>
  );
}
