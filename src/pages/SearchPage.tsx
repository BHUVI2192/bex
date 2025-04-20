
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import NewsCard from "@/components/NewsCard";
import { getFilteredArticles } from "@/lib/data-service";
import { Search } from "lucide-react";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  
  const [articles, setArticles] = useState(getFilteredArticles(null, query));
  
  // Update results when query changes
  useEffect(() => {
    setArticles(getFilteredArticles(null, query));
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Search Results</h1>
        {query && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Search className="h-4 w-4" />
            <span>Showing results for: <span className="font-medium text-white">{query}</span></span>
          </div>
        )}
      </div>
      
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map(article => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="mb-4">
            <Search className="h-12 w-12 mx-auto text-muted-foreground" />
          </div>
          <h2 className="text-xl font-bold mb-2">No Results Found</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            We couldn't find any articles matching "{query}". Try using different keywords or check out our latest news.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
