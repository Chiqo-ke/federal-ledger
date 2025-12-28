import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
  variant?: "default" | "success" | "warning" | "info";
}

export function KPICard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = "default",
}: KPICardProps) {
  const variantStyles = {
    default: "border-border",
    success: "border-l-4 border-l-success border-t-0 border-r-0 border-b-0",
    warning: "border-l-4 border-l-warning border-t-0 border-r-0 border-b-0",
    info: "border-l-4 border-l-accent border-t-0 border-r-0 border-b-0",
  };

  return (
    <div
      className={cn(
        "card-elevated rounded-lg p-5 flex flex-col gap-4",
        variantStyles[variant]
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {title}
          </p>
          <p className="text-2xl font-bold text-foreground mt-1 font-mono tabular-nums">
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        <div className="w-10 h-10 rounded bg-muted/50 flex items-center justify-center">
          <Icon className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>

      {trend && (
        <div className="flex items-center gap-1">
          <span
            className={cn(
              "text-xs font-medium",
              trend.positive ? "text-success" : "text-destructive"
            )}
          >
            {trend.positive ? "↑" : "↓"} {trend.value}
          </span>
          <span className="text-xs text-muted-foreground">vs last period</span>
        </div>
      )}
    </div>
  );
}
