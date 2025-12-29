import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import FinancialOverview from "./pages/FinancialOverview";
import ReportsManagement from "./pages/ReportsManagement";
import AuditLogs from "./pages/AuditLogs";
import SystemTransparency from "./pages/SystemTransparency";
import { TaxPayments, CitizenSubmissions, SettingsPage } from "./pages/PlaceholderPages";
import NotFound from "./pages/NotFound";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/financial" element={<FinancialOverview />} />
        <Route path="/tax-payments" element={<TaxPayments />} />
        <Route path="/reports" element={<ReportsManagement />} />
        <Route path="/submissions" element={<CitizenSubmissions />} />
        <Route path="/audit" element={<AuditLogs />} />
        <Route path="/transparency" element={<SystemTransparency />} />
        <Route path="/settings" element={<SettingsPage />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
