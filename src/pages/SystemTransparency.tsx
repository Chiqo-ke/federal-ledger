import { AdminLayout } from "@/components/layout/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, ExternalLink, Globe, Lock, FileText, DollarSign } from "lucide-react";
import { useState } from "react";

interface TransparencyItem {
  id: string;
  title: string;
  description: string;
  isPublic: boolean;
  lastUpdated: string;
  category: "financial" | "reports" | "blockchain";
}

const mockTransparencyItems: TransparencyItem[] = [
  {
    id: "1",
    title: "Public Financial Summary",
    description: "Aggregated revenue and expenditure data visible to citizens",
    isPublic: true,
    lastUpdated: "2024-12-28",
    category: "financial",
  },
  {
    id: "2",
    title: "Quarterly Reports",
    description: "Published quarterly financial reports and audits",
    isPublic: true,
    lastUpdated: "2024-12-15",
    category: "reports",
  },
  {
    id: "3",
    title: "Blockchain Verification Portal",
    description: "Public access to verify transaction hashes on the ledger",
    isPublic: true,
    lastUpdated: "2024-12-28",
    category: "blockchain",
  },
  {
    id: "4",
    title: "Department Budgets",
    description: "Detailed budget allocations by department",
    isPublic: false,
    lastUpdated: "2024-12-01",
    category: "financial",
  },
  {
    id: "5",
    title: "Pending Investigations",
    description: "Status of ongoing financial investigations",
    isPublic: false,
    lastUpdated: "2024-12-20",
    category: "reports",
  },
];

const categoryIcons = {
  financial: DollarSign,
  reports: FileText,
  blockchain: Globe,
};

const SystemTransparency = () => {
  const [items, setItems] = useState(mockTransparencyItems);

  const toggleVisibility = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isPublic: !item.isPublic } : item
      )
    );
  };

  const publicItems = items.filter((item) => item.isPublic);
  const privateItems = items.filter((item) => !item.isPublic);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            System Transparency
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage public visibility of financial data and reports
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Eye className="h-5 w-5 text-success" />
                Public Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold font-mono">{publicItems.length}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Visible to citizens
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Lock className="h-5 w-5 text-warning" />
                Restricted Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold font-mono">{privateItems.length}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Internal access only
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Globe className="h-5 w-5 text-accent" />
                Public Portal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                View as Citizen
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Transparency Controls */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">
            Visibility Controls
          </h2>

          <div className="grid gap-4">
            {items.map((item) => {
              const CategoryIcon = categoryIcons[item.category];
              return (
                <div
                  key={item.id}
                  className="card-elevated rounded-lg p-4 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
                      <CategoryIcon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">
                          {item.title}
                        </p>
                        <Badge
                          variant={item.isPublic ? "approved" : "muted"}
                          className="text-[10px]"
                        >
                          {item.isPublic ? "Public" : "Private"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {item.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 font-mono">
                        Last updated: {item.lastUpdated}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {item.isPublic ? (
                      <Eye className="h-4 w-4 text-success" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    )}
                    <Switch
                      checked={item.isPublic}
                      onCheckedChange={() => toggleVisibility(item.id)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Public Preview Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">
            Public Preview
          </h2>
          <p className="text-sm text-muted-foreground">
            This is how citizens see the public transparency portal:
          </p>

          <div className="card-elevated rounded-lg overflow-hidden">
            <div className="bg-muted/50 p-4 border-b border-border flex items-center gap-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-mono text-muted-foreground">
                https://transparency.gov.example
              </span>
            </div>

            <div className="p-6 space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-foreground">
                  National Financial Transparency Portal
                </h3>
                <p className="text-muted-foreground mt-1">
                  Public access to verified financial data
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {publicItems.map((item) => {
                  const CategoryIcon = categoryIcons[item.category];
                  return (
                    <div
                      key={item.id}
                      className="p-4 bg-muted/30 rounded-lg border border-border"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <CategoryIcon className="h-4 w-4 text-primary" />
                        <span className="font-medium text-sm">{item.title}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                      <Button
                        variant="link"
                        size="sm"
                        className="px-0 mt-2 h-auto text-primary"
                      >
                        View Details →
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default SystemTransparency;
