import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-beige">
      <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-2 items-center gap-10 py-16 md:py-24">
        <div>
          <p className="text-[12px] uppercase tracking-[0.3em] mb-4 font-body text-gold">New Season Edit</p>
          <h1 className="font-display text-charcoal leading-[1.05]" style={{ fontSize: "clamp(38px, 5.5vw, 64px)" }}>
            Radiance, <span className="italic text-gold">redefined.</span>
          </h1>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed font-body text-charcoal-soft">
            Curated skincare and beauty essentials formulated to bring
            out your natural glow — thoughtfully sourced, honestly priced.
          </p>
          <div className="mt-8 flex gap-4 flex-wrap">
            <Link href="/shop"><Button variant="solid">Shop Now</Button></Link>
            <Link href="/shop"><Button variant="outline">Explore Collection</Button></Link>
          </div>
        </div>
        <div className="relative h-[320px] md:h-[440px] rounded-sm overflow-hidden shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1200&auto=format&fit=crop"
            alt="LunevaBeauty"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
