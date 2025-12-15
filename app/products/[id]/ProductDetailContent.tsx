"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Star,
  Heart,
  ShoppingCart,
  Share2,
  ChevronRight,
  Minus,
  Plus,
  Truck,
  Shield,
  RefreshCcw,
  Check,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useParams } from "next/navigation";

// Demo product data - would come from API
const getProduct = (slug: string) => ({
  id: "1",
  name: "Wireless Bluetooth Earbuds Pro",
  slug: "wireless-bluetooth-earbuds-pro",
  price: 149.99,
  compareAtPrice: 249.99,
  description: `Experience premium sound quality with our Wireless Bluetooth Earbuds Pro. Designed specifically for students who need reliable audio for lectures, studying, and entertainment.

Features:
• Active Noise Cancellation for distraction-free studying
• 30-hour battery life with charging case
• IPX5 water resistance for workouts
• Bluetooth 5.3 for stable connection
• Touch controls for easy operation
• Built-in microphone for calls and voice assistants`,
  shortDescription:
    "Premium wireless earbuds with active noise cancellation and 30-hour battery life.",
  images: ["🎧", "📦", "🎵"],
  category: "Electronics",
  rating: 4.8,
  reviewCount: 256,
  stock: 50,
  isDigital: false,
  tags: ["wireless", "bluetooth", "earbuds", "audio"],
  specifications: [
    { name: "Battery Life", value: "30 hours (with case)" },
    { name: "Bluetooth Version", value: "5.3" },
    { name: "Water Resistance", value: "IPX5" },
    { name: "Noise Cancellation", value: "Active (ANC)" },
    { name: "Driver Size", value: "12mm" },
    { name: "Weight", value: "5g per earbud" },
  ],
});

export default function ProductDetailContent() {
  const params = useParams();
  const product = getProduct(params.id as string);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const { addItem, isInCart } = useCart();

  const discountPercentage = product.compareAtPrice
    ? Math.round(
        ((product.compareAtPrice - product.price) / product.compareAtPrice) *
          100
      )
    : 0;

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity,
      isDigital: product.isDigital,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0A0A0A]">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-[#E8FF00]">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link
              href="/products"
              className="text-gray-500 hover:text-[#E8FF00]"
            >
              Products
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link
              href={`/products?category=${product.category.toLowerCase()}`}
              className="text-gray-500 hover:text-[#E8FF00]"
            >
              {product.category}
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 dark:text-white font-medium truncate max-w-[200px]">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 flex items-center justify-center relative overflow-hidden">
              <span className="text-9xl">{product.images[selectedImage]}</span>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {discountPercentage > 0 && (
                  <span className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full">
                    -{discountPercentage}% OFF
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button className="w-10 h-10 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-lg hover:bg-[#E8FF00] hover:text-[#0A0A0A] transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-lg hover:bg-[#E8FF00] hover:text-[#0A0A0A] transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 bg-white dark:bg-gray-800 rounded-xl border-2 flex items-center justify-center transition-all ${
                    selectedImage === index
                      ? "border-[#E8FF00]"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                  }`}
                >
                  <span className="text-3xl">{image}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category & Rating */}
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm font-medium rounded-full">
                {product.category}
              </span>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "text-[#E8FF00] fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              {product.name}
            </h1>

            {/* Short Description */}
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {product.shortDescription}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">
                GH₵ {product.price.toFixed(2)}
              </span>
              {product.compareAtPrice && (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    GH₵ {product.compareAtPrice.toFixed(2)}
                  </span>
                  <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-medium rounded-full">
                    Save GH₵{" "}
                    {(product.compareAtPrice - product.price).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-600 dark:text-green-400 font-medium">
                In Stock ({product.stock} available)
              </span>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="w-16 text-center font-medium text-lg">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(product.stock, quantity + 1))
                  }
                  className="w-12 h-12 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 bg-[#E8FF00] text-[#0A0A0A] font-bold text-lg rounded-xl flex items-center justify-center gap-2 hover:bg-[#F5FF80] hover:shadow-lg hover:shadow-[#E8FF00]/30 transition-all"
              >
                {isInCart(product.id) ? (
                  <>
                    <Check className="w-5 h-5" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </>
                )}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 py-6 border-t border-b border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <Truck className="w-8 h-8 mx-auto text-[#E8FF00] mb-2" />
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Free Delivery
                </p>
                <p className="text-xs text-gray-500">Orders over GH₵100</p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 mx-auto text-[#E8FF00] mb-2" />
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  1 Year Warranty
                </p>
                <p className="text-xs text-gray-500">Full coverage</p>
              </div>
              <div className="text-center">
                <RefreshCcw className="w-8 h-8 mx-auto text-[#E8FF00] mb-2" />
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Easy Returns
                </p>
                <p className="text-xs text-gray-500">30-day policy</p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/products?tag=${tag}`}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm rounded-full hover:bg-[#E8FF00] hover:text-[#0A0A0A] transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12">
          {/* Tab Headers */}
          <div className="flex gap-1 border-b border-gray-200 dark:border-gray-700">
            {["description", "specifications", "reviews"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? "text-[#E8FF00] border-b-2 border-[#E8FF00]"
                    : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="py-8">
            {activeTab === "description" && (
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <div className="whitespace-pre-line text-gray-600 dark:text-gray-400">
                  {product.description}
                </div>
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="max-w-2xl">
                <div className="grid grid-cols-1 divide-y divide-gray-200 dark:divide-gray-700">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="flex py-4">
                      <span className="w-1/2 font-medium text-gray-900 dark:text-white">
                        {spec.name}
                      </span>
                      <span className="w-1/2 text-gray-600 dark:text-gray-400">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Reviews coming soon! Be the first to review this product.
                </p>
                <button className="px-6 py-3 bg-[#E8FF00] text-[#0A0A0A] font-medium rounded-full">
                  Write a Review
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
