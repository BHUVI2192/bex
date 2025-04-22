
import React, { useState } from "react";
import { Mail, Send, Instagram, Youtube } from "lucide-react";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact', {
        body: formData
      });

      if (error) throw error;

      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
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
                    href="https://instagram.com/bharatesports.bgmi" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-esports-blue transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-6 w-6" />
                    <span className="sr-only">Instagram</span>
                  </a>
                  <a 
                    href="https://youtube.com/@BharatEsports" 
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
        
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Contact Us</CardTitle>
              <CardDescription>
                Send us a message and we'll get back to you as soon as possible.
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
                    className="min-h-[150px] border-esports-blue/30 focus:border-esports-blue"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-esports-blue hover:bg-esports-blue/90" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
