import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface SalesTrendChartProps {
  data: { month: string; sales: number; orders: number }[];
}

const formatCurrency = (value: number) => {
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)}L`;
  }
  if (value >= 1000) {
    return `₹${(value / 1000).toFixed(0)}K`;
  }
  return `₹${value}`;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border/50 rounded-xl p-4 shadow-xl backdrop-blur-sm">
        <p className="font-bold text-card-foreground mb-3 text-base">{label}</p>
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
            <span className="font-semibold text-foreground">{payload[0]?.payload?.orders || 0}</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export function SalesTrendChart({ data }: SalesTrendChartProps) {
  const filteredData = data.filter((item) => item.sales > 0);

  return (
    <div className="rounded-xl p-6 animate-fade-in">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-foreground">Monthly Sales Trend</h3>
        <p className="text-sm text-muted-foreground">Revenue performance over time</p>
      </div>
      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={filteredData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity={0.15} />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--chart-secondary))" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
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
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="url(#lineGradient)"
              strokeWidth={3}
              fill="url(#salesGradient)"
              dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, stroke: 'hsl(var(--card))', r: 4 }}
              activeDot={{ fill: 'hsl(var(--primary))', strokeWidth: 3, stroke: 'hsl(var(--card))', r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
