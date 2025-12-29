import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Building2, 
  GraduationCap, 
  Heart, 
  Truck, 
  Zap,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  FileText,
  Plus,
  ArrowLeft,
  Send
} from "lucide-react";
import { MinistryType, MINISTRIES } from "@/types/ministry";
import { getMinistries, transferToMinistry, getUserMinistryId } from "@/services/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const iconMap = {
  Building2,
  GraduationCap,
  Heart,
  Truck,
  Zap,
};

const MinistryDashboard = () => {
  const { ministryType } = useParams<{ ministryType: MinistryType }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Transfer form state
  const [recipientMinistryId, setRecipientMinistryId] = useState<string>("");
  const [transferAmount, setTransferAmount] = useState<string>("");
  const [transferPurpose, setTransferPurpose] = useState<string>("");
  
  if (!ministryType || !(ministryType in MINISTRIES)) {
    navigate("/");
    return null;
  }

  const ministry = MINISTRIES[ministryType];
  const IconComponent = iconMap[ministry.icon as keyof typeof iconMap];
  
  // Fetch all ministries for transfer dropdown
  const { data: allMinistries = [] } = useQuery({
    queryKey: ['ministries'],
    queryFn: getMinistries
  });
  
  // Get current user's ministry ID
  const currentMinistryId = getUserMinistryId();
  
  // Check if current ministry is National Financial Administration
  const isFinanceMinistry = ministry.type === 'finance' || 
    ministry.name.toLowerCase().includes('finance') || 
    ministry.name.toLowerCase().includes('treasury') ||
    ministry.name.toLowerCase().includes('national');
  
  // Transfer mutation
  const transferMutation = useMutation({
    mutationFn: async () => {
      const amount = parseFloat(transferAmount);
      if (isNaN(amount) || amount <= 0) {
        throw new Error("Invalid transfer amount");
      }
      if (!recipientMinistryId) {
        throw new Error("Please select a recipient ministry");
      }
      if (!transferPurpose.trim()) {
        throw new Error("Please provide a purpose for the transfer");
      }
      
      return transferToMinistry(
        parseInt(recipientMinistryId),
        amount,
        transferPurpose
      );
    },
    onSuccess: (data) => {
      toast({
        title: "Transfer Successful",
        description: `${transferAmount} transferred to ${data.to_ministry}`,
      });
      // Reset form
      setRecipientMinistryId("");
      setTransferAmount("");
      setTransferPurpose("");
      // Refetch data
      queryClient.invalidateQueries({ queryKey: ['ministries'] });
    },
    onError: (error: any) => {
      toast({
        title: "Transfer Failed",
        description: error.response?.data?.detail || error.message,
        variant: "destructive",
      });
    }
  });
  
  const handleTransfer = () => {
    transferMutation.mutate();
  };
  
  // Filter out current ministry from recipient list
  const availableMinistries = allMinistries.filter(m => m.id !== currentMinistryId);

  // Mock data - will be replaced with API calls
  const stats = {
    allocatedBudget: 50000000,
    usedFunds: 32500000,
    remainingBalance: 17500000,
    activeProjects: 12,
    pendingApprovals: 5,
    completedProjects: 8
  };

  const budgetUtilization = (stats.usedFunds / stats.allocatedBudget) * 100;

  const recentProjects = [
    { id: 1, name: "Project Alpha", budget: 5000000, spent: 3200000, status: "active" },
    { id: 2, name: "Project Beta", budget: 3000000, spent: 2800000, status: "active" },
    { id: 3, name: "Project Gamma", budget: 2500000, spent: 2500000, status: "completed" },
  ];

  const pendingRequests = [
    { id: 1, purpose: "Equipment Purchase", amount: 450000, requestedBy: "John Doe", date: "2025-12-28" },
    { id: 2, purpose: "Contractor Payment", amount: 1200000, requestedBy: "Jane Smith", date: "2025-12-27" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Overview
            </Button>
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${ministry.color}20` }}
              >
                <IconComponent className="w-6 h-6" style={{ color: ministry.color }} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{ministry.name}</h1>
                <p className="text-muted-foreground">{ministry.description}</p>
              </div>
            </div>
          </div>
          <Badge variant="outline" className="text-lg px-4 py-2">
            Ministry Admin
          </Badge>
        </div>

        {/* Financial Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Allocated Budget</CardTitle>
              <DollarSign className="w-4 h-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.allocatedBudget.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">Total ministry allocation</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Used Funds</CardTitle>
              <TrendingUp className="w-4 h-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.usedFunds.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {budgetUtilization.toFixed(1)}% of budget
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Remaining Balance</CardTitle>
              <AlertCircle className="w-4 h-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.remainingBalance.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">Available for allocation</p>
            </CardContent>
          </Card>
        </div>

        {/* Budget Utilization */}
        <Card>
          <CardHeader>
            <CardTitle>Budget Utilization</CardTitle>
            <CardDescription>
              {budgetUtilization.toFixed(1)}% of allocated budget used
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={budgetUtilization} className="h-3" />
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>Used: ${stats.usedFunds.toLocaleString()}</span>
              <span>Remaining: ${stats.remainingBalance.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="projects" className="space-y-4">
          <TabsList>
            <TabsTrigger value="projects">Projects & Expenses</TabsTrigger>
            <TabsTrigger value="approvals">Pending Approvals ({stats.pendingApprovals})</TabsTrigger>
            {isFinanceMinistry && (
              <TabsTrigger value="transfer">Send Funds</TabsTrigger>
            )}
            <TabsTrigger value="reports">Reports & Compliance</TabsTrigger>
            <TabsTrigger value="transactions">Transaction History</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Active Projects</h3>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                New Project
              </Button>
            </div>
            
            <div className="grid gap-4">
              {recentProjects.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{project.name}</CardTitle>
                      <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                        {project.status === 'active' ? (
                          <><Clock className="w-3 h-3 mr-1" /> Active</>
                        ) : (
                          <><CheckCircle className="w-3 h-3 mr-1" /> Completed</>
                        )}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Budget: ${project.budget.toLocaleString()}</span>
                        <span>Spent: ${project.spent.toLocaleString()}</span>
                      </div>
                      <Progress value={(project.spent / project.budget) * 100} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="approvals" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Pending Expense Approvals</h3>
              <Button variant="outline" className="gap-2">
                <Plus className="w-4 h-4" />
                New Request
              </Button>
            </div>

            <div className="grid gap-4">
              {pendingRequests.map((request) => (
                <Card key={request.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{request.purpose}</CardTitle>
                      <Badge variant="outline">Pending</Badge>
                    </div>
                    <CardDescription>
                      Requested by {request.requestedBy} on {request.date}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">${request.amount.toLocaleString()}</div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Reject</Button>
                        <Button size="sm">Approve</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {isFinanceMinistry && (
            <TabsContent value="transfer" className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Transfer Funds to Ministry</h3>
                  <p className="text-sm text-muted-foreground">
                    Send funds from National Financial Administration to other ministries
                  </p>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>New Transfer</CardTitle>
                  <CardDescription>
                    Transfer funds to support other government ministries
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="recipient">Recipient Ministry</Label>
                    <Select value={recipientMinistryId} onValueChange={setRecipientMinistryId}>
                      <SelectTrigger id="recipient">
                        <SelectValue placeholder="Select ministry..." />
                      </SelectTrigger>
                      <SelectContent>
                        {availableMinistries.map((m) => (
                          <SelectItem key={m.id} value={m.id.toString()}>
                            {m.name} ({m.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Transfer Amount</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="amount"
                        type="number"
                        placeholder="0.00"
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(e.target.value)}
                        className="pl-9"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Available balance: ${stats.remainingBalance.toLocaleString()}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="purpose">Purpose</Label>
                    <Textarea
                      id="purpose"
                      placeholder="Describe the purpose of this transfer..."
                      value={transferPurpose}
                      onChange={(e) => setTransferPurpose(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setRecipientMinistryId("");
                        setTransferAmount("");
                        setTransferPurpose("");
                      }}
                    >
                      Clear
                    </Button>
                    <Button
                      onClick={handleTransfer}
                      disabled={transferMutation.isPending}
                      className="gap-2"
                    >
                      {transferMutation.isPending ? (
                        <>Processing...</>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Transfer Funds
                        </>
                      )}
                    </Button>
                  </div>

                  {recipientMinistryId && transferAmount && (
                    <div className="bg-muted p-4 rounded-lg space-y-2">
                      <h4 className="font-semibold text-sm">Transfer Summary</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <span className="text-muted-foreground">From:</span>
                        <span className="font-medium">{ministry.name}</span>
                        <span className="text-muted-foreground">To:</span>
                        <span className="font-medium">
                          {availableMinistries.find(m => m.id.toString() === recipientMinistryId)?.name || "-"}
                        </span>
                        <span className="text-muted-foreground">Amount:</span>
                        <span className="font-medium text-green-600">
                          ${parseFloat(transferAmount || "0").toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          )}

          <TabsContent value="reports" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Ministry Reports</h3>
              <Button className="gap-2">
                <FileText className="w-4 h-4" />
                Submit Report
              </Button>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No reports submitted yet</p>
                  <Button variant="link" className="mt-2">Create your first report</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-4">
            <h3 className="text-lg font-semibold">Transaction History</h3>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8 text-muted-foreground">
                  <DollarSign className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Transaction history will appear here</p>
                  <Button variant="link" className="mt-2">View blockchain records</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default MinistryDashboard;
