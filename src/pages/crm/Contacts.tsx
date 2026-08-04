import { useEffect, useState } from "react";
import { Users, Plus, Search, Mail, Phone } from "lucide-react";
import type { Contact } from "../../lib/supabase";
import { getContacts, getCompanies } from "../../lib/data";
import { PageHeader } from "../../components/ui/PageHeader";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Avatar } from "../../components/ui/Avatar";
import { Spinner } from "../../components/ui/Spinner";
import { getInitials } from "../../lib/format";

export default function Contacts() {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<(Contact & { company_name?: string })[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function load() {
      const [contactData, companies] = await Promise.all([getContacts(), getCompanies()]);

      const companyMap = new Map(companies.map((c) => [c.id, c.name] as [string, string]));
      const enriched = contactData.map((c) => ({
        ...c,
        company_name: c.company_id ? companyMap.get(c.company_id) : undefined,
      }));
      setContacts(enriched);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = contacts.filter((c) =>
    `${c.first_name} ${c.last_name}`.toLowerCase().includes(search.toLowerCase()) ||
    (c.title ?? "").toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="flex h-full items-center justify-center py-20"><Spinner size="lg" /></div>;
  }

  return (
    <div>
      <PageHeader
        title="Contacts"
        description={`${contacts.length} people across your organizations`}
        icon={<Users size={20} />}
        actions={<Button size="sm"><Plus size={15} /> Add Contact</Button>}
      />

      <div className="mb-4 max-w-sm">
        <Input
          placeholder="Search contacts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<Search size={15} />}
        />
      </div>

      <Card>
        <div className="divide-y divide-surface-100">
          {filtered.map((contact, i) => (
            <div
              key={contact.id}
              className="flex items-center gap-4 p-4 hover:bg-surface-50 transition-colors cursor-pointer animate-fade-in"
              style={{ animationDelay: `${i * 30}ms` }}
            >
              <Avatar
                initials={getInitials(contact.first_name, contact.last_name)}
                size="lg"
                tone={i % 3 === 0 ? "copper" : i % 3 === 1 ? "info" : "neutral"}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-surface-900">
                    {contact.first_name} {contact.last_name}
                  </p>
                  <Badge tone={contact.status === "active" ? "success" : "neutral"} dot>
                    {contact.status}
                  </Badge>
                </div>
                <p className="text-sm text-surface-500">{contact.title || "—"}</p>
                {contact.company_name && (
                  <p className="text-xs text-surface-400 mt-0.5">{contact.company_name}</p>
                )}
              </div>
              <div className="hidden sm:flex items-center gap-4 text-sm text-surface-600">
                {contact.email && (
                  <div className="flex items-center gap-1.5">
                    <Mail size={14} className="text-surface-400" />
                    <span className="truncate max-w-[180px]">{contact.email}</span>
                  </div>
                )}
                {contact.phone && (
                  <div className="flex items-center gap-1.5">
                    <Phone size={14} className="text-surface-400" />
                    <span>{contact.phone}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {filtered.length === 0 && (
        <div className="py-20 text-center">
          <Users size={32} className="mx-auto text-surface-300 mb-3" />
          <p className="text-sm text-surface-400">No contacts found</p>
        </div>
      )}
    </div>
  );
}
