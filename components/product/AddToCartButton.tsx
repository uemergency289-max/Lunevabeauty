"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useCartStore } from "@/lib/store/cart-store";

export default function AddToCartButton({ product }: { product: any }) {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    const productForCart = {
      ...product,
      price: Number(product.price),
      images: product.images.map((i: any) => i.url),
      variants: product.variants.length ? product.variants : [{ id: "default", label: "Standard", priceModifier: 0, stock: product.stock, sku: product.sku }],
    };
    addItem(productForCart, productForCart.variants[0].id, 1);
    toast.success(`${product.name} added to cart`);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      onClick={handleAdd}
      className={`mt-6 px-8 py-3.5 text-[13px] tracking-[0.1em] uppercase font-body transition-colors ${added ? "bg-green-700" : "bg-charcoal"} text-white`}
    >
      {added ? "✓ Added to Cart" : "Add to Cart"}
    </button>
  );
}
