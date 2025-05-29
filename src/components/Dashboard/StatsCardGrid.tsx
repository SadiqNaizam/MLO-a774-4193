import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import StatCard from './StatCard';
import GraphCard from './GraphCard';
import PieChartCard from './PieChartCard';
import { cn } from '@/lib/utils';

interface FunnelStageData {
  id: string;
  name: string;
  count: number;
  value: number;
  duration: string;
  color: string;
  textColor?: string;
}

const funnelStagesData: FunnelStageData[] = [
  { id: 'discovery', name: 'Discovery', count: 200, value: 200, duration: '2 days', color: 'bg-red-500' }, //  Approx. from image #F06548
  { id: 'qualified', name: 'Qualified', count: 100, value: 100, duration: '2 days', color: 'bg-yellow-400' }, // Approx. from image
  { id: 'inConversation', name: 'In conversation', count: 50, value: 100, duration: 'average time on this stage', color: 'bg-indigo-600' }, // Approx. from image
  { id: 'negotiations', name: 'Negotiations', count: 20, value: 50, duration: '8 days', color: 'bg-green-500' }, // Approx. from image #0AB39C
  { id: 'closedWon', name: 'Closed won', count: 20, value: 50, duration: '10 days', color: 'bg-purple-600' }, // Approx. from image
];

const reasonsLostData = [
  { id: 'reason1', value: '40%', description: 'The proposal is unclear', valueClassName: 'text-2xl lg:text-3xl font-semibold text-prd-primary-text' },
  { id: 'reason2', value: '20%', description: 'However venture pursuit', valueClassName: 'text-2xl lg:text-3xl font-semibold text-prd-primary-text' },
  { id: 'reason3', value: '10%', description: 'Other', valueClassName: 'text-2xl lg:text-3xl font-semibold text-prd-primary-text' },
  { id: 'reason4', value: '30%', description: 'The proposal is unclear', valueClassName: 'text-2xl lg:text-3xl font-semibold text-prd-primary-text' },
];

const otherDataStats = [
  { id: 'other1', value: '900', description: 'total leads count', valueClassName: 'text-3xl lg:text-4xl font-semibold text-prd-primary-text' },
  { id: 'other2', value: '12', description: 'days in average to convert lead', valueClassName: 'text-3xl lg:text-4xl font-semibold text-prd-primary-text' },
  { 
    id: 'other3', 
    value: '30', 
    description: 'inactive leads', 
    valueClassName: 'text-3xl lg:text-4xl font-semibold text-prd-primary-text',
    icon: Info,
    iconTooltip: 'Information about inactive leads'
  },
];

const StatsCardGrid: React.FC = () => {
  const totalFunnelCount = funnelStagesData.reduce((sum, stage) => sum + stage.count, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Funnel Count Card */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-prd-primary-text">Funnel count</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <span className="text-4xl font-bold text-prd-primary-text">600</span>
            <span className="ml-2 text-sm text-prd-secondary-text">active leads</span>
          </div>
          <div className="w-full h-3 flex rounded overflow-hidden mb-6">
            {funnelStagesData.map(stage => (
              <div
                key={stage.id}
                className={cn(stage.color)}
                style={{ width: `${(stage.count / totalFunnelCount) * 100}%` }}
              />
            ))}
          </div>
          <ul className="space-y-3">
            {funnelStagesData.map(stage => (
              <li key={stage.id} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <span className={cn('w-3 h-3 rounded-sm mr-2', stage.color)} />
                  <span className="text-prd-primary-text">{stage.name}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-prd-secondary-text w-10 text-right">{stage.count}</span>
                  <span className="text-prd-secondary-text w-16 text-right">${stage.value}</span>
                  <TooltipProvider>
                    <Tooltip delayDuration={200}>
                      <TooltipTrigger asChild>
                        <span className="text-prd-secondary-text w-20 text-right cursor-default">{stage.duration}</span>
                      </TooltipTrigger>
                      {stage.name === 'In conversation' && (
                        <TooltipContent side="top" className="bg-neutral-800 text-white text-xs p-2 rounded">
                          <p>Average time on this stage</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Sources Card */}
      <PieChartCard className="lg:col-span-1" />

      {/* Leads Tracking Card */}
      <GraphCard className="lg:col-span-2" />

      {/* Reasons of leads lost Card */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-prd-primary-text">Reasons of leads lost</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
          {reasonsLostData.map(reason => (
            <StatCard
              key={reason.id}
              value={reason.value}
              description={reason.description}
              valueClassName={reason.valueClassName}
              descriptionClassName="text-sm text-prd-secondary-text mt-1"
            />
          ))}
        </CardContent>
      </Card>

      {/* Other data Card */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-prd-primary-text">Other data</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-rows-2 md:grid-cols-none md:grid-flow-col lg:grid-cols-3 lg:grid-rows-1">
          {otherDataStats.map(stat => (
            <StatCard
              key={stat.id}
              value={stat.value}
              description={stat.description}
              valueClassName={stat.valueClassName}
              descriptionClassName="text-sm text-prd-secondary-text mt-1 leading-tight"
              icon={stat.icon}
              iconPosition="descriptionSuffix"
              iconTooltip={stat.iconTooltip}
              className={cn(stat.id === 'other1' && "md:row-span-2 lg:row-span-1 lg:col-span-1",
                          stat.id === 'other2' && "md:col-start-2 md:row-start-1 lg:col-start-auto lg:row-start-auto",
                          stat.id === 'other3' && "md:col-start-2 md:row-start-2 lg:col-start-auto lg:row-start-auto",
                          "flex flex-col items-start")}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCardGrid;
