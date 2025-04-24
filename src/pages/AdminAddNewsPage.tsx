
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { categories } from "@/lib/data-service";
import { ArrowLeft, Save } from "lucide-react";

type FormValues = {
  title: string;
  category: string;
  excerpt: string;
  imageUrl: string;
  content: string;
};

const AdminAddNewsPage = () => {
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    defaultValues: {
      title: "",
      category: categories[0]?.id || "",
      excerpt: "",
      imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
      content: "",
    }
  });

  const onSubmit = (data: FormValues) => {
    // In a real app, this would make an API call to add the article
    console.log("Adding news article:", data);
    
    // Show success message
    toast.success("News article added successfully!");
    
    // Navigate back to news management page
    navigate("/admin/news");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Add News Article</h1>
        <Button variant="outline" onClick={() => navigate("/admin/news")}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to News
        </Button>
      </div>

      <div className="max-w-3xl mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter article title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <select
                      className="w-full p-2 border rounded-md bg-background"
                      {...field}
                    >
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excerpt/Summary</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Brief summary of the article"
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
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="URL for article image" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Article Content</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Full article content (supports HTML)"
                      className="min-h-[300px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" className="bg-esports-blue hover:bg-esports-blue/90">
                <Save className="h-4 w-4 mr-2" /> Save Article
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AdminAddNewsPage;
