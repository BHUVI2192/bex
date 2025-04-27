import React, { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Format the WhatsApp message with form data
    const whatsappNumber = "+919902845242";
    const message = `Name: ${formData.name}%0AEmail: ${formData.email}%0AMessage: ${formData.message}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
    
    // Clear form and show success message
    toast.success("Redirecting to WhatsApp...");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* About Us Column */}
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-2xl">About Bharat Esports Express</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="mb-4 flex justify-center">
              <img 
                src="/lovable-uploads/1a7914df-6f21-4e1c-8894-2dd1ab42adbd.png" 
                alt="Bharat Esports Express" 
                className="h-32" 
              />
            </div>
            <p>
              Bharat Esports Express is India's premier destination for esports news, gaming accessories, and community engagement.
            </p>
            <p>
              Founded in 2023, we are dedicated to promoting the growing esports scene in India and providing gamers with the latest news, tournament updates, and premium gaming gear.
            </p>
            <p>
              Our team consists of passionate gamers and industry experts committed to serving the Indian gaming community.
            </p>
            
            <div className="pt-4">
              <h3 className="font-bold mb-2">Connect With Us</h3>
              <div className="flex space-x-6 justify-center">
                <a 
                  href="https://www.instagram.com/bharat_esp0rts?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-esports-blue transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-6 w-6" />
                  <span className="sr-only">Instagram</span>
                </a>
                <a 
                  href="https://youtube.com/@bharatesportsxpress?si=OTjdfwZYgGk4YAqt" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-esports-blue transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="h-6 w-6" />
                  <span className="sr-only">YouTube</span>
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Leave a Message</CardTitle>
            <CardDescription>
              Send us a message via WhatsApp
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  required
                  className="border-esports-blue/30 focus:border-esports-blue"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  required
                  className="border-esports-blue/30 focus:border-esports-blue"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Type your message here..."
                  className="min-h-[100px] border-esports-blue/30 focus:border-esports-blue"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-esports-blue hover:bg-esports-blue/90"
              >
                Send via WhatsApp <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactPage;
