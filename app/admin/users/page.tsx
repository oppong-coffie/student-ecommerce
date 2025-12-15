"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  ChevronRight,
} from "lucide-react";

// Demo users data
const users = [
  {
    id: "1",
    name: "John Mensah",
    email: "john@example.com",
    role: "customer",
    orders: 12,
    spent: 1249.88,
    status: "active",
    joined: "2024-01-15",
  },
  {
    id: "2",
    name: "Ama Asante",
    email: "ama@example.com",
    role: "customer",
    orders: 8,
    spent: 789.92,
    status: "active",
    joined: "2024-02-20",
  },
  {
    id: "3",
    name: "Kwame Ofori",
    email: "kwame@example.com",
    role: "customer",
    orders: 3,
    spent: 245.97,
    status: "active",
    joined: "2024-03-10",
  },
  {
    id: "4",
    name: "Akua Boateng",
    email: "akua@example.com",
    role: "admin",
    orders: 0,
    spent: 0,
    status: "active",
    joined: "2024-01-01",
  },
  {
    id: "5",
    name: "Kofi Owusu",
    email: "kofi@example.com",
    role: "customer",
    orders: 25,
    spent: 3456.75,
    status: "active",
    joined: "2023-11-05",
  },
  {
    id: "6",
    name: "Efua Mensah",
    email: "efua@example.com",
    role: "customer",
    orders: 1,
    spent: 49.99,
    status: "inactive",
    joined: "2024-06-15",
  },
  {
    id: "7",
    name: "Super Admin",
    email: "admin@studentshop.com",
    role: "superadmin",
    orders: 0,
    spent: 0,
    status: "active",
    joined: "2023-01-01",
  },
];

const roleColors: Record<string, string> = {
  customer: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  admin:
    "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  superadmin: "bg-[#E8FF00]/20 text-[#0A0A0A] dark:text-[#E8FF00]",
};

const statusColors: Record<string, string> = {
  active:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  inactive: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
  suspended: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Users
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage customer and admin accounts
          </p>
        </div>
        <button className="px-4 py-2 bg-[#E8FF00] text-[#0A0A0A] font-medium rounded-lg hover:bg-[#F5FF80] transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {users.length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500">Customers</p>
          <p className="text-2xl font-bold text-blue-500 mt-1">
            {users.filter((u) => u.role === "customer").length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500">Admins</p>
          <p className="text-2xl font-bold text-purple-500 mt-1">
            {
              users.filter((u) => u.role === "admin" || u.role === "superadmin")
                .length
            }
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500">Active</p>
          <p className="text-2xl font-bold text-green-500 mt-1">
            {users.filter((u) => u.status === "active").length}
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8FF00]"
            />
          </div>

          <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            {["all", "customer", "admin", "superadmin"].map((role) => (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors capitalize ${
                  roleFilter === role
                    ? "bg-white dark:bg-gray-600 shadow"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {role === "all" ? "All" : role}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr className="text-left text-sm text-gray-500">
                <th className="px-6 py-3 font-medium">User</th>
                <th className="px-6 py-3 font-medium">Role</th>
                <th className="px-6 py-3 font-medium">Orders</th>
                <th className="px-6 py-3 font-medium">Total Spent</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Joined</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-900/50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#E8FF00] rounded-full flex items-center justify-center">
                        <span className="text-[#0A0A0A] font-bold text-sm">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {user.name}
                        </p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full capitalize ${
                        roleColors[user.role]
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-900 dark:text-white">
                      {user.orders}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900 dark:text-white">
                      GH₵ {user.spent.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full capitalize ${
                        statusColors[user.status]
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-500">{user.joined}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-[#E8FF00]">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
