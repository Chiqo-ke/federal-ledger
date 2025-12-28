import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search, CalendarIcon, ExternalLink, Hash, Clock, Building2, User } from "lucide-react";
import { format } from "date-fns";

interface Transaction {
  id: string;
  date: string;
  type: "tax_payment" | "refund" | "transfer" | "fee";
  department: string;
  amount: number;
  status: "confirmed" | "pending" | "failed";
  payerName: string;
  blockchainHash: string;
  auditTrail: {
    action: string;
    timestamp: string;
    actor: string;
  }[];
}

const mockTransactions: Transaction[] = [
  {
    id: "TX-2024-00847",
    date: "2024-12-28",
    type: "tax_payment",
    department: "Internal Revenue",
    amount: 47829.00,
    status: "confirmed",
    payerName: "Acme Corporation",
    blockchainHash: "0x7f8a9b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a",
    auditTrail: [
      { action: "Payment Initiated", timestamp: "2024-12-28 09:14:22", actor: "System" },
      { action: "Blockchain Confirmation", timestamp: "2024-12-28 09:14:35", actor: "Validator Node" },
      { action: "Ledger Updated", timestamp: "2024-12-28 09:14:36", actor: "System" },
    ],
  },
  {
    id: "TX-2024-00846",
    date: "2024-12-28",
    type: "refund",
    department: "Tax Office",
    amount: -12500.00,
    status: "pending",
    payerName: "Smith Industries LLC",
    blockchainHash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
    auditTrail: [
      { action: "Refund Requested", timestamp: "2024-12-28 08:45:00", actor: "Admin Johnson" },
      { action: "Pending Approval", timestamp: "2024-12-28 08:45:01", actor: "System" },
    ],
  },
  {
    id: "TX-2024-00845",
    date: "2024-12-27",
    type: "transfer",
    department: "Department of Transport",
    amount: 892471.00,
    status: "confirmed",
    payerName: "Federal Highway Fund",
    blockchainHash: "0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c",
    auditTrail: [
      { action: "Transfer Initiated", timestamp: "2024-12-27 14:22:00", actor: "Admin Williams" },
      { action: "Blockchain Confirmation", timestamp: "2024-12-27 14:22:45", actor: "Validator Node" },
      { action: "Funds Allocated", timestamp: "2024-12-27 14:22:46", actor: "System" },
    ],
  },
  {
    id: "TX-2024-00844",
    date: "2024-12-27",
    type: "fee",
    department: "Administrative Services",
    amount: 1250.00,
    status: "confirmed",
    payerName: "Global Tech Partners",
    blockchainHash: "0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d",
    auditTrail: [
      { action: "Fee Processed", timestamp: "2024-12-27 11:08:00", actor: "System" },
      { action: "Blockchain Confirmation", timestamp: "2024-12-27 11:08:12", actor: "Validator Node" },
    ],
  },
  {
    id: "TX-2024-00843",
    date: "2024-12-26",
    type: "tax_payment",
    department: "Internal Revenue",
    amount: 284917.00,
    status: "confirmed",
    payerName: "National Energy Corp",
    blockchainHash: "0x4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e",
    auditTrail: [
      { action: "Payment Initiated", timestamp: "2024-12-26 16:45:00", actor: "System" },
      { action: "Blockchain Confirmation", timestamp: "2024-12-26 16:45:18", actor: "Validator Node" },
      { action: "Ledger Updated", timestamp: "2024-12-26 16:45:19", actor: "System" },
    ],
  },
];

const typeLabels = {
  tax_payment: "Tax Payment",
  refund: "Refund",
  transfer: "Transfer",
  fee: "Service Fee",
};

const statusBadgeVariant = {
  confirmed: "approved" as const,
  pending: "pending" as const,
  failed: "rejected" as const,
};

