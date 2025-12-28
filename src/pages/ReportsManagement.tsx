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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Search, Eye, CheckCircle, XCircle, Flag, FileText, Hash } from "lucide-react";

interface Report {
  id: string;
  citizenId: string;
  category: string;
  submissionDate: string;
  status: "pending" | "approved" | "rejected";
  content: string;
  blockchainHash: string;
}

const mockReports: Report[] = [
  {
    id: "RPT-2024-0847",
    citizenId: "****7842",
    category: "Tax Discrepancy",
    submissionDate: "2024-12-28",
    status: "pending",
    content: "Reported discrepancy in Q3 tax calculation for business entity registration #48291. Supporting documentation attached including financial statements and bank records.",
    blockchainHash: "0x7f8a9b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a",
  },
  {
    id: "RPT-2024-0846",
    citizenId: "****3921",
    category: "Expense Claim",
    submissionDate: "2024-12-27",
    status: "approved",
    content: "Legitimate expense claim for government-approved travel reimbursement. All receipts verified and within policy limits.",
    blockchainHash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
  },
  {
    id: "RPT-2024-0845",
    citizenId: "****5673",
    category: "Audit Request",
    submissionDate: "2024-12-27",
    status: "pending",
    content: "Formal request for audit review of department spending for fiscal year 2024. Concerns raised regarding procurement procedures.",
    blockchainHash: "0x2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c",
  },
  {
    id: "RPT-2024-0844",
    citizenId: "****8294",
    category: "Compliance",
    submissionDate: "2024-12-26",
    status: "rejected",
    content: "Report flagged for insufficient documentation. Required forms 1099-A and 1099-B not submitted with claim.",
    blockchainHash: "0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d",
  },
  {
    id: "RPT-2024-0843",
    citizenId: "****1847",
    category: "Tax Discrepancy",
    submissionDate: "2024-12-25",
    status: "approved",
    content: "Valid discrepancy claim verified. Tax adjustment processed for overpayment in Q2 2024.",
    blockchainHash: "0x4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e",
  },
];

const statusBadgeVariant = {
  pending: "pending" as const,
  approved: "approved" as const,
  rejected: "rejected" as const,
};

const ReportsManagement = () => {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [rejectionReason, setRejectionReason] = useState("");

  const filteredReports = mockReports.filter((report) => {
    const matchesSearch =
      report.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || report.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = () => {
    // In production, this would call an API
    setSelectedReport(null);
  };

  const handleReject = () => {
    // In production, this would call an API with rejectionReason
    setSelectedReport(null);
    setRejectionReason("");
  };

  const handleFlag = () => {
    // In production, this would flag for audit
    setSelectedReport(null);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Reports Management</h1>
          <p className="text-muted-foreground mt-1">
            Review and process citizen submissions and financial reports
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by Report ID or Category..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Reports Table */}
        <div className="card-elevated rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="font-semibold">Report ID</TableHead>
                <TableHead className="font-semibold">Citizen ID</TableHead>
                <TableHead className="font-semibold">Category</TableHead>
                <TableHead className="font-semibold">Submission Date</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id} className="hover:bg-muted/30">
                  <TableCell className="font-mono text-sm">{report.id}</TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {report.citizenId}
                  </TableCell>
                  <TableCell>{report.category}</TableCell>
                  <TableCell className="font-mono text-sm">
                    {report.submissionDate}
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusBadgeVariant[report.status]}>
                      {report.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedReport(report)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Info */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <p>Showing {filteredReports.length} of {mockReports.length} reports</p>
          <p>Page 1 of 1</p>
        </div>
      </div>

      {/* Report Detail Modal */}
      <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Report Details
            </DialogTitle>
            <DialogDescription>
              Review the full report content and take appropriate action
            </DialogDescription>
          </DialogHeader>

          {selectedReport && (
            <div className="space-y-4">
              {/* Report Metadata */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Report ID
                  </p>
                  <p className="font-mono text-sm mt-1">{selectedReport.id}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Citizen ID
                  </p>
                  <p className="font-mono text-sm mt-1">{selectedReport.citizenId}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Category
                  </p>
                  <p className="text-sm mt-1">{selectedReport.category}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Status
                  </p>
                  <Badge
                    variant={statusBadgeVariant[selectedReport.status]}
                    className="mt-1"
                  >
                    {selectedReport.status}
                  </Badge>
                </div>
              </div>

              {/* Report Content */}
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                  Report Content
                </p>
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm leading-relaxed">{selectedReport.content}</p>
                </div>
              </div>

              {/* Blockchain Reference */}
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Hash className="h-3 w-3" />
                  Blockchain Reference
                </p>
                <div className="p-3 bg-muted/30 rounded-lg">
                  <p className="font-mono text-xs break-all text-muted-foreground">
                    {selectedReport.blockchainHash}
                  </p>
                </div>
              </div>

              {/* Rejection Reason (if rejecting) */}
              {selectedReport.status === "pending" && (
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                    Rejection Reason (if rejecting)
                  </p>
                  <Textarea
                    placeholder="Enter reason for rejection..."
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    rows={3}
                  />
                </div>
              )}
            </div>
          )}

          <DialogFooter className="flex-col sm:flex-row gap-2">
            {selectedReport?.status === "pending" && (
              <>
                <Button variant="outline" onClick={handleFlag} className="gap-2">
                  <Flag className="h-4 w-4" />
                  Flag for Audit
                </Button>
                <Button variant="danger" onClick={handleReject} className="gap-2">
                  <XCircle className="h-4 w-4" />
                  Reject
                </Button>
                <Button variant="success" onClick={handleApprove} className="gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Approve
                </Button>
              </>
            )}
            {selectedReport?.status !== "pending" && (
              <Button variant="outline" onClick={() => setSelectedReport(null)}>
                Close
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default ReportsManagement;
