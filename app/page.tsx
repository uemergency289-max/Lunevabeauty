import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import Categories from "@/components/home/Categories";
import BestSellers from "@/components/home/BestSellers";
import Reviews from "@/components/home/Reviews";
import Newsletter from "@/components/home/Newsletter";
import FAQ from "@/components/home/FAQ";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function HomePage() {
  let products: any[] = [];
  let dbConnected = true;
  try {
    products = await prisma.product.findMany({ where: { isPublished: true }, include: { images: true }, orderBy: { createdAt: "desc" } });
  } catch {
    dbConnected = false;
  }

  return (
    <>
      <Hero />
      <TrustBar />
      <Categories />

      {!dbConnected && <p className="text-center font-body text-red-600 py-10">Database not connected — check DATABASE_URL.</p>}

      {dbConnected && products.length === 0 && (
        <div className="max-w-2xl mx-auto px-5 py-20 text-center border border-dashed border-line rounded-sm my-10">
          <p className="font-display text-[22px] mb-2">Your store is ready</p>
          <p className="font-body text-charcoal-soft mb-5">Add your first product to get started.</p>
          <Link href="/admin/products/new" className="inline-block px-6 py-3 bg-charcoal text-white font-body text-[13px] uppercase">Add a Product</Link>
        </div>
      )}

      {products.length > 0 && <BestSellers products={products} />}
      <Reviews />
      <Newsletter />
      <FAQ />
    </>
  );
}
