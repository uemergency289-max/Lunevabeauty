import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/product/ProductCard";
import Reveal from "@/components/ui/Reveal";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  let products: any[] = [];
  try {
    products = await prisma.product.findMany({
      where: { isPublished: true },
      include: { images: true },
      orderBy: { createdAt: "desc" },
    });
  } catch {}

  return (
    <div className="max-w-6xl mx-auto px-5 py-12">
      <Reveal className="mb-8">
        <p className="text-[12px] uppercase tracking-[0.25em] mb-2 font-body text-gold">All Products</p>
        <h1 className="text-[30px] font-display text-charcoal">Shop LunevaBeauty</h1>
      </Reveal>

      {products.length === 0 && (
        <div className="border border-dashed border-line rounded-sm py-16 text-center">
          <p className="font-display text-[20px] mb-2">No products yet</p>
          <p className="font-body text-charcoal-soft">Check back soon — new arrivals coming shortly.</p>
        </div>
      )}

      {products.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {products.map((p, i) => (
            <Reveal key={p.id} delay={(i % 8) * 60}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
