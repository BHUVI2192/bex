
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Index from "@/pages/Index";
import NewsPage from "@/pages/NewsPage";
import ArticlePage from "@/pages/ArticlePage";
import SearchPage from "@/pages/SearchPage";
import ContactPage from "@/pages/ContactPage";
import AccessoriesPage from "@/pages/AccessoriesPage";
import NotFound from "@/pages/NotFound";
import AdminLoginPage from "@/pages/AdminLoginPage";
import AdminDashboardPage from "@/pages/AdminDashboardPage";
import AdminNewsPage from "@/pages/AdminNewsPage";
import AdminAddNewsPage from "@/pages/AdminAddNewsPage";
import AdminAccessoriesPage from "@/pages/AdminAccessoriesPage";
import AdminAddAccessoryPage from "@/pages/AdminAddAccessoryPage";
import AdminProtectedRoute from "@/components/AdminProtectedRoute";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AdminAuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="news" element={<NewsPage />} />
              <Route path="article/:slug" element={<ArticlePage />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="accessories" element={<AccessoriesPage />} />
              <Route path="admin" element={<AdminLoginPage />} />
              <Route path="admin/dashboard" element={
                <AdminProtectedRoute>
                  <AdminDashboardPage />
                </AdminProtectedRoute>
              } />
              <Route path="admin/news" element={
                <AdminProtectedRoute>
                  <AdminNewsPage />
                </AdminProtectedRoute>
              } />
              <Route path="admin/news/add" element={
                <AdminProtectedRoute>
                  <AdminAddNewsPage />
                </AdminProtectedRoute>
              } />
              <Route path="admin/accessories" element={
                <AdminProtectedRoute>
                  <AdminAccessoriesPage />
                </AdminProtectedRoute>
              } />
              <Route path="admin/accessories/add" element={
                <AdminProtectedRoute>
                  <AdminAddAccessoryPage />
                </AdminProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AdminAuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
