"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Eye,
  ChevronLeft,
  ChevronRight,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  Truck,
  Package,
} from "lucide-react";

// Demo orders data
const orders = [
  {
    id: "ORD202412001",
    customer: "John Mensah",
    email: "john@example.com",
    items: 3,
    amount: 249.97,
    status: "completed",
    payment: "mobile_money",
    date: "2024-12-14",
  },
  {
    id: "ORD202412002",
    customer: "Ama Asante",
    email: "ama@example.com",
    items: 1,
    amount: 89.99,
    status: "processing",
    payment: "card",
    date: "2024-12-14",
  },
  {
    id: "ORD202412003",
    customer: "Kwame Ofori",
    email: "kwame@example.com",
    items: 2,
    amount: 95.98,
    status: "pending",
    payment: "mobile_money",
    date: "2024-12-14",
  },
  {
    id: "ORD202412004",
    customer: "Akua Boateng",
    email: "akua@example.com",
    items: 1,
    amount: 24.99,
    status: "shipped",
    payment: "card",
    date: "2024-12-13",
  },
  {
    id: "ORD202412005",
    customer: "Kofi Owusu",
    email: "kofi@example.com",
    items: 1,
    amount: 49.99,
    status: "completed",
    payment: "mobile_money",
    date: "2024-12-13",
  },
  {
    id: "ORD202412006",
    customer: "Efua Mensah",
    email: "efua@example.com",
    items: 4,
    amount: 324.96,
    status: "cancelled",
    payment: "card",
    date: "2024-12-12",
  },
  {
    id: "ORD202412007",
    customer: "Yaw Boakye",
    email: "yaw@example.com",
    items: 2,
    amount: 179.98,
    status: "processing",
    payment: "mobile_money",
    date: "2024-12-12",
  },
  {
    id: "ORD202412008",
    customer: "Adwoa Sarpong",
    email: "adwoa@example.com",
    items: 1,
    amount: 199.99,
    status: "completed",
    payment: "card",
    date: "2024-12-11",
  },
];

const statusConfig: Record<
  string,
  { color: string; icon: React.ReactNode; label: string }
> = {
  pending: {
    color:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    icon: <Clock className="w-4 h-4" />,
    label: "Pending",
  },
  processing: {
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    icon: <Package className="w-4 h-4" />,
    label: "Processing",
  },
  shipped: {
    color:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    icon: <Truck className="w-4 h-4" />,
    label: "Shipped",
  },
  completed: {
    color:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    icon: <CheckCircle className="w-4 h-4" />,
    label: "Completed",
  },
  cancelled: {
    color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    icon: <XCircle className="w-4 h-4" />,
    label: "Cancelled",
  },
};

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
    completed: orders.filter((o) => o.status === "completed").length,
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Orders
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage and track customer orders
          </p>
        </div>
        <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export Orders
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500">Total Orders</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {stats.total}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-yellow-500 mt-1">
            {stats.pending}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500">Processing</p>
          <p className="text-2xl font-bold text-blue-500 mt-1">
            {stats.processing}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500">Completed</p>
          <p className="text-2xl font-bold text-green-500 mt-1">
            {stats.completed}
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Search */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by order ID, customer, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8FF00]"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Status Filter Tabs */}
            <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              {["all", "pending", "processing", "shipped", "completed"].map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors capitalize ${
                      statusFilter === status
                        ? "bg-white dark:bg-gray-600 shadow"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {status}
                  </button>
                )
              )}
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`md:hidden px-4 py-2 border rounded-lg text-sm font-medium flex items-center gap-2 ${
                showFilters
                  ? "border-[#E8FF00] bg-[#E8FF00]/10 text-[#E8FF00]"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        {/* Mobile Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 md:hidden">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        )}
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr className="text-left text-sm text-gray-500">
                <th className="px-6 py-3 font-medium">Order ID</th>
                <th className="px-6 py-3 font-medium">Customer</th>
                <th className="px-6 py-3 font-medium">Items</th>
                <th className="px-6 py-3 font-medium">Amount</th>
                <th className="px-6 py-3 font-medium">Payment</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-900/50"
                >
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm font-medium text-gray-900 dark:text-white">
                      {order.id}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {order.customer}
                      </p>
                      <p className="text-sm text-gray-500">{order.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-600 dark:text-gray-400">
                      {order.items} items
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900 dark:text-white">
                      GH₵ {order.amount.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                      {order.payment.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${
                        statusConfig[order.status].color
                      }`}
                    >
                      {statusConfig[order.status].icon}
                      {statusConfig[order.status].label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-500">{order.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm font-medium hover:bg-[#E8FF00] hover:text-[#0A0A0A] transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No orders found matching your criteria.
            </p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500">
            Showing {filteredOrders.length} of {orders.length} orders
          </p>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="px-3 py-1 bg-[#E8FF00] text-[#0A0A0A] rounded-lg font-medium">
              1
            </button>
            <button className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              2
            </button>
            <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
