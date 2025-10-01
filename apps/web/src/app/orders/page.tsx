"use client";

import { useState } from "react";
import { Clock, CheckCircle, XCircle, RefreshCcw } from "lucide-react";

type OrderItem = {
  id: string;
  items: {
    menu_item_id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  status: string;
  eta?: string;
  date: string;
  total_amount: number;
};

export default function OrdersPage() {
  const [currentOrders, setCurrentOrders] = useState<OrderItem[]>([]);
  const [pastOrders, setPastOrders] = useState<OrderItem[]>([]);

  // Reorder function
  const reorder = async (order: OrderItem) => {
    try {
      const items = order.items.map((i) => ({
        menu_item_id: i.menu_item_id,
        quantity: i.quantity,
        price: i.price,
      }));

      const res = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      });

      const data = await res.json();
      if (res.ok) {
        setCurrentOrders((prev) => [
          ...prev,
          {
            id: data.order.id,
            items: order.items,
            total_amount: order.total_amount,
            status: "pending",
            eta: "20 min",
            date: new Date().toISOString().split("T")[0],
          },
        ]);
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Preparing":
        return <Clock className="text-yellow-500" size={20} />;
      case "Completed":
        return <CheckCircle className="text-green-500" size={20} />;
      case "Cancelled":
        return <XCircle className="text-red-500" size={20} />;
      default:
        return <Clock className="text-gray-500" size={20} />;
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-6">
      <h1 className="text-3xl font-bold text-[#0E2148] dark:text-white mb-6">
        My Orders
      </h1>

      <div className="grid gap-6">
        {/* Current Orders */}
        <section className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-[#0E2148] dark:text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#483AA0]" />
            Current Orders
          </h2>
          {currentOrders.length > 0 ? (
            <div className="space-y-4">
              {currentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col p-4 border rounded-lg shadow-sm bg-gray-50 dark:bg-gray-700 dark:border-gray-700"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-[#0E2148] dark:text-white">
                        {order.items.map((i) => `${i.name} x${i.quantity}`).join(", ")}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">ID: {order.id}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Date: {order.date}</p>
                    </div>
                    <span className="font-bold text-[#483AA0]">R{order.total_amount.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(order.status)}
                    <span className="capitalize">{order.status}</span>
                    {order.eta && <span className="text-sm text-gray-400">• ETA: {order.eta}</span>}
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

        {/* Past Orders */}
        <section className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-[#0E2148] dark:text-white mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-[#7965C1]" />
            Order History
          </h2>
          {pastOrders.length > 0 ? (
            <div className="space-y-4">
              {pastOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col p-4 border rounded-lg shadow-sm bg-gray-50 dark:bg-gray-700 dark:border-gray-700"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-[#0E2148] dark:text-white">
                        {order.items.map((i) => `${i.name} x${i.quantity}`).join(", ")}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">ID: {order.id}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Date: {order.date}</p>
                    </div>
                    <span className="font-bold text-[#483AA0]">R{order.total_amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(order.status)}
                      <span className="capitalize">{order.status}</span>
                    </div>
                    <button
                      onClick={() => reorder(order)}
                      className="flex items-center space-x-1 text-sm text-purple-600 hover:underline"
                    >
                      <RefreshCcw size={16} />
                      <span>Reorder</span>
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
