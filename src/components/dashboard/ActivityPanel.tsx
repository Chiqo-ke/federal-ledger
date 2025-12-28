import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface ActivityItem {
  id: string;
  type: "payment" | "report" | "approval" | "blockchain";
  description: string;
  timestamp: string;
  status: "pending" | "approved" | "rejected" | "confirmed";
  reference?: string;
}

const mockActivities: ActivityItem[] = [
  {
    id: "1",
    type: "payment",
    description: "Tax payment received from Citizen ID ****7842",
    timestamp: "2 minutes ago",
    status: "confirmed",
    reference: "TX-2024-00847",
  },
  {
    id: "2",
    type: "report",
    description: "Quarterly financial report submitted",
    timestamp: "5 minutes ago",
    status: "pending",
    reference: "RPT-Q4-2024",
  },
  {
    id: "3",
    type: "approval",
    description: "Expense claim approved by Admin Johnson",
    timestamp: "12 minutes ago",
    status: "approved",
    reference: "EXP-2024-1247",
  },
  {
    id: "4",
    type: "blockchain",
    description: "Block #4,847,291 confirmed on ledger",
    timestamp: "15 minutes ago",
    status: "confirmed",
  },
  {
    id: "5",
    type: "report",
    description: "Audit discrepancy flagged for review",
    timestamp: "23 minutes ago",
    status: "rejected",
    reference: "AUD-2024-0089",
  },
  {
    id: "6",
    type: "payment",
    description: "Bulk payment processed for Department of Transport",
    timestamp: "34 minutes ago",
    status: "confirmed",
    reference: "TX-2024-00846",
  },
  {
    id: "7",
    type: "approval",
    description: "New user registration pending verification",
    timestamp: "45 minutes ago",
    status: "pending",
    reference: "USR-2024-0923",
  },
  {
    id: "8",
    type: "blockchain",
    description: "Smart contract execution completed",
    timestamp: "1 hour ago",
    status: "confirmed",
  },
];

const statusBadgeVariant = {
  pending: "pending" as const,
  approved: "approved" as const,
  rejected: "rejected" as const,
  confirmed: "approved" as const,
};

const typeLabels = {
  payment: "Payment",
  report: "Report",
  approval: "Action",
  blockchain: "Chain",
};

export function ActivityPanel() {
  return (
    <div className="card-elevated rounded-lg">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Real-Time Activity</h3>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse-subtle" />
            <span className="text-xs text-muted-foreground">Live</span>
          </div>
        </div>
      </div>
      <ScrollArea className="h-[400px]">
        <div className="p-4 space-y-3">
          {mockActivities.map((activity) => (
            <div
              key={activity.id}
              className={cn(
                "log-item",
                activity.status === "pending" && "log-item-pending",
                activity.status === "approved" && "log-item-approved",
                activity.status === "confirmed" && "log-item-approved",
                activity.status === "rejected" && "log-item-rejected"
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="muted" className="text-[10px]">
                      {typeLabels[activity.type]}
                    </Badge>
                    <Badge variant={statusBadgeVariant[activity.status]} className="text-[10px]">
                      {activity.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-foreground mt-1.5 leading-relaxed">
                    {activity.description}
                  </p>
                  {activity.reference && (
                    <p className="text-xs font-mono text-muted-foreground mt-1">
                      Ref: {activity.reference}
                    </p>
                  )}
                </div>
                <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                  {activity.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
