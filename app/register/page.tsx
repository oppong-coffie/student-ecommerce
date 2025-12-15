"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Loader2,
  Check,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [storedPin, setStoredPin] = useState("");
  const [pinInput, setPinInput] = useState(["", "", "", ""]);
  const [pinError, setPinError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const router = useRouter();
  const pinRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const passwordRequirements = [
    { text: "8+ characters", met: password.length >= 8 },
    { text: "Number", met: /\d/.test(password) },
    { text: "Uppercase", met: /[A-Z]/.test(password) },
    { text: "Match", met: password === confirmPassword && password.length > 0 },
  ];

  const isPasswordValid = passwordRequirements.every((req) => req.met);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isPasswordValid) {
      setError("Please meet all password requirements");
      return;
    }

    if (!agreedToTerms) {
      setError("Please agree to the Terms of Service");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Registration failed. Please try again.");
        setIsLoading(false);
        return;
      }

      setStoredPin(data.verificationPin);
      localStorage.setItem("verificationPin", data.verificationPin);
      localStorage.setItem("pendingUserId", data.user.id);
      localStorage.setItem("pendingUserEmail", data.user.email);
      setSuccess(true);
    } catch (err) {
      setError("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePinChange = (index: number, value: string) => {
    if (value && !/^\d$/.test(value)) return;
    const newPin = [...pinInput];
    newPin[index] = value;
    setPinInput(newPin);
    setPinError("");
    if (value && index < 3) pinRefs[index + 1].current?.focus();
  };

  const handlePinKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !pinInput[index] && index > 0) {
      pinRefs[index - 1].current?.focus();
    }
  };

  const handlePinPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 4);
    if (/^\d+$/.test(pastedData)) {
      const newPin = pastedData.split("").concat(["", "", "", ""]).slice(0, 4);
      setPinInput(newPin);
      const lastIndex = Math.min(pastedData.length - 1, 3);
      pinRefs[lastIndex].current?.focus();
    }
  };

  const verifyPin = () => {
    const enteredPin = pinInput.join("");
    if (enteredPin.length !== 4) {
      setPinError("Please enter the complete 4-digit code");
      return;
    }
    setIsVerifying(true);
    const savedPin = storedPin || localStorage.getItem("verificationPin");
    if (enteredPin === savedPin) {
      localStorage.removeItem("verificationPin");
      localStorage.removeItem("pendingUserId");
      localStorage.removeItem("pendingUserEmail");
      router.push("/home");
    } else {
      setPinError("Invalid code. Please try again.");
      setIsVerifying(false);
    }
  };

  useEffect(() => {
    if (pinInput.join("").length === 4) verifyPin();
  }, [pinInput]);

  // PIN Verification Screen
  if (success) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
        {/* Background Effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#32CD32]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#32CD32]/5 rounded-full blur-[100px]" />
        </div>

        <div className="w-full max-w-md relative z-10">
          <div className="bg-[#111]/90 backdrop-blur-xl rounded-3xl p-10 border border-white/10 shadow-2xl">
            {/* Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-[#32CD32] to-[#228B22] rounded-2xl flex items-center justify-center shadow-lg shadow-[#32CD32]/30">
                  <Mail className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#32CD32] rounded-full flex items-center justify-center animate-pulse">
                  <Check className="w-4 h-4 text-[#0A0A0A]" />
                </div>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-white text-center mb-3">
              Check Your Email
            </h1>
            <p className="text-gray-400 text-center mb-8 text-base">
              We sent a verification code to
              <br />
              <span className="text-[#32CD32] font-medium">{email}</span>
            </p>

            {/* PIN Input */}
            <div
              className="flex justify-center gap-4 mb-6"
              onPaste={handlePinPaste}
            >
              {pinInput.map((digit, index) => (
                <input
                  key={index}
                  ref={pinRefs[index]}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handlePinChange(index, e.target.value)}
                  onKeyDown={(e) => handlePinKeyDown(index, e)}
                  className={`w-16 h-20 text-center text-3xl font-bold rounded-2xl bg-[#1a1a1a] border-2 text-white 
                    focus:outline-none focus:ring-4 focus:ring-[#32CD32]/30 transition-all duration-200
                    ${
                      pinError
                        ? "border-red-500"
                        : digit
                        ? "border-[#32CD32]"
                        : "border-white/10 hover:border-white/20"
                    }`}
                  autoFocus={index === 0}
                />
              ))}
            </div>

            {pinError && (
              <p className="text-red-400 text-sm text-center mb-4">
                {pinError}
              </p>
            )}

            <button
              onClick={verifyPin}
              disabled={isVerifying || pinInput.join("").length !== 4}
              className="w-full py-4 bg-gradient-to-r from-[#32CD32] to-[#228B22] text-white font-semibold text-lg rounded-2xl 
                flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#32CD32]/30 
                disabled:opacity-50 transition-all duration-300"
            >
              {isVerifying ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  Verify & Continue <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <p className="mt-8 text-center text-gray-500 text-sm">
              Didn&apos;t receive the code?{" "}
              <button className="text-[#32CD32] hover:underline font-medium">
                Resend
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Registration Form
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#111] to-[#0A0A0A]" />
        <div className="absolute top-20 left-20 w-64 h-64 bg-[#32CD32]/20 rounded-full blur-[80px] animate-pulse" />
        <div
          className="absolute bottom-32 right-20 w-80 h-80 bg-[#32CD32]/10 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        <div className="relative z-10 flex flex-col justify-center items-center w-full px-16">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-[#32CD32] to-[#228B22] rounded-2xl flex items-center justify-center shadow-xl shadow-[#32CD32]/30">
              <ShoppingBag className="w-9 h-9 text-white" />
            </div>
            <span className="text-4xl font-bold text-white">
              Student<span className="text-[#32CD32]">Shop</span>
            </span>
          </div>

          <h1 className="text-5xl font-bold text-white text-center leading-tight mb-6">
            Join the
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#32CD32] to-[#3DE03D]">
              Student Community
            </span>
          </h1>

          <p className="text-gray-400 text-center text-xl max-w-md mb-12">
            Access exclusive deals, student discounts, and amazing products.
          </p>

          <div className="grid grid-cols-2 gap-4 w-full max-w-md">
            {[
              { icon: "🎓", text: "Student Discounts" },
              { icon: "🚀", text: "Fast Delivery" },
              { icon: "💳", text: "Mobile Money" },
              { icon: "🔒", text: "Secure Shopping" },
            ].map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
              >
                <span className="text-2xl">{feature.icon}</span>
                <span className="text-white font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex items-center justify-center gap-2 mb-10 lg:hidden">
            <div className="w-12 h-12 bg-gradient-to-br from-[#32CD32] to-[#228B22] rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">
              Student<span className="text-[#32CD32]">Shop</span>
            </span>
          </div>

          {/* Form Card */}
          <div className="relative bg-[#111]/90 backdrop-blur-2xl rounded-3xl p-8 lg:p-10  border-white/10
  shadow-[0_20px_60px_rgba(0,0,0,0.55)]">

  {/* Header */}
  <div className="mb-8">
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#32CD32]/10 mb-3">
      <Sparkles className="w-4 h-4 text-[#32CD32]" />
      <span className="text-[#32CD32] text-xs font-semibold tracking-wide">
        GET STARTED
      </span>
    </div>

    <h1 className="text-3xl font-extrabold text-white tracking-tight">
      Create Account
    </h1>
    <p className="text-gray-400 mt-2">
      Join thousands of happy students
    </p>
  </div>

  {/* Error */}
  {error && (
    <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
      {error}
    </div>
  )}

  <form onSubmit={handleSubmit} className="space-y-6">

    {/* Input Group */}
    {[
      { label: "Full Name", icon: User, value: name, set: setName, placeholder: "John Doe", type: "text" },
      { label: "Email Address", icon: Mail, value: email, set: setEmail, placeholder: "you@university.edu", type: "email" },
    ].map(({ label, icon: Icon, value, set, placeholder, type }, i) => (
      <div key={i} className="space-y-2">
        <label className="text-sm font-medium text-gray-300">
          {label}
        </label>

        <div className="flex items-center gap-3">
          <div className="w-14 h-14 bg-[#32CD32]/10 border border-[#32CD32]/20 rounded-xl
            flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5 text-[#32CD32]" />
          </div>

          <input
            type={type}
            value={value}
            onChange={(e) => set(e.target.value)}
            placeholder={placeholder}
            required
            className="flex-1 h-14 px-4 bg-[#0A0A0A] border border-white/10 rounded-xl
              text-white placeholder:text-gray-500
              focus:outline-none focus:ring-2 focus:ring-[#32CD32]/40 focus:border-transparent
              transition"
          />
        </div>
      </div>
    ))}

    {/* Password */}
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-300">Password</label>
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 bg-[#32CD32]/10 border border-[#32CD32]/20 rounded-xl
          flex items-center justify-center shrink-0">
          <Lock className="w-5 h-5 text-[#32CD32]" />
        </div>

        <div className="relative flex-1">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a strong password"
            required
            className="w-full h-14 px-4 pr-12 bg-[#0A0A0A] border border-white/10 rounded-xl
              text-white placeholder:text-gray-500
              focus:outline-none focus:ring-2 focus:ring-[#32CD32]/40 focus:border-transparent
              transition"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>

    {/* Confirm Password */}
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-300">
        Confirm Password
      </label>
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 bg-[#32CD32]/10 border border-[#32CD32]/20 rounded-xl
          flex items-center justify-center shrink-0">
          <Lock className="w-5 h-5 text-[#32CD32]" />
        </div>

        <input
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Re-enter password"
          required
          className="flex-1 h-14 px-4 bg-[#0A0A0A] border border-white/10 rounded-xl
            text-white placeholder:text-gray-500
            focus:outline-none focus:ring-2 focus:ring-[#32CD32]/40 focus:border-transparent
            transition"
        />
      </div>
    </div>

    {/* Password Requirements */}
    <div className="flex flex-wrap gap-2 pt-2">
      {passwordRequirements.map((req, index) => (
        <span
          key={index}
          className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium
            ${
              req.met
                ? "bg-[#32CD32]/20 text-[#32CD32] border border-[#32CD32]/30"
                : "bg-white/5 text-gray-500 border border-white/10"
            }`}
        >
          <Check className={`w-3.5 h-3.5 ${req.met ? "" : "opacity-30"}`} />
          {req.text}
        </span>
      ))}
    </div>

    {/* Terms */}
    <label className="flex items-start gap-4 pt-4 mt-4 border-t border-white/5 cursor-pointer">
      <input type="checkbox" className="accent-[#32CD32] mt-1" required />
      <span className="text-sm text-gray-400 leading-relaxed">
        I agree to the{" "}
        <Link href="/terms" className="text-[#32CD32] hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="text-[#32CD32] hover:underline">
          Privacy Policy
        </Link>
      </span>
    </label>

    {/* Submit */}
    <button
      type="submit"
      disabled={isLoading}
      className="w-full h-14 bg-[#32CD32] text-black font-extrabold text-lg rounded-xl
        flex items-center justify-center gap-2
        hover:shadow-[0_0_40px_rgba(50,205,50,0.45)] hover:scale-[1.02]
        disabled:opacity-50 transition-all"
    >
      {isLoading ? (
        <Loader2 className="w-6 h-6 animate-spin" />
      ) : (
        <>
          Create Account
          <ArrowRight className="w-5 h-5" />
        </>
      )}
    </button>
  </form>

  {/* Footer */}
  <p className="mt-8 text-center text-sm text-gray-400">
    Already have an account?{" "}
    <Link href="/" className="text-[#32CD32] font-semibold hover:underline">
      Sign in
    </Link>
  </p>
</div>

        </div>
      </div>
    </div>
  );
}
