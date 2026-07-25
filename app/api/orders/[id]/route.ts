import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { status } = await req.json();
  try {
    const order = await prisma.order.update({ where: { id: params.id }, data: { status } });
    return NextResponse.json({ order });
  } catch {
    return NextResponse.json({ error: "Could not update order." }, { status: 500 });
  }
                              }
