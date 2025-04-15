
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  ClipboardList,
  CreditCard,
  AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

interface SidebarProps {
  isOpen: boolean;
  language: 'en' | 'hi';
}

interface NavItem {
  path: string;
  label: {
    en: string;
    hi: string;
  };
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  {
    path: '/dashboard',
    label: { en: 'Dashboard', hi: 'डैशबोर्ड' },
    icon: LayoutDashboard
  },
  {
    path: '/admin',
    label: { en: 'Admin', hi: 'प्रशासन' },
    icon: Users
  },
  {
    path: '/sales',
    label: { en: 'Sales', hi: 'बिक्री' },
    icon: ShoppingCart
  },
  {
    path: '/inventory',
    label: { en: 'Inventory', hi: 'इन्वेंटरी' },
    icon: Package
  },
  {
    path: '/purchase',
    label: { en: 'Purchase', hi: 'खरीदारी' },
    icon: ClipboardList
  },
  {
    path: '/payment',
    label: { en: 'Payments', hi: 'भुगतान' },
    icon: CreditCard
  },
  {
    path: '/issues',
    label: { en: 'Issues', hi: 'मुद्दे' },
    icon: AlertTriangle
  }
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, language }) => {
  return (
    <aside 
      className={cn(
        "bg-sidebar text-sidebar-foreground border-r border-gray-200 transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-20"
      )}
    >
      <div className="p-4 flex items-center justify-center h-16">
        <span className={cn(
          "text-lg font-semibold text-indian-purple transition-opacity",
          isOpen ? "opacity-100" : "opacity-0"
        )}>
          {language === 'en' ? 'Mall Magic' : 'मॉल मैजिक'}
        </span>
        {!isOpen && (
          <span className="text-xl font-bold text-indian-purple">MM</span>
        )}
      </div>
      
      <Separator />
      
      <nav className="px-2 py-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => cn(
                  "flex items-center px-4 py-2 rounded-md transition-colors",
                  isActive 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                  !isOpen && "justify-center"
                )}
              >
                <item.icon size={20} className={cn(!isOpen && "mx-auto")} />
                {isOpen && (
                  <span className="ml-3">{item.label[language]}</span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
