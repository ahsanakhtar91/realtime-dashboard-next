export type DashboardApiResponse = {
  success: boolean;
  data: {
    dashboardData: DashboardData;
  };
};

type DashboardData = {
  charts: {
    salesOverTime: ChartData;
    userEngagement: ChartData;
  };
  tables: {
    recentTransactions: Transaction[];
    topProducts: Product[];
  };
  map: {
    locations: Location[];
  };
};

type ChartData = {
  labels: string[];
  data: number[];
};

type Transaction = {
  id: number;
  user: string;
  amount: string; // "$176" — string because of currency format
  date: string; // date string
};

type Product = {
  id: string;
  name: string;
  sales: number;
};

type Location = {
  latitude: number;
  longitude: number;
  label: string;
  activity: number;
};
