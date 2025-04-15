
import React, { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/layout/Dashboard";
import DashboardPage from "./pages/DashboardPage";
import AdminPage from "./pages/AdminPage";
import SalesPage from "./pages/SalesPage";
import InventoryPage from "./pages/InventoryPage";
import PurchasePage from "./pages/PurchasePage";
import PaymentPage from "./pages/PaymentPage";
import IssuesPage from "./pages/IssuesPage";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />}>
              <Route index element={<Index />} />
              <Route path="dashboard" element={<DashboardPage language={language} />} />
              <Route path="admin" element={<AdminPage language={language} />} />
              <Route path="sales" element={<SalesPage language={language} />} />
              <Route path="inventory" element={<InventoryPage language={language} />} />
              <Route path="purchase" element={<PurchasePage language={language} />} />
              <Route path="payment" element={<PaymentPage language={language} />} />
              <Route path="issues" element={<IssuesPage language={language} />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
