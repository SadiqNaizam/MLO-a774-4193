import React from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import StatsCardGrid from '../components/Dashboard/StatsCardGrid';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const IndexPage: React.FC = () => {
  return (
    <MainAppLayout pageTitle="Dashboard" activePath="/dashboard">
      <div className="flex flex-col gap-6"> {/* Adheres to mainContent.container requirement */}
        <Tabs defaultValue="leads" className="w-full">
          <TabsList className="bg-transparent p-0 h-auto inline-flex"> {/* Custom TabsList styling to match image */} 
            <TabsTrigger
              value="sales"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none transition-none"
            >
              Sales
            </TabsTrigger>
            <TabsTrigger
              value="leads"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none transition-none"
            >
              Leads
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="sales" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-prd-primary-text">Sales Overview</CardTitle>
                <CardDescription>
                  Detailed sales performance metrics and reports.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-prd-secondary-text">
                  Sales-specific statistics, charts, and key performance indicators (KPIs) related to revenue, closed deals, and sales team performance will be displayed in this section. 
                  Currently, this content is a placeholder.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="leads" className="mt-6">
            <StatsCardGrid />
          </TabsContent>
        </Tabs>
      </div>
    </MainAppLayout>
  );
};

export default IndexPage;
