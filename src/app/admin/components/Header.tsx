"use client";
import { Menu, User } from "lucide-react";

export default function AdminHeader({ onMenuToggle }: { onMenuToggle: () => void }) {
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center border-b">
      <button
        onClick={onMenuToggle}
        className="p-2 rounded-lg hover:bg-gray-100"
      >
        <Menu className="w-6 h-6 text-primary" />
      </button>

      <div className="flex items-center gap-3">
        <span className="text-gray-700 text-sm font-semibold">
          Welcome, Admin
        </span>
        <div className="w-10 h-10 rounded-full bg-primary flex justify-center items-center text-white">
          <User className="w-5 h-5" />
        </div>
      </div>
    </header>
  );
}
