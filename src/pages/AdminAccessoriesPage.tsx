
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const AdminAccessoriesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingAccessory, setEditingAccessory] = useState(null);
  const queryClient = useQueryClient();

  const { data: accessories, isLoading } = useQuery({
    queryKey: ['accessories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('accessories')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    }
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase
        .from('accessories')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accessories'] });
      toast.success("Accessory deleted successfully!");
    },
    onError: (error) => {
      console.error('Error deleting accessory:', error);
      toast.error("Failed to delete accessory");
    }
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async (accessory) => {
      const { error } = await supabase
        .from('accessories')
        .update({
          name: accessory.name,
          description: accessory.description,
          price: accessory.price,
          link: accessory.link,
          image_url: accessory.image_url
        })
        .eq('id', accessory.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accessories'] });
      setIsEditModalOpen(false);
      toast.success("Accessory updated successfully!");
    },
    onError: (error) => {
      console.error('Error updating accessory:', error);
      toast.error("Failed to update accessory");
    }
  });

  // Filter accessories based on search term
  const filteredAccessories = accessories?.filter(
    accessory => 
      accessory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      accessory.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this accessory?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleEdit = (accessory) => {
    setEditingAccessory({...accessory});
    setIsEditModalOpen(true);
  };

  const handleUpdateAccessory = () => {
    if (!editingAccessory) return;
    updateMutation.mutate(editingAccessory);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingAccessory(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Manage Accessories</h1>
          <Link to="/admin/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
        <div className="text-center py-8">Loading accessories...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Accessories</h1>
        <Link to="/admin/dashboard">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="w-1/2">
          <Input
            placeholder="Search by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Link to="/admin/accessories/add">
          <Button className="bg-esports-blue hover:bg-esports-blue/90">
            <Plus className="h-4 w-4 mr-2" /> Add Accessory
          </Button>
        </Link>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAccessories.map((accessory) => (
              <TableRow key={accessory.id}>
                <TableCell>
                  <img 
                    src={accessory.image_url} 
                    alt={accessory.name} 
                    className="h-12 w-16 object-cover rounded"
                  />
                </TableCell>
                <TableCell className="font-medium">{accessory.name}</TableCell>
                <TableCell>{accessory.price}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEdit(accessory)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDelete(accessory.id)}
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

      {/* Edit Accessory Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Accessory</DialogTitle>
          </DialogHeader>
          {editingAccessory && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={editingAccessory.name}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Input
                  id="price"
                  name="price"
                  value={editingAccessory.price}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image_url" className="text-right">
                  Image URL
                </Label>
                <Input
                  id="image_url"
                  name="image_url"
                  value={editingAccessory.image_url}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={editingAccessory.description}
                  onChange={handleChange}
                  className="col-span-3"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="link" className="text-right">
                  Link
                </Label>
                <Input
                  id="link"
                  name="link"
                  value={editingAccessory.link}
                  onChange={handleChange}
                  className="col-span-3"
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
              onClick={handleUpdateAccessory}
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

export default AdminAccessoriesPage;
