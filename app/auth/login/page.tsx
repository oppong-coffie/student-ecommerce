"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [show2FA, setShow2FA] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const { login, verify2FA } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await login(email, password);

    if (result.success) {
      if (result.requires2FA) {
        setShow2FA(true);
      } else {
        router.push("/");
      }
    } else {
      setError(result.error || "Login failed");
    }

    setIsLoading(false);
  };

  const handle2FASubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await verify2FA(otpCode);

    if (result.success) {
      router.push("/");
    } else {
      setError(result.error || "Verification failed");
    }

    setIsLoading(false);
  };

  if (show2FA) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0A0A0A] py-12 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#E8FF00] rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-[#0A0A0A]" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Two-Factor Authentication
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Enter the verification code sent to your email
              </p>
            </div>

            <form onSubmit={handle2FASubmit} className="space-y-6">
              {error && (
                <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
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
                  className="w-full text-center text-2xl tracking-[0.5em] py-4 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E8FF00]"
                  maxLength={6}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || otpCode.length !== 6}
                className="w-full py-4 bg-[#E8FF00] text-[#0A0A0A] font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#F5FF80] disabled:opacity-50 transition-all"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Verify"
                )}
              </button>

              <button
                type="button"
                className="w-full text-center text-sm text-gray-500 hover:text-[#E8FF00]"
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0A0A0A] py-12 px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-12 h-12 bg-[#E8FF00] rounded-xl flex items-center justify-center">
              <span className="text-[#0A0A0A] font-bold text-2xl">S</span>
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              Student<span className="text-[#E8FF00]">Shop</span>
            </span>
          </Link>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
            Sign in to your account to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E8FF00] focus:border-transparent"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-[#E8FF00] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-11 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E8FF00] focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-gray-300 text-[#E8FF00] focus:ring-[#E8FF00]"
              />
              <label
                htmlFor="remember"
                className="text-sm text-gray-600 dark:text-gray-400"
              >
                Remember me for 30 days
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-[#E8FF00] text-[#0A0A0A] font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#F5FF80] disabled:opacity-50 transition-all"
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
              <div className="w-full border-t border-gray-200 dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-gray-800 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <button className="py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <span className="text-xl">🔵</span>
              <span className="font-medium">Google</span>
            </button>
            <button className="py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <span className="text-xl">📘</span>
              <span className="font-medium">Facebook</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="text-[#E8FF00] font-medium hover:underline"
            >
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
