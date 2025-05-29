import React from 'react';
import Link from 'next/link'; // Assuming Next.js for Link, replace with react-router-dom if not using Next.js
import { cn } from '@/lib/utils';
import {
  LayoutGrid,
  Users,
  User,
  FileText,
  ShoppingCart,
  Mail,
  Archive,
  CalendarDays,
  HelpCircle,
  Settings,
  LucideIcon
} from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  isActive?: boolean;
}

const mainNavigationItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutGrid, isActive: true }, // Example: Dashboard is active
  { href: '/leads', label: 'Leads', icon: Users },
  { href: '/customers', label: 'Customers', icon: User },
  { href: '/proposals', label: 'Proposals', icon: FileText },
  { href: '/invoices', label: 'Invoices', icon: FileText }, // Matched document icon from image
  { href: '/items', label: 'Items', icon: ShoppingCart },
  { href: '/mail', label: 'Mail', icon: Mail },
  { href: '/shoebox', label: 'Shoebox', icon: Archive },
  { href: '/calendar', label: 'Calendar', icon: CalendarDays },
];

const helpNavigationItems: NavItem[] = [
  { href: '/help', label: 'Help', icon: HelpCircle },
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/support', label: 'Help', icon: HelpCircle }, // Second Help item as in image
];

interface SidebarNavProps {
  isSidebarOpen: boolean;
  className?: string;
  activePath?: string; // e.g., '/dashboard'
}

const SidebarNav: React.FC<SidebarNavProps> = ({
  isSidebarOpen,
  className,
  activePath = '/dashboard', // Default active path
}) => {
  const renderNavItem = (item: NavItem, index: number) => (
    <li key={`${item.label}-${index}`}>
      <Link
        href={item.href}
        className={cn(
          'flex items-center py-2 px-3 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out',
          'text-prd-primary-text hover:bg-secondary/80 hover:text-primary',
          item.href === activePath && 'bg-secondary text-primary',
          isSidebarOpen ? 'justify-start' : 'justify-center'
        )}
      >
        <item.icon className={cn('h-5 w-5', isSidebarOpen && 'mr-3')} />
        {isSidebarOpen && <span>{item.label}</span>}
      </Link>
    </li>
  );

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 h-screen bg-sidebar text-prd-primary-text flex flex-col transition-all duration-300 ease-in-out',
        isSidebarOpen ? 'w-56' : 'w-20',
        className
      )}
    >
      <div
        className={cn(
          'flex items-center h-[64px] border-b border-prd-border',
          isSidebarOpen ? 'px-4 justify-start' : 'px-0 justify-center'
        )}
      >
        <div className="flex items-center justify-center bg-black text-white rounded-full w-10 h-10 text-lg font-bold">
          BO
        </div>
        {isSidebarOpen && <span className="ml-3 text-xl font-semibold">Sales Dashboard</span>}
      </div>
      <nav className="flex-grow p-3 space-y-1 overflow-y-auto">
        <ul className="space-y-1">
          {mainNavigationItems.map((item, index) => renderNavItem(item, index))}
        </ul>
        <div className={cn('pt-4 mt-4 border-t border-prd-border/50', isSidebarOpen ? 'block' : 'hidden')} />
        {isSidebarOpen && <span className="px-3 text-xs font-semibold text-prd-secondary-text uppercase tracking-wider">Support</span>}
        <ul className="space-y-1 mt-2">
          {helpNavigationItems.map((item, index) => renderNavItem(item, index))}
        </ul>
      </nav>
    </aside>
  );
};

export default SidebarNav;
