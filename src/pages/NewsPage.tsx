
import React, { useState, useEffect } from "react";
import NewsCard from "@/components/NewsCard";
import { articles, shouldRefreshData, refreshNewsData, categories } from "@/lib/data-service";
import { toast } from "@/components/ui/use-toast";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Popular search terms
const popularSearches = ["Valorant", "BGMI", "eSports", "Tournament", "League of Legends", "Gaming Gear"];

const NewsPage = () => {
  const [displayedArticles, setDisplayedArticles] = useState(articles);
  const [searchQuery, setSearchQuery] = useState("");
  
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setDisplayedArticles(articles);
      return;
    }
    
    const filteredArticles = articles.filter(article => 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setDisplayedArticles(filteredArticles);
  };

  const handlePopularSearch = (term: string) => {
    setSearchQuery(term);
    const filteredArticles = articles.filter(article => 
      article.title.toLowerCase().includes(term.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(term.toLowerCase()) ||
      article.category.toLowerCase().includes(term.toLowerCase())
    );
    
    setDisplayedArticles(filteredArticles);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">eSports News</h1>
      
      {/* Search Section */}
      <div className="glass-card p-6 mb-8">
        <form onSubmit={handleSearch} className="mb-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/50 border-esports-blue/30 focus:border-esports-blue"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Button 
              type="submit" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-esports-blue hover:bg-esports-blue/90 h-8 px-4"
            >
              Search
            </Button>
          </div>
        </form>
        
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Popular Searches:</h3>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((term, index) => (
              <button
                key={index}
                onClick={() => handlePopularSearch(term)}
                className="px-3 py-1 bg-muted/50 hover:bg-muted text-sm rounded-full transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* News Grid */}
      <div className="space-y-6">
        {displayedArticles.map(article => (
          <div key={article.id} className="glass-card overflow-hidden hover:neon-border transition-all duration-300">
            <div className="md:flex">
              <div className="md:w-1/4 h-48 md:h-auto">
                <img 
                  src={article.imageUrl} 
                  alt={article.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 md:w-3/4">
                <div className="flex justify-between items-center mb-2">
                  <span className="category-pill">{article.category}</span>
                  <span className="text-xs text-muted-foreground">{article.date}</span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">{article.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{article.excerpt}</p>
                <a 
                  href={`/article/${article.slug}`} 
                  className="text-esports-blue hover:text-esports-blue/80 text-sm font-medium"
                >
                  Read Full Story →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {displayedArticles.length === 0 && (
        <div className="text-center py-12">
          <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium">No articles found</h3>
          <p className="text-muted-foreground mt-2 mb-4">
            We couldn't find any articles matching "{searchQuery}".
          </p>
          <Button onClick={() => { setSearchQuery(""); setDisplayedArticles(articles); }}>
            Clear Search
          </Button>
        </div>
      )}
    </div>
  );
};

export default NewsPage;
