import React from "react";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Smartphone,
  Shield,
} from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A0A] text-gray-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & About */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[#E8FF00] rounded-lg flex items-center justify-center">
                <span className="text-[#0A0A0A] font-bold text-xl">S</span>
              </div>
              <span className="text-white font-bold text-xl">
                Student<span className="text-[#E8FF00]">Shop</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Your one-stop shop for all student essentials. Quality products at
              student-friendly prices.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#E8FF00] hover:text-[#0A0A0A] transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#E8FF00] hover:text-[#0A0A0A] transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#E8FF00] hover:text-[#0A0A0A] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[#E8FF00] hover:text-[#0A0A0A] transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/products"
                  className="hover:text-[#E8FF00] transition-colors text-sm"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/deals"
                  className="hover:text-[#E8FF00] transition-colors text-sm"
                >
                  Deals & Offers
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=digital"
                  className="hover:text-[#E8FF00] transition-colors text-sm"
                >
                  Digital Products
                </Link>
              </li>
              <li>
                <Link
                  href="/account/orders"
                  className="hover:text-[#E8FF00] transition-colors text-sm"
                >
                  Track Order
                </Link>
              </li>
              <li>
                <Link
                  href="/wishlist"
                  className="hover:text-[#E8FF00] transition-colors text-sm"
                >
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Customer Service
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/help"
                  className="hover:text-[#E8FF00] transition-colors text-sm"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="hover:text-[#E8FF00] transition-colors text-sm"
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="hover:text-[#E8FF00] transition-colors text-sm"
                >
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-[#E8FF00] transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-[#E8FF00] transition-colors text-sm"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#E8FF00] flex-shrink-0 mt-0.5" />
                <span className="text-sm">
                  123 University Avenue, Accra, Ghana
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#E8FF00] flex-shrink-0" />
                <a
                  href="tel:+233123456789"
                  className="text-sm hover:text-[#E8FF00] transition-colors"
                >
                  +233 123 456 789
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#E8FF00] flex-shrink-0" />
                <a
                  href="mailto:support@studentshop.com"
                  className="text-sm hover:text-[#E8FF00] transition-colors"
                >
                  support@studentshop.com
                </a>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-white font-medium mb-2">
                Subscribe to Newsletter
              </h4>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-[#E8FF00]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#E8FF00] text-[#0A0A0A] font-semibold rounded-lg hover:bg-[#F5FF80] transition-colors text-sm"
                >
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods & Trust Badges */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">We Accept:</span>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 px-3 py-1.5 bg-gray-800 rounded-lg">
                  <CreditCard className="w-4 h-4 text-[#E8FF00]" />
                  <span className="text-xs">Cards</span>
                </div>
                <div className="flex items-center gap-1 px-3 py-1.5 bg-gray-800 rounded-lg">
                  <Smartphone className="w-4 h-4 text-[#E8FF00]" />
                  <span className="text-xs">Mobile Money</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Shield className="w-4 h-4 text-green-500" />
              <span>Secure Payments | 100% Safe</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-sm text-gray-500">
            <p>© {currentYear} StudentShop. All rights reserved.</p>
            <p>Made with 💛 for students</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
