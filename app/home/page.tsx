import HeroSection from "@/components/home/HeroSection";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import { Truck, RefreshCcw, Headphones, CreditCard } from "lucide-react";
import Link from "next/link";

// Features section component
function FeaturesSection() {
  const features = [
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Free Delivery",
      description: "On orders over GH₵100",
    },
    {
      icon: <RefreshCcw className="w-6 h-6" />,
      title: "Easy Returns",
      description: "30-day return policy",
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "24/7 Support",
      description: "Chat with us anytime",
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Secure Payments",
      description: "Mobile money & cards",
    },
  ];

  return (
    <section className="py-12 bg-[#32CD32]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-4"
            >
              <div className="w-14 h-14 bg-[#0A0A0A] rounded-full flex items-center justify-center mb-3 text-[#32CD32]">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-[#0A0A0A] mb-1">
                {feature.title}
              </h3>
              <p className="text-sm text-[#0A0A0A]/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Deals Banner component
function DealsBanner() {
  return (
    <section className="py-16 bg-gradient-to-r from-[#0A0A0A] via-gray-900 to-[#0A0A0A] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #32CD32 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <span className="inline-block px-4 py-1 bg-red-500 text-white text-sm font-bold rounded-full mb-4 animate-pulse">
              🔥 LIMITED TIME OFFER
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Flash Sale!
              <br />
              <span className="text-[#32CD32]">Up to 70% OFF</span>
            </h2>
            <p className="text-gray-400 text-lg mb-6 max-w-md">
              Don&apos;t miss out on incredible deals. Grab your favorites
              before they&apos;re gone!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                href="/deals"
                className="px-8 py-4 bg-[#32CD32] text-[#0A0A0A] font-bold rounded-full hover:bg-[#3DE03D] transition-colors"
              >
                Shop Deals Now
              </Link>
              <div className="flex items-center gap-2 text-white">
                <span className="text-sm">Ends in:</span>
                <div className="flex gap-1">
                  <span className="px-2 py-1 bg-white/10 rounded font-mono">
                    12
                  </span>
                  <span>:</span>
                  <span className="px-2 py-1 bg-white/10 rounded font-mono">
                    34
                  </span>
                  <span>:</span>
                  <span className="px-2 py-1 bg-white/10 rounded font-mono">
                    56
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sale Products Preview */}
          <div className="flex gap-4">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-[#32CD32]/20 to-[#32CD32]/5 rounded-2xl flex items-center justify-center transform rotate-6 hover:rotate-0 transition-transform">
              <span className="text-5xl md:text-6xl">👟</span>
            </div>
            <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-[#32CD32]/20 to-[#32CD32]/5 rounded-2xl flex items-center justify-center transform -rotate-6 hover:rotate-0 transition-transform">
              <span className="text-5xl md:text-6xl">📱</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Newsletter section
function NewsletterSection() {
  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Subscribe to our newsletter and get exclusive deals, early access to
            sales, and student tips delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-[#32CD32] text-gray-900 dark:text-white"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-[#32CD32] text-[#0A0A0A] font-semibold rounded-full hover:bg-[#3DE03D] transition-colors"
            >
              Subscribe
            </button>
          </form>
          <p className="text-sm text-gray-500 mt-4">
            By subscribing, you agree to our Privacy Policy. Unsubscribe
            anytime.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <CategoryGrid />
      <FeaturedProducts />
      <DealsBanner />
      <NewsletterSection />
    </>
  );
}
