import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import SidebarNav from './SidebarNav';
import TopHeader from './TopHeader';

interface MainAppLayoutProps {
  children: React.ReactNode;
  className?: string;
  pageTitle?: string; 
  activePath?: string;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({
  children,
  className,
  pageTitle = 'Dashboard', // Default page title
  activePath = '/dashboard' // Default active path for sidebar
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={cn('min-h-screen bg-prd-background', className)}>
      <SidebarNav isSidebarOpen={isSidebarOpen} activePath={activePath} />
      <div
        className={cn(
          'flex flex-col flex-1 transition-all duration-300 ease-in-out',
          isSidebarOpen ? 'ml-56' : 'ml-20'
        )}
      >
        <TopHeader
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          title={pageTitle}
        />
        <main className="flex-1 pt-[64px] min-w-0 overflow-y-auto">
          <div className="p-6 mx-auto max-w-full">
            {/* Based on layout requirements mainContent.layout: p-6 mx-8. mx-8 might be page specific, or main area width bounded. Using p-6 mx-auto for now or simply p-6. The image seems to have some horizontal margin for the content cards. Using p-6 as per MainContent.container */} 
            {/* The requirement `mainContent: { layout: "p-6 mx-8 mt-[64px]" }` for the container.  */} 
            {/* Let's assume children will be wrapped in a container with this styling by the page component itself, or we can provide it here. */} 
            {/* The requirement also states 'mainContent.container: "flex flex-col gap-6"'. This seems more like for the content *within* the p-6 mx-8 area. */} 
            {/* Let's adhere to `p-6 mx-8` on a wrapper here, ensuring `mt-[64px]` is handled by `pt-[64px]` on the main tag. */} 
             <div className="p-6 mx-8"> {/* Using mx-8 as per specific mainContent layout requirements */} 
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainAppLayout;
