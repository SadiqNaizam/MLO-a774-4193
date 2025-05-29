import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
} from 'recharts';
import { CalendarDays } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GraphDataPoint {
  month: string;
  closedWon: number;
  closedLost: number;
}

const initialGraphData: GraphDataPoint[] = [
  { month: 'Jan', closedWon: 65, closedLost: 42 },
  { month: 'Feb', closedWon: 59, closedLost: 38 },
  { month: 'Mar', closedWon: 80, closedLost: 20 },
  { month: 'Apr', closedWon: 30, closedLost: 35 },
  { month: 'May', closedWon: 95, closedLost: 65 },
  { month: 'Jun', closedWon: 55, closedLost: 10 },
  { month: 'Jul', closedWon: 40, closedLost: 45 },
  { month: 'Aug', closedWon: 70, closedLost: 90 },
];

const sixMonthsGraphData: GraphDataPoint[] = [
  { month: 'Mar', closedWon: 80, closedLost: 20 },
  { month: 'Apr', closedWon: 30, closedLost: 35 },
  { month: 'May', closedWon: 95, closedLost: 65 },
  { month: 'Jun', closedWon: 55, closedLost: 10 },
  { month: 'Jul', closedWon: 40, closedLost: 45 },
  { month: 'Aug', closedWon: 70, closedLost: 90 },
];

const yearlyGraphData: GraphDataPoint[] = [
  { month: 'Jan', closedWon: 165, closedLost: 142 },
  { month: 'Feb', closedWon: 159, closedLost: 138 },
  { month: 'Mar', closedWon: 180, closedLost: 120 },
  { month: 'Apr', closedWon: 130, closedLost: 135 },
  { month: 'May', closedWon: 195, closedLost: 165 },
  { month: 'Jun', closedWon: 155, closedLost: 110 },
  { month: 'Jul', closedWon: 140, closedLost: 145 },
  { month: 'Aug', closedWon: 170, closedLost: 190 },
  { month: 'Sep', closedWon: 160, closedLost: 175 },
  { month: 'Oct', closedWon: 185, closedLost: 150 },
  { month: 'Nov', closedWon: 175, closedLost: 160 },
  { month: 'Dec', closedWon: 200, closedLost: 180 },
];

const GraphCard: React.FC<{ className?: string }> = ({ className }) => {
  const [timeRange, setTimeRange] = useState<'6m' | '1y' | 'all'>('6m');
  const [chartData, setChartData] = useState<GraphDataPoint[]>(sixMonthsGraphData);

  const handleTimeRangeChange = (value: string) => {
    const newTimeRange = value as '6m' | '1y' | 'all';
    setTimeRange(newTimeRange);
    if (newTimeRange === '6m') setChartData(sixMonthsGraphData);
    else if (newTimeRange === '1y') setChartData(yearlyGraphData);
    else setChartData(initialGraphData); // 'all' or default
  };

  return (
    <Card className={cn(className)}>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-lg font-semibold text-prd-primary-text">Leads tracking</CardTitle>
          <div className="mt-1 space-x-4">
            <span className="text-2xl font-bold text-prd-primary-text">680</span>
            <span className="text-sm text-prd-secondary-text">total closed</span>
            <span className="text-2xl font-bold text-prd-primary-text ml-4">70</span>
            <span className="text-sm text-prd-secondary-text">total lost</span>
          </div>
        </div>
        <Select value={timeRange} onValueChange={handleTimeRangeChange}>
          <SelectTrigger className="w-[180px] text-sm text-prd-secondary-text">
            <CalendarDays className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="6m">Last 6 months</SelectItem>
            <SelectItem value="1y">Last 1 year</SelectItem>
            <SelectItem value="all">All time</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} stroke="hsl(var(--border))" />
            <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} stroke="hsl(var(--border))" />
            <Tooltip
              contentStyle={{ 
                backgroundColor: 'hsl(var(--card))', 
                borderColor: 'hsl(var(--border))',
                borderRadius: 'var(--radius)',
              }}
              labelStyle={{ color: 'hsl(var(--card-foreground))' }}
            />
            <Legend 
              iconType="square" 
              iconSize={10}
              wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }}
              formatter={(value) => <span className="text-prd-secondary-text">{value}</span>}
            />
            <defs>
              <linearGradient id="colorClosedWon" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0AB39C" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#0AB39C" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorClosedLost" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F06548" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#F06548" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Line type="monotone" dataKey="closedWon" name="Closed won" stroke="#0AB39C" strokeWidth={2.5} dot={{ r: 4, fill: '#0AB39C', strokeWidth:0 }} activeDot={{ r: 6, fill: '#0AB39C', strokeWidth: 0 }} />
            <Area type="monotone" dataKey="closedWon" stroke="none" fillOpacity={1} fill="url(#colorClosedWon)" />
            <Line type="monotone" dataKey="closedLost" name="Closed lost" stroke="#F06548" strokeWidth={2.5} dot={{ r: 4, fill: '#F06548', strokeWidth:0 }} activeDot={{ r: 6, fill: '#F06548', strokeWidth: 0 }} />
            <Area type="monotone" dataKey="closedLost" stroke="none" fillOpacity={1} fill="url(#colorClosedLost)" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default GraphCard;
