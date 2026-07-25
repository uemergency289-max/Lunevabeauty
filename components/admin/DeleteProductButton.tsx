"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function DeleteProductButton({ productId }: { productId: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Remove this product from your store? This can't be undone.")) return;
    const res = await fetch(`/api/products/${productId}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Product removed");
      router.refresh();
    } else {
      toast.error("Could not remove product");
    }
  };

  return (
    <button onClick={handleDelete} className="text-[12px] font-body text-red-600">
      Delete
    </button>
  );
}
