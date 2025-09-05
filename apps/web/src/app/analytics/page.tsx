"use client";

import { BarChart, PieChart, TrendingUp, DollarSign, Users, Package } from "lucide-react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Bar,
  BarChart as ReBarChart,
  Pie,
  PieChart as RePieChart,
  Cell,
  Legend
} from "recharts";

// Example mock data – replace later with real API data
const salesData = [
  { name: "Mon", revenue: 400 },
  { name: "Tue", revenue: 300 },
  { name: "Wed", revenue: 500 },
  { name: "Thu", revenue: 200 },
  { name: "Fri", revenue: 600 },
  { name: "Sat", revenue: 800 },
  { name: "Sun", revenue: 700 },
];

const popularItems = [
  { name: "Burger", value: 40 },
  { name: "Pizza", value: 30 },
  { name: "Drinks", value: 20 },
  { name: "Desserts", value: 10 },
];

const peakHours = [
  { hour: "9AM", orders: 20 },
  { hour: "12PM", orders: 45 },
  { hour: "3PM", orders: 30 },
  { hour: "6PM", orders: 70 },
  { hour: "9PM", orders: 40 },
];
const staffPerformance = [
  { name: "Alice", efficiency: 85, orders: 120 },
  { name: "Bob", efficiency: 72, orders: 95 },
  { name: "Carla", efficiency: 90, orders: 140 },
  { name: "David", efficiency: 60, orders: 80 },
];

const COLORS = ["#483AA0", "#7965C1", "#A499D9", "#C1BAF5"];


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
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesData}>
              <Line type="monotone" dataKey="revenue" stroke="#483AA0" strokeWidth={2} />
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-[#0E2148] dark:text-white mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-[#7965C1]" />
            Popular Items
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <RePieChart>
              <Pie
                data={popularItems}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                fill="#483AA0"
                label
              >
                {popularItems.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </RePieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-[#0E2148] dark:text-white mb-4">Peak Hours Analysis</h2>
          <ResponsiveContainer width="100%" height={250}>
            <ReBarChart data={peakHours}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#7965C1" />
            </ReBarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-[#0E2148] dark:text-white mb-4">Staff Performance</h2>
          <ResponsiveContainer width="100%" height={250}>
            <ReBarChart data={staffPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="orders" fill="#483AA0" name="Orders Completed" />
              <Bar dataKey="efficiency" fill="#7965C1" name="Efficiency (%)" />
            </ReBarChart>
          </ResponsiveContainer>

        </div>
      </div>
    </div>
  );
}