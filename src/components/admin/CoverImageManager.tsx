import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import { CoverImage } from '@/components/ecommerce/CoverImageCarousel';

const CoverImageManager = () => {
  const { coverImages, addCoverImage, updateCoverImage, deleteCoverImage, loading, error } = useAdmin();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<CoverImage | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'men' as 'men' | 'women' | 'kids' | 'shoes',
    isActive: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'men',
      isActive: true,
    });
    setImageFile(null);
  };

  const handleAddImage = async () => {
    if (!imageFile) {
      alert('Please select an image file');
      return;
    }

    try {
      await addCoverImage({
        imageUrl: '', // This will be set by the upload function
        ...formData,
        imageFile,
      });
      
      setIsAddDialogOpen(false);
      resetForm();
    } catch (error) {
      // Handle error silently
    }
  };

  const handleEditImage = async () => {
    if (!editingImage) return;

    try {
      await updateCoverImage(editingImage.id, formData);
      setIsEditDialogOpen(false);
      setEditingImage(null);
      resetForm();
    } catch (error) {
      // Handle error silently
    }
  };

  const handleDeleteImage = async (id: string) => {
    if (confirm('Are you sure you want to delete this cover image?')) {
      try {
        await deleteCoverImage(id);
          } catch (error) {
      // Handle error silently
    }
    }
  };

  const openEditDialog = (image: CoverImage) => {
    setEditingImage(image);
    setFormData({
      title: image.title || '',
      description: image.description || '',
      category: image.category,
      isActive: image.isActive,
    });
    setIsEditDialogOpen(true);
  };



  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading cover images...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Cover Images</h3>
        <p className="text-red-700 mb-4">{error}</p>
        <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mt-4">
          <h4 className="font-medium text-yellow-800 mb-2">To fix this issue:</h4>
          <ol className="list-decimal list-inside text-sm text-yellow-700 space-y-1">
            <li>Go to your Appwrite Console</li>
            <li>Navigate to Database → {`{DATABASE_ID}`}</li>
            <li>Create a new collection with ID: <code className="bg-yellow-100 px-1 rounded">685a8f0000281f69de7c</code></li>
            <li>Add these attributes:
              <ul className="ml-4 mt-1 list-disc">
                <li>imageUrl (String, required)</li>
                <li>category (String, required)</li>
                <li>title (String, optional)</li>
                <li>description (String, optional)</li>
                <li>isActive (Boolean, required, default: true)</li>
                <li>createdAt (String, required)</li>
              </ul>
            </li>
            <li>Set permissions: Read access for role:all, Create/Update/Delete for admin</li>
          </ol>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Cover Images</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Cover Image
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Cover Image</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="add-image-file">Image File</Label>
                <Input
                  id="add-image-file"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="add-category">Category</Label>
                <Select value={formData.category} onValueChange={(value: any) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="men">Men</SelectItem>
                    <SelectItem value="women">Women</SelectItem>
                    <SelectItem value="kids">Kids</SelectItem>
                    <SelectItem value="shoes">Shoes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="add-title">Title (Optional)</Label>
                <Input
                  id="add-title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Cover image title"
                />
              </div>
              
              <div>
                <Label htmlFor="add-description">Description (Optional)</Label>
                <Textarea
                  id="add-description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Cover image description"
                  rows={3}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="add-active"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                />
                <Label htmlFor="add-active">Active</Label>
              </div>
              
              <div className="flex gap-2">
                <Button onClick={handleAddImage} className="flex-1">
                  Add Cover Image
                </Button>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Cover Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coverImages.map((image) => (
          <Card key={image.id} className="overflow-hidden">
            <div className="aspect-video relative bg-gray-100">
              <img
                src={image.imageUrl}
                alt={image.title || `${image.category} cover`}
                className="w-full h-full object-contain"
              />
              <div className="absolute top-2 right-2 flex gap-1">
                <Badge variant={image.isActive ? "default" : "secondary"}>
                  {image.isActive ? "Active" : "Inactive"}
                </Badge>
                <Badge variant="outline">
                  {image.category.toUpperCase()}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="space-y-2">
                {image.title && (
                  <h3 className="font-semibold text-sm text-gray-900 truncate">
                    {image.title}
                  </h3>
                )}
                {image.description && (
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {image.description}
                  </p>
                )}
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openEditDialog(image)}
                    className="flex-1"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDeleteImage(image.id)}
                    className="flex-1"
                  >
                    <Trash2 className="h-3 w-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {coverImages.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No cover images</h3>
          <p className="text-gray-600 mb-4">Get started by adding your first cover image.</p>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            Add Cover Image
          </Button>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Cover Image</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-category">Category</Label>
              <Select value={formData.category} onValueChange={(value: any) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="men">Men</SelectItem>
                  <SelectItem value="women">Women</SelectItem>
                  <SelectItem value="kids">Kids</SelectItem>
                  <SelectItem value="shoes">Shoes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="edit-title">Title (Optional)</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Cover image title"
              />
            </div>
            
            <div>
              <Label htmlFor="edit-description">Description (Optional)</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Cover image description"
                rows={3}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="edit-active"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
              />
              <Label htmlFor="edit-active">Active</Label>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleEditImage} className="flex-1">
                Update Cover Image
              </Button>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CoverImageManager; 