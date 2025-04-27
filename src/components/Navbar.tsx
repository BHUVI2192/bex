
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Plus, PenSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const location = useLocation();

  // Check if there's a saved access token in localStorage
  useEffect(() => {
    const checkAuthorization = () => {
      const savedAccessCode = localStorage.getItem("news_access_code");
      const AUTHORIZED_EDITORS = ["admin123", "editor456", "bharat789"];
      setIsAuthorized(savedAccessCode && AUTHORIZED_EDITORS.includes(savedAccessCode));
    };
    
    // Check on mount
    checkAuthorization();
    
    // Set up an event listener for storage changes
    window.addEventListener("storage", checkAuthorization);
    
    // Listen for custom events that might be dispatched when authorization state changes
    window.addEventListener("authStateChanged", checkAuthorization);
    
    return () => {
      window.removeEventListener("storage", checkAuthorization);
      window.removeEventListener("authStateChanged", checkAuthorization);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-esports-darker/90 backdrop-blur-md border-b border-esports-blue/20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-white flex items-center">
              <img 
                src="/lovable-uploads/1a7914df-6f21-4e1c-8894-2dd1ab42adbd.png" 
                alt="Bharat Esports Express" 
                className="h-10 mr-2" 
              />
              <span className="text-esports-blue">Bharat</span>Esports
              <span className="text-esports-blue">Express</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className={`text-white hover:text-esports-blue transition-colors ${location.pathname === '/' ? 'text-esports-blue' : ''}`}>Home</Link>
            <Link to="/news" className={`text-white hover:text-esports-blue transition-colors ${location.pathname === '/news' ? 'text-esports-blue' : ''}`}>News</Link>
            {isAuthorized && (
              <Link to="/news/add" className={`text-white hover:text-esports-blue transition-colors flex items-center ${location.pathname === '/news/add' ? 'text-esports-blue' : ''}`}>
                <PenSquare className="h-4 w-4 mr-1" /> Editor
              </Link>
            )}
            <Link to="/accessories" className={`text-white hover:text-esports-blue transition-colors ${location.pathname === '/accessories' ? 'text-esports-blue' : ''}`}>Accessories</Link>
            <Link to="/contact" className={`text-white hover:text-esports-blue transition-colors ${location.pathname === '/contact' ? 'text-esports-blue' : ''}`}>Contact</Link>
          </div>

          <div className="flex items-center gap-2">
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
          <div className="md:hidden absolute left-0 right-0 top-full bg-esports-darker border-b border-esports-blue/20 animate-fade-in">
            <div className="container mx-auto py-4 px-4 flex flex-col gap-4">
              <Link to="/" className={`text-white hover:text-esports-blue transition-colors py-2 ${location.pathname === '/' ? 'text-esports-blue' : ''}`} onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/news" className={`text-white hover:text-esports-blue transition-colors py-2 ${location.pathname === '/news' ? 'text-esports-blue' : ''}`} onClick={() => setIsMenuOpen(false)}>News</Link>
              {isAuthorized && (
                <Link to="/news/add" className={`text-white hover:text-esports-blue transition-colors py-2 flex items-center ${location.pathname === '/news/add' ? 'text-esports-blue' : ''}`} onClick={() => setIsMenuOpen(false)}>
                  <PenSquare className="h-4 w-4 mr-1" /> Editor
                </Link>
              )}
              <Link to="/accessories" className={`text-white hover:text-esports-blue transition-colors py-2 ${location.pathname === '/accessories' ? 'text-esports-blue' : ''}`} onClick={() => setIsMenuOpen(false)}>Accessories</Link>
              <Link to="/contact" className={`text-white hover:text-esports-blue transition-colors py-2 ${location.pathname === '/contact' ? 'text-esports-blue' : ''}`} onClick={() => setIsMenuOpen(false)}>Contact</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
