import React, { useState } from "react";
import { Mail, Send, Instagram, Youtube, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
    const whatsappNumber = "9902845242";
    const message = `Name: ${formData.name}%0AEmail: ${formData.email}%0AMessage: ${formData.message}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
    
    // Clear form and show success message
    toast.success("Redirecting to WhatsApp...");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleWhatsAppContact = () => {
    // Format the WhatsApp API URL with the provided number
    const whatsappNumber = "9902845242";
    const whatsappUrl = `https://wa.me/${whatsappNumber}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* About Us Column */}
        <div className="lg:col-span-1">
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
        </div>
        
        {/* Contact Form and WhatsApp Section */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* WhatsApp Contact Card */}
            <Card className="h-full bg-gradient-to-br from-green-600/20 to-green-700/10">
              <CardHeader>
                <CardTitle className="text-2xl">Contact via WhatsApp</CardTitle>
                <CardDescription>
                  Get faster responses through WhatsApp
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center space-y-4">
                <Phone className="h-16 w-16 text-green-600" />
                <p className="text-center">Connect with us directly on WhatsApp for immediate assistance</p>
                <Button 
                  onClick={handleWhatsAppContact}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <span className="mr-2">Chat on WhatsApp</span> +91 9902845242
                </Button>
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
      </div>
    </div>
  );
};

export default ContactPage;
