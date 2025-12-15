"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  productCount: number;
  color: string;
}

const categories: Category[] = [
  {
    id: "1",
    name: "Electronics",
    slug: "electronics",
    icon: "💻",
    productCount: 150,
    color: "from-blue-500/20 to-blue-600/20",
  },
  {
    id: "2",
    name: "Fashion",
    slug: "fashion",
    icon: "👕",
    productCount: 230,
    color: "from-pink-500/20 to-pink-600/20",
  },
  {
    id: "3",
    name: "Books & Stationery",
    slug: "books",
    icon: "📚",
    productCount: 180,
    color: "from-amber-500/20 to-amber-600/20",
  },
  {
    id: "4",
    name: "Digital Products",
    slug: "digital",
    icon: "🎮",
    productCount: 95,
    color: "from-purple-500/20 to-purple-600/20",
  },
  {
    id: "5",
    name: "Food & Snacks",
    slug: "food",
    icon: "🍕",
    productCount: 120,
    color: "from-red-500/20 to-red-600/20",
  },
  {
    id: "6",
    name: "Sports & Fitness",
    slug: "sports",
    icon: "⚽",
    productCount: 85,
    color: "from-green-500/20 to-green-600/20",
  },
];

const CategoryGrid: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Shop by Category
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Find exactly what you need from our curated collections
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-[#0A0A0A] dark:text-[#E8FF00] font-medium hover:gap-3 transition-all group"
          >
            View All Categories
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="group relative p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-[#E8FF00] hover:shadow-lg hover:shadow-[#E8FF00]/10 transition-all duration-300"
            >
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity`}
              />

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-14 h-14 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-3xl">{category.icon}</span>
                </div>

                {/* Name */}
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-[#0A0A0A] dark:group-hover:text-white">
                  {category.name}
                </h3>

                {/* Product Count */}
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {category.productCount} Products
                </p>
              </div>

              {/* Hover Arrow */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-[#E8FF00] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all">
                <ArrowRight className="w-4 h-4 text-[#0A0A0A]" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
