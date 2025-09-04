"use client";

import React, { useState, useEffect } from "react";
import type { ReactNode } from "react";
import {
  Package,
  Users,
  Clock,
  TrendingUp,
  ChevronDown,
  CheckCircle2,
  XCircle,
  MoreVertical,
  FileText,
  Printer,
  X,
  History,
  ShoppingCart,
  Receipt,
  RotateCcw,
  MessageSquare,
  Star,
} from "lucide-react";

// Define interfaces for types

interface ModalProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
}

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customer: string;
  items: OrderItem[];
  status: "Pending" | "Completed" | "Cancelled";
  time: string;
  notes?: string;
  feedback?: boolean;
}

// The main component that switches between dashboards.
export default function DashboardSwitcher() {
  const [activeDashboard, setActiveDashboard] = useState<"staff" | "student">("staff");

  return (
    <div className="container mx-auto max-w-6xl px-4 py-6">
      {activeDashboard === "staff" ? <StaffDashboard /> : <StudentDashboard />}

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 rounded-full bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 z-50">
        <button
          onClick={() => setActiveDashboard("staff")}
          className={`px-4 py-1 text-sm rounded-full font-semibold transition-colors ${
            activeDashboard === "staff"
              ? "bg-[#483AA0] text-white shadow"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          Staff
        </button>
        <button
          onClick={() => setActiveDashboard("student")}
          className={`px-4 py-1 text-sm rounded-full font-semibold transition-colors ${
            activeDashboard === "student"
              ? "bg-[#483AA0] text-white shadow"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          Student
        </button>
      </div>
    </div>
  );
}

// Reusable Modal Component
const Modal: React.FC<ModalProps> = ({ title, onClose, children }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full p-6 relative">
        <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-[#0E2148] dark:text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="py-4">{children}</div>
      </div>
    </div>
  );
};

// OrderQueue component to display and manage a list of orders.
const OrderQueue: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-001",
      customer: "Natasha Paul",
      items: [
        { name: "Chicken Burger", quantity: 1, price: 55.0 },
        { name: "Small Fries", quantity: 1, price: 20.0 },
        { name: "Coke", quantity: 1, price: 15.0 },
      ],
      status: "Pending",
      time: "2 mins ago",
      notes: "No pickles on the burger.",
    },
    {
      id: "ORD-002",
      customer: "John Luke",
      items: [
        { name: "Grilled Steak Sandwich", quantity: 1, price: 75.0 },
        { name: "Iced Tea", quantity: 2, price: 18.0 },
      ],
      status: "Pending",
      time: "5 mins ago",
      notes: "",
    },
    {
      id: "ORD-003",
      customer: "Reiner Smith",
      items: [{ name: "Veggie Wrap", quantity: 1, price: 60.0 }],
      status: "Pending",
      time: "8 mins ago",
      notes: "Add extra hot sauce.",
    },
  ]);

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const toggleMenu = (orderId: string) => {
    setOpenMenuId(openMenuId === orderId ? null : orderId);
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setOpenMenuId(null);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  const handlePrintReceipt = (orderId: string) => {
    console.log(`Printing receipt for order: ${orderId}`);
    setOpenMenuId(null);
  };

  const completeOrder = (orderId: string) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: "Completed" } : order
      )
    );
  };

  const cancelOrder = (orderId: string) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: "Cancelled" } : order
      )
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-xl font-semibold text-[#0E2148] dark:text-white mb-4 flex items-center gap-2">
        <Package className="w-5 h-5 text-[#483AA0]" />
        Order Queue
        <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
          ({orders.filter((o) => o.status === "Pending").length} pending)
        </span>
      </h2>

      <div className="space-y-4">
        {orders.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>No new orders at the moment.</p>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-lg text-blue-600 dark:text-blue-400">
                    {order.id}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    ({order.time})
                  </span>
                </div>
                <div className="relative">
                  <button
                    onClick={() => toggleMenu(order.id)}
                    className="p-1 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>
                  {openMenuId === order.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                      <button
                        onClick={() => handleViewDetails(order)}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-t-lg"
                      >
                        <FileText className="w-4 h-4 mr-2" /> View Details
                      </button>
                      <button
                        onClick={() => handlePrintReceipt(order.id)}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-lg"
                      >
                        <Printer className="w-4 h-4 mr-2" /> Print Receipt
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                Customer: {order.customer}
              </p>

              <div className="mt-2 space-y-1">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-200"
                  >
                    <span>{item.name}</span>
                    <span className="text-gray-500 dark:text-gray-400">
                      x{item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-between items-center">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                      : order.status === "Completed"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                  }`}
                >
                  {order.status}
                </span>

                {order.status === "Pending" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => completeOrder(order.id)}
                      className="p-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
                      aria-label={`Mark order ${order.id} as complete`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => cancelOrder(order.id)}
                      className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                      aria-label={`Cancel order ${order.id}`}
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {selectedOrder && (
        <Modal title={`Order Details: ${selectedOrder.id}`} onClose={closeModal}>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p className="text-lg font-medium">Customer: {selectedOrder.customer}</p>
            <div>
              <h4 className="text-md font-semibold mb-2">Items:</h4>
              <ul className="list-disc list-inside space-y-1">
                {selectedOrder.items.map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <span>
                      {item.quantity} x {item.name}
                    </span>
                    <span>R{(item.quantity * item.price).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4">
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Total:</span>
                  <span>
                    R
                    {selectedOrder.items
                      .reduce((acc, item) => acc + item.quantity * item.price, 0)
                      .toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            {selectedOrder.notes && (
              <div>
                <h4 className="text-md font-semibold mb-1">Notes:</h4>
                <p className="italic text-sm">{selectedOrder.notes}</p>
              </div>
            )}
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              <p>Placed: {selectedOrder.time}</p>
              <p>
                Status: <span className="font-semibold">{selectedOrder.status}</span>
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

// The main StaffDashboard component
const StaffDashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-[#0E2148] dark:text-white mb-6">Staff Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <OrderQueue />
        </div>

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

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-[#0E2148] dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => (window.location.href = "/menu")}
            className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-[#483AA0] transition-colors text-center"
          >
            <span className="text-sm text-gray-600 dark:text-gray-400">Update Menu Item</span>
          </button>
          <button
            onClick={() => (window.location.href = "/menu")}
            className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-[#483AA0] transition-colors text-center"
          >
            <span className="text-sm text-gray-600 dark:text-gray-400">Mark Item Unavailable</span>
          </button>
          <button
            onClick={() => (window.location.href = "/analytics")}
            className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-[#483AA0] transition-colors text-center"
          >
            <span className="text-sm text-gray-600 dark:text-gray-400">View Reports</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// The Student Dashboard component

const StudentDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-001",
      customer: "You",
      items: [
        { name: "Chicken Burger", quantity: 1, price: 55.0 },
        { name: "Small Fries", quantity: 1, price: 20.0 },
        { name: "Coke", quantity: 1, price: 15.0 },
      ],
      status: "Completed",
      time: "2025-08-27 12:30",
      feedback: false,
    },
    {
      id: "ORD-002",
      customer: "You",
      items: [
        { name: "Grilled Steak Sandwich", quantity: 1, price: 75.0 },
        { name: "Iced Tea", quantity: 2, price: 18.0 },
      ],
      status: "Cancelled",
      time: "2025-08-26 13:00",
      feedback: false,
    },
    {
      id: "ORD-003",
      customer: "You",
      items: [{ name: "Veggie Wrap", quantity: 1, price: 60.0 }],
      status: "Completed",
      time: "2025-08-25 11:45",
      feedback: true,
    },
    {
      id: "ORD-004",
      customer: "You",
      items: [{ name: "Tuna Salad", quantity: 1, price: 45.0 }],
      status: "Pending",
      time: "2025-08-28 10:30",
      feedback: false,
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [orderToFeedback, setOrderToFeedback] = useState<Order | null>(null);

  const closeModal = () => {
    setSelectedOrder(null);
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleFeedbackClick = (order: Order) => {
    setOrderToFeedback(order);
    setFeedbackModalOpen(true);
  };

  const submitFeedback = (rating: number, comment: string) => {
    console.log(
      `Submitting feedback for order ${orderToFeedback?.id}: Rating ${rating}, Comment: ${comment}`
    );
    if (!orderToFeedback) return;
    setOrders(
      orders.map((o) =>
        o.id === orderToFeedback.id ? { ...o, feedback: true } : o
      )
    );
    setFeedbackModalOpen(false);
    setOrderToFeedback(null);
  };

  useEffect(() => {
    const pendingOrder = orders.find((o) => o.status === "Pending");
    if (pendingOrder) {
      const timer = setTimeout(() => {
        setOrders(
          orders.map((o) =>
            o.id === pendingOrder.id ? { ...o, status: "Completed" } : o
          )
        );
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [orders]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#0E2148] dark:text-white mb-6">
        Student Dashboard
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-[#0E2148] dark:text-white mb-4 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-[#483AA0]" />
              Start New Order
            </h2>
            <button
              onClick={() => window.location.href = "/menu"}
              className="w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-[#483AA0] transition-colors text-center"
            >
              <span className="text-lg text-gray-600 dark:text-gray-400">Go to Menu</span>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-r from-[#0E2148] to-[#483AA0] text-white rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Pending Orders</p>
                <p className="text-2xl font-bold">
                  {orders.filter((o) => o.status === "Pending").length}
                </p>
              </div>
              <Clock className="w-8 h-8 opacity-75" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#483AA0] to-[#7965C1] text-white rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Orders</p>
                <p className="text-2xl font-bold">{orders.length}</p>
              </div>
              <History className="w-8 h-8 opacity-75" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-semibold text-[#0E2148] dark:text-white mb-4 flex items-center gap-2">
          <Receipt className="w-5 h-5 text-[#483AA0]" />
          Order History
        </h2>
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <History className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>You have not placed any orders yet.</p>
            </div>
          ) : (
            orders
              .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
              .map((order) => (
                <div
                  key={order.id}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-lg text-blue-600 dark:text-blue-400">
                        {order.id}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        ({order.time})
                      </span>
                    </div>
                    <button
                      onClick={() => handleViewDetails(order)}
                      className="p-1 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                    {order.items.map((item) => item.name).join(", ")}
                  </p>

                  <div className="mt-4 flex justify-between items-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 animate-pulse"
                          : order.status === "Completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {order.status}
                    </span>
                    {order.status === "Completed" && !order.feedback && (
                      <button
                        onClick={() => handleFeedbackClick(order)}
                        className="flex items-center gap-1 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span className="text-xs hidden md:inline">Leave Feedback</span>
                      </button>
                    )}
                    {order.status === "Completed" && order.feedback && (
                      <span className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                        <CheckCircle2 className="w-4 h-4" /> Feedback Submitted
                      </span>
                    )}
                    {order.status === "Pending" && (
                      <button
                        onClick={() => {}}
                        className="flex items-center gap-1 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        aria-label="Refresh status"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span className="text-xs hidden md:inline">Refresh</span>
                      </button>
                    )}
                  </div>
                </div>
              ))
          )}
        </div>
      </div>

      {selectedOrder && (
        <Modal title={`Order Details: ${selectedOrder.id}`} onClose={closeModal}>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p className="text-lg font-medium">Customer: {selectedOrder.customer}</p>
            <div>
              <h4 className="text-md font-semibold mb-2">Items:</h4>
              <ul className="list-disc list-inside space-y-1">
                {selectedOrder.items.map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <span>
                      {item.quantity} x {item.name}
                    </span>
                    <span>R{(item.quantity * item.price).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4">
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Total:</span>
                  <span>
                    R
                    {selectedOrder.items
                      .reduce((acc, item) => acc + item.quantity * item.price, 0)
                      .toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              <p>Placed: {selectedOrder.time}</p>
              <p>
                Status:{" "}
                <span className="font-semibold capitalize">{selectedOrder.status}</span>
              </p>
            </div>
          </div>
        </Modal>
      )}

      {feedbackModalOpen && orderToFeedback && (
        <FeedbackModal
          order={orderToFeedback}
          onClose={() => setFeedbackModalOpen(false)}
          onSubmit={submitFeedback}
        />
      )}
    </div>
  );
};

// FeedbackModal component for students to leave feedback
interface FeedbackModalProps {
  order: Order;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ order, onClose, onSubmit }) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(rating, comment);
  };

  return (
    <Modal title={`Leave Feedback for Order ${order.id}`} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Rate your experience:
          </h4>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={24}
                className={`cursor-pointer transition-colors ${
                  rating >= star
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300 dark:text-gray-600"
                }`}
                onClick={() => handleRatingChange(star)}
              />
            ))}
          </div>
        </div>
        <div>
          <label
            htmlFor="comment"
            className="block font-semibold mb-2 text-gray-700 dark:text-gray-300"
          >
            Comments:
          </label>
          <textarea
            id="comment"
            rows={4}
            className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#483AA0]"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-full bg-[#483AA0] text-white hover:bg-[#3d3184] transition-colors"
          >
            Submit Feedback
          </button>
        </div>
      </form>
    </Modal>
  );
};
