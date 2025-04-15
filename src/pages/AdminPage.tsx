
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import TenantForm from '@/components/forms/TenantForm';
import { toast } from "sonner";

interface AdminPageProps {
  language: 'en' | 'hi';
}

interface Tenant {
  id: string;
  name: string;
  category: string;
  location: string;
  gstin: string;
  status: 'active' | 'pending' | 'inactive';
}

const tenants: Tenant[] = [
  { id: 'T001', name: 'Chennai Silks', category: 'Clothing', location: 'Ground Floor, G-12', gstin: '33AABCT1234Z1Z5', status: 'active' },
  { id: 'T002', name: 'Bombay Electronics', category: 'Electronics', location: 'First Floor, F-05', gstin: '27AADCB9876Y1Z3', status: 'active' },
  { id: 'T003', name: 'Delhi Sweets', category: 'Food & Beverages', location: 'Ground Floor, G-22', gstin: '07AAECR7654Z1Z8', status: 'active' },
  { id: 'T004', name: 'Mumbai Fashion', category: 'Fashion', location: 'Second Floor, S-15', gstin: '27AAHCM5432X1Z7', status: 'pending' },
  { id: 'T005', name: 'Kolkata Books', category: 'Books & Stationery', location: 'First Floor, F-18', gstin: '19AAACP8765Q1Z2', status: 'inactive' },
  { id: 'T006', name: 'Bangalore Tech', category: 'Electronics', location: 'Second Floor, S-07', gstin: '29AADCT4567R1Z9', status: 'active' },
];

const translations = {
  en: {
    title: 'Admin Module',
    subtitle: 'Manage mall tenants, staff and operations',
    tenantManagement: 'Tenant Management',
    search: 'Search tenants...',
    addTenant: 'Add Tenant',
    id: 'ID',
    name: 'Name',
    category: 'Category',
    location: 'Location',
    gstin: 'GSTIN',
    status: 'Status',
    actions: 'Actions',
    edit: 'Edit',
    delete: 'Delete',
    active: 'Active',
    pending: 'Pending',
    inactive: 'Inactive',
    editTenant: 'Edit Tenant',
    addNewTenant: 'Add New Tenant',
    confirmDelete: 'Are you sure you want to delete this tenant?',
    deleteSuccess: 'Tenant deleted successfully',
  },
  hi: {
    title: 'प्रशासन मॉड्यूल',
    subtitle: 'मॉल के किरायेदारों, कर्मचारियों और संचालन का प्रबंधन करें',
    tenantManagement: 'किरायेदार प्रबंधन',
    search: 'किरायेदार खोजें...',
    addTenant: 'किरायेदार जोड़ें',
    id: 'आईडी',
    name: 'नाम',
    category: 'श्रेणी',
    location: 'स्थान',
    gstin: 'जीएसटीआईएन',
    status: 'स्थिति',
    actions: 'क्रियाएं',
    edit: 'संपादित करें',
    delete: 'हटाएं',
    active: 'सक्रिय',
    pending: 'लंबित',
    inactive: 'निष्क्रिय',
    editTenant: 'किरायेदार संपादित करें',
    addNewTenant: 'नया किरायेदार जोड़ें',
    confirmDelete: 'क्या आप इस किरायेदार को हटाना चाहते हैं?',
    deleteSuccess: 'किरायेदार सफलतापूर्वक हटा दिया गया',
  }
};

const AdminPage: React.FC<AdminPageProps> = ({ language }) => {
  const t = translations[language];
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  
  const getStatusTranslation = (status: string) => {
    switch(status) {
      case 'active': return t.active;
      case 'pending': return t.pending;
      case 'inactive': return t.inactive;
      default: return status;
    }
  };
  
  const getStatusClassName = (status: string) => {
    switch(status) {
      case 'active': return 'bg-indian-green bg-opacity-10 border-0 text-indian-green';
      case 'pending': return 'bg-indian-orange bg-opacity-10 border-0 text-indian-orange';
      case 'inactive': return 'bg-indian-red bg-opacity-10 border-0 text-indian-red';
      default: return '';
    }
  };
  
  const handleAddTenant = () => {
    setIsAddDialogOpen(true);
  };
  
  const handleEditTenant = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    setIsEditDialogOpen(true);
  };
  
  const handleDeleteTenant = (id: string) => {
    // In a real application, this would delete from the database
    toast.success(t.deleteSuccess);
  };
  
  const handleFormSuccess = () => {
    setIsAddDialogOpen(false);
    setIsEditDialogOpen(false);
    setSelectedTenant(null);
  };
  
  const filteredTenants = tenants.filter(tenant => 
    tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-bold text-3xl">{t.title}</h1>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </div>
      
      <Card className="card-hover">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{t.tenantManagement}</CardTitle>
          <Button onClick={handleAddTenant}>
            <Plus className="mr-2 h-4 w-4" />
            {t.addTenant}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="relative w-64">
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
                  <TableHead>{t.location}</TableHead>
                  <TableHead>{t.gstin}</TableHead>
                  <TableHead>{t.status}</TableHead>
                  <TableHead className="text-right">{t.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTenants.map((tenant) => (
                  <TableRow key={tenant.id}>
                    <TableCell className="font-medium">{tenant.id}</TableCell>
                    <TableCell>{tenant.name}</TableCell>
                    <TableCell>{tenant.category}</TableCell>
                    <TableCell>{tenant.location}</TableCell>
                    <TableCell>{tenant.gstin}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getStatusClassName(tenant.status)}
                      >
                        {getStatusTranslation(tenant.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="icon" variant="ghost" onClick={() => handleEditTenant(tenant)}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">{t.edit}</span>
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => handleDeleteTenant(tenant.id)}>
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
      
      {/* Add Tenant Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{t.addNewTenant}</DialogTitle>
          </DialogHeader>
          <TenantForm language={language} onSuccess={handleFormSuccess} />
        </DialogContent>
      </Dialog>
      
      {/* Edit Tenant Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{t.editTenant}</DialogTitle>
          </DialogHeader>
          <TenantForm language={language} initialData={selectedTenant || undefined} onSuccess={handleFormSuccess} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPage;
