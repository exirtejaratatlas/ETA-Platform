import { Link } from "react-router-dom";
import {
  Sparkles, Users, Target, Repeat, Calculator, Clock, ScanText, Workflow,
} from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { Card, CardHeader, CardBody, CardTitle } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Alert } from "../components/ui/Alert";

const plannedCapabilities = [
  {
    icon: Users,
    title: "Supplier Recommendation",
    description: "Would suggest approved suppliers for an RFQ line.",
    docId: "ETA-ENT-RFQ-001",
  },
  {
    icon: Target,
    title: "Technical Matching",
    description: "Would match customer specifications to catalogue products.",
    docId: "ETA-ENT-PRODUCT-001",
  },
  {
    icon: Repeat,
    title: "Alternative Products",
    description: "Would propose interchangeable items when a part is obsolete.",
    docId: "ETA-ENT-PRODUCT-001",
  },
  {
    icon: Calculator,
    title: "Cost Estimation",
    description: "Would estimate budgetary pricing before quotations arrive.",
    docId: "ETA-ENT-RFQ-001",
  },
  {
    icon: Clock,
    title: "Lead Time Prediction",
    description: "Would predict realistic delivery windows from history.",
    docId: "ETA-ENT-RFQ-001",
  },
  {
    icon: ScanText,
    title: "Document Extraction",
    description: "Would read datasheets and certificates into structured fields.",
    docId: "ETA-ENT-PRODUCT-002",
  },
];

export default function AiPlatform() {
  return (
    <div>
      <PageHeader
        title="AI Platform"
        description="Planned AI capability — not yet implemented"
        icon={<Sparkles size={20} />}
      />

      <Alert tone="info" title="Not yet implemented" className="mb-6">
        No AI model is integrated on this page and nothing here is running. AI capability requires
        an approved Change Request per decision D4 and IMPLEMENTATION-GATE.md before implementation begins.
      </Alert>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Planned Capabilities</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {plannedCapabilities.map((capability) => (
              <div
                key={capability.title}
                className="rounded-xl border border-surface-200 p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-100 text-surface-600">
                    <capability.icon size={18} />
                  </div>
                  <Badge tone="neutral">Not started</Badge>
                </div>
                <p className="text-sm font-semibold text-surface-900">{capability.title}</p>
                <p className="text-xs text-surface-500 mt-0.5">{capability.description}</p>
                <p className="text-xs text-surface-400 mt-2">{capability.docId}</p>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What is available today</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-100 text-surface-600 shrink-0">
              <Workflow size={16} />
            </div>
            <p className="text-sm text-surface-600">
              RFQ workflow governance is enforced today by a deterministic, rules-based{" "}
              <Link to="/rfq" className="text-copper-600 font-medium hover:underline">
                Workflow Guide
              </Link>{" "}
              that evaluates the approved business rules in ETA-ENT-RFQ-004. It is not an AI
              feature: no model call, no score, no ranking, no recommendation.
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
