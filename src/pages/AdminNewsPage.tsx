
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { articles } from "@/lib/data-service";
import { toast } from "@/components/ui/sonner";
import { Edit, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const AdminNewsPage = () => {
  const [newsArticles, setNewsArticles] = useState(articles);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const navigate = useNavigate();

  // Filter articles based on search term
  const filteredArticles = newsArticles.filter(
    article => 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this news article?")) {
      // In a real app, this would make an API call to delete the article
      setNewsArticles(newsArticles.filter(article => article.id !== id));
      toast.success("News article deleted successfully!");
    }
  };

  const handleEdit = (article) => {
    setEditingArticle({...article});
    setIsEditModalOpen(true);
  };

  const handleUpdateArticle = () => {
    if (!editingArticle) return;
    
    // In a real app, this would make an API call to update the article
    const updatedArticles = newsArticles.map(article => 
      article.id === editingArticle.id ? editingArticle : article
    );
    
    setNewsArticles(updatedArticles);
    setIsEditModalOpen(false);
    toast.success("News article updated successfully!");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingArticle(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage News</h1>
        <Link to="/admin/dashboard">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="w-1/2">
          <Input
            placeholder="Search by title or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Link to="/admin/news/add">
          <Button className="bg-esports-blue hover:bg-esports-blue/90">
            <Plus className="h-4 w-4 mr-2" /> Add News Article
          </Button>
        </Link>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredArticles.map((article) => (
              <TableRow key={article.id}>
                <TableCell className="font-medium">{article.title}</TableCell>
                <TableCell>{article.category}</TableCell>
                <TableCell>{article.date}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEdit(article)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDelete(article.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-100"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit News Article Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit News Article</DialogTitle>
          </DialogHeader>
          {editingArticle && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={editingArticle.title}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Input
                  id="category"
                  name="category"
                  value={editingArticle.category}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="imageUrl" className="text-right">
                  Image URL
                </Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  value={editingArticle.imageUrl}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input
                  id="date"
                  name="date"
                  value={editingArticle.date}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="excerpt" className="text-right">
                  Excerpt
                </Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  value={editingArticle.excerpt}
                  onChange={handleChange}
                  className="col-span-3"
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsEditModalOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleUpdateArticle}
              className="bg-esports-blue hover:bg-esports-blue/90"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminNewsPage;