const FinancialOverview = () => {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [dateRange, setDateRange] = useState<Date | undefined>();

  const filteredTransactions = mockTransactions.filter((tx) => {
    const matchesSearch =
      tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.payerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || tx.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const formatCurrency = (amount: number) => {
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Math.abs(amount));
    return amount < 0 ? `-${formatted}` : formatted;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Financial Overview</h1>
          <p className="text-muted-foreground mt-1">
            Transaction ledger and financial management
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="card-elevated rounded-lg p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Total Inflow (Today)
            </p>
            <p className="text-xl font-bold font-mono text-success mt-1">
              +$4,847,291.00
            </p>
          </div>
          <div className="card-elevated rounded-lg p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Total Outflow (Today)
            </p>
            <p className="text-xl font-bold font-mono text-destructive mt-1">
              -$1,284,500.00
            </p>
          </div>
          <div className="card-elevated rounded-lg p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Net Position
            </p>
            <p className="text-xl font-bold font-mono text-foreground mt-1">
              +$3,562,791.00
            </p>
          </div>
          <div className="card-elevated rounded-lg p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Pending Transactions
            </p>
            <p className="text-xl font-bold font-mono text-warning mt-1">8</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by Transaction ID or Payer..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Payment Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="tax_payment">Tax Payment</SelectItem>
              <SelectItem value="refund">Refund</SelectItem>
              <SelectItem value="transfer">Transfer</SelectItem>
              <SelectItem value="fee">Service Fee</SelectItem>
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full sm:w-48 justify-start">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange ? format(dateRange, "PPP") : "Select Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={dateRange}
                onSelect={setDateRange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Transactions Table */}
        <div className="card-elevated rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="font-semibold">Transaction ID</TableHead>
                <TableHead className="font-semibold">Date</TableHead>
                <TableHead className="font-semibold">Type</TableHead>
                <TableHead className="font-semibold">Payer/Payee</TableHead>
                <TableHead className="font-semibold">Department</TableHead>
                <TableHead className="font-semibold text-right">Amount</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((tx) => (
                <TableRow key={tx.id} className="hover:bg-muted/30">
                  <TableCell className="font-mono text-sm">{tx.id}</TableCell>
                  <TableCell className="font-mono text-sm">{tx.date}</TableCell>
                  <TableCell>
                    <Badge variant="muted">{typeLabels[tx.type]}</Badge>
                  </TableCell>
                  <TableCell className="max-w-[150px] truncate">
                    {tx.payerName}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {tx.department}
                  </TableCell>
                  <TableCell
                    className={`font-mono text-sm text-right ${
                      tx.amount < 0 ? "text-destructive" : "text-success"
                    }`}
                  >
                    {formatCurrency(tx.amount)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusBadgeVariant[tx.status]}>
                      {tx.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedTransaction(tx)}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Transaction Detail Drawer */}
      <Sheet open={!!selectedTransaction} onOpenChange={() => setSelectedTransaction(null)}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Transaction Details</SheetTitle>
            <SheetDescription>
              Full transaction information and audit trail
            </SheetDescription>
          </SheetHeader>

          {selectedTransaction && (
            <div className="mt-6 space-y-6">
              {/* Transaction Summary */}
              <div className="p-4 bg-muted/30 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    Transaction ID
                  </span>
                  <span className="font-mono text-sm">{selectedTransaction.id}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    Amount
                  </span>
                  <span
                    className={`font-mono text-lg font-bold ${
                      selectedTransaction.amount < 0 ? "text-destructive" : "text-success"
                    }`}
                  >
                    {formatCurrency(selectedTransaction.amount)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">
                    Status
                  </span>
                  <Badge variant={statusBadgeVariant[selectedTransaction.status]}>
                    {selectedTransaction.status}
                  </Badge>
                </div>
              </div>

              {/* Payment Info */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Payment Information
                </h4>
                <div className="p-4 bg-muted/30 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Payer/Payee</span>
                    <span className="text-sm">{selectedTransaction.payerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Type</span>
                    <span className="text-sm">{typeLabels[selectedTransaction.type]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Date</span>
                    <span className="text-sm font-mono">{selectedTransaction.date}</span>
                  </div>
                </div>
              </div>

              {/* Department */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Department
                </h4>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm">{selectedTransaction.department}</p>
                </div>
              </div>

              {/* Blockchain Reference */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <Hash className="h-4 w-4" />
                  Blockchain Reference
                </h4>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="font-mono text-xs break-all text-muted-foreground">
                    {selectedTransaction.blockchainHash}
                  </p>
                </div>
              </div>

              {/* Audit Trail */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Audit Trail
                </h4>
                <div className="space-y-2">
                  {selectedTransaction.auditTrail.map((entry, index) => (
                    <div
                      key={index}
                      className="p-3 bg-muted/30 rounded-lg border-l-2 border-border"
                    >
                      <p className="text-sm font-medium">{entry.action}</p>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-muted-foreground">
                          {entry.actor}
                        </span>
                        <span className="text-xs font-mono text-muted-foreground">
                          {entry.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </AdminLayout>
  );
};

export default FinancialOverview;
