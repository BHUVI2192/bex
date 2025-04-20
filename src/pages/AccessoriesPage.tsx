
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Headphones, ShoppingCart } from "lucide-react";
import { Card } from "@/components/ui/card";

// This is temporary mock data - will be replaced with backend data later
const accessories = [
  {
    id: 1,
    name: "Razer BlackShark V2 Pro",
    description: "Wireless Gaming Headset with THX Spatial Audio",
    image: "https://picsum.photos/400/300",
    price: "₹15,999",
    link: "https://www.amazon.in/Razer-BlackShark-Wireless-Gaming-Headset/dp/B08FQG96RP"
  },
  {
    id: 2,
    name: "Logitech G502 HERO",
    description: "High Performance Gaming Mouse",
    image: "https://picsum.photos/400/300",
    price: "₹4,995",
    link: "https://www.flipkart.com/logitech-g502-hero-wired-optical-gaming-mouse/p/itm92df1465cbd80"
  }
];

const AccessoriesPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Gaming Accessories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accessories.map((item) => (
          <Card key={item.id} className="overflow-hidden bg-card hover:shadow-lg transition-shadow">
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
                  <p className="text-esports-purple font-bold">{item.price}</p>
                </div>
                <ShoppingCart className="text-muted-foreground" />
              </div>
              <Link
                to={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center text-esports-purple hover:text-esports-purple/80 transition-colors"
              >
                Shop Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AccessoriesPage;
