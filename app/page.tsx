"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  ShoppingBag,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [show2FA, setShow2FA] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate login - in production, call your auth API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For demo, redirect to homepage after login
    router.push("/home");
    setIsLoading(false);
  };

  const handle2FASubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.push("/home");
    setIsLoading(false);
  };

  if (show2FA) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] py-12 px-4">
        <div className="max-w-md w-full">
          <div className="bg-[#111111] rounded-3xl shadow-2xl p-8 border border-gray-800">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#32CD32] rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-[#0A0A0A]" />
              </div>
              <h1 className="text-2xl font-bold text-white">
                Two-Factor Authentication
              </h1>
              <p className="text-gray-400 mt-2">
                Enter the verification code sent to your email
              </p>
            </div>

            <form onSubmit={handle2FASubmit} className="space-y-6">
              {error && (
                <div className="p-3 bg-red-900/30 border border-red-800 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div>
                <input
                  type="text"
                  value={otpCode}
                  onChange={(e) =>
                    setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  placeholder="Enter 6-digit code"
                  className="w-full text-center text-2xl tracking-[0.5em] py-4 bg-[#1a1a1a] border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#32CD32] focus:border-transparent"
                  maxLength={6}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || otpCode.length !== 6}
                className="w-full py-4 bg-[#32CD32] text-[#0A0A0A] font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#3DE03D] hover:shadow-[0_0_30px_rgba(50,205,50,0.4)] disabled:opacity-50 transition-all"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Verify"
                )}
              </button>

              <button
                type="button"
                className="w-full text-center text-sm text-gray-400 hover:text-[#32CD32]"
              >
                Didn&apos;t receive the code? Resend
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#0A0A0A]">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0A0A0A] via-[#111111] to-[#0A0A0A] relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#32CD32]/20 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-20 right-10 w-96 h-96 bg-[#32CD32]/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 bg-[#32CD32] rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(50,205,50,0.4)]">
              <ShoppingBag className="w-8 h-8 text-[#0A0A0A]" />
            </div>
            <span className="text-3xl font-bold text-white">
              Student<span className="text-[#32CD32]">Shop</span>
            </span>
          </div>

          {/* Hero Text */}
          <h1 className="text-5xl font-bold text-white text-center leading-tight mb-6">
            Shop Smart,
            <br />
            <span className="text-[#32CD32]">Save More</span>
          </h1>

          <p className="text-gray-400 text-center text-lg max-w-md mb-10">
            Your one-stop destination for all student essentials at
            student-friendly prices.
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 max-w-md">
            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-gray-800">
              <div className="w-10 h-10 bg-[#32CD32]/20 rounded-lg flex items-center justify-center">
                <span className="text-[#32CD32]">🚚</span>
              </div>
              <span className="text-white text-sm">Free Delivery</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-gray-800">
              <div className="w-10 h-10 bg-[#32CD32]/20 rounded-lg flex items-center justify-center">
                <span className="text-[#32CD32]">🔒</span>
              </div>
              <span className="text-white text-sm">Secure Payments</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-gray-800">
              <div className="w-10 h-10 bg-[#32CD32]/20 rounded-lg flex items-center justify-center">
                <span className="text-[#32CD32]">💳</span>
              </div>
              <span className="text-white text-sm">Mobile Money</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-gray-800">
              <div className="w-10 h-10 bg-[#32CD32]/20 rounded-lg flex items-center justify-center">
                <span className="text-[#32CD32]">⭐</span>
              </div>
              <span className="text-white text-sm">Top Quality</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex items-center justify-center gap-2 mb-8 lg:hidden">
            <div className="w-12 h-12 bg-[#32CD32] rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-[#0A0A0A]" />
            </div>
            <span className="text-2xl font-bold text-white">
              Student<span className="text-[#32CD32]">Shop</span>
            </span>
          </div>

          {/* Form Card */}
          <div className="bg-[#111111] rounded-3xl shadow-2xl p-8 border border-gray-800">
            <h1 className="text-3xl font-bold text-white text-center mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-400 text-center mb-8">
              Sign in to continue shopping
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3 bg-red-900/30 border border-red-800 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  {/* <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" /> */}
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-[#1a1a1a] border border-gray-700 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#32CD32] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-medium text-gray-300">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-[#32CD32] hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  {/* <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" /> */}
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-12 pr-12 py-3.5 bg-[#1a1a1a] border border-gray-700 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#32CD32] focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 rounded border-gray-600 bg-[#1a1a1a] text-[#32CD32] focus:ring-[#32CD32] focus:ring-offset-0"
                />
                <label htmlFor="remember" className="text-sm text-gray-400">
                  Remember me for 30 days
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-[#32CD32] text-[#0A0A0A] font-bold text-lg rounded-xl flex items-center justify-center gap-2 hover:bg-[#3DE03D] hover:shadow-[0_0_30px_rgba(50,205,50,0.4)] disabled:opacity-50 transition-all"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[#111111] text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <button className="py-3 px-4 bg-[#1a1a1a] border border-gray-700 rounded-xl flex items-center justify-center gap-2 hover:bg-[#222] hover:border-gray-600 transition-colors">
                <span className="text-xl">🔵</span>
                <span className="font-medium text-white">Google</span>
              </button>
              <button className="py-3 px-4 bg-[#1a1a1a] border border-gray-700 rounded-xl flex items-center justify-center gap-2 hover:bg-[#222] hover:border-gray-600 transition-colors">
                <span className="text-xl">📘</span>
                <span className="font-medium text-white">Facebook</span>
              </button>
            </div>

            {/* Sign Up Link */}
            <p className="mt-8 text-center text-sm text-gray-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-[#32CD32] font-medium hover:underline"
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
