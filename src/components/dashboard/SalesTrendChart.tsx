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
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="font-semibold text-card-foreground mb-2">{label}</p>
        <div className="space-y-1">
          <p className="text-sm">
            <span className="text-muted-foreground">Sales: </span>
            <span className="font-medium text-primary">
              {formatCurrency(payload[0].value)}
            </span>
          </p>
          <p className="text-sm">
            <span className="text-muted-foreground">Orders: </span>
            <span className="font-medium">{payload[1]?.payload?.orders || 0}</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export function SalesTrendChart({ data }: SalesTrendChartProps) {
  // Filter out months with 0 sales for current year (2025)
  const filteredData = data.filter((item) => item.sales > 0);

  return (
    <div className="bg-card rounded-lg p-6 card-shadow animate-fade-in" style={{ animationDelay: '200ms' }}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-card-foreground">Monthly Sales Trend</h3>
        <p className="text-sm text-muted-foreground">Revenue performance over time</p>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={filteredData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(239, 84%, 67%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(239, 84%, 67%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" vertical={false} />
            <XAxis
              dataKey="month"
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
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="hsl(239, 84%, 67%)"
              strokeWidth={2}
              fill="url(#salesGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
