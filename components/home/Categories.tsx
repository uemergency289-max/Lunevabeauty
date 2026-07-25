import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

const categories = [
  { name: "Skincare", img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop" },
  { name: "Makeup", img: "https://images.unsplash.com/photo-1583241800698-9c2e9e6f8f8f?q=80&w=800&auto=format&fit=crop" },
  { name: "Haircare", img: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?q=80&w=800&auto=format&fit=crop" },
  { name: "Fragrance", img: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop" },
];

export default function Categories() {
  return (
    <section className="max-w-6xl mx-auto px-5 py-20">
      <Reveal className="mb-8">
        <p className="text-[12px] uppercase tracking-[0.25em] mb-2 font-body text-gold">Shop by category</p>
        <h2 className="text-[28px] sm:text-[34px] font-display text-charcoal">Find your ritual</h2>
      </Reveal>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {categories.map((c, i) => (
          <Reveal key={c.name} delay={i * 90}>
            <Link href="/shop" className="relative group block overflow-hidden rounded-sm shadow-sm hover:shadow-lg transition-shadow" style={{ aspectRatio: "3/4" }}>
              <img src={c.img} alt={c.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
              <span className="absolute bottom-4 left-4 font-display text-[18px] text-white">{c.name}</span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
