import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  let products: any[] = [];
  let dbConnected = true;
  try {
    products = await prisma.product.findMany({ where: { isPublished: true }, include: { images: true }, orderBy: { createdAt: "desc" } });
  } catch {
    dbConnected = false;
  }

  return (
    <div>
      <section className="max-w-6xl mx-auto px-5 py-20 text-center">
        <p className="font-body text-[12px] uppercase tracking-[0.3em] text-gold mb-4">New Season Edit</p>
        <h1 className="font-display text-[44px] sm:text-[60px] text-charcoal leading-tight">LunevaBeauty</h1>
        <p className="font-body text-charcoal-soft mt-4 max-w-md mx-auto">Luxury skincare and beauty, curated for radiant, healthy skin.</p>
        <Link href="/shop" className="inline-block mt-8 px-8 py-3.5 bg-charcoal text-white font-body text-[13px] uppercase tracking-wide">Shop Now</Link>
      </section>

      {!dbConnected && (
        <p className="text-center font-body text-red-600 pb-10">Database not connected — check DATABASE_URL.</p>
      )}

      {dbConnected && products.length === 0 && (
        <div className="max-w-2xl mx-auto px-5 pb-24 text-center border border-dashed border-line rounded-sm py-16">
          <p className="font-display text-[22px] mb-2">Your store is ready</p>
          <p className="font-body text-charcoal-soft mb-5">Add your first product to get started.</p>
          <Link href="/admin/products/new" className="inline-block px-6 py-3 bg-charcoal text-white font-body text-[13px] uppercase">Add a Product</Link>
        </div>
      )}

      {products.length > 0 && (
        <div className="max-w-6xl mx-auto px-5 pb-24 grid grid-cols-2 sm:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p.id} className="border border-line rounded-sm overflow-hidden">
              {p.images[0] && <img src={p.images[0].url} alt={p.name} className="w-full aspect-square object-cover" />}
              <div className="p-3">
                <p className="font-display text-[15px]">{p.name}</p>
                <p className="font-body text-[13px] text-charcoal-soft">${p.price.toString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
