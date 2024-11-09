export interface MonthlyFans {
  month: number;
  fans: number;
}

export interface CalculatorInputs {
  monthlyFans: MonthlyFans[];
  salePrice: number;
  eventsPerQuarter: number;
  eventTicketPrice: number;
  merchDropsPerQuarter: number;
  averageMerchPrice: number;
}

export interface ProjectionData {
  period: number;
  fans: number;
  newFans: number;
  saleRevenue: number;
  artistSaleShare: number;
  minySaleShare: number;
  monthlyExclusiveRevenue: number;
  artistExclusiveShare: number;
  minyExclusiveShare: number;
  eventRevenue: number;
  merchRevenue: number;
  totalRevenue: number;
  totalArtistRevenue: number;
  totalMinyRevenue: number;
  minyCosts: number;
  artistCosts: number;
  netRevenue: number;
  cumulativeProfit: number;
  margin: number;
  reachedTarget: boolean;
}

export type RevenueType = 'sales' | 'subscription' | 'other';