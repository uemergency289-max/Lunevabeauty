"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function ProductCard({ product }: { product: any }) {
  const [wish, setWish] = useState(false);
  return (
    <div className="group relative flex-shrink-0 w-[220px] sm:w-[240px]">
      <Link href={`/product/${product.slug}`}>
        <div className="relative overflow-hidden rounded-sm bg-beige" style={{ aspectRatio: "4/5" }}>
          {product.images?.[0] && (
            <img src={product.images[0].url} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          )}
          <button
            onClick={(e) => { e.preventDefault(); setWish(!wish); toast.success(wish ? "Removed from wishlist" : "Added to wishlist"); }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center"
          >
            {wish ? "❤️" : "🤍"}
          </button>
        </div>
        <div className="pt-3">
          <h3 className="text-[14px] font-display text-charcoal">{product.name}</h3>
          <p className="text-[13px] font-body text-charcoal-soft mt-1">${product.price?.toString()}</p>
        </div>
      </Link>
    </div>
  );
}
