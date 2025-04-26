
import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-esports-darker border-t border-muted py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-esports-blue">Bharat</span>Esports
              <span className="text-esports-blue">Express</span>
            </h3>
            <p className="text-muted-foreground mb-4">
              Your ultimate source for Indian eSports news, tournaments, and gaming updates.
            </p>
            <div className="flex space-x-4 mb-4">
              <a 
                href="https://www.instagram.com/bharat_esp0rts?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-esports-blue transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a 
                href="https://youtube.com/@bharatesportsxpress?si=OTjdfwZYgGk4YAqt" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-esports-blue transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-esports-blue transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-muted-foreground hover:text-esports-blue transition-colors">
                  News
                </Link>
              </li>
              <li>
                <Link to="/accessories" className="text-muted-foreground hover:text-esports-blue transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-esports-blue transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-muted mt-8 pt-8 text-center text-muted-foreground">
          <p className="mb-0">© 2025 BharatEsports Express. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
