import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/Layout";
import UserDashboard from "@/pages/UserDashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminUsers from "@/pages/AdminUsers";
import AdminLocations from "@/pages/AdminLocations";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<UserDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/locations" element={<AdminLocations />} />
          </Routes>
        </Layout>
      </BrowserRouter>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;