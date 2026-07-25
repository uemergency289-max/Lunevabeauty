import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const orders = await prisma.order.findMany({ include: { items: true }, orderBy: { createdAt: "desc" } });
    return NextResponse.json({ orders });
  } catch {
    return NextResponse.json({ orders: [] });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { customerName, customerPhone, address, city, items, subtotal, total, paymentMethod } = body;

  if (!customerName || !customerPhone || !address || !city || !items?.length) {
    return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
  }

  try {
    const orderNumber = `LB-${Date.now().toString().slice(-8)}`;
    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName,
        customerPhone,
        address,
        city,
        subtotal,
        total,
        paymentMethod: paymentMethod || "COD",
        items: {
          create: items.map((i: any) => ({
            productId: i.productId,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
          })),
        },
      },
    });
    return NextResponse.json({ order }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Could not place order. Please try again." }, { status: 500 });
  }
      }
