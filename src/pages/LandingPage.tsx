import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Users, Shield, Eye, ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl text-foreground">National Financial Platform</span>
          </div>
          <Button variant="ghost" onClick={() => navigate("/login")} className="text-foreground hover:text-primary">
            Admin Login
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="container py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Welcome to the National Financial Platform
          </h1>
          <p className="text-xl text-foreground/90">
            Transparent, secure, and efficient government financial management powered by blockchain
            technology
          </p>
        </div>

        {/* Portal Selection */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Citizen Portal */}
          <Card className="hover:shadow-2xl transition-all duration-300 border-2 hover:border-primary cursor-pointer group bg-card">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="h-10 w-10 text-foreground" />
              </div>
              <CardTitle className="text-2xl text-foreground">Citizen Portal</CardTitle>
              <CardDescription className="text-foreground/70">Access government services and information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2 text-sm text-foreground/80">
                  <Eye className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>View public spending and ministry budgets</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground/80">
                  <Shield className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>Make secure tax payments online</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground/80">
                  <Building2 className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>Submit reports and track government projects</span>
                </li>
              </ul>
              <Button
                className="w-full group-hover:bg-primary group-hover:text-foreground transition-colors"
                size="lg"
                onClick={() => navigate("/citizen")}
              >
                Enter Citizen Portal
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Admin Portal */}
          <Card className="hover:shadow-2xl transition-all duration-300 border-2 hover:border-accent cursor-pointer group bg-card">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Shield className="h-10 w-10 text-foreground" />
              </div>
              <CardTitle className="text-2xl text-foreground">Admin Portal</CardTitle>
              <CardDescription className="text-foreground/70">Government administration and management</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2 text-sm text-foreground/80">
                  <Building2 className="h-5 w-5 text-accent flex-shrink-0" />
                  <span>Manage ministries and budget allocations</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground/80">
                  <Shield className="h-5 w-5 text-accent flex-shrink-0" />
                  <span>Track transactions on blockchain</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-foreground/80">
                  <Eye className="h-5 w-5 text-accent flex-shrink-0" />
                  <span>Generate reports and audit logs</span>
                </li>
              </ul>
              <Button
                className="w-full bg-accent hover:bg-accent/90 text-foreground"
                size="lg"
                onClick={() => navigate("/login")}
              >
                Admin Login
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold mb-12 text-foreground">Platform Features</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="p-6">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2 text-foreground">Blockchain Security</h3>
              <p className="text-sm text-foreground/70">
                All transactions are recorded on an immutable blockchain
              </p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Eye className="h-6 w-6 text-success" />
              </div>
              <h3 className="font-semibold mb-2 text-foreground">Full Transparency</h3>
              <p className="text-sm text-foreground/70">
                Public access to government spending and budgets
              </p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2 text-foreground">Ministry Management</h3>
              <p className="text-sm text-foreground/70">
                Efficient budget allocation and fund transfers
              </p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-warning/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-warning" />
              </div>
              <h3 className="font-semibold mb-2 text-foreground">Citizen Engagement</h3>
              <p className="text-sm text-foreground/70">
                Easy tax payments and public reporting
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur mt-24">
        <div className="container py-8 text-center text-sm text-foreground/70">
          <p>© 2024 National Government Financial Platform. All rights reserved.</p>
          <p className="mt-2">Powered by Blockchain Technology for Maximum Transparency</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
