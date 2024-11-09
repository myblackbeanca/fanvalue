import { CalculatorInputs, ProjectionData } from '../types';

const MINY_FIXED_COST = 500;
const ARTIST_FIXED_COST = 300;
const MINY_FEE = 4.99; // Fixed MINY fee per sale
const MONTHLY_EXCLUSIVE_FEE = 4.99;
const TARGET_FANS = 1000;
const SUBSCRIPTION_SPLIT = 0.5; // 50-50 split for subscriptions

export const calculateProjections = (inputs: CalculatorInputs): ProjectionData[] => {
  const projections: ProjectionData[] = [];
  let retainedFans = 0;

  for (let period = 0; period < inputs.monthlyFans.length; period++) {
    const currentMonth = inputs.monthlyFans[period];
    const previousMonth = period > 0 ? inputs.monthlyFans[period - 1] : { fans: 0 };
    const newFans = Math.max(0, currentMonth.fans - previousMonth.fans);
    
    // Calculate churn
    const churnRate = inputs.churnRate / 100;
    const churnedFans = Math.floor(retainedFans * churnRate);
    retainedFans = retainedFans - churnedFans + newFans;
    
    // Calculate MINY sales revenue and splits (only for new fans)
    const saleRevenue = newFans * inputs.salePrice;
    const minyFeeTotal = newFans * MINY_FEE;
    const artistSaleShare = saleRevenue - minyFeeTotal;
    const minySaleShare = minyFeeTotal;

    // Calculate subscription revenue and splits (for retained fans)
    const monthlyExclusiveRevenue = retainedFans * MONTHLY_EXCLUSIVE_FEE;
    const artistExclusiveShare = monthlyExclusiveRevenue * SUBSCRIPTION_SPLIT;
    const minyExclusiveShare = monthlyExclusiveRevenue * SUBSCRIPTION_SPLIT;

    // Calculate event revenue (quarterly events)
    const monthlyEventRevenue = (inputs.eventsPerQuarter * inputs.eventTicketPrice * retainedFans) / 3;
    
    // Calculate merch revenue (quarterly drops)
    const monthlyMerchRevenue = (inputs.merchDropsPerQuarter * inputs.averageMerchPrice * retainedFans) / 3;

    // Calculate total revenue and profits
    const totalRevenue = saleRevenue + monthlyExclusiveRevenue + monthlyEventRevenue + monthlyMerchRevenue;
    const totalArtistRevenue = artistSaleShare + artistExclusiveShare + monthlyEventRevenue + monthlyMerchRevenue;
    const totalMinyRevenue = minySaleShare + minyExclusiveShare;
    
    const minyCosts = MINY_FIXED_COST;
    const artistCosts = ARTIST_FIXED_COST;
    const netRevenue = totalRevenue - minyCosts - artistCosts;
    const cumulativeProfit = period > 0 
      ? projections[period - 1].cumulativeProfit + netRevenue 
      : netRevenue;
    const margin = totalRevenue > 0 ? netRevenue / totalRevenue : 0;
    const reachedTarget = retainedFans >= TARGET_FANS;

    projections.push({
      period: period + 1,
      fans: retainedFans,
      newFans,
      retainedFans,
      churnedFans,
      saleRevenue,
      artistSaleShare,
      minySaleShare,
      monthlyExclusiveRevenue,
      artistExclusiveShare,
      minyExclusiveShare,
      eventRevenue: monthlyEventRevenue,
      merchRevenue: monthlyMerchRevenue,
      totalRevenue,
      totalArtistRevenue,
      totalMinyRevenue,
      minyCosts,
      artistCosts,
      netRevenue,
      cumulativeProfit,
      margin,
      reachedTarget,
    });
  }

  return projections;
};