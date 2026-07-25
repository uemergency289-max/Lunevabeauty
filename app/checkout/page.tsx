"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/store/cart-store";
import { toast } from "sonner";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const clearCart = useCartStore((s) => s.clearCart);

  const [form, setForm] = useState({ customerName: "", customerPhone: "", address: "", city: "" });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: string[] = [];
    if (!form.customerName) errs.push("Full name is required");
    if (!form.customerPhone || form.customerPhone.length < 10) errs.push("A valid phone number is required");
    if (!form.address) errs.push("Delivery address is required");
    if (!form.city) errs.push("City is required");
    if (errs.length) { setErrors(errs); return; }

    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: items.map((i) => ({ productId: i.productId, name: i.name, price: i.price, quantity: i.quantity })),
          subtotal,
          total: subtotal,
          paymentMethod: "COD",
        }),
      });
      const json = await res.json();
      if (!res.ok) { setErrors([json.error || "Something went wrong"]); return; }
      clearCart();
      toast.success("Order placed!");
      router.push(`/order-confirmation?orderNumber=${json.order.orderNumber}`);
    } catch {
      setErrors(["Network error — please try again."]);
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return <div className="max-w-2xl mx-auto px-5 py-24 text-center font-body">Your cart is empty.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-12">
      <h1 className="font-display text-[26px] text-charcoal mb-8">Checkout</h1>

      {errors.length > 0 && (
        <div className="p-4 bg-blush-soft border border-blush rounded-sm mb-6">
          {errors.map((e, i) => <p key={i} className="font-body text-[13px] text-charcoal">{e}</p>)}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input placeholder="Full Name" className="input" value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} />
        <input placeholder="Phone Number" className="input" value={form.customerPhone} onChange={(e) => setForm({ ...form, customerPhone: e.target.value })} />
        <input placeholder="Delivery Address" className="input" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        <input placeholder="City" className="input" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />

        <div className="border border-line rounded-sm p-4 bg-beige">
          <p className="font-body text-[13px] font-semibold mb-2">Payment Method</p>
          <p className="font-body text-[13px]">💵 Cash on Delivery</p>
        </div>

        <div className="border-t border-line pt-4 flex justify-between font-display text-[18px]">
          <span>Total</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <button type="submit" disabled={submitting} className="w-full px-8 py-3.5 bg-charcoal text-white font-body text-[13px] uppercase tracking-wide">
          {submitting ? "Placing Order..." : "Place Order"}
        </button>
      </form>

      <style jsx global>{`
        .input { width: 100%; padding: 12px 14px; font-size: 14px; background: #fff; border: 1px solid #EAE0D5; border-radius: 2px; }
      `}</style>
    </div>
  );
          }
