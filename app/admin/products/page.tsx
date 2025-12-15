"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  Download,
  Upload,
} from "lucide-react";

// Demo products data
const products = [
  {
    id: "1",
    name: "Wireless Bluetooth Earbuds Pro",
    sku: "WBE-001",
    price: 149.99,
    stock: 50,
    category: "Electronics",
    status: "active",
    image: "🎧",
  },
  {
    id: "2",
    name: "Premium Laptop Backpack",
    sku: "PLB-002",
    price: 89.99,
    stock: 35,
    category: "Fashion",
    status: "active",
    image: "🎒",
  },
  {
    id: "3",
    name: "Scientific Calculator FX-991",
    sku: "SCF-003",
    price: 45.99,
    stock: 0,
    category: "Electronics",
    status: "out_of_stock",
    image: "🔢",
  },
  {
    id: "4",
    name: "Complete Study Planner 2024",
    sku: "CSP-004",
    price: 24.99,
    stock: 120,
    category: "Books",
    status: "active",
    image: "📒",
  },
  {
    id: "5",
    name: "USB-C Charging Hub 8-in-1",
    sku: "UCH-005",
    price: 79.99,
    stock: 15,
    category: "Electronics",
    status: "low_stock",
    image: "🔌",
  },
  {
    id: "6",
    name: "Ergonomic Desk Lamp LED",
    sku: "EDL-006",
    price: 59.99,
    stock: 45,
    category: "Electronics",
    status: "active",
    image: "💡",
  },
  {
    id: "7",
    name: "Noise Cancelling Headphones",
    sku: "NCH-007",
    price: 199.99,
    stock: 8,
    category: "Electronics",
    status: "low_stock",
    image: "🎧",
  },
  {
    id: "8",
    name: "Digital Art Course Bundle",
    sku: "DAC-008",
    price: 49.99,
    stock: 999,
    category: "Digital",
    status: "active",
    image: "🎨",
  },
];

const statusColors: Record<string, string> = {
  active:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  low_stock:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  out_of_stock: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  draft: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
};

const statusLabels: Record<string, string> = {
  active: "Active",
  low_stock: "Low Stock",
  out_of_stock: "Out of Stock",
  draft: "Draft",
};

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map((p) => p.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter((pid) => pid !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Products
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your product inventory
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Import
          </button>
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
          <Link
            href="/admin/products/new"
            className="px-4 py-2 bg-[#E8FF00] text-[#0A0A0A] font-medium rounded-lg hover:bg-[#F5FF80] transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </Link>
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
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8FF00]"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2 border rounded-lg text-sm font-medium flex items-center gap-2 ${
                showFilters
                  ? "border-[#E8FF00] bg-[#E8FF00]/10 text-[#E8FF00]"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>

            {selectedProducts.length > 0 && (
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                Delete ({selectedProducts.length})
              </button>
            )}
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-2 md:grid-cols-4 gap-4">
            <select className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm">
              <option value="">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="books">Books</option>
              <option value="digital">Digital</option>
            </select>
            <select className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="low_stock">Low Stock</option>
              <option value="out_of_stock">Out of Stock</option>
              <option value="draft">Draft</option>
            </select>
            <select className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm">
              <option value="">Price Range</option>
              <option value="0-50">GH₵ 0 - 50</option>
              <option value="50-100">GH₵ 50 - 100</option>
              <option value="100-200">GH₵ 100 - 200</option>
              <option value="200+">GH₵ 200+</option>
            </select>
            <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700">
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr className="text-left text-sm text-gray-500">
                <th className="px-6 py-3">
                  <input
                    type="checkbox"
                    checked={
                      selectedProducts.length === filteredProducts.length &&
                      filteredProducts.length > 0
                    }
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-gray-300 text-[#E8FF00] focus:ring-[#E8FF00]"
                  />
                </th>
                <th className="px-6 py-3 font-medium">Product</th>
                <th className="px-6 py-3 font-medium">SKU</th>
                <th className="px-6 py-3 font-medium">Category</th>
                <th className="px-6 py-3 font-medium">Price</th>
                <th className="px-6 py-3 font-medium">Stock</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-900/50"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => toggleSelect(product.id)}
                      className="w-4 h-4 rounded border-gray-300 text-[#E8FF00] focus:ring-[#E8FF00]"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-xl">
                        {product.image}
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm text-gray-500">
                      {product.sku}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900 dark:text-white">
                      GH₵ {product.price.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`font-medium ${
                        product.stock === 0
                          ? "text-red-500"
                          : product.stock < 20
                          ? "text-yellow-500"
                          : "text-gray-900 dark:text-white"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${
                        statusColors[product.status]
                      }`}
                    >
                      {statusLabels[product.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/products/${product.id}`}
                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="p-2 text-gray-400 hover:text-[#E8FF00]"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
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

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500">
            Showing {filteredProducts.length} of {products.length} products
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
            <button className="px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              3
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
