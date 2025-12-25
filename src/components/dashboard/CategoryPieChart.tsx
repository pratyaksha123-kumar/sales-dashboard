import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface CategoryPieChartProps {
  data: { name: string; value: number; amount: number }[];
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

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card border border-border/50 rounded-xl p-4 shadow-xl backdrop-blur-sm">
        <p className="font-bold text-card-foreground text-base mb-2">{data.name}</p>
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">
            Share: <span className="font-semibold text-primary">{data.value}%</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Amount: <span className="font-semibold text-foreground">{formatCurrency(data.amount)}</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent < 0.1) return null;

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      className="text-xs font-bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomLegend = ({ payload }: any) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      {payload?.map((entry: any, index: number) => (
        <div key={`legend-${index}`} className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-muted-foreground font-medium">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export function CategoryPieChart({ data }: CategoryPieChartProps) {
  return (
    <div className="rounded-xl p-6 animate-fade-in">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-foreground">Sales by Category</h3>
        <p className="text-sm text-muted-foreground">Distribution across product categories</p>
      </div>
      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <defs>
              {COLORS.map((color, index) => (
                <linearGradient key={`gradient-${index}`} id={`pieGradient-${index}`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={1} />
                  <stop offset="100%" stopColor={color} stopOpacity={0.8} />
                </linearGradient>
              ))}
            </defs>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius={120}
              innerRadius={60}
              dataKey="value"
              stroke="none"
              paddingAngle={2}
            >
              {data.map((_, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={`url(#pieGradient-${index % COLORS.length})`}
                  className="transition-all duration-300 hover:opacity-80"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
