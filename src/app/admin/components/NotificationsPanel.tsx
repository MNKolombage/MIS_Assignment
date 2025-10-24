"use client";
import { JSX, useState } from "react";
import { Bell, CheckCircle, AlertTriangle, Info } from "lucide-react";

export default function NotificationsPanel() {
  type NotificationType = "success" | "warning" | "error" | "info";

  type Notification = {
    id: number;
    message: string;
    time: string;
    type: NotificationType;
    read: boolean;
  };

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      message: "New booking received from John Doe",
      time: "Just now",
      type: "success",
      read: false
    },
    {
      id: 2,
      message: "Guest requested urgent room service",
      time: "5 min ago",
      type: "warning",
      read: false
    },
    {
      id: 3,
      message: "Payment issue with reservation #142",
      time: "20 min ago",
      type: "error",
      read: false
    },
    {
      id: 4,
      message: "New review added to Nisala Suite",
      time: "1 hr ago",
      type: "info",
      read: false
    }
  ]);

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== id)
    );
  };

  const handleClear = () => {
    setNotifications([]);
  };

  const getIcon = (type: NotificationType): JSX.Element => {
    const iconMap: Record<NotificationType, JSX.Element> = {
      success: <CheckCircle className="h-5 w-5 text-green-600" />,
      warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
      error: <AlertTriangle className="h-5 w-5 text-red-600" />,
      info: <Info className="h-5 w-5 text-blue-600" />
    };
    return iconMap[type];
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Bell className="h-7 w-7 text-primary" />
          Notifications
        </h2>

        {notifications.length > 0 && (
          <button
            onClick={handleClear}
            className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="bg-white shadow-lg rounded-xl p-6 border">
        {notifications.length === 0 ? (
          <p className="text-gray-500 text-center py-6">
            No new notifications
          </p>
        ) : (
          <ul className="space-y-4">
            {notifications.map(item => (
              <li
                key={item.id}
                className="flex items-start gap-4 p-4 rounded-lg bg-softBg border border-gray-200 shadow-sm hover:shadow-md transition transform hover:-translate-y-0.5"
              >
                <div>{getIcon(item.type)}</div>

                <div className="flex-1">
                  <p className="text-gray-900 font-medium">{item.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.time}</p>
                </div>

                <button
                  onClick={() => markAsRead(item.id)}
                  className="text-xs text-blue-600 font-medium hover:underline"
                >
                  Mark as Read
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
