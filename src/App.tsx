
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Index from "@/pages/Index";
import NewsPage from "@/pages/NewsPage";
import CategoriesPage from "@/pages/CategoriesPage";
import CategoryPage from "@/pages/CategoryPage";
import ArticlePage from "@/pages/ArticlePage";
import SearchPage from "@/pages/SearchPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="news" element={<NewsPage />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="categories/:id" element={<CategoryPage />} />
            <Route path="article/:slug" element={<ArticlePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
