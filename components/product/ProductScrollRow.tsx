"use client";

import ProductCard from "./ProductCard";

export default function ProductScrollRow({ products }: { products: any[] }) {
  if (!products || products.length === 0) return null;
  return (
    <div className="flex gap-5 overflow-x-auto pb-2 no-scrollbar">
      {products.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
