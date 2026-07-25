import Reveal from "@/components/ui/Reveal";
import ProductScrollRow from "@/components/product/ProductScrollRow";

export default function BestSellers({ products }: { products: any[] }) {
  if (!products || products.length === 0) return null;
  return (
    <section className="max-w-6xl mx-auto px-5 py-16">
      <Reveal className="mb-7">
        <p className="text-[12px] uppercase tracking-[0.25em] mb-2 font-body text-gold">Loved on repeat</p>
        <h2 className="text-[28px] sm:text-[34px] font-display text-charcoal">Best sellers</h2>
      </Reveal>
      <Reveal delay={100}>
        <ProductScrollRow products={products} />
      </Reveal>
    </section>
  );
}
