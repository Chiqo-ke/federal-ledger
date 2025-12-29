import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Home,
  Receipt,
  FileText,
  Eye,
  Building2,
  Menu,
  User,
  LogOut,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CitizenLayoutProps {
  children: ReactNode;
}

export function CitizenLayout({ children }: CitizenLayoutProps) {
  const navigate = useNavigate();

  const navLinks = [
    { href: "/citizen", icon: Home, label: "Home" },
    { href: "/citizen/pay-tax", icon: Receipt, label: "Pay Taxes" },
    { href: "/citizen/submit-report", icon: FileText, label: "Submit Report" },
    { href: "/citizen/transparency", icon: Eye, label: "Public Spending" },
    { href: "/citizen/projects", icon: Building2, label: "Projects" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Citizen Portal</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex mx-6 flex-1 gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu */}
          <div className="flex md:hidden flex-1 justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {navLinks.map((link) => (
                  <DropdownMenuItem key={link.href} onClick={() => navigate(link.href)}>
                    <link.icon className="mr-2 h-4 w-4" />
                    <span>{link.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/citizen/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/citizen/payments")}>
                  <Receipt className="mr-2 h-4 w-4" />
                  <span>Payment History</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/citizen/reports")}>
                  <FileText className="mr-2 h-4 w-4" />
                  <span>My Reports</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/login")}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="container py-6">{children}</div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/40">
        <div className="container py-6">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="font-semibold mb-3">About</h3>
              <p className="text-sm text-muted-foreground">
                The National Citizen Portal provides transparent access to government services and
                financial information.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Contact</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Email: citizen@gov.ke</li>
                <li>Phone: 0800-123-456</li>
                <li>Hotline: 0800-REPORT</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
            <p>© 2024 National Government. All rights reserved. Powered by Blockchain Technology.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
