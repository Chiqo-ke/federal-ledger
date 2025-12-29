import { useQuery } from "@tanstack/react-query";
import { DollarSign, Users, CreditCard } from "lucide-react";

import { AdminLayout } from "@/components/layout/AdminLayout";
import { KPICard } from "@/components/dashboard/KPICard";
import { ActivityPanel } from "@/components/dashboard/ActivityPanel";
import { SystemStatus } from "@/components/dashboard/SystemStatus";
import {
  getKpis,
  getTransactions,
  getWalletCount,
  getBlockCount,
} from "../services/api";

const Dashboard = () => {
  const {
    data: kpis,
    isLoading: kpisLoading,
  } = useQuery({ queryKey: ["kpis"], queryFn: getKpis });
  const {
    data: transactions,
    isLoading: transactionsLoading,
  } = useQuery({ queryKey: ["transactions"], queryFn: getTransactions });
  const {
    data: walletCount,
    isLoading: walletCountLoading,
  } = useQuery({ queryKey: ["walletCount"], queryFn: getWalletCount });
  const {
    data: blockCount,
    isLoading: blockCountLoading,
  } = useQuery({ queryKey: ["blockCount"], queryFn: getBlockCount });

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
            title="Total Volume"
            value={`$${kpis?.total_volume?.toLocaleString() ?? "0"}`}
            icon={DollarSign}
            variant="success"
            isLoading={kpisLoading}
            subtitle="Total funds transferred"
          />
          <KPICard
            title="Total Transactions"
            value={kpis?.total_transactions?.toLocaleString() ?? "0"}
            icon={CreditCard}
            variant="info"
            isLoading={kpisLoading}
            subtitle="Completed transactions"
          />
          <KPICard
            title="Pending Transactions"
            value={kpis?.pending_transactions?.toLocaleString() ?? "0"}
            icon={Users}
            variant="warning"
            isLoading={kpisLoading}
            subtitle="Awaiting confirmation"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <ActivityPanel
              transactions={transactions}
              isLoading={transactionsLoading}
            />
          </div>
          <div>
            <SystemStatus
              walletCount={walletCount?.count}
              blockCount={blockCount?.count}
              isLoading={walletCountLoading || blockCountLoading}
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
