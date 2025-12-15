"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Filter,
  Grid3X3,
  List,
  Search,
  ChevronDown,
  Star,
  ShoppingCart,
  Heart,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";

// Demo products data
const products = [
  {
    id: "1",
    name: "Wireless Bluetooth Earbuds Pro",
    slug: "wireless-bluetooth-earbuds-pro",
    price: 149.99,
    compareAtPrice: 249.99,
    image: "🎧",
    rating: 4.8,
    reviewCount: 256,
    category: "Electronics",
    isSale: true,
  },
  {
    id: "2",
    name: "Premium Laptop Backpack",
    slug: "premium-laptop-backpack",
    price: 89.99,
    image: "🎒",
    rating: 4.6,
    reviewCount: 189,
    category: "Fashion",
    isNew: true,
  },
  {
    id: "3",
    name: "Scientific Calculator FX-991",
    slug: "scientific-calculator-fx991",
    price: 45.99,
    compareAtPrice: 59.99,
    image: "🔢",
    rating: 4.9,
    reviewCount: 412,
    category: "Electronics",
    isSale: true,
  },
  {
    id: "4",
    name: "Complete Study Planner 2024",
    slug: "complete-study-planner-2024",
    price: 24.99,
    image: "📒",
    rating: 4.7,
    reviewCount: 98,
    category: "Books",
    isNew: true,
  },
  {
    id: "5",
    name: "USB-C Charging Hub 8-in-1",
    slug: "usb-c-charging-hub-8in1",
    price: 79.99,
    compareAtPrice: 99.99,
    image: "🔌",
    rating: 4.5,
    reviewCount: 167,
    category: "Electronics",
    isSale: true,
  },
  {
    id: "6",
    name: "Ergonomic Desk Lamp LED",
    slug: "ergonomic-desk-lamp-led",
    price: 59.99,
    image: "💡",
    rating: 4.4,
    reviewCount: 134,
    category: "Electronics",
  },
  {
    id: "7",
    name: "Noise Cancelling Headphones",
    slug: "noise-cancelling-headphones",
    price: 199.99,
    compareAtPrice: 299.99,
    image: "🎧",
    rating: 4.9,
    reviewCount: 523,
    category: "Electronics",
    isSale: true,
  },
  {
    id: "8",
    name: "Digital Art Course Bundle",
    slug: "digital-art-course-bundle",
    price: 49.99,
    image: "🎨",
    rating: 4.8,
    reviewCount: 87,
    category: "Digital",
    isNew: true,
  },
  {
    id: "9",
    name: "Portable Power Bank 20000mAh",
    slug: "portable-power-bank-20000mah",
    price: 39.99,
    image: "🔋",
    rating: 4.6,
    reviewCount: 312,
    category: "Electronics",
  },
  {
    id: "10",
    name: "Student Hoodie - Classic",
    slug: "student-hoodie-classic",
    price: 49.99,
    compareAtPrice: 69.99,
    image: "👕",
    rating: 4.7,
    reviewCount: 456,
    category: "Fashion",
    isSale: true,
  },
  {
    id: "11",
    name: "Wireless Mouse Ergonomic",
    slug: "wireless-mouse-ergonomic",
    price: 29.99,
    image: "🖱️",
    rating: 4.5,
    reviewCount: 234,
    category: "Electronics",
  },
  {
    id: "12",
    name: "Programming Books Bundle",
    slug: "programming-books-bundle",
    price: 89.99,
    compareAtPrice: 149.99,
    image: "📚",
    rating: 4.9,
    reviewCount: 178,
    category: "Books",
    isSale: true,
  },
];

