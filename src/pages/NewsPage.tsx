
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

// Popular search terms
const popularSearches = ["Valorant", "BGMI", "eSports", "Tournament", "League of Legends", "Gaming Gear"];

const NewsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Fetch news from Supabase
  const { data: articles, isLoading } = useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) throw error;
      return data || [];
    }
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search handled via filtering displayedArticles
  };

  const handlePopularSearch = (term: string) => {
    setSearchQuery(term);
  };

  // Filter articles based on search query
  const displayedArticles = articles?.filter(article => 
    !searchQuery || 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">eSports News</h1>
        <div className="text-center py-12">Loading news...</div>
      </div>
    );
  }

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
                  src={article.imageurl} 
                  alt={article.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 md:w-3/4">
                <div className="flex justify-between items-center mb-2">
                  <span className="category-pill">{article.category}</span>
                  <span className="text-xs text-muted-foreground">{new Date(article.date).toLocaleDateString()}</span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">{article.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{article.description.substring(0, 150)}...</p>
                <Link 
                  to={`/article/${article.id}`} 
                  className="text-esports-blue hover:text-esports-blue/80 text-sm font-medium"
                >
                  Read Full Story →
                </Link>
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
          <Button onClick={() => setSearchQuery("")}>
            Clear Search
          </Button>
        </div>
      )}
    </div>
  );
};

export default NewsPage;
