import { AdminLayout } from "@/components/layout/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Shield, User, Database, Settings, LogIn, FileEdit, AlertTriangle } from "lucide-react";
import { useState } from "react";

interface AuditEntry {
  id: string;
  timestamp: string;
  actor: string;
  actorRole: string;
  action: string;
  category: "auth" | "data" | "admin" | "system" | "security";
  details: string;
  ipAddress: string;
}

const mockAuditLogs: AuditEntry[] = [
  {
    id: "AUD-001",
    timestamp: "2024-12-28 14:32:18",
    actor: "Admin Johnson",
    actorRole: "System Administrator",
    action: "Report Approved",
    category: "data",
    details: "Approved report RPT-2024-0847 for tax discrepancy claim",
    ipAddress: "192.168.1.***",
  },
  {
    id: "AUD-002",
    timestamp: "2024-12-28 14:28:45",
    actor: "System",
    actorRole: "Automated Process",
    action: "Blockchain Sync",
    category: "system",
    details: "Successfully synced with blockchain node. Block height: 4,847,291",
    ipAddress: "Internal",
  },
  {
    id: "AUD-003",
    timestamp: "2024-12-28 14:15:22",
    actor: "Admin Williams",
    actorRole: "Finance Manager",
    action: "Transaction Initiated",
    category: "data",
    details: "Initiated transfer TX-2024-00845 to Department of Transport",
    ipAddress: "192.168.1.***",
  },
  {
    id: "AUD-004",
    timestamp: "2024-12-28 13:45:00",
    actor: "Admin Johnson",
    actorRole: "System Administrator",
    action: "Login Success",
    category: "auth",
    details: "Successful authentication via SSO",
    ipAddress: "192.168.1.***",
  },
  {
    id: "AUD-005",
    timestamp: "2024-12-28 13:30:12",
    actor: "System",
    actorRole: "Automated Process",
    action: "Backup Completed",
    category: "system",
    details: "Daily database backup completed successfully. Size: 847.2 GB",
    ipAddress: "Internal",
  },
  {
    id: "AUD-006",
    timestamp: "2024-12-28 12:15:33",
    actor: "Admin Chen",
    actorRole: "Security Officer",
    action: "Security Policy Updated",
    category: "security",
    details: "Updated password policy: minimum 16 characters required",
    ipAddress: "192.168.1.***",
  },
  {
    id: "AUD-007",
    timestamp: "2024-12-28 11:45:00",
    actor: "Admin Williams",
    actorRole: "Finance Manager",
    action: "Report Rejected",
    category: "data",
    details: "Rejected report RPT-2024-0844 due to insufficient documentation",
    ipAddress: "192.168.1.***",
  },
  {
    id: "AUD-008",
    timestamp: "2024-12-28 10:22:18",
    actor: "Unknown",
    actorRole: "N/A",
    action: "Failed Login Attempt",
    category: "auth",
    details: "Failed authentication attempt blocked. Account: admin@gov.local",
    ipAddress: "203.45.67.***",
  },
  {
    id: "AUD-009",
    timestamp: "2024-12-28 09:00:00",
    actor: "System",
    actorRole: "Automated Process",
    action: "System Start",
    category: "system",
    details: "All services started successfully. Uptime reset.",
    ipAddress: "Internal",
  },
  {
    id: "AUD-010",
    timestamp: "2024-12-27 23:59:59",
    actor: "System",
    actorRole: "Automated Process",
    action: "Daily Reconciliation",
    category: "admin",
    details: "End of day reconciliation completed. All balances verified.",
    ipAddress: "Internal",
  },
];

const categoryIcons = {
  auth: LogIn,
  data: Database,
  admin: FileEdit,
  system: Settings,
  security: Shield,
};

const categoryBadgeVariant = {
  auth: "info" as const,
  data: "muted" as const,
  admin: "pending" as const,
  system: "secondary" as const,
  security: "rejected" as const,
};

const AuditLogs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const filteredLogs = mockAuditLogs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.actor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || log.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Audit Logs</h1>
          <p className="text-muted-foreground mt-1">
            Immutable chronological record of all system activities
          </p>
        </div>

        {/* Warning Banner */}
        <div className="flex items-center gap-3 p-4 bg-muted/30 border border-border rounded-lg">
          <AlertTriangle className="h-5 w-5 text-warning shrink-0" />
          <div>
            <p className="text-sm font-medium text-foreground">
              Read-Only Audit Log
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              This log is immutable and cannot be modified. All entries are
              cryptographically signed and verified against the blockchain.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search actions, actors, or details..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="auth">Authentication</SelectItem>
              <SelectItem value="data">Data Operations</SelectItem>
              <SelectItem value="admin">Administrative</SelectItem>
              <SelectItem value="system">System Events</SelectItem>
              <SelectItem value="security">Security</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Audit Log Timeline */}
        <div className="card-elevated rounded-lg">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Activity Timeline</h3>
            <span className="text-xs text-muted-foreground font-mono">
              {filteredLogs.length} entries
            </span>
          </div>
          <ScrollArea className="h-[600px]">
            <div className="p-4 space-y-4">
              {filteredLogs.map((log) => {
                const CategoryIcon = categoryIcons[log.category];
                return (
                  <div
                    key={log.id}
                    className="flex gap-4 p-4 bg-muted/20 rounded-lg border border-border hover:bg-muted/30 transition-colors"
                  >
                    {/* Icon */}
                    <div className="w-10 h-10 rounded bg-muted flex items-center justify-center shrink-0">
                      <CategoryIcon className="h-5 w-5 text-muted-foreground" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-medium text-foreground">
                            {log.action}
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {log.details}
                          </p>
                        </div>
                        <Badge variant={categoryBadgeVariant[log.category]}>
                          {log.category}
                        </Badge>
                      </div>

                      {/* Metadata */}
                      <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{log.actor}</span>
                          <span className="text-muted-foreground/60">
                            ({log.actorRole})
                          </span>
                        </div>
                        <span className="font-mono">{log.timestamp}</span>
                        <span className="font-mono text-muted-foreground/60">
                          IP: {log.ipAddress}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>

        {/* Footer Info */}
        <div className="text-xs text-muted-foreground text-center">
          <p>
            All audit log entries are stored immutably and verified against the
            blockchain ledger.
          </p>
          <p className="mt-1">
            For compliance inquiries, contact the Security Office.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AuditLogs;
