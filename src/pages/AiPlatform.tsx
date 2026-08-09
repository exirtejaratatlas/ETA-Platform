import { useEffect, useState } from "react";
import { Sparkles, Plus, Cpu, Zap, Clock, CircleCheck as CheckCircle2, CircleAlert as AlertCircle, Activity } from "lucide-react";
import type { AiModel, AiTask } from "../lib/supabase";
import { getAiModels, getAiTasks } from "../lib/data";
import { PageHeader } from "../components/ui/PageHeader";
import { Card, CardHeader, CardBody, CardTitle } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { StatCard } from "../components/ui/StatCard";
import { Spinner } from "../components/ui/Spinner";
import { formatRelativeTime } from "../lib/format";

const modelStatusTones: Record<string, "success" | "neutral" | "warning"> = {
  active: "success",
  inactive: "neutral",
  training: "warning",
};

const taskStatusTones: Record<string, "success" | "copper" | "warning" | "error"> = {
  completed: "success",
  running: "copper",
  pending: "warning",
  failed: "error",
};

const providerColors: Record<string, string> = {
  openai: "bg-emerald-50 text-emerald-700",
  anthropic: "bg-orange-50 text-orange-700",
  google: "bg-blue-50 text-blue-700",
};

export default function AiPlatform() {
  const [loading, setLoading] = useState(true);
  const [models, setModels] = useState<AiModel[]>([]);
  const [tasks, setTasks] = useState<AiTask[]>([]);

  useEffect(() => {
    async function load() {
      const [m, t] = await Promise.all([getAiModels(), getAiTasks(50)]);
      setModels(m);
      setTasks(t);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return <div className="flex h-full items-center justify-center py-20"><Spinner size="lg" /></div>;
  }

  const activeModels = models.filter((m) => m.status === "active").length;
  const completedTasks = tasks.filter((t) => t.status === "completed").length;
  const runningTasks = tasks.filter((t) => t.status === "running").length;
  const pendingTasks = tasks.filter((t) => t.status === "pending").length;

  return (
    <div>
      <PageHeader
        title="AI Platform"
        description="Manage AI models and monitor intelligent processing tasks"
        icon={<Sparkles size={20} />}
        actions={<Button size="sm"><Plus size={15} /> Register Model</Button>}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard label="Active Models" value={activeModels} icon={<Cpu size={20} />} tone="info" />
        <StatCard label="Completed Tasks" value={completedTasks} icon={<CheckCircle2 size={20} />} tone="success" />
        <StatCard label="Running" value={runningTasks} icon={<Activity size={20} />} tone="copper" />
        <StatCard label="Pending" value={pendingTasks} icon={<Clock size={20} />} tone="warning" />
      </div>

      {/* AI Models */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Registered AI Models</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {models.map((model, i) => (
              <div
                key={model.id}
                className="rounded-xl border border-surface-200 p-4 hover:border-surface-300 hover:shadow-soft transition-all animate-fade-in-up"
                style={{ animationDelay: `${i * 50}ms` } as React.CSSProperties}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${providerColors[model.provider] ?? "bg-surface-100 text-surface-600"}`}>
                    {model.status === "training" ? <Zap size={18} className="animate-pulse-soft" /> : <Cpu size={18} />}
                  </div>
                  <Badge tone={modelStatusTones[model.status]} dot>{model.status}</Badge>
                </div>
                <p className="text-sm font-semibold text-surface-900">{model.name}</p>
                <p className="text-xs text-surface-500 mt-0.5">{model.provider} · {model.model_type}</p>
                {model.endpoint && (
                  <p className="text-xs text-surface-400 mt-2 truncate">{model.endpoint}</p>
                )}
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Task History */}
      <Card>
        <CardHeader>
          <CardTitle>Task History</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="space-y-2">
            {tasks.map((task, i) => (
              <div
                key={task.id}
                className="flex items-start gap-3 py-3 border-b border-surface-100 last:border-0 animate-fade-in"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg shrink-0 ${
                  task.status === "completed" ? "bg-success/10 text-success-dark" :
                  task.status === "running" ? "bg-copper-50 text-copper-600" :
                  task.status === "pending" ? "bg-warning/10 text-warning-dark" :
                  "bg-error/10 text-error-dark"
                }`}>
                  {task.status === "completed" ? <CheckCircle2 size={16} /> :
                   task.status === "running" ? <Activity size={16} className="animate-pulse-soft" /> :
                   task.status === "pending" ? <Clock size={16} /> :
                   <AlertCircle size={16} />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-surface-900 capitalize">{task.task_type.replace(/_/g, " ")}</p>
                    <Badge tone={taskStatusTones[task.status]} dot>{task.status}</Badge>
                  </div>
                  {task.input_summary && <p className="text-xs text-surface-500 mt-0.5">{task.input_summary}</p>}
                  {task.output_summary && <p className="text-xs text-surface-600 mt-1 bg-surface-50 rounded-lg px-2 py-1">{task.output_summary}</p>}
                  <p className="text-xs text-surface-400 mt-1">{formatRelativeTime(task.created_at)}</p>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
