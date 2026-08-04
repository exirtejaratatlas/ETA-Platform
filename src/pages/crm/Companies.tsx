import { useEffect, useState } from "react";
import { Building2, Plus, Search, Globe, Mail, Phone } from "lucide-react";
import type { Company } from "../../lib/supabase";
import { getCompanies } from "../../lib/data";
import { PageHeader } from "../../components/ui/PageHeader";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Spinner } from "../../components/ui/Spinner";
import { formatCompactCurrency, formatNumber } from "../../lib/format";

export default function Companies() {
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function load() {
      const data = await getCompanies();
      setCompanies([...data].sort((a, b) => a.name.localeCompare(b.name)));
      setLoading(false);
    }
    load();
  }, []);

  const filtered = companies.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.industry.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="flex h-full items-center justify-center py-20"><Spinner size="lg" /></div>;
  }

  return (
    <div>
      <PageHeader
        title="Companies"
        description={`${companies.length} organizations in your CRM`}
        icon={<Building2 size={20} />}
        actions={<Button size="sm"><Plus size={15} /> Add Company</Button>}
      />

      <div className="mb-4 max-w-sm">
        <Input
          placeholder="Search companies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<Search size={15} />}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((company, i) => (
          <Card key={company.id} hover className="animate-fade-in-up" style={{ animationDelay: `${i * 50}ms` }}>
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-copper-500 to-copper-700 text-white font-semibold">
                  {company.name.slice(0, 2).toUpperCase()}
                </div>
                <Badge
                  tone={company.status === "active" ? "success" : company.status === "prospect" ? "info" : "neutral"}
                  dot
                >
                  {company.status}
                </Badge>
              </div>
              <h3 className="text-base font-semibold text-surface-900">{company.name}</h3>
              <p className="text-sm text-surface-500 mb-3">{company.industry}</p>

              <div className="space-y-1.5 text-sm text-surface-600">
                {company.website && (
                  <div className="flex items-center gap-2">
                    <Globe size={14} className="text-surface-400" />
                    <span className="truncate">{company.website}</span>
                  </div>
                )}
                {company.email && (
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-surface-400" />
                    <span className="truncate">{company.email}</span>
                  </div>
                )}
                {company.phone && (
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-surface-400" />
                    <span>{company.phone}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 mt-4 pt-3 border-t border-surface-100">
                <div>
                  <p className="text-xs text-surface-400">Employees</p>
                  <p className="text-sm font-medium text-surface-900">{formatNumber(company.employees)}</p>
                </div>
                <div>
                  <p className="text-xs text-surface-400">Revenue</p>
                  <p className="text-sm font-medium text-surface-900">{formatCompactCurrency(company.revenue)}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center">
          <Building2 size={32} className="mx-auto text-surface-300 mb-3" />
          <p className="text-sm text-surface-400">No companies found</p>
        </div>
      )}
    </div>
  );
}
