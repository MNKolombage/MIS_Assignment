"use client";

import {
  Calendar,
  Bell,
  BarChart3,
  Home,
  Users,
  Settings,
  LogOut
} from "lucide-react";

const menuItems = [
  { id: "analytics", name: "Analytics", icon: BarChart3 },
  { id: "calendar", name: "Bookings", icon: Calendar },
  { id: "notifications", name: "Notifications", icon: Bell },
  { id: "rooms", name: "Rooms", icon: Home },
  { id: "guests", name: "Guests", icon: Users },
  { id: "settings", name: "Settings", icon: Settings },
];

export default function AdminSidebar({ activeTab, setActiveTab, isOpen }: { activeTab: string, setActiveTab: (tab: string) => void, isOpen: boolean }) {
  return (
    <aside
      className={`lg:static h-full left-0 top-0 bg-white border-r border-gray-200 shadow-sm transition-all duration-300
        ${isOpen ? "w-64" : "w-20"}`}
    >
      {/* Branding */}
      <div className="p-5 border-b">
        <h1 className={`text-xl font-bold text-primary ${!isOpen && "hidden"}`}>
          Admin Panel
        </h1>
      </div>

      {/* Menu */}
      <nav className="mt-5 space-y-2 px-3">
        {menuItems.map(({ id, name, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-md text-sm
              transition-all font-medium
              ${activeTab === id 
              ? "bg-primary text-white shadow" 
              : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            <Icon className="w-5 h-5" />
            {isOpen && <span>{name}</span>}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="absolute bottom-0 w-full p-4 border-t">
        <button
          className="flex items-center gap-3 text-red-600 hover:text-red-700 font-medium"
        >
          <LogOut className="w-5 h-5" />
          {isOpen && "Logout"}
        </button>
      </div>
    </aside>
  );
}
