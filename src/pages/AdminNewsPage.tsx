
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { Plus } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllNews, updateNewsArticle, deleteNewsArticle, NewsArticle } from "@/services/mongoService";
import { NewsSearchBar } from "@/components/news/NewsSearchBar";
import { NewsTable } from "@/components/news/NewsTable";
import { EditNewsDialog } from "@/components/news/EditNewsDialog";

const AdminNewsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
  const queryClient = useQueryClient();

  const { data: newsArticles, isLoading } = useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      try {
        const data = await getAllNews();
        return data || [];
      } catch (error) {
        console.error("Error fetching news:", error);
        toast("Failed to load news articles");
        return [];
      }
    }
  });

  const updateMutation = useMutation({
    mutationFn: updateNewsArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
      setIsEditModalOpen(false);
      toast("News article updated successfully!");
    },
    onError: (error) => {
      console.error('Error updating news article:', error);
      toast("Failed to update news article");
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNewsArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
      toast("News article deleted successfully!");
    },
    onError: (error) => {
      console.error('Error deleting news article:', error);
      toast("Failed to delete news article");
    }
  });

  const filteredArticles = newsArticles?.filter(
    article => 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.category.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this news article?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleEdit = (article: NewsArticle) => {
    setEditingArticle({...article});
    setIsEditModalOpen(true);
  };

  const handleUpdateArticle = () => {
    if (!editingArticle || !editingArticle.id) return;
    updateMutation.mutate({
      id: editingArticle.id,
      title: editingArticle.title,
      category: editingArticle.category,
      imageurl: editingArticle.imageurl,
      description: editingArticle.description,
      source: editingArticle.source
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (editingArticle) {
      setEditingArticle(prev => ({
        ...prev!,
        [name]: value
      }));
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Manage News</h1>
          <Link to="/admin/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
        <div className="text-center py-8">Loading news articles...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage News</h1>
        <Link to="/admin/dashboard">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>

      <div className="flex justify-between items-center mb-6">
        <NewsSearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        <Link to="/admin/news/add">
          <Button className="bg-esports-blue hover:bg-esports-blue/90">
            <Plus className="h-4 w-4 mr-2" /> Add News Article
          </Button>
        </Link>
      </div>

      <NewsTable
        articles={filteredArticles}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <EditNewsDialog
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        article={editingArticle}
        onArticleChange={handleChange}
        onSave={handleUpdateArticle}
      />
    </div>
  );
};

export default AdminNewsPage;
