import { CheckCircle2, CircleDashed, Info, ShieldCheck, XCircle } from "lucide-react";
import type { Rfq, RfqLine, RfqSupplierResponse } from "../../lib/supabase";
import { evaluateRfqRules, ruleSummary, type RuleResult } from "../../lib/rfqLifecycle";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Progress } from "../ui/Progress";

// ---------------------------------------------------------------------------
// RFQ Workflow Guide
//
// NOT AN AI FEATURE. This panel evaluates the Approved business rules in
// ETA-Blueprint ETA-ENT-RFQ-004 against the record in front of the user and
// reports pass/fail with the observed evidence. It calls no model, produces no
// score, ranking or recommendation, and makes no automated decision.
//
// AI automation remains forbidden without a Change Request (CODING-RULES.md /
// IMPLEMENTATION-GATE.md), and D4 forbids present-tense AI claims on any ETA
// surface. The label below states plainly what this is.
// ---------------------------------------------------------------------------

const severityLabel: Record<RuleResult["severity"], string> = {
  blocker: "Blocker",
  required: "Required",
  advisory: "Advisory",
};

const severityTone: Record<RuleResult["severity"], "error" | "warning" | "neutral"> = {
  blocker: "error",
  required: "warning",
  advisory: "neutral",
};

function StatusIcon({ status }: { status: RuleResult["status"] }) {
  if (status === "pass") return <CheckCircle2 size={16} className="text-success shrink-0 mt-0.5" />;
  if (status === "fail") return <XCircle size={16} className="text-error shrink-0 mt-0.5" />;
  return <CircleDashed size={16} className="text-surface-300 shrink-0 mt-0.5" />;
}

export function RfqWorkflowGuide({
  rfq,
  lines,
  responses,
}: {
  rfq: Rfq;
  lines: RfqLine[];
  responses: RfqSupplierResponse[];
}) {
  const results = evaluateRfqRules(rfq, lines, responses);
  const summary = ruleSummary(results);
  const open = results.filter((r) => r.status === "fail");
  const met = results.filter((r) => r.status === "pass");
  const skipped = results.filter((r) => r.status === "not_applicable");

  return (
    <Card className="p-5">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-100 text-surface-600 shrink-0">
            <ShieldCheck size={17} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-surface-900">Workflow Guide</h3>
            <p className="text-xs text-surface-500 mt-0.5">
              Rules-based check against ETA-ENT-RFQ-004 · not an AI feature, no scoring or recommendation
            </p>
          </div>
        </div>
        <div className="text-end">
          <p className="text-sm font-semibold text-surface-900">
            {summary.passed}/{summary.total} rules met
          </p>
          {summary.blockers > 0 ? (
            <Badge tone="error" dot>
              {summary.blockers} blocker{summary.blockers === 1 ? "" : "s"}
            </Badge>
          ) : summary.failed > 0 ? (
            <Badge tone="warning" dot>
              {summary.failed} open
            </Badge>
          ) : (
            <Badge tone="success" dot>
              All checks met
            </Badge>
          )}
        </div>
      </div>

      <Progress
        value={summary.passed}
        max={Math.max(summary.total, 1)}
        tone={summary.blockers > 0 ? "error" : summary.failed > 0 ? "warning" : "success"}
        size="sm"
      />

      {open.length > 0 && (
        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-surface-400 mb-2">
            Open ({open.length})
          </p>
          <ul className="space-y-2.5">
            {open.map((r) => (
              <li key={r.id} className="flex gap-2.5">
                <StatusIcon status={r.status} />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="font-mono text-xs text-surface-500">{r.id}</span>
                    <Badge tone={severityTone[r.severity]}>{severityLabel[r.severity]}</Badge>
                    <span className="text-xs text-surface-400">{r.gate}</span>
                  </div>
                  <p className="text-sm text-surface-900 mt-0.5">{r.rule}</p>
                  <p className="text-xs text-surface-500 mt-0.5">{r.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {met.length > 0 && (
        <details className="mt-5 group">
          <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wider text-surface-400 hover:text-surface-600 transition-colors">
            Met ({met.length})
          </summary>
          <ul className="mt-2.5 space-y-2">
            {met.map((r) => (
              <li key={r.id} className="flex gap-2.5">
                <StatusIcon status={r.status} />
                <div className="min-w-0">
                  <p className="text-sm text-surface-700">
                    <span className="font-mono text-xs text-surface-400 me-1.5">{r.id}</span>
                    {r.rule}
                  </p>
                  <p className="text-xs text-surface-400 mt-0.5">{r.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </details>
      )}

      {skipped.length > 0 && (
        <p className="mt-4 flex items-start gap-1.5 text-xs text-surface-400">
          <Info size={13} className="mt-0.5 shrink-0" />
          {skipped.length} rule{skipped.length === 1 ? "" : "s"} not applicable to this RFQ (
          {skipped.map((r) => r.id).join(", ")}).
        </p>
      )}
    </Card>
  );
}
