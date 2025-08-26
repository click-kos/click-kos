"use client";

import { Package, Users, Clock, TrendingUp } from "lucide-react";

export default function StaffDashboard() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-6">
      <h1 className="text-3xl font-bold text-[#0E2148] dark:text-white mb-6">Staff Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Order Queue */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-[#0E2148] dark:text-white mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-[#483AA0]" />
              Order Queue
            </h2>
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Order queue component to be implemented</p>
              <p className="text-sm mt-2">Features: FIFO queue, assign orders, update status, completion tracking</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-[#0E2148] to-[#483AA0] text-white rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Pending Orders</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <Clock className="w-8 h-8 opacity-75" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-[#483AA0] to-[#7965C1] text-white rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Active Staff</p>
                <p className="text-2xl font-bold">4</p>
              </div>
              <Users className="w-8 h-8 opacity-75" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-[#7965C1] to-[#483AA0] text-white rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Avg Wait Time</p>
                <p className="text-2xl font-bold">12min</p>
              </div>
              <TrendingUp className="w-8 h-8 opacity-75" />
            </div>
          </div>
        </div>
      </div>

      {/* Menu Management Quick Access */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-[#0E2148] dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-[#483AA0] transition-colors text-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Update Menu Item</span>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-[#483AA0] transition-colors text-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Mark Item Unavailable</span>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-[#483AA0] transition-colors text-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">View Reports</span>
          </button>
        </div>
      </div>
    </div>
  );
}