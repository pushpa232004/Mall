
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
import { cn } from '@/lib/utils';

interface TransactionsProps {
  language: 'en' | 'hi';
}

interface Transaction {
  id: string;
  store: string;
  amount: number;
  status: 'completed' | 'processing' | 'failed';
  date: string;
}

const transactions: Transaction[] = [
  {
    id: 'INV001',
    store: 'Chennai Silks',
    amount: 42500,
    status: 'completed',
    date: '2023-11-14',
  },
  {
    id: 'INV002',
    store: 'Bombay Electronics',
    amount: 35750,
    status: 'processing',
    date: '2023-11-14',
  },
  {
    id: 'INV003',
    store: 'Delhi Sweets',
    amount: 12999,
    status: 'completed',
    date: '2023-11-13',
  },
  {
    id: 'INV004',
    store: 'Mumbai Fashion',
    amount: 28499,
    status: 'failed',
    date: '2023-11-13',
  },
  {
    id: 'INV005',
    store: 'Kolkata Books',
    amount: 8750,
    status: 'completed',
    date: '2023-11-12',
  },
];

const statusTranslations = {
  en: {
    completed: 'Completed',
    processing: 'Processing',
    failed: 'Failed',
  },
  hi: {
    completed: 'पूर्ण',
    processing: 'प्रगति पर',
    failed: 'विफल',
  },
};

const tableHeadTranslations = {
  en: {
    invoice: 'Invoice',
    store: 'Store',
    amount: 'Amount',
    status: 'Status',
    date: 'Date',
  },
  hi: {
    invoice: 'चालान',
    store: 'स्टोर',
    amount: 'राशि',
    status: 'स्थिति',
    date: 'तारीख',
  },
};

const RecentTransactions: React.FC<TransactionsProps> = ({ language }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language === 'en' ? 'en-IN' : 'hi-IN').format(date);
  };

  const t = tableHeadTranslations[language];
  const statusT = statusTranslations[language];

  return (
    <Card className="col-span-4 card-hover">
      <CardHeader>
        <CardTitle>
          {language === 'en' ? 'Recent Transactions' : 'हाल के लेनदेन'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t.invoice}</TableHead>
              <TableHead>{t.store}</TableHead>
              <TableHead>{t.amount}</TableHead>
              <TableHead>{t.status}</TableHead>
              <TableHead className="text-right">{t.date}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{transaction.id}</TableCell>
                <TableCell>{transaction.store}</TableCell>
                <TableCell className="inr">{transaction.amount.toLocaleString('en-IN')}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      "bg-opacity-10 border-0",
                      transaction.status === 'completed' && "bg-indian-green text-indian-green",
                      transaction.status === 'processing' && "bg-indian-orange text-indian-orange",
                      transaction.status === 'failed' && "bg-indian-red text-indian-red"
                    )}
                  >
                    {statusT[transaction.status]}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{formatDate(transaction.date)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
