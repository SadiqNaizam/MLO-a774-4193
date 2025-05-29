import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';
import { CalendarDays, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip as ShadTooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface PieDataPoint {
  name: string;
  value: number;
  percentage: number;
  color: string;
}

type DataType = 'leadsCame' | 'leadsConverted' | 'totalDeals';

const leadsCameData: PieDataPoint[] = [
  { name: 'Clutch', value: 3000, percentage: 50, color: '#F06548' }, // prd-accent-red
  { name: 'Behance', value: 2400, percentage: 40, color: '#F7B84B' }, // Similar to image yellow
  { name: 'Instagram', value: 600, percentage: 10, color: '#0AB39C' }, // prd-accent-green (tealish)
  { name: 'Dribbble', value: 600, percentage: 10, color: '#299CDB' }, // prd-accent-blue (instead of light green for variety)
];

const leadsConvertedData: PieDataPoint[] = [
  { name: 'Clutch', value: 1500, percentage: 45, color: '#F06548' },
  { name: 'Behance', value: 1000, percentage: 30, color: '#F7B84B' },
  { name: 'Instagram', value: 500, percentage: 15, color: '#0AB39C' },
  { name: 'Dribbble', value: 350, percentage: 10, color: '#299CDB' },
];

const totalDealsData: PieDataPoint[] = [
  { name: 'Clutch', value: 50000, percentage: 60, color: '#F06548' },
  { name: 'Behance', value: 20000, percentage: 25, color: '#F7B84B' },
  { name: 'Instagram', value: 8000, percentage: 10, color: '#0AB39C' },
  { name: 'Dribbble', value: 4000, percentage: 5, color: '#299CDB' },
];

const dataMap: Record<DataType, PieDataPoint[]> = {
  leadsCame: leadsCameData,
  leadsConverted: leadsConvertedData,
  totalDeals: totalDealsData,
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as PieDataPoint;
    return (
      <div className="bg-card p-2 border border-border rounded-md shadow-lg text-sm">
        <p className="font-semibold text-card-foreground">{`${data.name}`}</p>
        <p className="text-muted-foreground">{`Value: $${data.value.toLocaleString()}`}</p>
        <p className="text-muted-foreground">{`Share: ${data.percentage}%`}</p>
      </div>
    );
  }
  return null;
};

const renderLegend = (props: any) => {
  const { payload } = props;
  return (
    <ul className="mt-4 space-y-2 text-sm">
      {payload.map((entry: any, index: number) => {
        const dataPoint = entry.payload as PieDataPoint; // Access full data point
        return (
          <li key={`item-${index}`} className="flex items-center justify-between">
            <div className="flex items-center">
              <span style={{ backgroundColor: entry.color }} className="w-3 h-3 rounded-sm mr-2"></span>
              <span className="text-prd-primary-text">{entry.value}</span>
            </div>
            <div className="flex items-center space-x-3">
                <span className="text-prd-secondary-text w-16 text-right">${dataPoint.value.toLocaleString()}</span>
                <span className="text-prd-secondary-text w-10 text-right">{dataPoint.percentage}%</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

const PieChartCard: React.FC<{ className?: string }> = ({ className }) => {
  const [activeTab, setActiveTab] = useState<DataType>('leadsConverted');
  const [timeRange, setTimeRange] = useState<string>('6m');

  const chartData = dataMap[activeTab];

  const handleTabChange = useCallback((tab: DataType) => {
    setActiveTab(tab);
  }, []);

  return (
    <Card className={cn(className)}>
      <CardHeader className="flex flex-row items-start justify-between">
        <CardTitle className="text-lg font-semibold text-prd-primary-text">Sources</CardTitle>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px] text-sm text-prd-secondary-text">
            <CalendarDays className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1m">Last month</SelectItem>
            <SelectItem value="6m">Last 6 months</SelectItem>
            <SelectItem value="1y">Last 1 year</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              innerRadius={50} // For donut chart appearance
              fill="#8884d8"
              dataKey="value"
              paddingAngle={2}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <Legend content={renderLegend} payload={chartData.map(item => ({ value: item.name, type: 'square', id: item.name, color: item.color, payload: item }))} />
        <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
            <div className="flex space-x-1">
                <Button 
                    variant={activeTab === 'leadsCame' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => handleTabChange('leadsCame' as const)}
                    className={cn(
                        "text-xs px-3 py-1.5 h-auto rounded-full",
                        activeTab === 'leadsCame' ? 'bg-primary text-primary-foreground' : 'text-prd-secondary-text hover:bg-muted'
                    )}
                >
                    Leads Came
                </Button>
                <Button 
                    variant={activeTab === 'leadsConverted' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => handleTabChange('leadsConverted' as const)}
                    className={cn(
                        "text-xs px-3 py-1.5 h-auto rounded-full",
                        activeTab === 'leadsConverted' ? 'bg-primary text-primary-foreground' : 'text-prd-secondary-text hover:bg-muted'
                    )}
                >
                    Leads Converted
                </Button>
                <Button 
                    variant={activeTab === 'totalDeals' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => handleTabChange('totalDeals' as const)}
                    className={cn(
                        "text-xs px-3 py-1.5 h-auto rounded-full",
                        activeTab === 'totalDeals' ? 'bg-primary text-primary-foreground' : 'text-prd-secondary-text hover:bg-muted'
                    )}
                >
                    Total Deals Size
                </Button>
            </div>
            <TooltipProvider delayDuration={200}>
                <ShadTooltip>
                    <TooltipTrigger asChild>
                        <span className='text-xs text-prd-secondary-text flex items-center cursor-default'>
                            from leads total <Info size={12} className='ml-1'/>
                        </span>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="bg-neutral-800 text-white text-xs p-2 rounded">
                        <p>Data derived from total leads.</p>
                    </TooltipContent>
                </ShadTooltip>
            </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
};

export default PieChartCard;
