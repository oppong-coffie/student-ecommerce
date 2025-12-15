"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  MapPin,
  CreditCard,
  Smartphone,
  Check,
  Lock,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";

type PaymentMethod = "card" | "mobile_money";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("mobile_money");
  const [isLoading, setIsLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Form states
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    region: "",
    zipCode: "",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    mobileNumber: "",
    network: "mtn",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  });

  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.125;
  const total = subtotal + shipping + tax;

  const hasDigitalOnly = items.every((item) => item.isDigital);

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);
    setOrderComplete(true);
    clearCart();
    window.scrollTo(0, 0);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-[#0A0A0A] flex items-center justify-center py-12 px-4">
        <div className="max-w-lg w-full text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Order Confirmed!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Thank you for your purchase. Your order #ORD202412001 has been
              placed successfully.
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                A confirmation email has been sent to{" "}
                <strong>{shippingInfo.email || "your email"}</strong>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/account/orders"
                className="px-6 py-3 bg-[#E8FF00] text-[#0A0A0A] font-semibold rounded-xl hover:bg-[#F5FF80] transition-colors"
              >
                View Order Details
              </Link>
              <Link
                href="/products"
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0A0A0A]">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/cart"
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Cart
            </Link>
            <div className="flex items-center gap-2 text-sm">
              <Lock className="w-4 h-4 text-green-500" />
              <span className="text-gray-500">Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Steps Indicator */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div
            className={`flex items-center gap-2 ${
              step >= 1 ? "text-[#E8FF00]" : "text-gray-400"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step >= 1
                  ? "bg-[#E8FF00] text-[#0A0A0A]"
                  : "bg-gray-300 dark:bg-gray-700"
              }`}
            >
              {step > 1 ? <Check className="w-4 h-4" /> : "1"}
            </div>
            <span className="hidden sm:inline font-medium">Information</span>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
          <div
            className={`flex items-center gap-2 ${
              step >= 2 ? "text-[#E8FF00]" : "text-gray-400"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step >= 2
                  ? "bg-[#E8FF00] text-[#0A0A0A]"
                  : "bg-gray-300 dark:bg-gray-700"
              }`}
            >
              2
            </div>
            <span className="hidden sm:inline font-medium">Payment</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form */}
          <div className="flex-1">
            {step === 1 && (
              <form
                onSubmit={handleShippingSubmit}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#E8FF00]" />
                  {hasDigitalOnly
                    ? "Contact Information"
                    : "Shipping Information"}
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.firstName}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          firstName: e.target.value,
                        })
                      }
                      required
                      className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8FF00]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.lastName}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          lastName: e.target.value,
                        })
                      }
                      required
                      className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8FF00]"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          email: e.target.value,
                        })
                      }
                      required
                      className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8FF00]"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={shippingInfo.phone}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          phone: e.target.value,
                        })
                      }
                      required
                      placeholder="+233 XXX XXX XXXX"
                      className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8FF00]"
                    />
                  </div>

                  {!hasDigitalOnly && (
                    <>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Address
                        </label>
                        <input
                          type="text"
                          value={shippingInfo.address}
                          onChange={(e) =>
                            setShippingInfo({
                              ...shippingInfo,
                              address: e.target.value,
                            })
                          }
                          required
                          className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8FF00]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          value={shippingInfo.city}
                          onChange={(e) =>
                            setShippingInfo({
                              ...shippingInfo,
                              city: e.target.value,
                            })
                          }
                          required
                          className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8FF00]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Region
                        </label>
                        <select
                          value={shippingInfo.region}
                          onChange={(e) =>
                            setShippingInfo({
                              ...shippingInfo,
                              region: e.target.value,
                            })
                          }
                          required
                          className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8FF00]"
                        >
                          <option value="">Select Region</option>
                          <option value="greater-accra">Greater Accra</option>
                          <option value="ashanti">Ashanti</option>
                          <option value="western">Western</option>
                          <option value="eastern">Eastern</option>
                          <option value="central">Central</option>
                        </select>
                      </div>
                    </>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 py-4 bg-[#E8FF00] text-[#0A0A0A] font-bold rounded-xl hover:bg-[#F5FF80] transition-colors"
                >
                  Continue to Payment
                </button>
              </form>
            )}

            {step === 2 && (
              <form
                onSubmit={handlePaymentSubmit}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Payment Method
                </h2>

                {/* Payment Method Selection */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("mobile_money")}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === "mobile_money"
                        ? "border-[#E8FF00] bg-[#E8FF00]/10"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    <Smartphone className="w-8 h-8 mx-auto mb-2 text-[#E8FF00]" />
                    <p className="font-medium">Mobile Money</p>
                    <p className="text-xs text-gray-500">
                      MTN, Vodafone, AirtelTigo
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      paymentMethod === "card"
                        ? "border-[#E8FF00] bg-[#E8FF00]/10"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    <CreditCard className="w-8 h-8 mx-auto mb-2 text-[#E8FF00]" />
                    <p className="font-medium">Debit/Credit Card</p>
                    <p className="text-xs text-gray-500">Visa, Mastercard</p>
                  </button>
                </div>

                {paymentMethod === "mobile_money" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Mobile Network
                      </label>
                      <select
                        value={paymentInfo.network}
                        onChange={(e) =>
                          setPaymentInfo({
                            ...paymentInfo,
                            network: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8FF00]"
                      >
                        <option value="mtn">MTN Mobile Money</option>
                        <option value="vodafone">Vodafone Cash</option>
                        <option value="airteltigo">AirtelTigo Money</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        value={paymentInfo.mobileNumber}
                        onChange={(e) =>
                          setPaymentInfo({
                            ...paymentInfo,
                            mobileNumber: e.target.value,
                          })
                        }
                        placeholder="0XX XXX XXXX"
                        required
                        className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8FF00]"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={paymentInfo.cardNumber}
                        onChange={(e) =>
                          setPaymentInfo({
                            ...paymentInfo,
                            cardNumber: e.target.value,
                          })
                        }
                        placeholder="1234 5678 9012 3456"
                        required
                        className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8FF00]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          value={paymentInfo.expiryDate}
                          onChange={(e) =>
                            setPaymentInfo({
                              ...paymentInfo,
                              expiryDate: e.target.value,
                            })
                          }
                          placeholder="MM/YY"
                          required
                          className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8FF00]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          CVV
                        </label>
                        <input
                          type="text"
                          value={paymentInfo.cvv}
                          onChange={(e) =>
                            setPaymentInfo({
                              ...paymentInfo,
                              cvv: e.target.value,
                            })
                          }
                          placeholder="123"
                          required
                          className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8FF00]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Name on Card
                      </label>
                      <input
                        type="text"
                        value={paymentInfo.cardName}
                        onChange={(e) =>
                          setPaymentInfo({
                            ...paymentInfo,
                            cardName: e.target.value,
                          })
                        }
                        placeholder="John Doe"
                        required
                        className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E8FF00]"
                      />
                    </div>
                  </div>
                )}

                <div className="flex gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-4 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 py-4 bg-[#E8FF00] text-[#0A0A0A] font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#F5FF80] disabled:opacity-50 transition-all"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      `Pay GH₵ ${total.toFixed(2)}`
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:w-96">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Order Summary
              </h2>

              {/* Items */}
              <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-14 h-14 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">{item.image}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      GH₵ {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <hr className="border-gray-200 dark:border-gray-700 mb-4" />

              {/* Totals */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Subtotal
                  </span>
                  <span>GH₵ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Shipping
                  </span>
                  <span>
                    {shipping === 0 ? "FREE" : `GH₵ ${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Tax</span>
                  <span>GH₵ {tax.toFixed(2)}</span>
                </div>
              </div>

              <hr className="border-gray-200 dark:border-gray-700 my-4" />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>GH₵ {total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
