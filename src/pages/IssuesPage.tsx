
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
import { Search, PlusCircle, MessageSquare } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface IssuesPageProps {
  language: 'en' | 'hi';
}

type IssueStatus = 'pending' | 'in-progress' | 'resolved';
type IssuePriority = 'low' | 'medium' | 'high';

interface Issue {
  id: string;
  title: string;
  reporter: string;
  location: string;
  dateReported: string;
  priority: IssuePriority;
  status: IssueStatus;
}

const issues: Issue[] = [
  {
    id: 'ISS001',
    title: 'Broken escalator on 2nd floor',
    reporter: 'Chennai Silks',
    location: 'East Wing, 2nd Floor',
    dateReported: '2023-11-14',
    priority: 'high',
    status: 'in-progress'
  },
  {
    id: 'ISS002',
    title: 'Water leakage in restroom',
    reporter: 'Bombay Electronics',
    location: 'North Wing, 1st Floor',
    dateReported: '2023-11-13',
    priority: 'medium',
    status: 'pending'
  },
  {
    id: 'ISS003',
    title: 'Parking ticket machine not working',
    reporter: 'Customer Service',
    location: 'Basement Parking B2',
    dateReported: '2023-11-12',
    priority: 'high',
    status: 'resolved'
  },
  {
    id: 'ISS004',
    title: 'AC not working properly',
    reporter: 'Delhi Sweets',
    location: 'Food Court, Ground Floor',
    dateReported: '2023-11-12',
    priority: 'medium',
    status: 'in-progress'
  },
  {
    id: 'ISS005',
    title: 'Flickering lights',
    reporter: 'Mumbai Fashion',
    location: 'South Wing, 3rd Floor',
    dateReported: '2023-11-11',
    priority: 'low',
    status: 'resolved'
  }
];

const translations = {
  en: {
    title: 'Issues Module',
    subtitle: 'Track and resolve maintenance and service issues',
    issuesManagement: 'Issues Management',
    search: 'Search issues...',
    reportIssue: 'Report Issue',
    id: 'ID',
    issueTitle: 'Issue',
    reporter: 'Reported By',
    location: 'Location',
    dateReported: 'Date Reported',
    priority: 'Priority',
    status: 'Status',
    actions: 'Actions',
    all: 'All Issues',
    pending: 'Pending',
    inProgress: 'In Progress',
    resolved: 'Resolved',
    view: 'View Details',
    low: 'Low',
    medium: 'Medium',
    high: 'High',
  },
  hi: {
    title: 'मुद्दा मॉड्यूल',
    subtitle: 'रखरखाव और सेवा संबंधी मुद्दों को ट्रैक और हल करें',
    issuesManagement: 'मुद्दा प्रबंधन',
    search: 'मुद्दे खोजें...',
    reportIssue: 'मुद्दा रिपोर्ट करें',
    id: 'आईडी',
    issueTitle: 'मुद्दा',
    reporter: 'रिपोर्टर',
    location: 'स्थान',
    dateReported: 'रिपोर्ट की तारीख',
    priority: 'प्राथमिकता',
    status: 'स्थिति',
    actions: 'क्रियाएं',
    all: 'सभी मुद्दे',
    pending: 'लंबित',
    inProgress: 'प्रगति पर',
    resolved: 'हल किया गया',
    view: 'विवरण देखें',
    low: 'कम',
    medium: 'मध्यम',
    high: 'उच्च',
  }
};

const IssuesPage: React.FC<IssuesPageProps> = ({ language }) => {
  const t = translations[language];
  const [activeTab, setActiveTab] = React.useState<string>('all');
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language === 'en' ? 'en-IN' : 'hi-IN').format(date);
  };
  
  const getStatusTranslation = (status: IssueStatus) => {
    switch(status) {
      case 'pending': return t.pending;
      case 'in-progress': return t.inProgress;
      case 'resolved': return t.resolved;
      default: return status;
    }
  };
  
  const getPriorityTranslation = (priority: IssuePriority) => {
    switch(priority) {
      case 'low': return t.low;
      case 'medium': return t.medium;
      case 'high': return t.high;
      default: return priority;
    }
  };
  
  const getStatusClassName = (status: IssueStatus) => {
    switch(status) {
      case 'pending': return 'bg-indian-orange bg-opacity-10 border-0 text-indian-orange';
      case 'in-progress': return 'bg-indian-purple bg-opacity-10 border-0 text-indian-purple';
      case 'resolved': return 'bg-indian-green bg-opacity-10 border-0 text-indian-green';
      default: return '';
    }
  };
  
  const getPriorityClassName = (priority: IssuePriority) => {
    switch(priority) {
      case 'low': return 'bg-gray-200 bg-opacity-50 border-0 text-gray-700';
      case 'medium': return 'bg-indian-orange bg-opacity-10 border-0 text-indian-orange';
      case 'high': return 'bg-indian-red bg-opacity-10 border-0 text-indian-red';
      default: return '';
    }
  };
  
  const filteredIssues = activeTab === 'all' 
    ? issues 
    : issues.filter(issue => issue.status === activeTab);
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-bold text-3xl">{t.title}</h1>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </div>
      
      <Card className="card-hover">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{t.issuesManagement}</CardTitle>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            {t.reportIssue}
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
                <TabsTrigger value="pending">{t.pending}</TabsTrigger>
                <TabsTrigger value="in-progress">{t.inProgress}</TabsTrigger>
                <TabsTrigger value="resolved">{t.resolved}</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.id}</TableHead>
                  <TableHead>{t.issueTitle}</TableHead>
                  <TableHead>{t.reporter}</TableHead>
                  <TableHead>{t.location}</TableHead>
                  <TableHead>{t.dateReported}</TableHead>
                  <TableHead>{t.priority}</TableHead>
                  <TableHead>{t.status}</TableHead>
                  <TableHead className="text-right">{t.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIssues.map((issue) => (
                  <TableRow key={issue.id}>
                    <TableCell className="font-medium">{issue.id}</TableCell>
                    <TableCell>{issue.title}</TableCell>
                    <TableCell>{issue.reporter}</TableCell>
                    <TableCell>{issue.location}</TableCell>
                    <TableCell>{formatDate(issue.dateReported)}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getPriorityClassName(issue.priority)}
                      >
                        {getPriorityTranslation(issue.priority)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getStatusClassName(issue.status)}
                      >
                        {getStatusTranslation(issue.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {t.view}
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

export default IssuesPage;
