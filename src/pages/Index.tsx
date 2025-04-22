
import React, { useState, useEffect } from "react";
import HeroCarousel from "@/components/HeroCarousel";
import NewsCard from "@/components/NewsCard";
import { articles, shouldRefreshData, refreshNewsData } from "@/lib/data-service";
import { toast } from "@/components/ui/use-toast";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
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
  
  // Custom slides for the carousel
  const customSlides = [
    {
      id: "custom-1",
      title: "Get The Latest Esports News",
      excerpt: "Stay updated with breaking news, tournament results, team updates and more from the world of competitive gaming.",
      imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      category: "News",
      slug: "news"
    },
    {
      id: "custom-2",
      title: "Premium Gaming Accessories",
      excerpt: "Discover the best gaming gear and accessories at competitive prices to elevate your gaming experience.",
      imageUrl: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1057&q=80",
      category: "Accessories",
      slug: "accessories"
    },
    {
      id: "custom-3",
      title: "24/7 Customer Support",
      excerpt: "Our team is always ready to assist you with any questions or concerns. Expect fast response times and personalized solutions.",
      imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1084&q=80",
      category: "Support",
      slug: "contact"
    }
  ];
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Carousel */}
      <section className="mb-12">
        <HeroCarousel articles={customSlides} />
      </section>
      
      {/* Latest News */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Latest News</h2>
          <Link to="/news" className="flex items-center text-esports-blue hover:text-esports-blue/80 transition-colors">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        {/* Featured Article */}
        <div className="mb-8">
          {displayedArticles.slice(0, 1).map(article => (
            <div key={article.id} className="glass-card mb-6 overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 h-60 md:h-auto">
                  <img 
                    src={article.imageUrl} 
                    alt={article.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <div className="mb-3">
                    <span className="category-pill">{article.category}</span>
                    <span className="text-sm text-muted-foreground ml-3">{article.date}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-white">{article.title}</h3>
                  <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                  <Link 
                    to={`/article/${article.slug}`}
                    className="text-esports-blue font-medium hover:text-esports-blue/80 transition-colors"
                  >
                    Read Full Story →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Article List */}
        <div className="space-y-6">
          {displayedArticles.slice(1, 6).map(article => (
            <div key={article.id} className="glass-card overflow-hidden hover:neon-border transition-all duration-300">
              <Link to={`/article/${article.slug}`} className="block">
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
                    <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
      
      {/* More News Link */}
      <div className="text-center mb-12">
        <Link 
          to="/news" 
          className="inline-flex items-center btn-primary bg-esports-blue hover:bg-esports-blue/90"
        >
          View All News <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default Index;
