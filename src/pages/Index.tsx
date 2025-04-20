
import React, { useState, useEffect } from "react";
import HeroCarousel from "@/components/HeroCarousel";
import NewsCard from "@/components/NewsCard";
import CategoryFilter from "@/components/CategoryFilter";
import { articles, categories, shouldRefreshData, refreshNewsData } from "@/lib/data-service";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
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
  
  const featuredArticles = articles.slice(0, 3);
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Carousel */}
      <section className="mb-12">
        <HeroCarousel articles={featuredArticles} />
      </section>
      
      {/* Category Filter */}
      <section className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Latest News</h2>
          <CategoryFilter 
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>
        
        {/* Featured Article */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {filteredArticles.slice(0, 1).map(article => (
            <div key={article.id} className="md:col-span-3 lg:col-span-2">
              <NewsCard article={article} featured={true} />
            </div>
          ))}
          
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 gap-6">
            {filteredArticles.slice(1, 5).map(article => (
              <div key={article.id} className="md:col-span-1">
                <NewsCard article={article} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* More News */}
      <section>
        <h2 className="text-2xl font-bold mb-6">More News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.slice(5).map(article => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
