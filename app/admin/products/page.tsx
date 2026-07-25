import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DeleteProductButton from "@/components/admin/DeleteProductButton";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  let products: any[] = [];
  try {
    products = await prisma.product.findMany({ include: { images: true }, orderBy: { createdAt: "desc" } });
  } catch {}

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-[24px] text-charcoal">Your Products</h1>
        <Link href="/admin/products/new" className="px-4 py-2 bg-charcoal text-white font-body text-[12px] uppercase">+ Add Product</Link>
      </div>
      {products.length === 0 && <p className="font-body text-charcoal-soft">No products yet.</p>}
      <div className="space-y-3">
        {products.map((p) => (
          <div key={p.id} className="flex items-center justify-between border border-line p-3 rounded-sm">
            <div className="flex items-center gap-3">
              {p.images[0] && <img src={p.images[0].url} alt={p.name} className="w-12 h-12 object-cover rounded-sm" />}
              <div>
                <span className="font-body text-[14px] block">{p.name}</span>
                <span className="font-body text-[12px] text-charcoal-soft">${p.price.toString()} · Stock: {p.stock}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href={`/admin/products/${p.id}/edit`} className="text-[12px] font-body text-gold">Edit</Link>
              <DeleteProductButton productId={p.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
        }
