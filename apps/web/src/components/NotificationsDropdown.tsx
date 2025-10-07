"use client";

import { useState, useEffect } from "react";
import { Bell } from "lucide-react";

interface Notification {
  notification_id: string;
  type: string;
  message: string;
  created_at: string;
}

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/notifications`);
      if (!res.ok) throw new Error("Failed to fetch notifications");
      const data = await res.json();
      setNotifications(data.data); 
    } catch (err) {
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete notification
  const deleteNotification = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/notifications?id=${id}`, {
      method: 'DELETE',
      
    });

    if (!res.ok) throw new Error("Failed to delete notification");

    setNotifications((prev) =>
      prev.filter((n) => n.notification_id !== id)
    );
  } catch (err) {
    console.error("Error deleting notification:", err);
  }
};

  return (
    <div className="relative">
      {/* Bell Icon */}
      <button
        onClick={() => {
          setOpen((prev) => !prev);
          if (!open) fetchNotifications(); 
        }}
        className="relative p-2 rounded hover:bg-gray-100"
      >
        <Bell className="w-6 h-6 text-gray-700" />
        {notifications.length > 0 && (
          <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full px-1">
            {notifications.length}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg z-50">
          <div className="p-2 font-semibold border-b">Notifications</div>

          <div className="max-h-64 overflow-y-auto">
            {loading ? (
              <p className="p-4 text-gray-500 text-sm">Loading...</p>
            ) : notifications.length === 0 ? (
              <p className="p-4 text-gray-500 text-sm">No notifications</p>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.notification_id}
                  className="flex justify-between items-center p-3 border-b last:border-none hover:bg-gray-50"
                >
                  <div>
                    <p className="font-medium">{n.type}</p>
                    <p className="text-sm text-gray-600">{n.message}</p>
                    <span className="text-xs text-gray-400">
                      {new Date(n.created_at).toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteNotification(n.notification_id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
