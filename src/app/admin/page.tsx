"use client";

import { useState } from "react";
import BookingsCalendar from "./components/BookingsCalender";
import NotificationsPanel from "./components/NotificationsPanel";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import AdminHeader from "./components/Header";
import AdminSidebar from "./components/Sidebar";
import RoomsManagement from "./components/RoomsManagement";
import GuestsManagement from "./components/GuestsManagement";
import Setting from "./components/Setting";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("analytics");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (activeTab) {
      case "analytics":
        return <AnalyticsDashboard />;
      case "calendar":
        return <BookingsCalendar />;
      case "notifications":
        return <NotificationsPanel />;
      case "rooms":
        return <RoomsManagement />;
      case "guests":
        return <GuestsManagement />;
      case "settings":
        return <Setting />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen">
  <AdminSidebar
    activeTab={activeTab}
    setActiveTab={setActiveTab}
    isOpen={sidebarOpen}
  />

  <div className="flex-1 flex flex-col transition-all duration-300">
    <AdminHeader
      onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
    />

    <main className="flex-1 overflow-auto bg-softBg">{renderContent()}</main>
  </div>
</div>

  );
}
