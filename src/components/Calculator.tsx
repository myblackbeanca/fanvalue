import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import InputForm from './InputForm';
import ProjectionsView from './ProjectionsView';

const Calculator: React.FC = () => {
  const [globalParams, setGlobalParams] = useState({
    salePrice: 9.99,
    churnRate: 5
  });

  const [monthlyData, setMonthlyData] = useState(Array(12).fill({
    fans: 0,
    eventsPerMonth: 1,
    ticketPrice: 25,
    merchDropsPerMonth: 1,
    merchPrice: 30
  }));

  const [showProjections, setShowProjections] = useState(false);

  const calculateProjections = () => {
    let projections = [];
    let totalFans = 0;
    let retainedFans = 0;
    let totalChurnedFans = 0;
    let totalConnectedFans = 0;
    const MINY_FEE = 4.99;
    const SUBSCRIPTION_FEE = 4.99;
    const CONVERSION_RATE = 0.5;

    // First year projections
    for (let month = 0; month < 12; month++) {
      const {
        fans: newFans,
        eventsPerMonth,
        ticketPrice,
        merchDropsPerMonth,
        merchPrice,
      } = monthlyData[month];

      totalConnectedFans += newFans;

      // Calculate churn only after first month
      const monthlyChurn = month > 0 ? Math.floor(retainedFans * (globalParams.churnRate / 100)) : 0;
      totalChurnedFans += monthlyChurn;
      retainedFans = retainedFans - monthlyChurn + newFans;
      totalFans = retainedFans;

      // MINY Sales Revenue (artist keeps difference between sale price and MINY fee)
      const minySalesRevenue = Math.round(newFans * (globalParams.salePrice - MINY_FEE));
      const minyFeeRevenue = Math.round(newFans * MINY_FEE);

      // Subscription Revenue (50-50 split, starts from month 2)
      const totalSubscriptionRevenue = month > 0 ? Math.round(retainedFans * SUBSCRIPTION_FEE) : 0;
      const subscriptionRevenue = Math.round(totalSubscriptionRevenue * 0.5);
      const minySubscriptionRevenue = Math.round(totalSubscriptionRevenue * 0.5);

      // Event and Merch Revenue
      const eventRevenue = Math.round(retainedFans * CONVERSION_RATE * eventsPerMonth * ticketPrice);
      const merchRevenue = Math.round(retainedFans * CONVERSION_RATE * merchDropsPerMonth * merchPrice);

      const artistTotalRevenue = minySalesRevenue + subscriptionRevenue + eventRevenue + merchRevenue;
      const minyTotalRevenue = minyFeeRevenue + minySubscriptionRevenue;
      const totalRevenue = artistTotalRevenue + minyTotalRevenue;

      projections.push({
        month: month + 1,
        newFans,
        totalFans,
        retainedFans,
        churnedFans: monthlyChurn,
        totalChurnedFans,
        totalConnectedFans,
        minySalesRevenue,
        minyFeeRevenue,
        subscriptionRevenue,
        minySubscriptionRevenue,
        eventRevenue,
        merchRevenue,
        artistTotalRevenue,
        minyTotalRevenue,
        totalRevenue,
        isPrediction: false
      });
    }

    // Future projections (20% annual growth)
    const yearOneEndFans = totalFans;
    let currentFans = yearOneEndFans;

    for (let month = 12; month < 24; month++) {
      const monthlyGrowthRate = 0.20 / 12;
      const newFans = Math.floor(currentFans * monthlyGrowthRate);
      const monthlyChurn = Math.floor(currentFans * (globalParams.churnRate / 100));
      
      totalConnectedFans += newFans;
      totalChurnedFans += monthlyChurn;
      currentFans = currentFans - monthlyChurn + newFans;

      const {
        eventsPerMonth,
        ticketPrice,
        merchDropsPerMonth,
        merchPrice
      } = monthlyData[0];

      const minySalesRevenue = Math.round(newFans * (globalParams.salePrice - MINY_FEE));
      const minyFeeRevenue = Math.round(newFans * MINY_FEE);

      const totalSubscriptionRevenue = Math.round(currentFans * SUBSCRIPTION_FEE);
      const subscriptionRevenue = Math.round(totalSubscriptionRevenue * 0.5);
      const minySubscriptionRevenue = Math.round(totalSubscriptionRevenue * 0.5);

      const eventRevenue = Math.round(currentFans * CONVERSION_RATE * eventsPerMonth * ticketPrice);
      const merchRevenue = Math.round(currentFans * CONVERSION_RATE * merchDropsPerMonth * merchPrice);

      const artistTotalRevenue = minySalesRevenue + subscriptionRevenue + eventRevenue + merchRevenue;
      const minyTotalRevenue = minyFeeRevenue + minySubscriptionRevenue;
      const totalRevenue = artistTotalRevenue + minyTotalRevenue;

      projections.push({
        month: month + 1,
        newFans,
        totalFans: currentFans,
        retainedFans: currentFans,
        churnedFans: monthlyChurn,
        totalChurnedFans,
        totalConnectedFans,
        minySalesRevenue,
        minyFeeRevenue,
        subscriptionRevenue,
        minySubscriptionRevenue,
        eventRevenue,
        merchRevenue,
        artistTotalRevenue,
        minyTotalRevenue,
        totalRevenue,
        isPrediction: true
      });
    }

    return projections;
  };

  const handleSubmit = () => {
    setShowProjections(true);
  };

  const handleBack = () => {
    setShowProjections(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {!showProjections ? (
          <div className="space-y-8">
            <InputForm
              monthlyData={monthlyData}
              setMonthlyData={setMonthlyData}
              globalParams={globalParams}
              setGlobalParams={setGlobalParams}
            />
            <div className="flex justify-center">
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-medium
                hover:bg-indigo-700 transition-colors duration-200 shadow-lg shadow-indigo-500/30"
              >
                Calculate Projections
              </button>
            </div>
          </div>
        ) : (
          <ProjectionsView
            projections={calculateProjections()}
            onBack={handleBack}
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Calculator;