const categories = [
  "All",
  "Electronics",
  "Fashion",
  "Books",
  "Digital",
  "Sports",
];

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const { addItem } = useCart();

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesCategory && matchesSearch && matchesPrice;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return a.isNew ? -1 : 1;
      default:
        return 0;
    }
  });

  const handleAddToCart = (product: (typeof products)[0]) => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      isDigital: product.category === "Digital",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0A0A0A]">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#0A0A0A] to-gray-900 py-12">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-[#E8FF00]">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">Products</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            All Products
          </h1>
          <p className="text-gray-400 mt-2">
            Discover our wide range of student essentials
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 sticky top-24">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filters
              </h3>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Category
                </h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === category
                          ? "bg-[#E8FF00] text-[#0A0A0A] font-medium"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Price Range
                </h4>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([Number(e.target.value), priceRange[1]])
                    }
                    className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], Number(e.target.value)])
                    }
                    className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm"
                  />
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setPriceRange([0, 500]);
                  setSearchQuery("");
                }}
                className="w-full py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                {/* Search */}
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E8FF00]"
                  />
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto">
                  {/* Mobile Filter Toggle */}
                  <button
                    onClick={() => setShowFilters(true)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                  </button>

                  {/* Sort */}
                  <div className="relative flex-1 sm:flex-initial">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full appearance-none px-4 py-2 pr-10 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E8FF00]"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Top Rated</option>
                      <option value="newest">Newest</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>

                  {/* View Toggle */}
                  <div className="hidden sm:flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded ${
                        viewMode === "grid"
                          ? "bg-white dark:bg-gray-600 shadow"
                          : ""
                      }`}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded ${
                        viewMode === "list"
                          ? "bg-white dark:bg-gray-600 shadow"
                          : ""
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Showing {sortedProducts.length} of {products.length} products
            </p>

            {/* Products Grid */}
            <div
              className={`grid gap-4 ${
                viewMode === "grid"
                  ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1"
              }`}
            >
              {sortedProducts.map((product) => (
                <div
                  key={product.id}
                  className={`group bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all ${
                    viewMode === "list" ? "flex flex-row" : ""
                  }`}
                >
                  {/* Image */}
                  <Link
                    href={`/products/${product.slug}`}
                    className={`relative block ${
                      viewMode === "list" ? "w-40 flex-shrink-0" : ""
                    }`}
                  >
                    <div
                      className={`bg-gray-100 dark:bg-gray-700 flex items-center justify-center ${
                        viewMode === "list" ? "h-full" : "aspect-square"
                      }`}
                    >
                      <span className="text-5xl">{product.image}</span>
                    </div>
                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {product.isNew && (
                        <span className="px-2 py-0.5 bg-[#E8FF00] text-[#0A0A0A] text-xs font-bold rounded">
                          NEW
                        </span>
                      )}
                      {product.isSale && (
                        <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded">
                          SALE
                        </span>
                      )}
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="p-4 flex-1">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                      {product.category}
                    </p>
                    <Link href={`/products/${product.slug}`}>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-[#E8FF00] transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(product.rating)
                              ? "text-[#E8FF00] fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-xs text-gray-500">
                        ({product.reviewCount})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-bold text-gray-900 dark:text-white">
                        GH₵ {product.price.toFixed(2)}
                      </span>
                      {product.compareAtPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          GH₵ {product.compareAtPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 py-2 bg-[#0A0A0A] dark:bg-[#E8FF00] text-white dark:text-[#0A0A0A] text-sm font-medium rounded-lg flex items-center justify-center gap-1 hover:bg-[#E8FF00] hover:text-[#0A0A0A] transition-colors"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add
                      </button>
                      <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {sortedProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  No products found matching your criteria.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setPriceRange([0, 500]);
                    setSearchQuery("");
                  }}
                  className="px-6 py-2 bg-[#E8FF00] text-[#0A0A0A] font-medium rounded-full"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setShowFilters(false)}
          />
          <div className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-gray-800 p-6 overflow-y-auto animate-slide-in-right">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg">Filters</h3>
              <button onClick={() => setShowFilters(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-3">Category</h4>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                      selectedCategory === category
                        ? "bg-[#E8FF00] text-[#0A0A0A]"
                        : "bg-gray-100 dark:bg-gray-700"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Apply Button */}
            <button
              onClick={() => setShowFilters(false)}
              className="w-full py-3 bg-[#E8FF00] text-[#0A0A0A] font-semibold rounded-lg"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
