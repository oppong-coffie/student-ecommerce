import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Shield } from "lucide-react";

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[600px] bg-gradient-to-br from-[#0A0A0A] via-[#171717] to-[#0A0A0A] overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#E8FF00]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#E8FF00]/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E8FF00]/5 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(232, 255, 0, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(232, 255, 0, 0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 py-16 lg:py-24">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E8FF00]/10 border border-[#E8FF00]/20 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-[#E8FF00]" />
              <span className="text-[#E8FF00] text-sm font-medium">
                New Arrivals Available
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Shop Smart,
              <br />
              <span className="text-[#E8FF00]">Save More</span>
              <br />
              Study Better
            </h1>

            {/* Description */}
            <p className="text-gray-400 text-lg md:text-xl max-w-xl mb-8 mx-auto lg:mx-0">
              Your one-stop destination for all student essentials. From
              electronics to books, get everything you need at student-friendly
              prices.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#E8FF00] text-[#0A0A0A] font-semibold rounded-full hover:bg-[#F5FF80] hover:shadow-[0_0_30px_rgba(232,255,0,0.4)] transition-all duration-300 group"
              >
                Shop Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/deals"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-[#E8FF00] text-[#E8FF00] font-semibold rounded-full hover:bg-[#E8FF00] hover:text-[#0A0A0A] transition-all duration-300"
              >
                View Deals 🔥
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-6 mt-10 justify-center lg:justify-start">
              <div className="flex items-center gap-2 text-gray-400">
                <Zap className="w-5 h-5 text-[#E8FF00]" />
                <span className="text-sm">Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Shield className="w-5 h-5 text-[#E8FF00]" />
                <span className="text-sm">Secure Payments</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <span className="text-[#E8FF00] font-bold">24/7</span>
                <span className="text-sm">Support</span>
              </div>
            </div>
          </div>

          {/* Right Content - Featured Product Card */}
          <div className="flex-1 relative">
            <div className="relative max-w-md mx-auto">
              {/* Floating Cards */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-[#E8FF00] to-[#C4D900] rounded-2xl shadow-2xl flex items-center justify-center animate-bounce z-10">
                <div className="text-center">
                  <p className="text-[#0A0A0A] font-bold text-xl">50%</p>
                  <p className="text-[#0A0A0A] text-xs font-medium">OFF</p>
                </div>
              </div>

              {/* Main Product Card */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 border border-gray-700 shadow-2xl">
                <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl mb-6 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-6xl">💻</span>
                    <p className="text-gray-400 mt-4 text-sm">
                      Featured Product
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 bg-[#E8FF00]/10 text-[#E8FF00] text-xs font-medium rounded">
                      BESTSELLER
                    </span>
                    <span className="px-2 py-1 bg-red-500/10 text-red-400 text-xs font-medium rounded">
                      HOT
                    </span>
                  </div>
                  <h3 className="text-white font-semibold text-lg">
                    Student Laptop Pro
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className="text-[#E8FF00] font-bold text-2xl">
                      GH₵ 2,499
                    </span>
                    <span className="text-gray-500 line-through text-sm">
                      GH₵ 4,999
                    </span>
                  </div>
                  <button className="w-full py-3 bg-[#E8FF00] text-[#0A0A0A] font-semibold rounded-xl hover:bg-[#F5FF80] transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>

              {/* Floating Stats */}
              <div className="absolute -bottom-4 -right-4 px-4 py-3 bg-white dark:bg-gray-800 rounded-xl shadow-xl">
                <p className="text-sm text-gray-500">Happy Students</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  10K+
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
