"use client";

import { useEffect, useState } from "react";
import { Clock, CheckCircle, XCircle, RefreshCcw } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { getAccessToken, getUserData } from "../../lib/auth";

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
  const [error, setError] = useState<string | null>(null);
  const { addToCart, clearCart } = useCart();
  const router = useRouter();

  // Load orders on mount
  useEffect(() => {
    const loadOrders = async () => {
      try {
        const token = getAccessToken();
        if (!token) {
          setError("Not authenticated");
          return;
        }

        // Fetch profile first (same pattern as profile page) to validate token and get role
        const profileRes = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/profile`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!profileRes.ok) {
          const errJson = await profileRes.json().catch(() => ({}));
          setError(errJson?.error || "Failed to load profile");
          return;
        }
        const profileJson = await profileRes.json();
        const role =
          profileJson?.user?.role ?? getUserData()?.role ?? "student";

        // Now fetch orders
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/order`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          cache: "no-store",
        });

        const data = await res.json();
        if (!res.ok) {
          setError(data?.error || "Failed to load orders");
          setCurrentOrders([]);
          setPastOrders([]);
          return;
        }

        if (role === "staff" || role === "admin") {
          // Server returns { orders } with order_item nested
          const orders = (data?.orders ?? []).map((o: any) => {
            const items = (o.order_item ?? []).map((i: any) => ({
              menu_item_id: i.menu_item_id,
              name: i.name ?? i?.menu_item?.name ?? String(i.menu_item_id),
              quantity: i.quantity,
              price: i.subtotal / Math.max(1, i.quantity),
            }));
            const total_amount = (o.order_item ?? []).reduce(
              (sum: number, i: any) => sum + (i.subtotal ?? 0),
              0
            );
            return {
              id: o.id,
              items,
              total_amount,
              status: o.status ?? "pending",
              eta: o.eta ?? undefined,
              date: (o.ordered_at ?? o.created_at)?.split?.("T")?.[0] ?? "",
            } as OrderItem;
          });
          // For staff view, show all as current orders
          setCurrentOrders(orders);
          setPastOrders([]);
        } else {
          // Student response: { currentOrders, pastOrders } expand "item" string into items list
          const mapSimple = (o: any): OrderItem => {
            const itemStr = (o.item ?? "").toString();
            const names = itemStr
              .split(",")
              .map((s: string) => s.trim())
              .filter((s: string) => s.length > 0);
            const items =
              names.length > 0
                ? names.map((name: string) => ({
                    menu_item_id: "",
                    name,
                    quantity: 1,
                    price: 0,
                  }))
                : [
                    {
                      menu_item_id: "",
                      name: "Order",
                      quantity: 1,
                      price: Number(o.price ?? 0),
                    },
                  ];
            return {
              id: o.id,
              items,
              total_amount: Number(o.price ?? 0),
              status: o.status ?? "pending",
              eta: o.eta ?? undefined,
              date:
                (o.date ?? o.created_at ?? "").toString().split("T")[0] ?? "",
            } as OrderItem;
          };

          setCurrentOrders((data?.currentOrders ?? []).map(mapSimple));
          setPastOrders((data?.pastOrders ?? []).map(mapSimple));
        }
      } catch (e: any) {
        setError(e?.message || "Unexpected error");
      }
    };

    loadOrders();
  }, []);

  // Reorder: rebuild cart from order and navigate to cart (checkout)
  const reorder = async (order: OrderItem) => {
    try {
      clearCart();
      order.items.forEach((i) => {
        const quantity = Math.max(1, i.quantity || 1);
        for (let k = 0; k < quantity; k++) {
          addToCart({
            id: i.menu_item_id,
            name: i.name || "Item",
            description: "",
            price: i.price ?? 0,
            rating: 0,
            cookTime: "",
            category: "",
            isPopular: false,
            image: "",
          });
        }
      });
      router.push("/?checkout=1");
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

      {error && (
        <div className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-700 dark:bg-red-900/30 dark:text-red-200">
          {error}
        </div>
      )}

      <div className="grid gap-6">
        {/* Current Orders */}
        <section className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-[#0E2148] dark:text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#483AA0]" />
            Current Orders
          </h2>
          {currentOrders.length > 0 ? (
            <div className="space-y-4">
              {currentOrders.map((order, idx) => (
                <div
                  key={`${order.id ?? "order"}-${idx}`}
                  className="flex flex-col p-4 border rounded-lg shadow-sm bg-gray-50 dark:bg-gray-700 dark:border-gray-700"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-[#0E2148] dark:text-white">
                        {order.items
                          .filter((i) => i.name && i.name.trim().length > 0)
                          .map((i) => `${i.name} x${i.quantity}`)
                          .join(", ") ||
                          `Order x${order.items.reduce(
                            (sum, i) => sum + i.quantity,
                            0
                          )}`}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Date: {order.date}
                      </p>
                    </div>
                    <span className="font-bold text-[#483AA0]">
                      R{order.total_amount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(order.status)}
                    <span className="capitalize">{order.status}</span>
                    {order.eta && (
                      <span className="text-sm text-gray-400">
                        • ETA: {order.eta}
                      </span>
                    )}
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
              {pastOrders.map((order, idx) => (
                <div
                  key={`${order.id ?? "order"}-${idx}`}
                  className="flex flex-col p-4 border rounded-lg shadow-sm bg-gray-50 dark:bg-gray-700 dark:border-gray-700"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-[#0E2148] dark:text-white">
                        {order.items
                          .filter((i) => i.name && i.name.trim().length > 0)
                          .map((i) => `${i.name} x${i.quantity}`)
                          .join(", ") ||
                          `Order x${order.items.reduce(
                            (sum, i) => sum + i.quantity,
                            0
                          )}`}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Date: {order.date}
                      </p>
                    </div>
                    <span className="font-bold text-[#483AA0]">
                      R{order.total_amount.toFixed(2)}
                    </span>
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
