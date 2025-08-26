"use client";

import { Search, Filter, ShoppingCart } from "lucide-react";

export default function MenuPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-[#0E2148] dark:text-white">Menu</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search menu items..."
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#483AA0] focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#483AA0] text-white rounded-lg hover:bg-[#0E2148] transition-colors">
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#7965C1] text-white rounded-lg hover:bg-[#483AA0] transition-colors">
            <ShoppingCart className="w-4 h-4" />
            Cart (0)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Filters */}
        <div className="md:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <h2 className="font-semibold mb-4 text-[#0E2148] dark:text-white">Categories</h2>
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p className="text-sm">Filter component to be implemented</p>
            </div>
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="md:col-span-3">
          <div className="text-center py-16 text-gray-500 dark:text-gray-400">
            <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">Menu browser component to be implemented</p>
            <p className="text-sm mt-2">Features: Item grid, categories, search, add to cart, dietary filters</p>
          </div>
        </div>
      </div>
    </div>
  );
}