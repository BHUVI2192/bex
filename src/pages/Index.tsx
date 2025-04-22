
import React, { useState, useEffect } from "react";
import HeroCarousel from "@/components/HeroCarousel";
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
      date: "",
      slug: "news"
    },
    {
      id: "custom-2",
      title: "Premium Gaming Accessories",
      excerpt: "Discover the best gaming gear and accessories at competitive prices to elevate your gaming experience.",
      imageUrl: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1057&q=80",
      category: "Accessories",
      date: "",
      slug: "accessories"
    },
    {
      id: "custom-3",
      title: "24/7 Customer Support",
      excerpt: "Our team is always ready to assist you with any questions or concerns. Expect fast response times and personalized solutions.",
      imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1084&q=80",
      category: "Support",
      date: "",
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
      <section className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Latest News</h2>
          <Link to="/news" className="flex items-center text-esports-blue hover:text-esports-blue/80 transition-colors">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="flex flex-col gap-8">
          {displayedArticles.slice(0, 5).map(article => (
            <div
              key={article.id}
              className="group news-card flex flex-col md:flex-row gap-0 overflow-hidden border border-muted/70 rounded-lg shadow-md transition hover:shadow-lg hover:neon-border"
            >
              {/* Article Image: always on top for mobile, left for desktop */}
              <div className="md:w-2/5 w-full h-48 md:h-40 flex-shrink-0 bg-muted">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                />
              </div>
              <div className="flex-1 p-5 flex flex-col justify-between bg-card/80">
                <div>
                  {/* Category and Date Row */}
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="category-pill">{article.category}</span>
                    <span className="text-xs text-muted-foreground">{article.date}</span>
                  </div>
                  {/* Article Title */}
                  <Link to={`/article/${article.slug}`}>
                    <h3 className="font-bold text-lg md:text-xl text-foreground group-hover:text-esports-blue transition-colors mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                  </Link>
                  {/* Excerpt */}
                  <p className="text-muted-foreground line-clamp-3 text-sm mb-3">
                    {article.excerpt}
                  </p>
                </div>
                {/* Read More link */}
                <div className="mt-2">
                  <Link
                    to={`/article/${article.slug}`}
                    className="inline-flex items-center font-semibold text-esports-blue hover:underline"
                  >
                    Read More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 'Explore More' Button */}
        <div className="flex justify-center mt-8">
          <Link
            // Now simply linking to /news, which loads at the top
            to="/news"
            className="btn-primary text-lg px-6 py-2 rounded font-medium flex items-center gap-2 !bg-esports-blue hover:bg-esports-blue/90 transition-colors"
          >
            Explore More
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
