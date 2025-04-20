
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { NewsArticle } from "./NewsCard";

interface HeroCarouselProps {
  articles: NewsArticle[];
}

const HeroCarousel = ({ articles }: HeroCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % articles.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? articles.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!articles.length) return null;

  return (
    <div className="relative overflow-hidden rounded-xl h-[500px] glass-card">
      <div 
        className="flex transition-transform duration-500 ease-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {articles.map((article) => (
          <div 
            key={article.id} 
            className="min-w-full h-full relative"
          >
            <img 
              src={article.imageUrl} 
              alt={article.title} 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end">
              <div className="p-6 md:p-8">
                <div className="mb-4">
                  <span className="category-pill">{article.category}</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">
                  {article.title}
                </h2>
                <p className="text-white/80 mb-4 max-w-3xl">
                  {article.excerpt}
                </p>
                <Link 
                  to={`/article/${article.slug}`}
                  className="btn-primary inline-block"
                >
                  Read Full Story
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 rounded-full"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {articles.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex 
                ? "bg-white w-6" 
                : "bg-white/50"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
