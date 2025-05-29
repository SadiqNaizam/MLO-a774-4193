import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, ChevronDown, PlusCircle, Briefcase, CalendarClock } from 'lucide-react';

interface TopHeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  className?: string;
  title?: string;
}

const TopHeader: React.FC<TopHeaderProps> = ({
  isSidebarOpen,
  toggleSidebar,
  className,
  title = 'Dashboard',
}) => {
  return (
    <header
      className={cn(
        'fixed top-0 right-0 z-10 flex items-center justify-between px-4 bg-prd-surface h-[64px] border-b border-prd-border transition-all duration-300 ease-in-out',
        isSidebarOpen ? 'left-56' : 'left-20',
        className
      )}
    >
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-4 text-prd-secondary-text hover:text-prd-primary-text">
          <Menu className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-semibold text-prd-primary-text">{title}</h1>
      </div>
      <div className="flex items-center space-x-4">
        {/* Placeholder for other actions like notifications, search, etc. */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Create
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <PlusCircle className="mr-2 h-4 w-4" />
              <span>New Lead</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Briefcase className="mr-2 h-4 w-4" />
              <span>New Task</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CalendarClock className="mr-2 h-4 w-4" />
              <span>New Event</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopHeader;
