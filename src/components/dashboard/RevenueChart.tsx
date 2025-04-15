
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface RevenueChartProps {
  language: 'en' | 'hi';
}

const monthNames = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  hi: ['जन', 'फर', 'मार्च', 'अप्रै', 'मई', 'जून', 'जुल', 'अग', 'सित', 'अक्टू', 'नव', 'दिस']
};

const data = [
  { name: 'Jan', revenue: 145000 },
  { name: 'Feb', revenue: 159000 },
  { name: 'Mar', revenue: 170000 },
  { name: 'Apr', revenue: 190000 },
  { name: 'May', revenue: 210000 },
  { name: 'Jun', revenue: 250000 },
  { name: 'Jul', revenue: 290000 },
  { name: 'Aug', revenue: 315000 },
  { name: 'Sep', revenue: 335000 },
  { name: 'Oct', revenue: 350000 },
  { name: 'Nov', revenue: 370000 },
  { name: 'Dec', revenue: 398000 },
];

const RevenueChart: React.FC<RevenueChartProps> = ({ language }) => {
  // Create translated data
  const translatedData = data.map((item, index) => ({
    name: monthNames[language][index],
    revenue: item.revenue,
  }));

  const formatCurrency = (value: number) => {
    return `₹${(value / 1000).toFixed(0)}k`;
  };

  return (
    <Card className="col-span-4 card-hover">
      <CardHeader>
        <CardTitle>
          {language === 'en' ? 'Revenue Overview' : 'राजस्व अवलोकन'}
        </CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={translatedData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6E59A5" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#6E59A5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={formatCurrency} />
            <Tooltip 
              formatter={(value) => [`₹${value}`, language === 'en' ? 'Revenue' : 'राजस्व']}
              labelFormatter={(label) => {
                const index = monthNames[language].indexOf(label);
                return language === 'en' ? `${monthNames.en[index]} 2023` : `${monthNames.hi[index]} 2023`;
              }}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#6E59A5" 
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
