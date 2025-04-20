import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Email subscription will be implemented after Supabase integration
  };

  return (
    <footer className="bg-esports-darker border-t border-muted py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-esports-purple">Bharat</span>Esports
              <span className="text-esports-purple">Express</span>
            </h3>
            <p className="text-muted-foreground mb-4">
              Your ultimate source for Indian eSports news, tournaments, and gaming updates.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-esports-purple transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-muted-foreground hover:text-esports-purple transition-colors">
                  News
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-muted-foreground hover:text-esports-purple transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/accessories" className="text-muted-foreground hover:text-esports-purple transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-esports-purple transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/categories/fps" className="text-muted-foreground hover:text-esports-purple transition-colors">
                  FPS
                </Link>
              </li>
              <li>
                <Link to="/categories/moba" className="text-muted-foreground hover:text-esports-purple transition-colors">
                  MOBA
                </Link>
              </li>
              <li>
                <Link to="/categories/battle-royale" className="text-muted-foreground hover:text-esports-purple transition-colors">
                  Battle Royale
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Subscribe</h4>
            <p className="text-muted-foreground mb-4">
              Get the latest gaming news delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
              <Input 
                type="email" 
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-muted"
              />
              <Button type="submit" className="w-full">
                <Mail className="mr-2 h-4 w-4" /> Subscribe
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-muted mt-8 pt-8 text-center text-muted-foreground">
          <p>© 2025 BharatEsports Express. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
