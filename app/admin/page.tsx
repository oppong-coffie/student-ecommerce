"use client";

import React from "react";
import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  ArrowUpRight,
  MoreHorizontal,
  Eye,
} from "lucide-react";

// Stats Card Component
interface StatsCardProps {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: React.ReactNode;
  color: string;
}

function StatsCard({
  title,
  value,
  change,
  changeLabel,
  icon,
  color,
}: StatsCardProps) {
  const isPositive = change >= 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-start justify-between">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}
        >
          {icon}
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
      <div className="mt-4">
        <h3 className="text-sm text-gray-500 dark:text-gray-400">{title}</h3>
        <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
          {value}
        </p>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <span
          className={`flex items-center gap-1 text-sm font-medium ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {isPositive ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          {Math.abs(change)}%
        </span>
        <span className="text-sm text-gray-500">{changeLabel}</span>
      </div>
    </div>
  );
}

// Recent Orders Table
const recentOrders = [
  {
    id: "ORD202412001",
    customer: "John Mensah",
    product: "Wireless Earbuds",
    amount: 149.99,
    status: "completed",
    time: "2 min ago",
  },
  {
    id: "ORD202412002",
    customer: "Ama Asante",
    product: "Laptop Backpack",
    amount: 89.99,
    status: "processing",
    time: "15 min ago",
  },
  {
    id: "ORD202412003",
    customer: "Kwame Ofori",
    product: "Calculator FX-991",
    amount: 45.99,
    status: "pending",
    time: "1 hour ago",
  },
  {
    id: "ORD202412004",
    customer: "Akua Boateng",
    product: "Study Planner 2024",
    amount: 24.99,
    status: "completed",
    time: "2 hours ago",
  },
  {
    id: "ORD202412005",
    customer: "Kofi Owusu",
    product: "Digital Art Course",
    amount: 49.99,
    status: "completed",
    time: "3 hours ago",
  },
];

const statusColors: Record<string, string> = {
  completed:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  processing:
    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  pending:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  cancelled: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

// Top Products
const topProducts = [
  {
    name: "Wireless Bluetooth Earbuds Pro",
    sales: 256,
    revenue: 38239,
    image: "🎧",
  },
  { name: "Premium Laptop Backpack", sales: 189, revenue: 17010, image: "🎒" },
  {
    name: "Scientific Calculator FX-991",
    sales: 167,
    revenue: 7679,
    image: "🔢",
  },
  {
    name: "Noise Cancelling Headphones",
    sales: 145,
    revenue: 28999,
    image: "🎧",
  },
  { name: "Programming Books Bundle", sales: 132, revenue: 11878, image: "📚" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Welcome back! Here&apos;s what&apos;s happening with your store.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E8FF00]">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>Last year</option>
          </select>
          <button className="px-4 py-2 bg-[#E8FF00] text-[#0A0A0A] font-medium rounded-lg hover:bg-[#F5FF80] transition-colors">
            Download Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Revenue"
          value="GH₵ 124,563"
          change={12.5}
          changeLabel="vs last month"
          icon={<DollarSign className="w-6 h-6 text-green-600" />}
          color="bg-green-100 dark:bg-green-900/30"
        />
        <StatsCard
          title="Total Orders"
          value="1,234"
          change={8.2}
          changeLabel="vs last month"
          icon={<ShoppingCart className="w-6 h-6 text-blue-600" />}
          color="bg-blue-100 dark:bg-blue-900/30"
        />
        <StatsCard
          title="Total Customers"
          value="5,678"
          change={15.3}
          changeLabel="vs last month"
          icon={<Users className="w-6 h-6 text-purple-600" />}
          color="bg-purple-100 dark:bg-purple-900/30"
        />
        <StatsCard
          title="Total Products"
          value="456"
          change={-2.4}
          changeLabel="vs last month"
          icon={<Package className="w-6 h-6 text-orange-600" />}
          color="bg-orange-100 dark:bg-orange-900/30"
        />
      </div>

      {/* Charts & Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart Placeholder */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Revenue Overview
              </h2>
              <p className="text-sm text-gray-500">Monthly revenue trend</p>
            </div>
            <select className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm">
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>

          {/* Simple Chart Placeholder */}
          <div className="h-64 flex items-end justify-between gap-2 px-4">
            {[40, 55, 35, 60, 45, 80, 65, 75, 50, 85, 70, 90].map(
              (height, index) => (
                <div
                  key={index}
                  className="flex-1 flex flex-col items-center gap-2"
                >
                  <div
                    className="w-full bg-[#E8FF00] rounded-t-lg transition-all hover:bg-[#F5FF80]"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-xs text-gray-500">
                    {
                      [
                        "J",
                        "F",
                        "M",
                        "A",
                        "M",
                        "J",
                        "J",
                        "A",
                        "S",
                        "O",
                        "N",
                        "D",
                      ][index]
                    }
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Top Products
            </h2>
            <Link
              href="/admin/products"
              className="text-[#E8FF00] text-sm hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-400 w-4">
                  {index + 1}
                </span>
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-xl">
                  {product.image}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {product.name}
                  </p>
                  <p className="text-xs text-gray-500">{product.sales} sales</p>
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  GH₵ {product.revenue.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Orders
            </h2>
            <p className="text-sm text-gray-500">
              Latest orders from your store
            </p>
          </div>
          <Link
            href="/admin/orders"
            className="flex items-center gap-1 text-[#E8FF00] text-sm font-medium hover:underline"
          >
            View All <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr className="text-left text-sm text-gray-500">
                <th className="px-6 py-3 font-medium">Order ID</th>
                <th className="px-6 py-3 font-medium">Customer</th>
                <th className="px-6 py-3 font-medium">Product</th>
                <th className="px-6 py-3 font-medium">Amount</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Time</th>
                <th className="px-6 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-900/50"
                >
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm text-gray-900 dark:text-white">
                      {order.id}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900 dark:text-white">
                      {order.customer}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {order.product}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      GH₵ {order.amount.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full capitalize ${
                        statusColors[order.status]
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-500">{order.time}</span>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="p-2 text-gray-400 hover:text-[#E8FF00] transition-colors inline-flex"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
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
