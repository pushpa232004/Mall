
import React from 'react';
import { 
  Bell, 
  Menu, 
  X, 
  User,
  Moon,
  Sun,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface HeaderProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
  language: 'en' | 'hi';
  toggleLanguage: () => void;
}

const translations = {
  en: {
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Logout',
    notifications: 'Notifications',
    theme: 'Toggle Theme'
  },
  hi: {
    profile: 'प्रोफ़ाइल',
    settings: 'समायोजन',
    logout: 'लॉग आउट',
    notifications: 'सूचनाएं',
    theme: 'थीम बदलें'
  }
};

const Header: React.FC<HeaderProps> = ({ 
  toggleSidebar, 
  sidebarOpen,
  language,
  toggleLanguage
}) => {
  const t = translations[language];
  
  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm h-16 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2"
          onClick={toggleSidebar}
          aria-label="Toggle navigation"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
        <h1 className="text-xl font-semibold text-gray-800 hidden md:block">
          {language === 'en' ? 'Indian Mall Management System' : 'भारतीय मॉल प्रबंधन प्रणाली'}
        </h1>
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Language Switch */}
        <Button
          variant="outline"
          className="text-sm"
          onClick={toggleLanguage}
        >
          {language === 'en' ? 'हिंदी' : 'English'}
        </Button>
        
        {/* Theme Toggle */}
        <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
          <Sun size={20} className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon size={20} className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">{t.theme}</span>
        </Button>
        
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-indian-red"></span>
              <span className="sr-only">{t.notifications}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>{t.notifications}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-auto">
              {[...Array(3)].map((_, i) => (
                <DropdownMenuItem key={i} className="p-4 cursor-pointer">
                  <div className="flex flex-col gap-1">
                    <p className="font-medium">{language === 'en' ? `Notification ${i+1}` : `सूचना ${i+1}`}</p>
                    <p className="text-sm text-gray-500">{language === 'en' ? 'This is a notification message.' : 'यह एक सूचना संदेश है।'}</p>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar>
                <AvatarFallback className="bg-indian-purple text-white">MM</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{language === 'en' ? 'My Account' : 'मेरा खाता'}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>{t.profile}</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              {t.settings}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              {t.logout}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
