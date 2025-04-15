
import React from 'react';
import { Users, Store, IndianRupee, ShoppingBag } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import RevenueChart from '@/components/dashboard/RevenueChart';
import RecentTransactions from '@/components/dashboard/RecentTransactions';

interface DashboardPageProps {
  language: 'en' | 'hi';
}

const translations = {
  en: {
    welcome: "Welcome to Mall Magic",
    subtitle: "Here's an overview of your mall performance",
    tenants: "Total Tenants",
    revenue: "Monthly Revenue",
    visitors: "Monthly Visitors",
    sales: "Total Sales",
    thisMonth: "this month",
    lastMonth: "vs last month"
  },
  hi: {
    welcome: "मॉल मैजिक में आपका स्वागत है",
    subtitle: "यहां आपके मॉल के प्रदर्शन का अवलोकन है",
    tenants: "कुल किरायेदार",
    revenue: "मासिक राजस्व",
    visitors: "मासिक आगंतुक",
    sales: "कुल बिक्री",
    thisMonth: "इस महीने",
    lastMonth: "पिछले महीने की तुलना में"
  }
};

const DashboardPage: React.FC<DashboardPageProps> = ({ language }) => {
  const t = translations[language];
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-bold text-3xl">{t.welcome}</h1>
        <p className="text-muted-foreground">{t.subtitle}</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title={t.tenants}
          value="124"
          icon={<Users size={24} />}
          trend={{ value: 4, isPositive: true }}
          description={t.lastMonth}
        />
        <StatCard 
          title={t.revenue}
          value="₹32,45,500"
          icon={<IndianRupee size={24} />}
          trend={{ value: 12, isPositive: true }}
          description={t.lastMonth}
        />
        <StatCard 
          title={t.visitors}
          value="1,42,350"
          icon={<Users size={24} />}
          trend={{ value: 2, isPositive: false }}
          description={t.lastMonth}
        />
        <StatCard 
          title={t.sales}
          value="₹1,25,45,000"
          icon={<ShoppingBag size={24} />}
          description={t.thisMonth}
        />
      </div>
      
      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <RevenueChart language={language} />
        <RecentTransactions language={language} />
      </div>
    </div>
  );
};

export default DashboardPage;
