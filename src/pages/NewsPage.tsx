
import React, { useState, useEffect } from "react";
import NewsCard from "@/components/NewsCard";
import { articles, shouldRefreshData, refreshNewsData } from "@/lib/data-service";
import { toast } from "@/components/ui/use-toast";

const NewsPage = () => {
  const [displayedArticles, setDisplayedArticles] = useState(articles);
  
  // Auto-refresh news data every 30 minutes
  useEffect(() => {
    const checkForUpdates = async () => {
      if (shouldRefreshData()) {
        try {
          const refreshedData = await refreshNewsData();
          setDisplayedArticles(refreshedData);
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
      
      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedArticles.map(article => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
      
      {displayedArticles.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium">No articles found</h3>
          <p className="text-muted-foreground mt-2">
            Check back later for the latest news.
          </p>
        </div>
      )}
    </div>
  );
};

export default NewsPage;
