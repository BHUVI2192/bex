
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NewsCard from "@/components/NewsCard";
import { getFilteredArticles, categories } from "@/lib/data-service";

const CategoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const [articles, setArticles] = useState(getFilteredArticles(id || null, null));
  
  // Get category name
  const category = categories.find(cat => cat.id.toLowerCase() === id?.toLowerCase());
  
  // Update articles when category ID changes
  useEffect(() => {
    setArticles(getFilteredArticles(id || null, null));
  }, [id]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {category ? `${category.name} News` : "Category Not Found"}
      </h1>
      
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map(article => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-xl font-medium mb-2">No articles found</h3>
          <p className="text-muted-foreground">
            There are currently no articles in this category. Check back later for updates.
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
