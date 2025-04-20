import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-esports-darker/90 backdrop-blur-md border-b border-muted">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-white">
              <span className="text-esports-purple">Bharat</span>Esports
              <span className="text-esports-purple">Express</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-white hover:text-esports-purple transition-colors">Home</Link>
            <Link to="/news" className="text-white hover:text-esports-purple transition-colors">News</Link>
            <Link to="/categories" className="text-white hover:text-esports-purple transition-colors">Categories</Link>
            <Link to="/accessories" className="text-white hover:text-esports-purple transition-colors">Accessories</Link>
            <Link to="/contact" className="text-white hover:text-esports-purple transition-colors">Contact</Link>
          </div>

          <div className="flex items-center gap-2">
            <div className={`transition-all duration-300 ${isSearchOpen ? 'w-64' : 'w-0'} overflow-hidden`}>
              {isSearchOpen && <SearchBar onClose={() => setIsSearchOpen(false)} />}
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-white hover:bg-muted rounded-full"
            >
              <Search className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white hover:bg-muted rounded-full"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 top-full bg-esports-darker border-b border-muted animate-fade-in">
            <div className="container mx-auto py-4 px-4 flex flex-col gap-4">
              <Link to="/" className="text-white hover:text-esports-purple transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/news" className="text-white hover:text-esports-purple transition-colors py-2" onClick={() => setIsMenuOpen(false)}>News</Link>
              <Link to="/categories" className="text-white hover:text-esports-purple transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Categories</Link>
              <Link to="/accessories" className="text-white hover:text-esports-purple transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Accessories</Link>
              <Link to="/contact" className="text-white hover:text-esports-purple transition-colors py-2" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
