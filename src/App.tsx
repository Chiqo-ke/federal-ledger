import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MinistriesOverview from "./pages/MinistriesOverview";
import MinistryDashboard from "./pages/MinistryDashboard";
import FinancialOverview from "./pages/FinancialOverview";
import ReportsManagement from "./pages/ReportsManagement";
import AuditLogs from "./pages/AuditLogs";
import SystemTransparency from "./pages/SystemTransparency";
import TaxPaymentsPage from "./pages/TaxPaymentsPage";
import { CitizenSubmissions, SettingsPage } from "./pages/PlaceholderPages";
import NotFound from "./pages/NotFound";
import CitizenDashboard from "./pages/citizen/CitizenDashboard";
import PayTax from "./pages/citizen/PayTax";
import SubmitReport from "./pages/citizen/SubmitReport";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/ministries" element={<ProtectedRoute><MinistriesOverview /></ProtectedRoute>} />
          <Route path="/ministry/:ministryType" element={<ProtectedRoute><MinistryDashboard /></ProtectedRoute>} />
          <Route path="/financial" element={<ProtectedRoute><FinancialOverview /></ProtectedRoute>} />
          <Route path="/tax-payments" element={<ProtectedRoute><TaxPaymentsPage /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute><ReportsManagement /></ProtectedRoute>} />
          <Route path="/submissions" element={<ProtectedRoute><CitizenSubmissions /></ProtectedRoute>} />
          <Route path="/audit" element={<ProtectedRoute><AuditLogs /></ProtectedRoute>} />
          <Route path="/transparency" element={<ProtectedRoute><SystemTransparency /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
          
          {/* Citizen Portal Routes */}
          <Route path="/citizen" element={<CitizenDashboard />} />
          <Route path="/citizen/pay-tax" element={<PayTax />} />
          <Route path="/citizen/submit-report" element={<SubmitReport />} />
          <Route path="/citizen/transparency" element={<CitizenDashboard />} />
          <Route path="/citizen/projects" element={<CitizenDashboard />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
