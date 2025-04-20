
import React from "react";
import { Link } from "react-router-dom";

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  date: string;
  slug: string;
}

interface NewsCardProps {
  article: NewsArticle;
  featured?: boolean;
}

const NewsCard = ({ article, featured = false }: NewsCardProps) => {
  return (
    <Link to={`/article/${article.slug}`} className={`news-card block h-full ${featured ? 'md:col-span-2 md:row-span-2' : ''}`}>
      <div className="relative h-48 overflow-hidden">
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-3 left-3">
          <span className="category-pill">{article.category}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className={`font-bold mb-2 line-clamp-2 ${featured ? 'text-xl' : 'text-lg'}`}>
          {article.title}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
          {article.excerpt}
        </p>
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>{article.date}</span>
          <span className="text-esports-purple font-medium">Read More</span>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
