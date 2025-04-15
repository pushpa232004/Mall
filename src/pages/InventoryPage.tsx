
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Plus, Barcode, Edit, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import InventoryItemForm from '@/components/forms/InventoryItemForm';
import { toast } from "sonner";

interface InventoryPageProps {
  language: 'en' | 'hi';
}

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  store: string;
  quantity: number;
  price: number;
  stockLevel: 'low' | 'medium' | 'high';
}

const inventoryItems: InventoryItem[] = [
  { id: 'I001', name: 'Cotton Saree', category: 'Clothing', store: 'Chennai Silks', quantity: 24, price: 3500, stockLevel: 'medium' },
  { id: 'I002', name: 'LED TV', category: 'Electronics', store: 'Bombay Electronics', quantity: 8, price: 42000, stockLevel: 'low' },
  { id: 'I003', name: 'Milk Cake', category: 'Food', store: 'Delhi Sweets', quantity: 150, price: 250, stockLevel: 'high' },
  { id: 'I004', name: 'Designer Handbag', category: 'Fashion', store: 'Mumbai Fashion', quantity: 12, price: 5999, stockLevel: 'medium' },
  { id: 'I005', name: 'Bestseller Novel', category: 'Books', store: 'Kolkata Books', quantity: 5, price: 499, stockLevel: 'low' },
  { id: 'I006', name: 'Wireless Earpods', category: 'Electronics', store: 'Bangalore Tech', quantity: 35, price: 7999, stockLevel: 'high' },
];

const translations = {
  en: {
    title: 'Inventory Module',
    subtitle: 'Track and manage inventory across all mall stores',
    inventoryItems: 'Inventory Items',
    search: 'Search items...',
    addItem: 'Add Item',
    scanBarcode: 'Scan Barcode',
    id: 'ID',
    name: 'Item Name',
    category: 'Category',
    store: 'Store',
    quantity: 'Qty',
    price: 'Price',
    stock: 'Stock Level',
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    edit: 'Edit',
    delete: 'Delete',
    actions: 'Actions',
    editItem: 'Edit Item',
    addNewItem: 'Add New Item',
    deleteSuccess: 'Item deleted successfully',
    scanningBarcode: 'Scanning barcode...',
  },
  hi: {
    title: 'इन्वेंटरी मॉड्यूल',
    subtitle: 'सभी मॉल स्टोर में इन्वेंटरी का प्रबंधन करें',
    inventoryItems: 'इन्वेंटरी आइटम',
    search: 'आइटम खोजें...',
    addItem: 'आइटम जोड़ें',
    scanBarcode: 'बारकोड स्कैन करें',
    id: 'आईडी',
    name: 'आइटम नाम',
    category: 'श्रेणी',
    store: 'स्टोर',
    quantity: 'मात्रा',
    price: 'मूल्य',
    stock: 'स्टॉक स्तर',
    low: 'कम',
    medium: 'मध्यम',
    high: 'उच्च',
    edit: 'संपादित करें',
    delete: 'हटाएं',
    actions: 'क्रियाएं',
    editItem: 'आइटम संपादित करें',
    addNewItem: 'नया आइटम जोड़ें',
    deleteSuccess: 'आइटम सफलतापूर्वक हटा दिया गया',
    scanningBarcode: 'बारकोड स्कैन किया जा रहा है...',
  }
};

const InventoryPage: React.FC<InventoryPageProps> = ({ language }) => {
  const t = translations[language];
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  
  const getStockLevelTranslation = (level: string) => {
    switch(level) {
      case 'low': return t.low;
      case 'medium': return t.medium;
      case 'high': return t.high;
      default: return level;
    }
  };
  
  const getStockLevelColor = (level: string) => {
    switch(level) {
      case 'low': return 'bg-indian-red bg-opacity-10 border-0 text-indian-red';
      case 'medium': return 'bg-indian-orange bg-opacity-10 border-0 text-indian-orange';
      case 'high': return 'bg-indian-green bg-opacity-10 border-0 text-indian-green';
      default: return '';
    }
  };
  
  const getStockProgress = (level: string) => {
    switch(level) {
      case 'low': return 20;
      case 'medium': return 55;
      case 'high': return 85;
      default: return 0;
    }
  };
  
  const getStockProgressColor = (level: string) => {
    switch(level) {
      case 'low': return 'bg-indian-red';
      case 'medium': return 'bg-indian-orange';
      case 'high': return 'bg-indian-green';
      default: return '';
    }
  };

  const handleAddItem = () => {
    setIsAddDialogOpen(true);
  };
  
  const handleEditItem = (item: InventoryItem) => {
    setSelectedItem(item);
    setIsEditDialogOpen(true);
  };
  
  const handleDeleteItem = (id: string) => {
    // In a real application, this would delete from the database
    toast.success(t.deleteSuccess);
  };
  
  const handleFormSuccess = () => {
    setIsAddDialogOpen(false);
    setIsEditDialogOpen(false);
    setSelectedItem(null);
  };

  const handleScanBarcode = () => {
    toast.info(t.scanningBarcode);
  };
  
  const filteredItems = inventoryItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.store.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-bold text-3xl">{t.title}</h1>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </div>
      
      <Card className="card-hover">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{t.inventoryItems}</CardTitle>
          <div className="flex gap-2">
            <Button onClick={handleAddItem}>
              <Plus className="mr-2 h-4 w-4" />
              {t.addItem}
            </Button>
            <Button variant="outline" onClick={handleScanBarcode}>
              <Barcode className="mr-2 h-4 w-4" />
              {t.scanBarcode}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-6">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t.search}
                className="w-full pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.id}</TableHead>
                  <TableHead>{t.name}</TableHead>
                  <TableHead>{t.category}</TableHead>
                  <TableHead>{t.store}</TableHead>
                  <TableHead>{t.quantity}</TableHead>
                  <TableHead>{t.price}</TableHead>
                  <TableHead>{t.stock}</TableHead>
                  <TableHead className="text-right">{t.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.store}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell className="inr">{item.price.toLocaleString('en-IN')}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress 
                          value={getStockProgress(item.stockLevel)} 
                          className={`h-2 w-16 ${getStockProgressColor(item.stockLevel)}`} 
                        />
                        <Badge
                          variant="outline"
                          className={getStockLevelColor(item.stockLevel)}
                        >
                          {getStockLevelTranslation(item.stockLevel)}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="icon" variant="ghost" onClick={() => handleEditItem(item)}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">{t.edit}</span>
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => handleDeleteItem(item.id)}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">{t.delete}</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add Item Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{t.addNewItem}</DialogTitle>
          </DialogHeader>
          <InventoryItemForm language={language} onSuccess={handleFormSuccess} />
        </DialogContent>
      </Dialog>
      
      {/* Edit Item Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{t.editItem}</DialogTitle>
          </DialogHeader>
          <InventoryItemForm language={language} initialData={selectedItem || undefined} onSuccess={handleFormSuccess} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InventoryPage;
