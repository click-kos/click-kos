"use client";

import { Clock, CheckCircle, XCircle } from "lucide-react";

export default function OrdersPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-6">
      <h1 className="text-3xl font-bold text-[#0E2148] dark:text-white mb-6">My Orders</h1>
      
      <div className="grid gap-6">
        {/* Current Orders */}
        <section className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-[#0E2148] dark:text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#483AA0]" />
            Current Orders
          </h2>
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>Order tracking component to be implemented</p>
            <p className="text-sm mt-2">Features: Real-time status, cancellation, pickup notifications</p>
          </div>
        </section>

        {/* Order History */}
        <section className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-[#0E2148] dark:text-white mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-[#7965C1]" />
            Order History
          </h2>
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>Order history component to be implemented</p>
            <p className="text-sm mt-2">Features: Past orders, reorder, receipts, feedback</p>
          </div>
        </section>
      </div>
    </div>
  );
}