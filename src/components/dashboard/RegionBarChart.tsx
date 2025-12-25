import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface RegionBarChartProps {
  data: { region: string; sales: number; orders: number }[];
}

const COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--chart-secondary))',
  'hsl(var(--chart-success))',
  'hsl(var(--chart-warning))',
];

const formatCurrency = (value: number) => {
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)}L`;
  }
  return `₹${(value / 1000).toFixed(0)}K`;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border/50 rounded-xl p-4 shadow-xl backdrop-blur-sm">
        <p className="font-bold text-card-foreground mb-3 text-base">{label} Region</p>
        <div className="space-y-2">
          <p className="text-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            <span className="text-muted-foreground">Sales: </span>
            <span className="font-semibold text-primary">
              {formatCurrency(payload[0].value)}
            </span>
          </p>
          <p className="text-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-chart-secondary"></span>
            <span className="text-muted-foreground">Orders: </span>
            <span className="font-semibold text-foreground">{payload[0].payload.orders}</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export function RegionBarChart({ data }: RegionBarChartProps) {
  return (
    <div className="rounded-xl p-6 animate-fade-in">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-foreground">Sales by Region</h3>
        <p className="text-sm text-muted-foreground">Regional performance comparison</p>
      </div>
      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              {COLORS.map((color, index) => (
                <linearGradient key={`barGradient-${index}`} id={`barGradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={1} />
                  <stop offset="100%" stopColor={color} stopOpacity={0.7} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} vertical={false} />
            <XAxis
              dataKey="region"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 500 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              tickFormatter={formatCurrency}
              dx={-10}
              width={65}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted))', opacity: 0.3 }} />
            <Bar
              dataKey="sales"
              radius={[8, 8, 0, 0]}
              maxBarSize={80}
            >
              {data.map((_, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={`url(#barGradient-${index % COLORS.length})`}
                  className="transition-all duration-300 hover:opacity-80"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
