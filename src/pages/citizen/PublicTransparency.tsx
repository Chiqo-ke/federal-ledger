import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CitizenLayout } from "@/components/layout/CitizenLayout";
import {
  DollarSign,
  FileText,
  Shield,
  Building2,
  AlertTriangle,
  TrendingUp,
  Calendar,
  Eye,
  ArrowRight,
} from "lucide-react";

const PublicTransparency = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const sections = [
    {
      id: "financial-summary",
      title: "Public Financial Summary",
      description: "Aggregate revenue, expenditure data visible to citizens",
      icon: DollarSign,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      data: {
        totalRevenue: 125000000000,
        totalExpenditure: 98500000000,
        surplus: 26500000000,
        lastUpdated: "2026-01-02",
      },
    },
    {
      id: "quarterly-reports",
      title: "Quarterly Reports",
      description: "Published quarterly financial reports and audits",
      icon: FileText,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      data: {
        latestQuarter: "Q4 2025",
        totalReports: 16,
        downloadable: true,
      },
    },
    {
      id: "blockchain-verification",
      title: "Blockchain Verification Portal",
      description: "Public access to verify transaction hashes on the ledger",
      icon: Shield,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      data: {
        totalTransactions: 45623,
        blockHeight: 12458,
        lastBlockTime: "2 minutes ago",
      },
    },
    {
      id: "department-budgets",
      title: "Department Budgets",
      description: "Detailed budget allocations by department",
      icon: Building2,
      color: "text-green-600",
      bgColor: "bg-green-50",
      data: {
        totalDepartments: 18,
        totalBudget: 125000000000,
        topDepartment: "Education",
      },
    },
    {
      id: "pending-investigations",
      title: "Pending Investigations",
      description: "Status of ongoing financial investigations",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      data: {
        activeInvestigations: 7,
        resolved: 23,
        pending: 7,
      },
    },
  ];

  const renderSectionDetails = (section: typeof sections[0]) => {
    switch (section.id) {
      case "financial-summary":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Total Revenue</CardDescription>
                  <CardTitle className="text-2xl text-green-600">
                    KES {(section.data.totalRevenue / 1000000000).toFixed(1)}B
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Total Expenditure</CardDescription>
                  <CardTitle className="text-2xl text-orange-600">
                    KES {(section.data.totalExpenditure / 1000000000).toFixed(1)}B
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Budget Surplus</CardDescription>
                  <CardTitle className="text-2xl text-blue-600">
                    KES {(section.data.surplus / 1000000000).toFixed(1)}B
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>
            <p className="text-sm text-muted-foreground">
              Last updated: {new Date(section.data.lastUpdated).toLocaleDateString()}
            </p>
          </div>
        );

      case "quarterly-reports":
        return (
          <div className="space-y-4">
            <h3 className="font-semibold">Available Reports</h3>
            {["Q4 2025", "Q3 2025", "Q2 2025", "Q1 2025"].map((quarter) => (
              <div
                key={quarter}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{quarter} Financial Report</p>
                    <p className="text-sm text-muted-foreground">
                      Comprehensive financial overview and audit results
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
              </div>
            ))}
          </div>
        );

      case "blockchain-verification":
        return (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Blockchain Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Transactions</p>
                  <p className="text-2xl font-bold">{section.data.totalTransactions.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Block</p>
                  <p className="text-2xl font-bold">{section.data.blockHeight}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Block</p>
                  <p className="text-2xl font-bold">{section.data.lastBlockTime}</p>
                </div>
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-3">Verify Transaction</h4>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter transaction hash..."
                  className="flex-1 px-3 py-2 border rounded-md"
                />
                <Button>Verify</Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Enter a transaction hash to verify its authenticity on the blockchain
              </p>
            </div>
          </div>
        );

      case "department-budgets":
        return (
          <div className="space-y-4">
            {[
              { name: "Ministry of Education", budget: 31200000000, percentage: 24.9 },
              { name: "Ministry of Health", budget: 25500000000, percentage: 20.4 },
              { name: "Ministry of Transport", budget: 18700000000, percentage: 14.9 },
              { name: "Ministry of Defense", budget: 16250000000, percentage: 13.0 },
              { name: "Ministry of Agriculture", budget: 12500000000, percentage: 10.0 },
            ].map((dept) => (
              <div key={dept.name} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium">{dept.name}</p>
                    <p className="text-sm text-muted-foreground">
                      KES {(dept.budget / 1000000000).toFixed(1)}B
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600">{dept.percentage}%</p>
                    <p className="text-xs text-muted-foreground">of total budget</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${dept.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        );

      case "pending-investigations":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Active</CardDescription>
                  <CardTitle className="text-2xl text-orange-600">
                    {section.data.activeInvestigations}
                  </CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Resolved</CardDescription>
                  <CardTitle className="text-2xl text-green-600">{section.data.resolved}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Pending</CardDescription>
                  <CardTitle className="text-2xl text-yellow-600">{section.data.pending}</CardTitle>
                </CardHeader>
              </Card>
            </div>
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-3">Recent Investigations</h4>
              <div className="space-y-3">
                {[
                  {
                    id: "INV-2026-001",
                    title: "Budget Allocation Discrepancy - Ministry of Roads",
                    status: "active",
                  },
                  {
                    id: "INV-2025-087",
                    title: "Procurement Process Review - Health Sector",
                    status: "pending",
                  },
                  {
                    id: "INV-2025-065",
                    title: "Infrastructure Project Audit - Port Development",
                    status: "resolved",
                  },
                ].map((investigation) => (
                  <div
                    key={investigation.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded"
                  >
                    <div>
                      <p className="font-medium text-sm">{investigation.title}</p>
                      <p className="text-xs text-muted-foreground">{investigation.id}</p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        investigation.status === "active"
                          ? "bg-orange-100 text-orange-700"
                          : investigation.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {investigation.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <CitizenLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-700 rounded-lg p-8 text-white">
          <h1 className="text-4xl font-bold mb-2">National Financial Transparency Portal</h1>
          <p className="text-slate-200">Public access to verified financial data</p>
        </div>

        {/* Main Grid */}
        {!activeSection ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <Card
                  key={section.id}
                  className="hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  onClick={() => setActiveSection(section.id)}
                >
                  <CardHeader>
                    <div className={`w-12 h-12 ${section.bgColor} rounded-lg flex items-center justify-center mb-3`}>
                      <Icon className={`h-6 w-6 ${section.color}`} />
                    </div>
                    <CardTitle className="flex items-center gap-2">
                      {section.title}
                      <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white">
                      View Details →
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            <Button variant="outline" onClick={() => setActiveSection(null)}>
              ← Back to Overview
            </Button>
            <Card>
              <CardHeader>
                {(() => {
                  const section = sections.find((s) => s.id === activeSection);
                  if (!section) return null;
                  const Icon = section.icon;
                  return (
                    <>
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 ${section.bgColor} rounded-lg flex items-center justify-center`}>
                          <Icon className={`h-5 w-5 ${section.color}`} />
                        </div>
                        <CardTitle>{section.title}</CardTitle>
                      </div>
                      <CardDescription>{section.description}</CardDescription>
                    </>
                  );
                })()}
              </CardHeader>
              <CardContent>
                {(() => {
                  const section = sections.find((s) => s.id === activeSection);
                  return section ? renderSectionDetails(section) : null;
                })()}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </CitizenLayout>
  );
};

export default PublicTransparency;
