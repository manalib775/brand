
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Edit, Trash2, Plus, Save } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

type Category = {
  id: number;
  name: string;
  icon?: string;
};

export function CategoriesTab() {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "Electronics & Mobile" },
    { id: 2, name: "Automotive" },
    { id: 3, name: "Home Appliances" },
    { id: 4, name: "Banking & Finance" },
  ]);
  
  const [newCategory, setNewCategory] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleNewCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategory(e.target.value);
  };

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      toast({
        title: "Empty category name",
        description: "Please enter a category name",
        variant: "destructive"
      });
      return;
    }

    // Check if category already exists
    if (categories.some(cat => cat.name.toLowerCase() === newCategory.trim().toLowerCase())) {
      toast({
        title: "Category exists",
        description: "This category already exists",
        variant: "destructive"
      });
      return;
    }

    const newCategoryObj: Category = {
      id: categories.length ? Math.max(...categories.map(c => c.id)) + 1 : 1,
      name: newCategory.trim(),
      icon: selectedFile ? URL.createObjectURL(selectedFile) : undefined
    };

    setCategories([...categories, newCategoryObj]);
    
    toast({
      title: "Category added",
      description: `${newCategory} has been added successfully.`
    });

    // Reset form
    setNewCategory("");
    setSelectedFile(null);
  };

  const handleEditClick = (category: Category) => {
    setEditingCategory(category);
    setNewCategory(category.name);
    setEditMode(true);
  };

  const handleSaveEdit = () => {
    if (!newCategory.trim() || !editingCategory) {
      return;
    }

    // Check if category name already exists for another category
    if (categories.some(cat => 
      cat.id !== editingCategory.id && 
      cat.name.toLowerCase() === newCategory.trim().toLowerCase()
    )) {
      toast({
        title: "Category exists",
        description: "This category name is already in use",
        variant: "destructive"
      });
      return;
    }

    setCategories(prevCategories => 
      prevCategories.map(cat => 
        cat.id === editingCategory.id 
          ? { 
              ...cat, 
              name: newCategory.trim(), 
              icon: selectedFile ? URL.createObjectURL(selectedFile) : cat.icon 
            } 
          : cat
      )
    );

    toast({
      title: "Category updated",
      description: `Category has been updated to ${newCategory}`
    });

    // Reset form
    cancelEdit();
  };

  const cancelEdit = () => {
    setEditMode(false);
    setEditingCategory(null);
    setNewCategory("");
    setSelectedFile(null);
  };

  const openDeleteDialog = (category: Category) => {
    setCategoryToDelete(category);
    setShowDeleteDialog(true);
  };

  const handleDeleteCategory = () => {
    if (!categoryToDelete) return;
    
    setCategories(prevCategories => 
      prevCategories.filter(cat => cat.id !== categoryToDelete.id)
    );
    
    toast({
      title: "Category deleted",
      description: `${categoryToDelete.name} has been deleted successfully.`
    });
    
    setShowDeleteDialog(false);
    setCategoryToDelete(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Industry Categories</CardTitle>
          <CardDescription>Manage industry segments and categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <Label>{editMode ? "Edit Category" : "New Category"}</Label>
                <div className="flex gap-2 mt-1">
                  <Input 
                    placeholder="Enter category name" 
                    value={newCategory}
                    onChange={handleNewCategoryChange}
                  />
                  {editMode ? (
                    <div className="flex gap-2">
                      <Button onClick={handleSaveEdit}>
                        <Save className="h-4 w-4 mr-1" /> Save
                      </Button>
                      <Button variant="outline" onClick={cancelEdit}>
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button onClick={handleAddCategory}>
                      <Plus className="h-4 w-4 mr-1" /> Add
                    </Button>
                  )}
                </div>
              </div>
              <div>
                <Label>Category Icon</Label>
                <Input 
                  type="file" 
                  accept="image/*" 
                  className="mt-1"
                  onChange={handleFileChange}
                />
                {selectedFile && (
                  <div className="mt-2 text-sm">
                    Selected file: {selectedFile.name}
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <Label>Existing Categories</Label>
              <div className="mt-1 border rounded-md divide-y max-h-[300px] overflow-y-auto">
                {categories.length > 0 ? (
                  categories.map(category => (
                    <div key={category.id} className="p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {category.icon && (
                          <img 
                            src={category.icon} 
                            alt={category.name} 
                            className="h-6 w-6 object-contain"
                          />
                        )}
                        <span>{category.name}</span>
                      </div>
                      <div className="flex gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditClick(category)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => openDeleteDialog(category)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-3 text-center text-muted-foreground">
                    No categories found. Add one to get started.
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete the category "{categoryToDelete?.name}"? 
            This action cannot be undone.
          </p>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteCategory}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
