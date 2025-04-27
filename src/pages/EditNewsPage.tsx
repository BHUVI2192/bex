
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { getAllNews, updateNewsArticle, NewsArticle } from "@/services/mongoService";
import { ArrowLeft, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { categories } from "@/lib/data-service";

const EditNewsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const { data: newsArticles, isLoading: loadingArticles } = useQuery({
    queryKey: ['news'],
    queryFn: getAllNews
  });
  
  const article = newsArticles?.find(article => article.id === id);
  
  const form = useForm({
    defaultValues: {
      title: "",
      category: "",
      imageurl: "",
      description: "",
      source: ""
    }
  });
  
  useEffect(() => {
    if (article) {
      form.reset({
        title: article.title,
        category: article.category,
        imageurl: article.imageurl,
        description: article.description,
        source: article.source
      });
    }
  }, [article, form]);

  const updateMutation = useMutation({
    mutationFn: async (updates: NewsArticle) => {
      if (!id) throw new Error("Article ID is required");
      return await updateNewsArticle(id, updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
      toast("News article updated successfully!");
      navigate("/news");
    },
    onError: (error) => {
      console.error('Error updating news article:', error);
      toast("Failed to update news article");
    }
  });

  const onSubmit = (data: any) => {
    updateMutation.mutate({
      ...data,
      id,
      date: article?.date || new Date().toISOString(),
      isverified: true
    });
  };

  if (loadingArticles) {
    return <div className="container mx-auto px-4 py-8">Loading news article...</div>;
  }

  if (!article) {
    return <div className="container mx-auto px-4 py-8">Article not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Edit News Article</h1>
        <Button variant="outline" onClick={() => navigate("/news")}>
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
              name="imageurl"
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
              name="source"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Source</FormLabel>
                  <FormControl>
                    <Input placeholder="Source of the article" {...field} />
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
                  <FormLabel>Article Content</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Full article content"
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

export default EditNewsPage;
