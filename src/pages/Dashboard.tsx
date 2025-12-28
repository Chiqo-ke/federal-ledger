import { AdminLayout } from "@/components/layout/AdminLayout";
import { KPICard } from "@/components/dashboard/KPICard";
import { ActivityPanel } from "@/components/dashboard/ActivityPanel";
import { SystemStatus } from "@/components/dashboard/SystemStatus";
import { DollarSign, FileText, CheckCircle, AlertTriangle } from "lucide-react";

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            National Financial Blockchain Administration Overview
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Total Tax Revenue (YTD)"
            value="$847.2M"
            subtitle="Fiscal Year 2024"
            icon={DollarSign}
            variant="success"
            trend={{ value: "12.4%", positive: true }}
          />
          <KPICard
            title="Pending Reports"
            value="23"
            subtitle="Awaiting review"
            icon={FileText}
            variant="warning"
          />
          <KPICard
            title="Approved Transactions"
            value="12,847"
            subtitle="This month"
            icon={CheckCircle}
            variant="info"
            trend={{ value: "8.2%", positive: true }}
          />
          <KPICard
            title="Flagged Items"
            value="7"
            subtitle="Requires attention"
            icon={AlertTriangle}
            variant="warning"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Activity Panel - Takes 2 columns */}
          <div className="lg:col-span-2">
            <ActivityPanel />
          </div>

          {/* System Status - Takes 1 column */}
          <div>
            <SystemStatus />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card-elevated rounded-lg p-5">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Today's Revenue
            </h3>
            <p className="text-xl font-bold font-mono text-foreground mt-2">
              $4,847,291.00
            </p>
            <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-success rounded-full"
                style={{ width: "78%" }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              78% of daily target
            </p>
          </div>

          <div className="card-elevated rounded-lg p-5">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Monthly Revenue
            </h3>
            <p className="text-xl font-bold font-mono text-foreground mt-2">
              $127,492,841.00
            </p>
            <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: "94%" }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              94% of monthly target
            </p>
          </div>

          <div className="card-elevated rounded-lg p-5">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Blockchain Confirmations
            </h3>
            <p className="text-xl font-bold font-mono text-foreground mt-2">
              4,847,291
            </p>
            <div className="mt-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse-subtle" />
              <span className="text-xs text-muted-foreground">
                Last block: 2 seconds ago
              </span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
