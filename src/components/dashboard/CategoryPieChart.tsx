import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface CategoryPieChartProps {
  data: { name: string; value: number; amount: number }[];
}

const COLORS = [
  'hsl(239, 84%, 67%)',
  'hsl(262, 83%, 58%)',
  'hsl(142, 76%, 36%)',
  'hsl(38, 92%, 50%)',
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
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="font-semibold text-card-foreground">{data.name}</p>
        <p className="text-sm text-muted-foreground">
          Share: <span className="font-medium text-primary">{data.value}%</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Amount: <span className="font-medium">{formatCurrency(data.amount)}</span>
        </p>
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
      className="text-xs font-medium"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export function CategoryPieChart({ data }: CategoryPieChartProps) {
  return (
    <div className="bg-card rounded-lg p-6 card-shadow animate-fade-in" style={{ animationDelay: '300ms' }}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">Sales by Category</h3>
        <p className="text-sm text-muted-foreground">Distribution across product categories</p>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius={90}
              innerRadius={45}
              dataKey="value"
              stroke="none"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => (
                <span className="text-sm text-muted-foreground">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
