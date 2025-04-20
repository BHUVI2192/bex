
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getFullArticle, getRelatedArticles } from "@/lib/data-service";
import ShareButtons from "@/components/ShareButtons";
import NewsCard from "@/components/NewsCard";
import { toast } from "@/components/ui/use-toast";

const ArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getFullArticle(slug) : undefined;
  
  // If article exists, get related articles based on its category
  const relatedArticles = article 
    ? getRelatedArticles(article.id, article.category.toLowerCase())
    : [];
    
  // Scroll to top when slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);
  
  // Show error toast if article not found
  useEffect(() => {
    if (!article && slug) {
      toast({
        title: "Article not found",
        description: "The article you're looking for doesn't exist or has been removed.",
        variant: "destructive",
      });
    }
  }, [article, slug]);

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The article you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Article Header */}
      <div className="mb-8">
        <Link 
          to={`/categories/${article.category.toLowerCase()}`}
          className="category-pill inline-block mb-4"
        >
          {article.category}
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="text-muted-foreground">
            Published on {article.date}
          </div>
          <ShareButtons 
            title={article.title} 
            url={window.location.href} 
          />
        </div>
      </div>
      
      {/* Featured Image */}
      <div className="mb-8">
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="w-full h-[400px] object-cover rounded-lg shadow-lg"
        />
      </div>
      
      {/* Article Content */}
      <div className="max-w-3xl mx-auto mb-12">
        <div 
          className="prose prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
      
      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <div className="border-t border-muted pt-8 mt-8">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map(relatedArticle => (
              <NewsCard key={relatedArticle.id} article={relatedArticle} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticlePage;
