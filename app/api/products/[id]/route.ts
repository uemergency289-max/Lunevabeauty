import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/validations/product";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const body = await req.json();
  const parsed = productSchema.partial().safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const data = parsed.data;

  try {
    const product = await prisma.product.update({
      where: { id: params.id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.category && { category: data.category }),
        ...(data.subcategory !== undefined && { subcategory: data.subcategory }),
        ...(data.price !== undefined && { price: data.price }),
        ...(data.oldPrice !== undefined && { oldPrice: data.oldPrice ? Number(data.oldPrice) : null }),
        ...(data.stock !== undefined && { stock: data.stock }),
        ...(data.description && { description: data.description }),
        ...(data.isPublished !== undefined && { isPublished: data.isPublished }),
        ...(data.isBestseller !== undefined && { isBestseller: data.isBestseller }),
      },
    });
    return NextResponse.json({ product });
  } catch {
    return NextResponse.json({ error: "Could not update product." }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.product.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Could not delete product." }, { status: 500 });
  }
        }
