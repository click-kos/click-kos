"use client";

import { BarChart, PieChart, TrendingUp, DollarSign, Users, Package } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-6">
      <h1 className="text-3xl font-bold text-[#0E2148] dark:text-white mb-6">Analytics Dashboard</h1>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold text-[#0E2148] dark:text-white">R24,580</p>
            </div>
            <DollarSign className="w-8 h-8 text-[#483AA0]" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Orders</p>
              <p className="text-2xl font-bold text-[#0E2148] dark:text-white">1,247</p>
            </div>
            <Package className="w-8 h-8 text-[#7965C1]" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Users</p>
              <p className="text-2xl font-bold text-[#0E2148] dark:text-white">834</p>
            </div>
            <Users className="w-8 h-8 text-[#483AA0]" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg Order Value</p>
              <p className="text-2xl font-bold text-[#0E2148] dark:text-white">R19.70</p>
            </div>
            <TrendingUp className="w-8 h-8 text-[#7965C1]" />
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-[#0E2148] dark:text-white mb-4 flex items-center gap-2">
            <BarChart className="w-5 h-5 text-[#483AA0]" />
            Sales Trends
          </h2>
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <p>Sales chart component to be implemented</p>
            <p className="text-sm mt-2">Features: Daily/weekly/monthly trends, revenue analysis</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-[#0E2148] dark:text-white mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-[#7965C1]" />
            Popular Items
          </h2>
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <p>Popular items chart to be implemented</p>
            <p className="text-sm mt-2">Features: Best sellers, category breakdown, profit analysis</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-[#0E2148] dark:text-white mb-4">Peak Hours Analysis</h2>
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <p>Peak hours component to be implemented</p>
            <p className="text-sm mt-2">Features: Hourly order patterns, staff scheduling insights</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-[#0E2148] dark:text-white mb-4">Staff Performance</h2>
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <p>Staff performance metrics to be implemented</p>
            <p className="text-sm mt-2">Features: Order completion times, efficiency ratings</p>
          </div>
        </div>
      </div>
    </div>
  );
}