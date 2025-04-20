
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { categories } from "@/lib/data-service";

const CategoriesPage = () => {
  // Images for different category cards
  const categoryImages = {
    fps: "https://images.unsplash.com/photo-1542751110-97427bbecf20?ixlib=rb-4.0.3&auto=format&fit=crop&w=1084&q=80",
    moba: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=1171&q=80",
    "battle-royale": "https://images.unsplash.com/photo-1570303345338-e1f0eddf4946?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    sports: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    rpg: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1147&q=80",
    strategy: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Game Categories</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(category => (
          <Link 
            key={category.id} 
            to={`/categories/${category.id}`}
            className="glass-card rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:neon-border group"
          >
            <div className="relative h-48">
              <img 
                src={categoryImages[category.id as keyof typeof categoryImages] || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"} 
                alt={category.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white">{category.name}</h3>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
