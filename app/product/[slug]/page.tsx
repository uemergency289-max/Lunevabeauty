import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/product/AddToCartButton";
import ProductScrollRow from "@/components/product/ProductScrollRow";

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { images: true, variants: true },
  });
  if (!product) notFound();

  const related = await prisma.product.findMany({
    where: { category: product.category, isPublished: true, id: { not: product.id } },
    include: { images: true },
    take: 4,
  });

  return (
    <div className="max-w-6xl mx-auto px-5 py-12">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="rounded-sm overflow-hidden bg-beige" style={{ aspectRatio: "4/5" }}>
          {product.images[0] && (
            <img src={product.images[0].url} alt={product.name} className="w-full h-full object-cover" />
          )}
        </div>
        <div>
          <p className="text-[12px] uppercase tracking-[0.25em] mb-2 font-body text-gold">{product.category}</p>
          <h1 className="font-display text-[30px] text-charcoal">{product.name}</h1>
          <p className="font-body text-[20px] text-charcoal mt-3">${product.price.toString()}</p>
          <p className="font-body text-[14px] text-charcoal-soft mt-5 leading-relaxed">{product.description}</p>

          <AddToCartButton product={product as any} />

          {product.benefits.length > 0 && (
            <div className="mt-8">
              <h3 className="font-display text-[16px] mb-2">Benefits</h3>
              <ul className="list-disc list-inside space-y-1">
                {product.benefits.map((b, i) => <li key={i} className="font-body text-[13.5px] text-charcoal-soft">{b}</li>)}
              </ul>
            </div>
          )}
          {product.ingredients.length > 0 && (
            <div className="mt-6">
              <h3 className="font-display text-[16px] mb-2">Ingredients</h3>
              <ul className="list-disc list-inside space-y-1">
                {product.ingredients.map((b, i) => <li key={i} className="font-body text-[13.5px] text-charcoal-soft">{b}</li>)}
              </ul>
            </div>
          )}
          {product.usage.length > 0 && (
            <div className="mt-6">
              <h3 className="font-display text-[16px] mb-2">How to Use</h3>
              <ol className="list-decimal list-inside space-y-1">
                {product.usage.map((b, i) => <li key={i} className="font-body text-[13.5px] text-charcoal-soft">{b}</li>)}
              </ol>
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="font-display text-[24px] text-charcoal mb-6">You may also like</h2>
          <ProductScrollRow products={related} />
        </div>
      )}
    </div>
  );
}
