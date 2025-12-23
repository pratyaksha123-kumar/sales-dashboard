import { useState, useMemo } from 'react';
import { IndianRupee, ShoppingCart, TrendingUp, BarChart3 } from 'lucide-react';
import { KPICard } from '@/components/dashboard/KPICard';
import { SalesTrendChart } from '@/components/dashboard/SalesTrendChart';
import { CategoryPieChart } from '@/components/dashboard/CategoryPieChart';
import { RegionBarChart } from '@/components/dashboard/RegionBarChart';
import { YearFilter } from '@/components/dashboard/YearFilter';
import { MonthFilter } from '@/components/dashboard/MonthFilter';
import { yearlyData } from '@/data/salesData';

const formatCurrency = (value: number) => {
  if (value >= 1000000) {
    return `₹${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)}L`;
  }
  return `₹${value.toLocaleString('en-IN')}`;
};

const Index = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const data = yearlyData[selectedYear];

  const filteredMonthlyData = useMemo(() => {
    if (selectedMonth === 'all') {
      return data.monthly;
    }
    const monthIndex = parseInt(selectedMonth);
    return data.monthly.filter((_, index) => index === monthIndex);
  }, [data.monthly, selectedMonth]);

  const filteredKpi = useMemo(() => {
    if (selectedMonth === 'all') {
      return data.kpi;
    }
    const monthIndex = parseInt(selectedMonth);
    const monthData = data.monthly[monthIndex];
    const prevMonthData = monthIndex > 0 ? data.monthly[monthIndex - 1] : null;
    
    return {
      totalRevenue: monthData.sales,
      totalOrders: monthData.orders,
      averageOrderValue: monthData.orders > 0 ? Math.round(monthData.sales / monthData.orders) : 0,
      growthPercentage: prevMonthData && prevMonthData.sales > 0 
        ? ((monthData.sales - prevMonthData.sales) / prevMonthData.sales) * 100 
        : 0,
      previousRevenue: prevMonthData?.sales || 0,
      previousOrders: prevMonthData?.orders || 0,
    };
  }, [data.monthly, data.kpi, selectedMonth]);

  const revenueChange = filteredKpi.previousRevenue > 0
    ? ((filteredKpi.totalRevenue - filteredKpi.previousRevenue) / filteredKpi.previousRevenue) * 100
    : 0;
  const ordersChange = filteredKpi.previousOrders > 0
    ? ((filteredKpi.totalOrders - filteredKpi.previousOrders) / filteredKpi.previousOrders) * 100
    : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Sales Dashboard</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Track your business performance and growth
              </p>
            </div>
            <div className="flex items-center gap-4">
              <YearFilter value={selectedYear} onChange={setSelectedYear} />
              <MonthFilter value={selectedMonth} onChange={setSelectedMonth} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Total Revenue"
            value={formatCurrency(filteredKpi.totalRevenue)}
            change={revenueChange}
            icon={IndianRupee}
            iconBgColor="bg-primary/10"
            iconColor="text-primary"
            delay={0}
          />
          <KPICard
            title="Total Orders"
            value={filteredKpi.totalOrders.toLocaleString('en-IN')}
            change={ordersChange}
            icon={ShoppingCart}
            iconBgColor="bg-chart-secondary/10"
            iconColor="text-chart-secondary"
            delay={50}
          />
          <KPICard
            title="Average Order Value"
            value={`₹${filteredKpi.averageOrderValue.toLocaleString('en-IN')}`}
            icon={BarChart3}
            iconBgColor="bg-chart-accent/10"
            iconColor="text-chart-accent"
            delay={100}
          />
          <KPICard
            title="Growth Rate"
            value={`${filteredKpi.growthPercentage.toFixed(1)}%`}
            change={filteredKpi.growthPercentage}
            changeLabel={selectedMonth === 'all' ? 'year over year' : 'vs prev month'}
            icon={TrendingUp}
            iconBgColor="bg-success/10"
            iconColor="text-success"
            delay={150}
          />
        </div>

        {/* Sales Trend Chart */}
        <div className="mb-8">
          <SalesTrendChart data={filteredMonthlyData} />
        </div>

        {/* Bottom Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CategoryPieChart data={data.category} />
          <RegionBarChart data={data.region} />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} Sales Dashboard. Data updated in real-time.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
