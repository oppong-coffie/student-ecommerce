"use client";

import React from "react";
import dynamic from "next/dynamic";

const ProductDetailContent = dynamic(() => import("./ProductDetailContent"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0A0A0A]">
      <div className="w-8 h-8 border-4 border-[#E8FF00] border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

export default function ProductPage() {
  return <ProductDetailContent />;
}
