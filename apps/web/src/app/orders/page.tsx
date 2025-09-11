"use client";

import { useState } from "react";
import { Clock, CheckCircle, XCircle, RefreshCcw } from "lucide-react";

const currentOrders = [
  {
    id: "ORD12345",
    item: "Bunny Chow",
    price: 45.0,
    status: "Preparing",
    eta: "15 min",
    date: "2025-09-05",
  },
  {
    id: "ORD12346",
    item: "Boerewors Roll",
    price: 32.0,
    status: "Out for Delivery",
    eta: "5 min",
    date: "2025-09-05",
  },
];

const pastOrders = [
  {
    id: "ORD12340",
    item: "Gatsby",
    price: 58.0,
    status: "Delivered",
    date: "2025-09-01",
  },
  {
    id: "ORD12341",
    item: "Bobotie",
    price: 52.0,
    status: "Delivered",
    date: "2025-08-29",
  },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState(currentOrders);
  const [history, setHistory] = useState(pastOrders);

  const cancelOrder = (id: string) => {
  setOrders((prev) => {
    const orderToCancel = prev.find((order) => order.id === id);
    if (!orderToCancel) return prev; // safety check

      // Push it into history as cancelled
      setHistory((historyPrev) => [
        {
          ...orderToCancel,
          status: "Cancelled",
          date: new Date().toISOString().split("T")[0],
        },
        ...historyPrev,
      ]);

      // Remove it from current orders
      return prev.filter((order) => order.id !== id);
    });
  };


  const reorder = (order: typeof pastOrders[0]) => {
    setOrders((prev) => [
      ...prev,
      { ...order, id: "ORD" + Math.floor(Math.random() * 100000), status: "Preparing", eta: "20 min" },
    ]);
  };

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
          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 border rounded-lg dark:border-gray-700 bg-gray-50 dark:bg-gray-700"
                >
                  <div>
                    <p className="font-semibold text-[#0E2148] dark:text-white">{order.item}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Status: <span className="font-medium">{order.status}</span> • ETA: {order.eta}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-[#483AA0]">R{order.price.toFixed(2)}</span>
                    <button
                      onClick={() => cancelOrder(order.id)}
                      className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                    >
                      <XCircle className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p>No current orders</p>
            </div>
          )}
        </section>

        {/* Order History */}
        <section className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-[#0E2148] dark:text-white mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-[#7965C1]" />
            Order History
          </h2>
          {history.length > 0 ? (
            <div className="space-y-4">
              {history.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 border rounded-lg dark:border-gray-700 bg-gray-50 dark:bg-gray-700"
                >
                  <div>
                    <p className="font-semibold text-[#0E2148] dark:text-white">{order.item}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {order.status} • {order.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-[#483AA0]">R{order.price.toFixed(2)}</span>
                    <button
                      onClick={() => reorder(order)}
                      className="flex items-center gap-1 px-3 py-1 bg-[#483AA0] text-white rounded-lg hover:bg-[#0E2148] transition"
                    >
                      <RefreshCcw className="w-4 h-4" />
                      Reorder
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p>No past orders</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}


