import React from 'react';
import { Disc3 } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header>
      <div className="glass-card border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Disc3 className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                MINY
              </h1>
            </div>
            <a
              href="https://drop.minyvinyl.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-xl 
              text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 
              shadow-lg shadow-indigo-500/30 transition-all duration-200 hover:scale-105"
            >
              Drop a MINY
            </a>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div 
        className="bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80")'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            MINY Artist Revenue Estimator
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-12">
            Plan your journey to 1,000 true fans with our comprehensive revenue calculator. 
            Understand your potential earnings from MINY sales, exclusive subscriptions, 
            events, and merchandise - all in one place.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="glass-card bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Multiple Revenue Streams</h3>
              <p className="text-gray-200">Track income from MINY sales, subscriptions, events, and merch</p>
            </div>
            <div className="glass-card bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">12-Month Projection</h3>
              <p className="text-gray-200">Plan your growth month by month with detailed forecasts</p>
            </div>
            <div className="glass-card bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Revenue Breakdown</h3>
              <p className="text-gray-200">See exactly how much you'll earn from each revenue stream</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;