import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface RegionBarChartProps {
  data: { region: string; sales: number; orders: number }[];
}

const formatCurrency = (value: number) => {
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)}L`;
  }
  return `₹${(value / 1000).toFixed(0)}K`;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="font-semibold text-card-foreground mb-2">{label} Region</p>
        <div className="space-y-1">
          <p className="text-sm">
            <span className="text-muted-foreground">Sales: </span>
            <span className="font-medium text-primary">
              {formatCurrency(payload[0].value)}
            </span>
          </p>
          <p className="text-sm">
            <span className="text-muted-foreground">Orders: </span>
            <span className="font-medium">{payload[0].payload.orders}</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export function RegionBarChart({ data }: RegionBarChartProps) {
  return (
    <div className="bg-card rounded-lg p-6 card-shadow animate-fade-in" style={{ animationDelay: '400ms' }}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">Sales by Region</h3>
        <p className="text-sm text-muted-foreground">Regional performance comparison</p>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" vertical={false} />
            <XAxis
              dataKey="region"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(220, 9%, 46%)', fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(220, 9%, 46%)', fontSize: 12 }}
              tickFormatter={formatCurrency}
              dx={-10}
              width={60}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(220, 14%, 96%)' }} />
            <Bar
              dataKey="sales"
              fill="hsl(239, 84%, 67%)"
              radius={[6, 6, 0, 0]}
              maxBarSize={60}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
