import { prisma } from "@/lib/prisma";
import OrderStatusSelect from "@/components/admin/OrderStatusSelect";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  let orders: any[] = [];
  try {
    orders = await prisma.order.findMany({ include: { items: true }, orderBy: { createdAt: "desc" } });
  } catch {}

  return (
    <div>
      <h1 className="font-display text-[24px] text-charcoal mb-6">Orders</h1>
      {orders.length === 0 && <p className="font-body text-charcoal-soft">No orders yet.</p>}
      <div className="space-y-4">
        {orders.map((o) => (
          <div key={o.id} className="border border-line rounded-sm p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-body text-[14px] font-semibold">{o.orderNumber}</p>
                <p className="font-body text-[13px] text-charcoal-soft">{o.customerName} — {o.customerPhone}</p>
                <p className="font-body text-[12px] text-charcoal-soft">{o.address}, {o.city}</p>
              </div>
              <OrderStatusSelect orderId={o.id} currentStatus={o.status} />
            </div>
            <div className="text-[12.5px] font-body text-charcoal-soft mt-2">
              {o.items.map((i: any) => `${i.name} x${i.quantity}`).join(", ")}
            </div>
            <p className="font-display text-[15px] mt-2">${o.total.toString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
