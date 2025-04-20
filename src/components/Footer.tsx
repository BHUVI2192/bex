
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-esports-darker border-t border-muted py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-esports-purple">Neon</span>Arena
            </h3>
            <p className="text-muted-foreground mb-4">
              Your ultimate source for the latest eSports news, tournaments, and gaming updates.
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
              Get the latest news delivered to your inbox.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 bg-muted border border-muted rounded-l-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-esports-purple"
              />
              <button className="bg-esports-purple hover:bg-esports-purple/90 text-white px-4 py-2 rounded-r-md transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-muted mt-8 pt-8 text-center text-muted-foreground">
          <p>© 2025 NeonArena. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
