
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribing(true);

    try {
      const { data, error } = await supabase.functions.invoke('subscribe-newsletter', {
        body: { email }
      });

      if (error) throw error;

      toast.success("Thank you for subscribing to our newsletter!");
      setEmail("");
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      toast.error("Failed to subscribe. Please try again later.");
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-esports-darker border-t border-muted py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-esports-blue">Bharat</span>Esports
              <span className="text-esports-blue">Express</span>
            </h3>
            <p className="text-muted-foreground mb-4">
              Your ultimate source for Indian eSports news, tournaments, and gaming updates.
            </p>
            <div className="flex space-x-4 mb-4">
              {/* Only show one set of social icons */}
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
                required
              />
              <Button type="submit" disabled={isSubscribing}>
                <Mail className="mr-2 h-4 w-4" />
                {isSubscribing ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>
        
        {/* Remove duplicated set of icons here, show only copyright */}
        <div className="border-t border-muted mt-8 pt-8 text-center text-muted-foreground">
          <p className="mb-0">© 2025 BharatEsports Express. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
