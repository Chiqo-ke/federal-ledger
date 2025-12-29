import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
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
  isLoading?: boolean;
}

export function KPICard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = "default",
  isLoading,
}: KPICardProps) {
  const variantStyles = {
    default: "border-border hover:border-primary/50",
    success: "border-l-4 border-l-green-500 border-t-0 border-r-0 border-b-0 hover:border-l-green-600",
    warning: "border-l-4 border-l-yellow-500 border-t-0 border-r-0 border-b-0 hover:border-l-yellow-600",
    info: "border-l-4 border-l-blue-500 border-t-0 border-r-0 border-b-0 hover:border-l-blue-600",
  };

  const iconColors = {
    default: "text-gray-500",
    success: "text-green-500",
    warning: "text-yellow-500",
    info: "text-blue-500",
  };

  const iconBgColors = {
    default: "bg-gray-100 hover:bg-gray-200",
    success: "bg-green-100 hover:bg-green-200",
    warning: "bg-yellow-100 hover:bg-yellow-200",
    info: "bg-blue-100 hover:bg-blue-200",
  };

  return (
    <Card
      className={cn(
        "card-elevated rounded-lg p-5 flex flex-col gap-4 transition-all duration-300 hover:shadow-lg cursor-pointer",
        variantStyles[variant]
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-12",
          iconBgColors[variant]
        )}>
          <Icon className={cn("w-6 h-6 transition-colors duration-300", iconColors[variant])} />
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-8 w-3/4" />
        ) : (
          <div className="text-2xl font-bold">{value}</div>
        )}
        {subtitle && !isLoading && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
      </CardContent>
      {trend && !isLoading && (
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
    </Card>
  );
}
