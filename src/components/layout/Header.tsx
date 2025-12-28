import { Bell, LogOut, Shield, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export function Header() {
  return (
    <header className="federal-header h-16 flex items-center justify-between px-6 sticky top-0 z-50">
      {/* Left: Logo and Title */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div className="hidden md:block">
            <h1 className="text-sm font-semibold text-foreground tracking-tight">
              National Financial Blockchain
            </h1>
            <p className="text-xs text-muted-foreground">
              Administration Portal
            </p>
          </div>
        </div>
      </div>

      {/* Center: System Status */}
      <div className="hidden lg:flex items-center gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-muted/50 border border-border">
          <span className="w-2 h-2 rounded-full bg-success animate-pulse-subtle" />
          <span className="text-xs text-muted-foreground">System Online</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-muted/50 border border-border">
          <span className="w-2 h-2 rounded-full bg-success" />
          <span className="text-xs text-muted-foreground">Blockchain Synced</span>
        </div>
      </div>

      {/* Right: Notifications and User */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-warning text-warning-foreground text-xs flex items-center justify-center font-bold">
                3
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>System Alerts</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
              <div className="flex items-center gap-2">
                <Badge variant="pending">Pending</Badge>
                <span className="text-xs text-muted-foreground">2 min ago</span>
              </div>
              <span className="text-sm">5 reports awaiting approval</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
              <div className="flex items-center gap-2">
                <Badge variant="info">System</Badge>
                <span className="text-xs text-muted-foreground">15 min ago</span>
              </div>
              <span className="text-sm">Database backup completed</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
              <div className="flex items-center gap-2">
                <Badge variant="approved">Approved</Badge>
                <span className="text-xs text-muted-foreground">1 hour ago</span>
              </div>
              <span className="text-sm">Quarterly audit verified</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-muted-foreground">System Administrator</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile Settings</DropdownMenuItem>
            <DropdownMenuItem>Security</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <LogOut className="w-4 h-4 mr-2" />
              Secure Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
