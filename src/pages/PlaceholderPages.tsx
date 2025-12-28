import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          <p className="text-muted-foreground mt-1">{description}</p>
        </div>

        <Card className="max-w-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Construction className="h-5 w-5 text-warning" />
              Under Development
            </CardTitle>
            <CardDescription>
              This section is currently being developed and will be available soon.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              The {title.toLowerCase()} module is part of our ongoing system
              expansion. Contact the IT department for more information.
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

export const TaxPayments = () => (
  <PlaceholderPage
    title="Tax Payments"
    description="Process and manage tax payment transactions"
  />
);

export const CitizenSubmissions = () => (
  <PlaceholderPage
    title="Citizen Submissions"
    description="Review and process citizen-submitted documents"
  />
);

export const SettingsPage = () => (
  <PlaceholderPage
    title="Settings"
    description="System configuration and preferences"
  />
);
