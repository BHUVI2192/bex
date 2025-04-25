
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowLeft, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string().min(1, "Price is required"),
  image_url: z.string().url("Invalid URL").min(1, "Image URL is required"),
  link: z.string().url("Invalid URL").min(1, "Link is required"),
});

type FormValues = z.infer<typeof formSchema>;

const AdminAddAccessoryPage = () => {
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      image_url: "https://images.unsplash.com/photo-1593305841991-05c297ba4575",
      link: "https://www.amazon.in/",
    }
  });

  const onSubmit = async (data: FormValues) => {
    try {
      console.log("Submitting accessory:", data);
      
      // Insert the accessory into the database
      const { error } = await supabase
        .from('accessories')
        .insert([{
          name: data.name,
          description: data.description,
          price: data.price,
          image_url: data.image_url,
          link: data.link,
          // Set timestamps
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }]);
      
      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }
      
      toast.success("Accessory added successfully!");
      navigate("/admin/accessories");
    } catch (error: any) {
      console.error('Error adding accessory:', error);
      toast.error(`Failed to add accessory: ${error.message || "Unknown error"}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Add Accessory</h1>
        <Button variant="outline" onClick={() => navigate("/admin/accessories")}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Accessories
        </Button>
      </div>

      <div className="max-w-3xl mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter accessory name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter accessory description"
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g., ₹1,999" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="URL for accessory image" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shop Link</FormLabel>
                  <FormControl>
                    <Input placeholder="URL where customers can buy this item" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" className="bg-esports-blue hover:bg-esports-blue/90">
                <Save className="h-4 w-4 mr-2" /> Save Accessory
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AdminAddAccessoryPage;
