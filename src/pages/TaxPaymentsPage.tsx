import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, Users, TrendingUp, Search } from "lucide-react";
import { getTaxPayments, getTaxPaymentStats, TaxPayment, TaxPaymentStats, getErrorMessage } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

export default function TaxPaymentsPage() {
  const { toast } = useToast();
  const [payments, setPayments] = useState<TaxPayment[]>([]);
  const [stats, setStats] = useState<TaxPaymentStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTaxType, setFilterTaxType] = useState<string>("all");
  const [error, setError] = useState<string>("");

  const taxTypes = [
    { value: "income", label: "Income Tax (PAYE)" },
    { value: "vat", label: "Value Added Tax (VAT)" },
    { value: "corporate", label: "Corporate Tax" },
    { value: "property", label: "Property Tax" },
    { value: "excise", label: "Excise Duty" },
  ];

  useEffect(() => {
    fetchData();
  }, [filterTaxType]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");
      const [paymentsData, statsData] = await Promise.all([
        getTaxPayments(0, 100, undefined, filterTaxType === "all" ? undefined : filterTaxType),
        getTaxPaymentStats(),
      ]);
      setPayments(paymentsData);
      setStats(statsData);
    } catch (error: any) {
      const errorMessage = getErrorMessage(error);
      console.error("Error fetching tax payments:", error);
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredPayments = (payments || []).filter((payment) =>
    payment.taxpayer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.receipt_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.id_number?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
    }).format(amount);
  };

  if (error) {
    return (
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Tax Payments</h1>
            <p className="text-muted-foreground mt-1">
              View and manage all tax payment transactions from citizens
            </p>
          </div>
          <Card>
            <CardContent className="py-8">
              <div className="text-center text-destructive">
                <p className="font-semibold mb-2">Error Loading Data</p>
                <p className="text-sm">{error}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tax Payments</h1>
          <p className="text-muted-foreground mt-1">
            View and manage all tax payment transactions from citizens
          </p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(stats.total_revenue)}</div>
                <p className="text-xs text-muted-foreground">From all tax payments</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total_payments.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Completed transactions</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recent Payments</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.recent_payments_30days}</div>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tax Type Breakdown */}
        {stats && stats.by_tax_type && stats.by_tax_type.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Revenue by Tax Type</CardTitle>
              <CardDescription>Breakdown of payments by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {stats.by_tax_type.map((item) => {
                  const taxLabel = taxTypes.find((t) => t.value === item.tax_type)?.label || item.tax_type;
                  return (
                    <div key={item.tax_type} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{taxLabel}</span>
                        <Badge variant="secondary">{item.count}</Badge>
                      </div>
                      <p className="text-2xl font-bold">{formatCurrency(item.total_amount)}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <div className="flex gap-4 items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, receipt, or ID number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterTaxType} onValueChange={setFilterTaxType}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All Tax Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tax Types</SelectItem>
              {taxTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Payments Table */}
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>
              {filteredPayments.length} payment{filteredPayments.length !== 1 ? 's' : ''} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : filteredPayments.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No tax payments found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Receipt #</TableHead>
                      <TableHead>Taxpayer Name</TableHead>
                      <TableHead>ID Number</TableHead>
                      <TableHead>Tax Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments.map((payment) => {
                      const taxLabel = taxTypes.find((t) => t.value === payment.tax_type)?.label || payment.tax_type;
                      return (
                        <TableRow key={payment.id}>
                          <TableCell className="font-mono text-sm">{payment.receipt_number}</TableCell>
                          <TableCell className="font-medium">{payment.taxpayer_name}</TableCell>
                          <TableCell>{payment.id_number}</TableCell>
                          <TableCell>{taxLabel}</TableCell>
                          <TableCell className="font-semibold">{formatCurrency(payment.amount)}</TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {payment.payment_method === "mpesa" ? "M-Pesa" : "Card"}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(payment.created_at).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <Badge variant="default" className="bg-green-600">
                              {payment.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
