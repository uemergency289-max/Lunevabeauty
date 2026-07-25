"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function OrderStatusSelect({ orderId, currentStatus }: { orderId: string; currentStatus: string }) {
  const router = useRouter();

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const res = await fetch(`/api/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: e.target.value }),
    });
    if (res.ok) {
      toast.success("Order status updated");
      router.refresh();
    } else {
      toast.error("Could not update status");
    }
  };

  return (
    <select defaultValue={currentStatus} onChange={handleChange} className="text-[12px] font-body border border-line rounded-sm px-2 py-1">
      <option value="PENDING">Pending</option>
      <option value="PROCESSING">Processing</option>
      <option value="SHIPPED">Shipped</option>
      <option value="DELIVERED">Delivered</option>
      <option value="CANCELLED">Cancelled</option>
    </select>
  );
}
