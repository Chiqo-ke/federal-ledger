import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  DollarSign,
  Receipt,
  FileText,
  Users,
  ClipboardList,
  Eye,
  Settings,
  ChevronLeft,
  ChevronRight,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/" },
  { title: "Ministries", icon: Building2, path: "/ministries" },
  { title: "Financial Overview", icon: DollarSign, path: "/financial" },
  { title: "Tax Payments", icon: Receipt, path: "/tax-payments" },
  { title: "Reports Management", icon: FileText, path: "/reports" },
  { title: "Citizen Submissions", icon: Users, path: "/submissions" },
  { title: "Audit Logs", icon: ClipboardList, path: "/audit" },
  { title: "System Transparency", icon: Eye, path: "/transparency" },
  { title: "Settings", icon: Settings, path: "/settings" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Toggle Button */}
      <div className="p-3 flex justify-end border-b border-sidebar-border">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          const linkContent = (
            <NavLink
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors",
                "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary font-medium border-l-2 border-sidebar-primary"
                  : "text-sidebar-foreground"
              )}
            >
              <Icon className={cn("h-5 w-5 shrink-0", isActive && "text-sidebar-primary")} />
              {!collapsed && <span className="truncate">{item.title}</span>}
            </NavLink>
          );

          if (collapsed) {
            return (
              <Tooltip key={item.path} delayDuration={0}>
                <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                <TooltipContent side="right" className="font-medium">
                  {item.title}
                </TooltipContent>
              </Tooltip>
            );
          }

          return <div key={item.path}>{linkContent}</div>;
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-sidebar-border">
          <div className="text-xs text-muted-foreground">
            <p>System Version 2.4.1</p>
            <p className="mt-1">Last Updated: Dec 28, 2024</p>
          </div>
        </div>
      )}
    </aside>
  );
}
