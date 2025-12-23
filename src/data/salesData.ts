// Realistic sales data for the dashboard

export const kpiData = {
  totalRevenue: 2850000, // ₹28.5L
  totalOrders: 3247,
  averageOrderValue: 878,
  growthPercentage: 18.5,
  previousRevenue: 2405000,
  previousOrders: 2891,
};

export const monthlySalesData = [
  { month: 'Jan', sales: 185000, orders: 210 },
  { month: 'Feb', sales: 195000, orders: 225 },
  { month: 'Mar', sales: 230000, orders: 268 },
  { month: 'Apr', sales: 245000, orders: 285 },
  { month: 'May', sales: 260000, orders: 302 },
  { month: 'Jun', sales: 235000, orders: 275 },
  { month: 'Jul', sales: 275000, orders: 318 },
  { month: 'Aug', sales: 290000, orders: 335 },
  { month: 'Sep', sales: 310000, orders: 358 },
  { month: 'Oct', sales: 285000, orders: 328 },
  { month: 'Nov', sales: 320000, orders: 370 },
  { month: 'Dec', sales: 340000, orders: 393 },
];

export const categoryData = [
  { name: 'Electronics', value: 35, amount: 997500 },
  { name: 'Fashion', value: 28, amount: 798000 },
  { name: 'Grocery', value: 22, amount: 627000 },
  { name: 'Others', value: 15, amount: 427500 },
];

export const regionData = [
  { region: 'North', sales: 820000, orders: 945 },
  { region: 'South', sales: 750000, orders: 865 },
  { region: 'East', sales: 680000, orders: 782 },
  { region: 'West', sales: 600000, orders: 655 },
];

export const yearlyData: Record<string, {
  kpi: typeof kpiData;
  monthly: typeof monthlySalesData;
  category: typeof categoryData;
  region: typeof regionData;
}> = {
  '2023': {
    kpi: {
      totalRevenue: 2150000,
      totalOrders: 2456,
      averageOrderValue: 875,
      growthPercentage: 12.3,
      previousRevenue: 1915000,
      previousOrders: 2198,
    },
    monthly: [
      { month: 'Jan', sales: 145000, orders: 165 },
      { month: 'Feb', sales: 155000, orders: 178 },
      { month: 'Mar', sales: 170000, orders: 195 },
      { month: 'Apr', sales: 185000, orders: 212 },
      { month: 'May', sales: 175000, orders: 200 },
      { month: 'Jun', sales: 190000, orders: 218 },
      { month: 'Jul', sales: 195000, orders: 224 },
      { month: 'Aug', sales: 185000, orders: 212 },
      { month: 'Sep', sales: 200000, orders: 229 },
      { month: 'Oct', sales: 175000, orders: 200 },
      { month: 'Nov', sales: 185000, orders: 212 },
      { month: 'Dec', sales: 190000, orders: 218 },
    ],
    category: [
      { name: 'Electronics', value: 32, amount: 688000 },
      { name: 'Fashion', value: 30, amount: 645000 },
      { name: 'Grocery', value: 24, amount: 516000 },
      { name: 'Others', value: 14, amount: 301000 },
    ],
    region: [
      { region: 'North', sales: 620000, orders: 708 },
      { region: 'South', sales: 560000, orders: 640 },
      { region: 'East', sales: 520000, orders: 594 },
      { region: 'West', sales: 450000, orders: 514 },
    ],
  },
  '2024': {
    kpi: kpiData,
    monthly: monthlySalesData,
    category: categoryData,
    region: regionData,
  },
  '2025': {
    kpi: {
      totalRevenue: 3450000,
      totalOrders: 3892,
      averageOrderValue: 886,
      growthPercentage: 21.1,
      previousRevenue: 2850000,
      previousOrders: 3247,
    },
    monthly: [
      { month: 'Jan', sales: 295000, orders: 332 },
      { month: 'Feb', sales: 310000, orders: 349 },
      { month: 'Mar', sales: 340000, orders: 383 },
      { month: 'Apr', sales: 355000, orders: 400 },
      { month: 'May', sales: 375000, orders: 422 },
      { month: 'Jun', sales: 360000, orders: 405 },
      { month: 'Jul', sales: 385000, orders: 434 },
      { month: 'Aug', sales: 400000, orders: 450 },
      { month: 'Sep', sales: 420000, orders: 473 },
      { month: 'Oct', sales: 395000, orders: 445 },
      { month: 'Nov', sales: 430000, orders: 484 },
      { month: 'Dec', sales: 455000, orders: 512 },
    ],
    category: [
      { name: 'Electronics', value: 38, amount: 1311000 },
      { name: 'Fashion', value: 26, amount: 897000 },
      { name: 'Grocery', value: 21, amount: 724500 },
      { name: 'Others', value: 15, amount: 517500 },
    ],
    region: [
      { region: 'North', sales: 990000, orders: 1117 },
      { region: 'South', sales: 900000, orders: 1015 },
      { region: 'East', sales: 830000, orders: 936 },
      { region: 'West', sales: 730000, orders: 824 },
    ],
  },
  '2026': {
    kpi: {
      totalRevenue: 4180000,
      totalOrders: 4625,
      averageOrderValue: 904,
      growthPercentage: 24.8,
      previousRevenue: 3450000,
      previousOrders: 3892,
    },
    monthly: [
      { month: 'Jan', sales: 358000, orders: 396 },
      { month: 'Feb', sales: 375000, orders: 415 },
      { month: 'Mar', sales: 410000, orders: 454 },
      { month: 'Apr', sales: 425000, orders: 470 },
      { month: 'May', sales: 448000, orders: 495 },
      { month: 'Jun', sales: 430000, orders: 476 },
      { month: 'Jul', sales: 0, orders: 0 },
      { month: 'Aug', sales: 0, orders: 0 },
      { month: 'Sep', sales: 0, orders: 0 },
      { month: 'Oct', sales: 0, orders: 0 },
      { month: 'Nov', sales: 0, orders: 0 },
      { month: 'Dec', sales: 0, orders: 0 },
    ],
    category: [
      { name: 'Electronics', value: 40, amount: 1672000 },
      { name: 'Fashion', value: 25, amount: 1045000 },
      { name: 'Grocery', value: 20, amount: 836000 },
      { name: 'Others', value: 15, amount: 627000 },
    ],
    region: [
      { region: 'North', sales: 1195000, orders: 1322 },
      { region: 'South', sales: 1085000, orders: 1200 },
      { region: 'East', sales: 1005000, orders: 1112 },
      { region: 'West', sales: 895000, orders: 991 },
    ],
  },
};
