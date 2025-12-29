import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Receipt,
  FileText,
  Eye,
  TrendingUp,
  Building2,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { CitizenLayout } from "@/components/layout/CitizenLayout";

interface TaxPayment {
  id: number;
  amount: number;
  tax_type: string;
  status: string;
  payment_date: string;
  receipt_number: string;
}

interface GovernmentStat {
  total_revenue: number;
  total_ministries: number;
  total_projects: number;
  transparency_score: number;
}

const CitizenDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  // Mock data - replace with actual API calls
  const stats: GovernmentStat = {
    total_revenue: 125000000000,
    total_ministries: 18,
    total_projects: 342,
    transparency_score: 92,
  };

  const recentPayments: TaxPayment[] = [
    {
      id: 1,
      amount: 45000,
      tax_type: "Income Tax",
      status: "completed",
      payment_date: "2024-12-15",
      receipt_number: "TX-2024-45678",
    },
    {
      id: 2,
      amount: 12500,
      tax_type: "VAT",
      status: "completed",
      payment_date: "2024-11-20",
      receipt_number: "TX-2024-45123",
    },
  ];

  const statusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <CitizenLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome to the Citizen Portal</h1>
          <p className="text-blue-100">
            Access government services, track your tax payments, and stay informed about public spending
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">National Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                KES {(stats.total_revenue / 1000000000).toFixed(1)}B
              </div>
              <p className="text-xs text-muted-foreground">This fiscal year</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Government Ministries</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total_ministries}</div>
              <p className="text-xs text-muted-foreground">Active departments</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Public Projects</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total_projects}</div>
              <p className="text-xs text-muted-foreground">Currently active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transparency Score</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.transparency_score}%</div>
              <p className="text-xs text-muted-foreground">Based on public data</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="payments" className="space-y-4">
          <TabsList>
            <TabsTrigger value="payments">
              <Receipt className="h-4 w-4 mr-2" />
              My Tax Payments
            </TabsTrigger>
            <TabsTrigger value="reports">
              <FileText className="h-4 w-4 mr-2" />
              My Reports
            </TabsTrigger>
            <TabsTrigger value="transparency">
              <Eye className="h-4 w-4 mr-2" />
              Public Spending
            </TabsTrigger>
          </TabsList>

          {/* Tax Payments Tab */}
          <TabsContent value="payments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Tax Payments</CardTitle>
                <CardDescription>Your payment history and receipts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPayments.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between border-b pb-4 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        {statusIcon(payment.status)}
                        <div>
                          <p className="font-medium">{payment.tax_type}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(payment.payment_date).toLocaleDateString()} • {payment.receipt_number}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">KES {payment.amount.toLocaleString()}</p>
                        <Badge
                          variant={payment.status === "completed" ? "default" : "secondary"}
                          className="mt-1"
                        >
                          {payment.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  {recentPayments.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">
                      No payment history available
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>My Submitted Reports</CardTitle>
                <CardDescription>Track your submitted complaints and feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">No reports submitted yet</p>
                  <a href="/citizen/submit-report" className="text-primary hover:underline">
                    Submit your first report
                  </a>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transparency Tab */}
          <TabsContent value="transparency" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Public Spending Overview</CardTitle>
                <CardDescription>See how your taxes are being utilized</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Ministry of Health</p>
                      <p className="text-sm text-muted-foreground">Healthcare infrastructure</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">KES 25.5B</p>
                      <p className="text-xs text-muted-foreground">20.4% of budget</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "20.4%" }}></div>
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    <div>
                      <p className="font-medium">Ministry of Education</p>
                      <p className="text-sm text-muted-foreground">Schools and universities</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">KES 31.2B</p>
                      <p className="text-xs text-muted-foreground">24.9% of budget</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: "24.9%" }}></div>
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    <div>
                      <p className="font-medium">Ministry of Transport</p>
                      <p className="text-sm text-muted-foreground">Roads and infrastructure</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">KES 18.7B</p>
                      <p className="text-xs text-muted-foreground">14.9% of budget</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: "14.9%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="h-5 w-5 text-blue-600" />
                Pay Taxes
              </CardTitle>
              <CardDescription>Make tax payments securely online</CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-600" />
                Submit Report
              </CardTitle>
              <CardDescription>Report issues or provide feedback</CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-purple-600" />
                View Projects
              </CardTitle>
              <CardDescription>See ongoing government projects</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </CitizenLayout>
  );
};

export default CitizenDashboard;
