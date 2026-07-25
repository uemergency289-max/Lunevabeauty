"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function OrderConfirmationPage() {
  const params = useSearchParams();
  const orderNumber = params.get("orderNumber");

  return (
    <div className="max-w-lg mx-auto px-5 py-24 text-center">
      <p className="text-[40px] mb-4">✅</p>
      <h1 className="font-display text-[26px] text-charcoal mb-2">Thank you for your order!</h1>
      <p className="font-body text-charcoal-soft mb-1">Order Number: <strong>{orderNumber}</strong></p>
      <p className="font-body text-[13px] text-charcoal-soft mt-4">We'll contact you on WhatsApp to confirm your order shortly.</p>
      <Link href="/shop" className="inline-block mt-8 px-6 py-3 bg-charcoal text-white font-body text-[13px] uppercase">Continue Shopping</Link>
    </div>
  );
      }
