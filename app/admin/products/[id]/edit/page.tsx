import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({ where: { id: params.id }, include: { images: true } });
  if (!product) notFound();

  return (
    <div>
      <h1 className="font-display text-[24px] text-charcoal mb-6">Edit Product</h1>
      <ProductForm
        defaultValues={{
          id: product.id,
          name: product.name,
          brand: product.brand,
          category: product.category as any,
          subcategory: product.subcategory || "",
          sku: product.sku,
          price: Number(product.price),
          oldPrice: product.oldPrice ? Number(product.oldPrice) : undefined,
          stock: product.stock,
          description: product.description,
          benefits: product.benefits.join("\n"),
          ingredients: product.ingredients.join("\n"),
          usage: product.usage.join("\n"),
          images: product.images.map((i) => i.url),
          isPublished: product.isPublished,
          isBestseller: product.isBestseller,
        }}
      />
    </div>
  );
}
