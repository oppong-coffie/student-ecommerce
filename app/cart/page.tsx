"use client";

// Prevent static prerendering - this page uses CartContext
export const dynamic = "force-dynamic";

import React from "react";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export default function CartPage() {
  const { items, subtotal, itemCount, updateQuantity, removeItem, clearCart } =
    useCart();

  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.125; // 12.5% VAT
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#E8FF00] text-[#0A0A0A] font-semibold rounded-full hover:bg-[#F5FF80] transition-colors"
          >
            Start Shopping
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0A0A0A]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A0A0A] to-gray-900 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white">Shopping Cart</h1>
          <p className="text-gray-400 mt-1">{itemCount} item(s) in your cart</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-500">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-right">Subtotal</div>
              </div>

              {/* Items */}
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 md:grid md:grid-cols-12 md:gap-4 md:items-center"
                  >
                    {/* Product */}
                    <div className="col-span-6 flex gap-4 mb-4 md:mb-0">
                      <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-4xl">{item.image}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 dark:text-white line-clamp-2">
                          {item.name}
                        </h3>
                        {item.isDigital && (
                          <span className="inline-block mt-1 px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-medium rounded">
                            Digital Product
                          </span>
                        )}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="flex items-center gap-1 mt-2 text-sm text-red-500 hover:text-red-600 md:hidden"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="col-span-2 flex items-center justify-between md:justify-center mb-4 md:mb-0">
                      <span className="md:hidden text-sm text-gray-500">
                        Quantity:
                      </span>
                      <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-2 text-center hidden md:block text-gray-600 dark:text-gray-400">
                      GH₵ {item.price.toFixed(2)}
                    </div>

                    {/* Subtotal & Remove */}
                    <div className="col-span-2 flex items-center justify-between md:justify-end gap-4">
                      <span className="md:hidden text-sm text-gray-500">
                        Subtotal:
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        GH₵ {(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="hidden md:flex w-8 h-8 items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
              <Link
                href="/products"
                className="text-gray-600 dark:text-gray-400 hover:text-[#E8FF00] font-medium"
              >
                ← Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="text-red-500 hover:text-red-600 font-medium"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-96">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Order Summary
              </h2>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#E8FF00]"
                  />
                  <button className="px-4 py-2 bg-gray-900 dark:bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-800">
                    Apply
                  </button>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>GH₵ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-500">FREE</span>
                    ) : (
                      `GH₵ ${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax (12.5%)</span>
                  <span>GH₵ {tax.toFixed(2)}</span>
                </div>
                <hr className="border-gray-200 dark:border-gray-700" />
                <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                  <span>Total</span>
                  <span>GH₵ {total.toFixed(2)}</span>
                </div>
              </div>

              {/* Free Shipping Progress */}
              {subtotal < 100 && (
                <div className="mb-6 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Add{" "}
                    <span className="font-semibold text-[#0A0A0A] dark:text-[#E8FF00]">
                      GH₵ {(100 - subtotal).toFixed(2)}
                    </span>{" "}
                    more for free shipping!
                  </p>
                  <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-[#E8FF00] h-2 rounded-full transition-all"
                      style={{
                        width: `${Math.min(100, (subtotal / 100) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Checkout Button */}
              <Link
                href="/checkout"
                className="block w-full py-4 bg-[#E8FF00] text-[#0A0A0A] font-bold text-center rounded-xl hover:bg-[#F5FF80] hover:shadow-lg hover:shadow-[#E8FF00]/30 transition-all"
              >
                Proceed to Checkout
              </Link>

              {/* Payment Methods */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500 mb-2">We Accept</p>
                <div className="flex items-center justify-center gap-3">
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                    💳 Cards
                  </span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                    📱 Mobile Money
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
