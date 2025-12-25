import { useState, useMemo } from 'react';
import { IndianRupee, ShoppingCart, TrendingUp, BarChart3, PieChart, BarChart2, LineChart } from 'lucide-react';
import { KPICard } from '@/components/dashboard/KPICard';
import { SalesTrendChart } from '@/components/dashboard/SalesTrendChart';
import { CategoryPieChart } from '@/components/dashboard/CategoryPieChart';
import { RegionBarChart } from '@/components/dashboard/RegionBarChart';
import { YearFilter } from '@/components/dashboard/YearFilter';
import { MonthFilter } from '@/components/dashboard/MonthFilter';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/90 backdrop-blur-xl border-b border-border/40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary via-primary/90 to-chart-secondary flex items-center justify-center shadow-lg shadow-primary/30">
                <BarChart3 className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground tracking-tight">Sales Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  Track your business performance and growth
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <YearFilter value={selectedYear} onChange={setSelectedYear} />
              <MonthFilter value={selectedMonth} onChange={setSelectedMonth} />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <KPICard
            title="Total Revenue"
            value={formatCurrency(filteredKpi.totalRevenue)}
            change={revenueChange}
            icon={IndianRupee}
            iconBgColor="bg-primary/15"
            iconColor="text-primary"
            delay={0}
          />
          <KPICard
            title="Total Orders"
            value={filteredKpi.totalOrders.toLocaleString('en-IN')}
            change={ordersChange}
            icon={ShoppingCart}
            iconBgColor="bg-chart-secondary/15"
            iconColor="text-chart-secondary"
            delay={50}
          />
          <KPICard
            title="Average Order Value"
            value={`₹${filteredKpi.averageOrderValue.toLocaleString('en-IN')}`}
            icon={BarChart3}
            iconBgColor="bg-chart-accent/15"
            iconColor="text-chart-accent"
            delay={100}
          />
          <KPICard
            title="Growth Rate"
            value={`${filteredKpi.growthPercentage.toFixed(1)}%`}
            change={filteredKpi.growthPercentage}
            changeLabel={selectedMonth === 'all' ? 'year over year' : 'vs prev month'}
            icon={TrendingUp}
            iconBgColor="bg-success/15"
            iconColor="text-success"
            delay={150}
          />
        </div>

        {/* Tabbed Charts Section */}
        <Card className="border-border/40 bg-card/60 backdrop-blur-md shadow-xl">
          <CardHeader className="pb-4 border-b border-border/30">
            <CardTitle className="text-xl font-bold text-foreground">Analytics Overview</CardTitle>
            <CardDescription className="text-muted-foreground">
              Comprehensive view of your sales performance and distribution
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Tabs defaultValue="trend" className="w-full">
              <TabsList className="grid w-full max-w-lg grid-cols-3 mb-8 bg-muted/50 p-1 rounded-xl">
                <TabsTrigger 
                  value="trend" 
                  className="flex items-center gap-2 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-md data-[state=active]:text-primary transition-all duration-300"
                >
                  <LineChart className="h-4 w-4" />
                  <span className="hidden sm:inline">Monthly Trend</span>
                  <span className="sm:hidden">Trend</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="category" 
                  className="flex items-center gap-2 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-md data-[state=active]:text-primary transition-all duration-300"
                >
                  <PieChart className="h-4 w-4" />
                  <span className="hidden sm:inline">By Category</span>
                  <span className="sm:hidden">Category</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="region" 
                  className="flex items-center gap-2 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-md data-[state=active]:text-primary transition-all duration-300"
                >
                  <BarChart2 className="h-4 w-4" />
                  <span className="hidden sm:inline">By Region</span>
                  <span className="sm:hidden">Region</span>
                </TabsTrigger>
              </TabsList>
              <div className="relative">
                <TabsContent value="trend" className="mt-0 data-[state=active]:animate-fade-in">
                  <SalesTrendChart data={filteredMonthlyData} />
                </TabsContent>
                <TabsContent value="category" className="mt-0 data-[state=active]:animate-fade-in">
                  <CategoryPieChart data={data.category} />
                </TabsContent>
                <TabsContent value="region" className="mt-0 data-[state=active]:animate-fade-in">
                  <RegionBarChart data={data.region} />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/40 backdrop-blur-md mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-sm text-muted-foreground text-center">
            © 2025 Sales Dashboard. Data updated in real-time.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
