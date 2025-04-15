
import React from 'react';
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
import { Search, Download, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PaymentPageProps {
  language: 'en' | 'hi';
}

type PaymentStatus = 'paid' | 'pending' | 'failed';

interface Payment {
  id: string;
  date: string;
  store: string;
  amount: number;
  mode: string;
  status: PaymentStatus;
  invoiceId: string;
}

const payments: Payment[] = [
  { 
    id: 'P001', 
    date: '2023-11-15', 
    store: 'Chennai Silks', 
    amount: 42500, 
    mode: 'Credit Card', 
    status: 'paid',
    invoiceId: 'INV001'
  },
  { 
    id: 'P002', 
    date: '2023-11-14', 
    store: 'Bombay Electronics', 
    amount: 35750, 
    mode: 'UPI (PhonePe)', 
    status: 'paid',
    invoiceId: 'INV002'
  },
  { 
    id: 'P003', 
    date: '2023-11-14', 
    store: 'Delhi Sweets', 
    amount: 12999, 
    mode: 'Cash', 
    status: 'paid',
    invoiceId: 'INV003'
  },
  { 
    id: 'P004', 
    date: '2023-11-13', 
    store: 'Mumbai Fashion', 
    amount: 28499, 
    mode: 'Net Banking', 
    status: 'pending',
    invoiceId: 'INV004'
  },
  { 
    id: 'P005', 
    date: '2023-11-12', 
    store: 'Kolkata Books', 
    amount: 8750, 
    mode: 'UPI (Paytm)', 
    status: 'failed',
    invoiceId: 'INV005'
  },
  { 
    id: 'P006', 
    date: '2023-11-11', 
    store: 'Bangalore Tech', 
    amount: 65000, 
    mode: 'Credit Card', 
    status: 'paid',
    invoiceId: 'INV006'
  },
];

const translations = {
  en: {
    title: 'Payment Module',
    subtitle: 'Manage payments and transactions',
    paymentTransactions: 'Payment Transactions',
    search: 'Search payments...',
    generateReport: 'Generate Report',
    viewInvoice: 'View Invoice',
    id: 'ID',
    date: 'Date',
    store: 'Store',
    amount: 'Amount',
    mode: 'Payment Mode',
    status: 'Status',
    invoice: 'Invoice',
    actions: 'Actions',
    all: 'All',
    paid: 'Paid',
    pending: 'Pending',
    failed: 'Failed',
  },
  hi: {
    title: 'भुगतान मॉड्यूल',
    subtitle: 'भुगतान और लेनदेन का प्रबंधन करें',
    paymentTransactions: 'भुगतान लेनदेन',
    search: 'भुगतान खोजें...',
    generateReport: 'रिपोर्ट जनरेट करें',
    viewInvoice: 'चालान देखें',
    id: 'आईडी',
    date: 'तारीख',
    store: 'स्टोर',
    amount: 'राशि',
    mode: 'भुगतान मोड',
    status: 'स्थिति',
    invoice: 'चालान',
    actions: 'क्रियाएं',
    all: 'सभी',
    paid: 'भुगतान किया गया',
    pending: 'लंबित',
    failed: 'विफल',
  }
};

const PaymentPage: React.FC<PaymentPageProps> = ({ language }) => {
  const t = translations[language];
  const [activeTab, setActiveTab] = React.useState<string>('all');
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language === 'en' ? 'en-IN' : 'hi-IN').format(date);
  };
  
  const getStatusTranslation = (status: PaymentStatus) => {
    switch(status) {
      case 'paid': return t.paid;
      case 'pending': return t.pending;
      case 'failed': return t.failed;
      default: return status;
    }
  };
  
  const getStatusClassName = (status: PaymentStatus) => {
    switch(status) {
      case 'paid': return 'bg-indian-green bg-opacity-10 border-0 text-indian-green';
      case 'pending': return 'bg-indian-orange bg-opacity-10 border-0 text-indian-orange';
      case 'failed': return 'bg-indian-red bg-opacity-10 border-0 text-indian-red';
      default: return '';
    }
  };
  
  const filteredPayments = activeTab === 'all' 
    ? payments 
    : payments.filter(payment => payment.status === activeTab);
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-bold text-3xl">{t.title}</h1>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </div>
      
      <Card className="card-hover">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{t.paymentTransactions}</CardTitle>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            {t.generateReport}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="relative max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={t.search}
                className="w-full pl-9"
              />
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
              <TabsList>
                <TabsTrigger value="all">{t.all}</TabsTrigger>
                <TabsTrigger value="paid">{t.paid}</TabsTrigger>
                <TabsTrigger value="pending">{t.pending}</TabsTrigger>
                <TabsTrigger value="failed">{t.failed}</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.id}</TableHead>
                  <TableHead>{t.date}</TableHead>
                  <TableHead>{t.store}</TableHead>
                  <TableHead>{t.amount}</TableHead>
                  <TableHead>{t.mode}</TableHead>
                  <TableHead>{t.status}</TableHead>
                  <TableHead className="text-right">{t.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.id}</TableCell>
                    <TableCell>{formatDate(payment.date)}</TableCell>
                    <TableCell>{payment.store}</TableCell>
                    <TableCell className="inr">{payment.amount.toLocaleString('en-IN')}</TableCell>
                    <TableCell>{payment.mode}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getStatusClassName(payment.status)}
                      >
                        {getStatusTranslation(payment.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        {t.viewInvoice}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentPage;
