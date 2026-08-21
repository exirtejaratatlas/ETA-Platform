import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Plus, Search } from "lucide-react";
import type { PurchaseOrder, PoItem, Rfq } from "../../lib/supabase";
import { getPurchaseOrders, getSuppliers, getPoItems, getRfqs } from "../../lib/data";
import { PageHeader } from "../../components/ui/PageHeader";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Modal } from "../../components/ui/Modal";
import { DataTable } from "../../components/ui/DataTable";
import { Spinner } from "../../components/ui/Spinner";
import { formatCurrency, formatDate } from "../../lib/format";

const statusTones: Record<string, "neutral" | "info" | "warning" | "copper" | "success" | "error"> = {
  draft: "neutral",
  submitted: "warning",
  approved: "info",
  shipped: "copper",
  received: "success",
  cancelled: "error",
};

type EnrichedPO = PurchaseOrder & {
  supplier_name?: string;
  rfq?: Pick<Rfq, "id" | "rfq_number" | "rfq_title">;
  awarded_supplier_name?: string;
};

export default function PurchaseOrders() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<EnrichedPO[]>([]);
  const [search, setSearch] = useState("");
  const [selectedPO, setSelectedPO] = useState<{ po: EnrichedPO; items: PoItem[] } | null>(null);
  const [itemsLoading, setItemsLoading] = useState(false);

  useEffect(() => {
    async function load() {
      const [poData, suppliers, rfqs] = await Promise.all([getPurchaseOrders(), getSuppliers(), getRfqs()]);
      const supplierMap = new Map(suppliers.map((s) => [s.id, s.name] as [string, string]));
      const rfqMap = new Map(rfqs.map((r) => [r.id, r] as [string, Rfq]));
      const enriched = poData.map((po) => {
        const rfq = po.rfq_id ? rfqMap.get(po.rfq_id) : undefined;
        return {
          ...po,
          supplier_name: po.supplier_id ? supplierMap.get(po.supplier_id) : undefined,
          rfq,
          awarded_supplier_name: rfq?.winning_supplier_id ? supplierMap.get(rfq.winning_supplier_id) : undefined,
        };
      });
      setOrders(enriched);
      setLoading(false);
    }
    load();
  }, []);

  async function openPODetails(po: EnrichedPO) {
    setSelectedPO({ po, items: [] });
    setItemsLoading(true);
    const items = await getPoItems(po.id);
    setSelectedPO({ po, items });
    setItemsLoading(false);
  }

  const filtered = orders.filter((o) =>
    o.po_number.toLowerCase().includes(search.toLowerCase()) ||
    (o.supplier_name ?? "").toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="flex h-full items-center justify-center py-20"><Spinner size="lg" /></div>;
  }

  return (
    <div>
      <PageHeader
        title="Purchase Orders"
        description={`${orders.length} orders across all suppliers`}
        icon={<ShoppingBag size={20} />}
        actions={<Button size="sm"><Plus size={15} /> New PO</Button>}
      />

      <div className="mb-4 max-w-sm">
        <Input
          placeholder="Search by PO number or supplier..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<Search size={15} />}
        />
      </div>

      <Card>
        <DataTable
          columns={[
            {
              key: "po_number",
              label: "PO Number",
              render: (row) => <span className="font-medium text-surface-900">{row.po_number}</span>,
            },
            {
              key: "supplier_name",
              label: "Supplier",
              render: (row) => <span className="text-surface-600">{row.supplier_name ?? "—"}</span>,
            },
            {
              key: "rfq",
              label: "RFQ",
              render: (row) =>
                row.rfq ? (
                  <Link
                    to={`/rfq/${row.rfq.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className="font-mono text-xs text-copper-600 hover:text-copper-700"
                  >
                    {row.rfq.rfq_number}
                  </Link>
                ) : (
                  <span className="text-xs text-surface-400">Direct procurement</span>
                ),
            },
            {
              key: "total",
              label: "Total",
              align: "right",
              render: (row) => <span className="font-medium text-surface-900">{formatCurrency(row.total, row.currency)}</span>,
            },
            {
              key: "order_date",
              label: "Order Date",
              render: (row) => <span className="text-surface-500">{formatDate(row.order_date)}</span>,
            },
            {
              key: "expected_delivery",
              label: "Expected Delivery",
              render: (row) => <span className="text-surface-500">{formatDate(row.expected_delivery)}</span>,
            },
            {
              key: "status",
              label: "Status",
              align: "center",
              render: (row) => <Badge tone={statusTones[row.status]} dot>{row.status}</Badge>,
            },
          ]}
          data={filtered}
          onRowClick={openPODetails}
        />
      </Card>

      {/* PO Details Modal */}
      <Modal
        open={!!selectedPO}
        onClose={() => setSelectedPO(null)}
        title={selectedPO?.po.po_number ?? ""}
        size="lg"
      >
        {selectedPO && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-surface-400 uppercase tracking-wide">Supplier</p>
                <p className="text-sm font-medium text-surface-900 mt-0.5">{selectedPO.po.supplier_name ?? "—"}</p>
              </div>
              <div>
                <p className="text-xs text-surface-400 uppercase tracking-wide">Total</p>
                <p className="text-sm font-medium text-surface-900 mt-0.5">{formatCurrency(selectedPO.po.total, selectedPO.po.currency)}</p>
              </div>
              <div>
                <p className="text-xs text-surface-400 uppercase tracking-wide">Order Date</p>
                <p className="text-sm font-medium text-surface-900 mt-0.5">{formatDate(selectedPO.po.order_date)}</p>
              </div>
              <div>
                <p className="text-xs text-surface-400 uppercase tracking-wide">Status</p>
                <div className="mt-0.5"><Badge tone={statusTones[selectedPO.po.status]} dot>{selectedPO.po.status}</Badge></div>
              </div>
              <div>
                <p className="text-xs text-surface-400 uppercase tracking-wide">Originating RFQ</p>
                {selectedPO.po.rfq ? (
                  <Link
                    to={`/rfq/${selectedPO.po.rfq.id}`}
                    className="text-sm font-medium text-copper-600 hover:text-copper-700 mt-0.5 block"
                  >
                    {selectedPO.po.rfq.rfq_number}
                  </Link>
                ) : (
                  <p className="text-sm font-medium text-surface-900 mt-0.5">Direct procurement</p>
                )}
              </div>
              <div>
                <p className="text-xs text-surface-400 uppercase tracking-wide">Awarded Supplier</p>
                <p className="text-sm font-medium text-surface-900 mt-0.5">
                  {selectedPO.po.rfq ? selectedPO.po.awarded_supplier_name ?? "—" : "—"}
                </p>
              </div>
            </div>

            <div className="border-t border-surface-200 pt-4">
              <h4 className="text-sm font-semibold text-surface-900 mb-3">Line Items</h4>
              {itemsLoading ? (
                <div className="flex justify-center py-8"><Spinner /></div>
              ) : selectedPO.items.length > 0 ? (
                <div className="space-y-2">
                  {selectedPO.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-2 px-3 rounded-lg bg-surface-50">
                      <div>
                        <p className="text-sm font-medium text-surface-900">{item.description}</p>
                        <p className="text-xs text-surface-400">{item.quantity} {item.unit} x {formatCurrency(item.unit_price)}</p>
                      </div>
                      <span className="text-sm font-semibold text-surface-900">{formatCurrency(item.total)}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between py-2 px-3 mt-2 border-t border-surface-200">
                    <span className="text-sm font-semibold text-surface-700">Total</span>
                    <span className="text-base font-bold text-surface-900">{formatCurrency(selectedPO.po.total, selectedPO.po.currency)}</span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-surface-400 py-4 text-center">No line items</p>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
