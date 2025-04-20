
import React, { useState, useEffect } from "react";
import CategoryFilter from "@/components/CategoryFilter";
import NewsCard from "@/components/NewsCard";
import { articles, categories, shouldRefreshData, refreshNewsData } from "@/lib/data-service";
import { toast } from "@/components/ui/use-toast";

const NewsPage = () => {
  const [filteredArticles, setFilteredArticles] = useState(articles);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Function to handle category selection
  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    
    if (!categoryId) {
      setFilteredArticles(articles);
    } else {
      const filtered = articles.filter(
        article => article.category.toLowerCase() === categoryId.toLowerCase()
      );
      setFilteredArticles(filtered);
    }
  };
  
  // Auto-refresh news data every 30 minutes
  useEffect(() => {
    const checkForUpdates = async () => {
      if (shouldRefreshData()) {
        try {
          const refreshedData = await refreshNewsData();
          setFilteredArticles(refreshedData);
          toast({
            title: "News Updated",
            description: "The latest news has been loaded.",
          });
        } catch (error) {
          console.error("Failed to refresh news data:", error);
        }
      }
    };
    
    // Check initially
    checkForUpdates();
    
    // Set up interval to check periodically
    const interval = setInterval(checkForUpdates, 5 * 60 * 1000); // Check every 5 minutes
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">eSports News</h1>
      
      {/* Category Filter */}
      <div className="mb-8">
        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>
      
      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map(article => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
      
      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium">No articles found</h3>
          <p className="text-muted-foreground mt-2">
            Try selecting a different category or check back later.
          </p>
        </div>
      )}
    </div>
  );
};

export default NewsPage;
