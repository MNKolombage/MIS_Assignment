"use client";

import { useState, ChangeEvent, FormEvent } from "react";

export default function SettingsManagement() {
  const [profile, setProfile] = useState({
    name: "Admin Name",
    email: "admin@example.com",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [preferences, setPreferences] = useState({
    notifications: true,
    darkMode: false,
  });

  const handleProfileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handlePreferencesChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPreferences(prev => ({ ...prev, [e.target.name as keyof typeof prev]: e.target.checked }));
  };

  const handleProfileSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Profile updated!");
  };

  const handlePasswordSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert("New password and confirm password do not match!");
      return;
    }
    alert("Password changed!");
  };

  return (
    <div className="p-8 space-y-8">
      <h2 className="text-2xl font-semibold text-gray-900">Settings</h2>

      {/* Profile Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-medium text-gray-700 mb-4">Profile Settings</h3>
        <form onSubmit={handleProfileSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
          >
            Update Profile
          </button>
        </form>
      </div>

      {/* Password Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-medium text-gray-700 mb-4">Change Password</h3>
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1">Current Password</label>
            <input
              type="password"
              name="current"
              value={passwords.current}
              onChange={handlePasswordChange}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">New Password</label>
            <input
              type="password"
              name="new"
              value={passwords.new}
              onChange={handlePasswordChange}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Confirm New Password</label>
            <input
              type="password"
              name="confirm"
              value={passwords.confirm}
              onChange={handlePasswordChange}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-white rounded hover:bg-primary-dark transition"
          >
            Change Password
          </button>
        </form>
      </div>

      {/* Preferences Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-xl font-medium text-gray-700 mb-4">App Preferences</h3>
        <div className="space-y-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="notifications"
              checked={preferences.notifications}
              onChange={handlePreferencesChange}
              className="h-4 w-4"
            />
            <span className="text-gray-700">Enable Notifications</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="darkMode"
              checked={preferences.darkMode}
              onChange={handlePreferencesChange}
              className="h-4 w-4"
            />
            <span className="text-gray-700">Enable Dark Mode</span>
          </label>
        </div>
      </div>
    </div>
  );
}
