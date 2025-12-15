"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Package,
  Settings,
  Heart,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { itemCount } = useCart();

  const categories = [
    { name: "Electronics", href: "/products?category=electronics" },
    { name: "Fashion", href: "/products?category=fashion" },
    { name: "Books", href: "/products?category=books" },
    { name: "Digital Products", href: "/products?category=digital" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(
        searchQuery
      )}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0A0A0A] border-b border-gray-800">
      {/* Top Bar - Promo */}
      <div className="bg-[#E8FF00] text-[#0A0A0A] text-center py-2 text-sm font-medium">
        🎉 Free delivery on orders over GH₵100 | Use code: STUDENT10 for 10% off
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#E8FF00] rounded-lg flex items-center justify-center">
              <span className="text-[#0A0A0A] font-bold text-xl">S</span>
            </div>
            <span className="text-white font-bold text-xl hidden sm:block">
              Student<span className="text-[#E8FF00]">Shop</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-300 hover:text-[#E8FF00] transition-colors font-medium"
            >
              Home
            </Link>

            {/* Categories Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-300 hover:text-[#E8FF00] transition-colors font-medium">
                Categories
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-200 dark:border-gray-800">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    className="block px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-[#E8FF00] hover:text-[#0A0A0A] transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/products"
              className="text-gray-300 hover:text-[#E8FF00] transition-colors font-medium"
            >
              All Products
            </Link>

            <Link
              href="/deals"
              className="text-[#E8FF00] font-medium flex items-center gap-1"
            >
              🔥 Deals
            </Link>
          </nav>

          {/* Search Bar - Desktop */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center flex-1 max-w-md mx-8"
          >
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-4 py-2.5 pl-10 bg-gray-800 border border-gray-700 rounded-full text-white placeholder:text-gray-400 focus:outline-none focus:border-[#E8FF00] focus:ring-1 focus:ring-[#E8FF00] transition-all"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-[#E8FF00] transition-colors"
            >
              <Search className="w-6 h-6" />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="hidden sm:flex p-2 text-gray-300 hover:text-[#E8FF00] transition-colors relative"
            >
              <Heart className="w-6 h-6" />
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="p-2 text-gray-300 hover:text-[#E8FF00] transition-colors relative"
            >
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#E8FF00] text-[#0A0A0A] text-xs font-bold rounded-full flex items-center justify-center">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="p-2 text-gray-300 hover:text-[#E8FF00] transition-colors"
              >
                <User className="w-6 h-6" />
              </button>

              {isUserMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-xl z-20 border border-gray-200 dark:border-gray-800">
                    <Link
                      href="/auth/login"
                      className="block px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-[#E8FF00] hover:text-[#0A0A0A] transition-colors rounded-t-lg"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/register"
                      className="block px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-[#E8FF00] hover:text-[#0A0A0A] transition-colors"
                    >
                      Create Account
                    </Link>
                    <hr className="border-gray-200 dark:border-gray-800" />
                    <Link
                      href="/account/orders"
                      className="flex items-center gap-2 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-[#E8FF00] hover:text-[#0A0A0A] transition-colors"
                    >
                      <Package className="w-4 h-4" />
                      My Orders
                    </Link>
                    <Link
                      href="/account"
                      className="flex items-center gap-2 px-4 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-[#E8FF00] hover:text-[#0A0A0A] transition-colors rounded-b-lg"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </Link>
                  </div>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-300 hover:text-[#E8FF00] transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <form onSubmit={handleSearch} className="md:hidden py-3">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-4 py-2.5 pl-10 bg-gray-800 border border-gray-700 rounded-full text-white placeholder:text-gray-400 focus:outline-none focus:border-[#E8FF00] transition-all"
                autoFocus
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </form>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-gray-900 border-t border-gray-800">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            <Link
              href="/"
              className="px-4 py-2.5 text-gray-300 hover:bg-[#E8FF00] hover:text-[#0A0A0A] rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="px-4 py-2.5 text-gray-300 hover:bg-[#E8FF00] hover:text-[#0A0A0A] rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              All Products
            </Link>
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="px-4 py-2.5 text-gray-300 hover:bg-[#E8FF00] hover:text-[#0A0A0A] rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
            <Link
              href="/deals"
              className="px-4 py-2.5 text-[#E8FF00] hover:bg-[#E8FF00] hover:text-[#0A0A0A] rounded-lg transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              🔥 Deals
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
