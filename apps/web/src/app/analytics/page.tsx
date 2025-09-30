"use client";

import { useEffect, useState } from "react";
import { BarChart, PieChart, DollarSign, Users, Package, TrendingUp } from "lucide-react";
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

// Hardcoded data for testing other charts
const salesData = [
  { name: "Mon", revenue: 6000 },
  { name: "Tue", revenue: 7500 },
  { name: "Wed", revenue: 5000 },
  { name: "Thu", revenue: 10000 },
  { name: "Fri", revenue: 15500 },
  { name: "Sat", revenue: 4000 },
];

const peakHours = [
  { hour: "9AM", orders: 20 },
  { hour: "12PM", orders: 200 },
  { hour: "3PM", orders: 80 },
  { hour: "6PM", orders: 150 },
  { hour: "9PM", orders: 40 },
];

const COLORS = ["#483AA0", "#7965C1", "#A499D9", "#C1BAF5"];

export default function AnalyticsPage() {
  const [popularItems, setPopularItems] = useState<any[]>([]);
  const [loadingItems, setLoadingItems] = useState(true);

  useEffect(() => {
    const fetchPopularItems = async () => {
      try {
        // 1️⃣ Replace "access_token" with whatever key you see in your localStorage
        const token = localStorage.getItem("access_token"); 
        if (!token) {
          console.error("No access token found. Please log in first.");
          setLoadingItems(false);
          return;
        }

        // 2️⃣ Set headers with Bearer token
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");

        // 3️⃣ Fetch from backend API
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/analytics/items`, {
          method: "GET",
          headers: myHeaders,
        });

        const json = await res.json();
        console.log("Popular Items API response:", json);

        // 4️⃣ Format data safely
        const itemsArray = Array.isArray(json.data) ? json.data : [];
        const formattedItems = itemsArray.map((item: any) => ({
          name: item.item_id || "Unknown",
          value: item.count || 0
        }));

        setPopularItems(formattedItems);
      } catch (err) {
        console.error("Error fetching popular items:", err);
        setPopularItems([]);
      } finally {
        setLoadingItems(false);
      }
    };

    fetchPopularItems();
  }, []);

  return (
    <div className="container mx-auto max-w-6xl px-4 py-6">
      <h1 className="text-3xl font-bold text-[#0E2148] dark:text-white mb-6">Analytics Dashboard</h1>

      {/* KPI Cards - hardcoded */}
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
        {/* Sales Trends chart - hardcoded */}
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

        {/* Popular Items chart - dynamic */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-[#0E2148] dark:text-white mb-4 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-[#7965C1]" />
            Popular Items
          </h2>

          {loadingItems ? (
            <p className="text-center">Loading popular items...</p>
          ) : popularItems.length === 0 ? (
            <p className="text-center text-red-500">No popular items data found</p>
          ) : (
            <ResponsiveContainer width="100%" height={350}>
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
                <Legend />
              </RePieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Peak Hours chart - hardcoded */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 lg:col-start-1">
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
      </div>
    </div>
  );
}
