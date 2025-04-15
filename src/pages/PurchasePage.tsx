
import React, { useState } from 'react';
import { Package, Calendar, IndianRupee, Search, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import PurchaseItemForm from '@/components/forms/PurchaseItemForm';
import { toast } from "sonner";

interface PurchasePageProps {
  language: 'en' | 'hi';
}

const translations = {
  en: {
    title: "Purchase Management",
    subtitle: "Track and manage all your mall purchases",
    search: "Search purchases...",
    newPurchase: "New Purchase",
    totalPurchases: "Total Purchases",
    pendingOrders: "Pending Orders",
    thisMonth: "This Month",
    amount: "Total Amount",
    orderID: "Order ID",
    vendor: "Vendor",
    date: "Date",
    items: "Items",
    value: "Value",
    status: "Status",
    action: "Action",
    view: "View",
    edit: "Edit",
    delete: "Delete",
    completed: "Completed",
    pending: "Pending",
    processing: "Processing",
    editPurchase: "Edit Purchase",
    addNewPurchase: "New Purchase Order",
    deleteSuccess: "Purchase deleted successfully"
  },
  hi: {
    title: "खरीद प्रबंधन",
    subtitle: "अपने सभी मॉल की खरीदारी को ट्रैक करें और प्रबंधित करें",
    search: "खरीदारी खोजें...",
    newPurchase: "नई खरीद",
    totalPurchases: "कुल खरीदारी",
    pendingOrders: "लंबित आदेश",
    thisMonth: "इस महीने",
    amount: "कुल राशि",
    orderID: "आदेश आईडी",
    vendor: "विक्रेता",
    date: "तारीख",
    items: "आइटम",
    value: "मूल्य",
    status: "स्थिति",
    action: "कार्रवाई",
    view: "देखें",
    edit: "संपादित करें",
    delete: "हटाएं",
    completed: "पूरा हुआ",
    pending: "लंबित",
    processing: "प्रसंस्करण",
    editPurchase: "खरीद संपादित करें",
    addNewPurchase: "नया खरीद आदेश",
    deleteSuccess: "खरीद सफलतापूर्वक हटा दी गई"
  }
};

// Define the Purchase type to match the expected type by PurchaseItemForm
interface Purchase {
  id: string;
  vendor: string;
  date: string;
  items: number;
  value: string;
  status: 'completed' | 'pending' | 'processing';
}

// Sample data with explicit type
const purchaseData: Purchase[] = [
  {
    id: "PO-2023-001",
    vendor: "ABC Supplies",
    date: "2023-03-10",
    items: 24,
    value: "₹1,45,000",
    status: "completed"
  },
  {
    id: "PO-2023-002",
    vendor: "XYZ Distributors",
    date: "2023-03-15",
    items: 12,
    value: "₹85,000",
    status: "pending"
  },
  {
    id: "PO-2023-003",
    vendor: "Global Imports",
    date: "2023-03-18",
    items: 8,
    value: "₹1,20,000",
    status: "processing"
  },
  {
    id: "PO-2023-004",
    vendor: "Metro Suppliers",
    date: "2023-03-22",
    items: 16,
    value: "₹75,000",
    status: "completed"
  },
  {
    id: "PO-2023-005",
    vendor: "City Wholesalers",
    date: "2023-03-25",
    items: 32,
    value: "₹2,25,000",
    status: "pending"
  }
];

const PurchasePage: React.FC<PurchasePageProps> = ({ language }) => {
  const t = translations[language];
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null);

  const handleAddPurchase = () => {
    setIsAddDialogOpen(true);
  };
  
  const handleEditPurchase = (purchase: Purchase) => {
    setSelectedPurchase(purchase);
    setIsEditDialogOpen(true);
  };
  
  const handleDeletePurchase = (id: string) => {
    // In a real application, this would delete from the database
    toast.success(t.deleteSuccess);
  };
  
  const handleFormSuccess = () => {
    setIsAddDialogOpen(false);
    setIsEditDialogOpen(false);
    setSelectedPurchase(null);
  };

  const filteredData = purchaseData.filter(purchase => 
    purchase.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    purchase.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{t.title}</h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>
        <Button className="bg-indian-purple hover:bg-indian-purple/90" onClick={handleAddPurchase}>
          <Package className="mr-2 h-4 w-4" />
          {t.newPurchase}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.totalPurchases}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">40</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.pendingOrders}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t.amount} <span className="text-xs">({t.thisMonth})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹8,50,000</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t.search}
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Separator />

      {/* Purchase Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t.orderID}</TableHead>
              <TableHead>{t.vendor}</TableHead>
              <TableHead>{t.date}</TableHead>
              <TableHead className="text-right">{t.items}</TableHead>
              <TableHead className="text-right">{t.value}</TableHead>
              <TableHead>{t.status}</TableHead>
              <TableHead className="text-right">{t.action}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((purchase) => (
              <TableRow key={purchase.id}>
                <TableCell className="font-medium">{purchase.id}</TableCell>
                <TableCell>{purchase.vendor}</TableCell>
                <TableCell>{purchase.date}</TableCell>
                <TableCell className="text-right">{purchase.items}</TableCell>
                <TableCell className="text-right">{purchase.value}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                    purchase.status === 'completed' ? 'bg-green-50 text-green-700' : 
                    purchase.status === 'pending' ? 'bg-yellow-50 text-yellow-700' : 
                    'bg-blue-50 text-blue-700'
                  }`}>
                    {purchase.status === 'completed' ? t.completed : 
                     purchase.status === 'pending' ? t.pending : t.processing}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" className="h-8" onClick={() => handleEditPurchase(purchase)}>
                      <Edit className="h-4 w-4 mr-1" />
                      {t.edit}
                    </Button>
                    <Button variant="outline" size="sm" className="h-8" onClick={() => handleDeletePurchase(purchase.id)}>
                      <Trash2 className="h-4 w-4 mr-1" />
                      {t.delete}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add Purchase Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{t.addNewPurchase}</DialogTitle>
          </DialogHeader>
          <PurchaseItemForm language={language} onSuccess={handleFormSuccess} />
        </DialogContent>
      </Dialog>
      
      {/* Edit Purchase Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{t.editPurchase}</DialogTitle>
          </DialogHeader>
          <PurchaseItemForm language={language} initialData={selectedPurchase || undefined} onSuccess={handleFormSuccess} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PurchasePage;
