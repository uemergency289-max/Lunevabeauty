"use client";

import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/lib/store/cart-store";

const links = [
  { label: "Skincare", href: "/shop" },
  { label: "Makeup", href: "/shop" },
  { label: "Haircare", href: "/shop" },
  { label: "Fragrance", href: "/shop" },
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));

  return (
    <>
      <div className="text-center py-2 text-[11px] tracking-wide font-body bg-charcoal text-white">
        Free shipping on orders over $75 — Cash on delivery available
      </div>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-line">
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          <button className="md:hidden text-[20px]" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
          <Link href="/" className="font-display text-[22px] tracking-wide text-charcoal">LUNEVABEAUTY</Link>
          <nav className="hidden md:flex items-center gap-7">
            {links.map((l) => (
              <Link key={l.label} href={l.href} className="text-[13px] font-body text-charcoal-soft hover:text-charcoal">{l.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative">
              🛍️
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-gold text-white text-[9px] flex items-center justify-center">{cartCount}</span>
              )}
            </Link>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden px-5 pb-4 flex flex-col gap-3 border-t border-line">
            {links.map((l) => <Link key={l.label} href={l.href} className="text-sm pt-3 font-body">{l.label}</Link>)}
          </div>
        )}
      </header>
    </>
  );
}
