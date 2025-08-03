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
    recentTransactions: TableRow[];
    topProducts: Product[];
  };
  map: {
    locations: Location[];
  };
};

export type ChartData = {
  labels: string[];
  data: number[];
};

export type TableRow = {
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

export type Location = {
  latitude: number;
  longitude: number;
  label: string;
  activity: number;
};

export type DashboardApiError = {
  message: string;
  subMessage?: string;
};
