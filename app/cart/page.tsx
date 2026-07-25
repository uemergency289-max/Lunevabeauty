"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/store/cart-store";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore((s) => s.subtotal());

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-5 py-24 text-center">
        <p className="font-display text-[24px] mb-3">Your cart is empty</p>
        <Link href="/shop" className="inline-block px-6 py-3 bg-charcoal text-white font-body text-[13px] uppercase">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-5 py-12">
      <h1 className="font-display text-[26px] text-charcoal mb-8">Your Cart</h1>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.productId + item.variantId} className="flex items-center gap-4 border border-line p-3 rounded-sm">
            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-sm" />
            <div className="flex-1">
              <p className="font-body text-[14px] text-charcoal">{item.name}</p>
              <p className="font-body text-[13px] text-charcoal-soft">Qty: {item.quantity} × ${item.price}</p>
            </div>
            <button onClick={() => removeItem(item.productId, item.variantId)} className="text-[12px] font-body text-red-600">Remove</button>
          </div>
        ))}
      </div>
      <div className="mt-8 flex items-center justify-between border-t border-line pt-6">
        <span className="font-display text-[18px]">Subtotal</span>
        <span className="font-display text-[18px]">${subtotal.toFixed(2)}</span>
      </div>
      <Link href="/checkout" className="mt-6 block text-center px-8 py-3.5 bg-charcoal text-white font-body text-[13px] uppercase tracking-wide">
        Proceed to Checkout
      </Link>
    </div>
  );
}
