import { Activity, Database, Globe, Lock, Server } from "lucide-react";
import { cn } from "@/lib/utils";

interface SystemMetric {
  label: string;
  value: string;
  status: "online" | "warning" | "offline";
  icon: typeof Activity;
}

const metrics: SystemMetric[] = [
  { label: "API Gateway", value: "99.9% uptime", status: "online", icon: Globe },
  { label: "Database Cluster", value: "3 nodes active", status: "online", icon: Database },
  { label: "Blockchain Node", value: "Synced", status: "online", icon: Server },
  { label: "Auth Service", value: "Active", status: "online", icon: Lock },
  { label: "WebSocket", value: "Connected", status: "online", icon: Activity },
];

const statusColors = {
  online: "bg-success",
  warning: "bg-warning",
  offline: "bg-destructive",
};

export function SystemStatus() {
  return (
    <div className="card-elevated rounded-lg">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-foreground">System Health</h3>
      </div>
      <div className="p-4 space-y-3">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.label}
              className="flex items-center justify-between py-2"
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{metric.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground font-mono">
                  {metric.value}
                </span>
                <span
                  className={cn(
                    "w-2 h-2 rounded-full",
                    statusColors[metric.status]
                  )}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
