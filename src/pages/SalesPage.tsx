
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
import { Search, Filter, Download } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';

interface SalesPageProps {
  language: 'en' | 'hi';
}

interface SaleTransaction {
  id: string;
  store: string;
  date: string;
  amount: number;
  paymentMethod: string;
  gst: number;
}

const sales: SaleTransaction[] = [
  { id: 'S001', store: 'Chennai Silks', date: '2023-11-14', amount: 42500, paymentMethod: 'Card', gst: 7650 },
  { id: 'S002', store: 'Bombay Electronics', date: '2023-11-14', amount: 35750, paymentMethod: 'UPI', gst: 6435 },
  { id: 'S003', store: 'Delhi Sweets', date: '2023-11-13', amount: 12999, paymentMethod: 'Cash', gst: 2340 },
  { id: 'S004', store: 'Mumbai Fashion', date: '2023-11-13', amount: 28499, paymentMethod: 'Card', gst: 5130 },
  { id: 'S005', store: 'Kolkata Books', date: '2023-11-12', amount: 8750, paymentMethod: 'UPI', gst: 1575 },
  { id: 'S006', store: 'Bangalore Tech', date: '2023-11-12', amount: 65000, paymentMethod: 'Card', gst: 11700 },
];

const categoryData = [
  { name: 'Fashion', value: 120000 },
  { name: 'Electronics', value: 180000 },
  { name: 'Food & Beverages', value: 60000 },
  { name: 'Books & Stationery', value: 30000 },
  { name: 'Others', value: 45000 },
];

const COLORS = ['#6E59A5', '#F97316', '#16A34A', '#DC2626', '#6B7280'];

const translations = {
  en: {
    title: 'Sales Module',
    subtitle: 'Track and analyze sales transactions',
    salesTransactions: 'Sales Transactions',
    search: 'Search transactions...',
    filter: 'Filter',
    export: 'Export CSV',
    id: 'ID',
    store: 'Store',
    date: 'Date',
    amount: 'Amount',
    paymentMethod: 'Payment Method',
    gst: 'GST',
    categoryBreakdown: 'Sales by Category',
  },
  hi: {
    title: 'बिक्री मॉड्यूल',
    subtitle: 'बिक्री लेनदेन को ट्रैक और विश्लेषण करें',
    salesTransactions: 'बिक्री लेनदेन',
    search: 'लेनदेन खोजें...',
    filter: 'फ़िल्टर',
    export: 'CSV निर्यात करें',
    id: 'आईडी',
    store: 'स्टोर',
    date: 'तारीख',
    amount: 'राशि',
    paymentMethod: 'भुगतान विधि',
    gst: 'जीएसटी',
    categoryBreakdown: 'श्रेणी के अनुसार बिक्री',
  }
};

const SalesPage: React.FC<SalesPageProps> = ({ language }) => {
  const t = translations[language];
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language === 'en' ? 'en-IN' : 'hi-IN').format(date);
  };
  
  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-bold text-3xl">{t.title}</h1>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 card-hover">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{t.salesTransactions}</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                {t.filter}
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                {t.export}
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
                />
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t.id}</TableHead>
                    <TableHead>{t.store}</TableHead>
                    <TableHead>{t.date}</TableHead>
                    <TableHead>{t.amount}</TableHead>
                    <TableHead>{t.paymentMethod}</TableHead>
                    <TableHead>{t.gst}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sales.map((sale) => (
                    <TableRow key={sale.id}>
                      <TableCell className="font-medium">{sale.id}</TableCell>
                      <TableCell>{sale.store}</TableCell>
                      <TableCell>{formatDate(sale.date)}</TableCell>
                      <TableCell className="inr">{sale.amount.toLocaleString('en-IN')}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-secondary/50">
                          {sale.paymentMethod}
                        </Badge>
                      </TableCell>
                      <TableCell className="inr">{sale.gst.toLocaleString('en-IN')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>{t.categoryBreakdown}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`₹${Number(value).toLocaleString('en-IN')}`, '']} 
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalesPage;
