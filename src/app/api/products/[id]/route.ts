import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { products } from '@/db/schema';
import { sql } from 'drizzle-orm';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await db.select().from(products).where(sql`id = ${parseInt(id)}`).limit(1);
    
    if (!product[0]) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json(product[0]);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, price, category, image, description } = body;

    if (!name || !price || !category || !image) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await db.update(products).set({
      name,
      price: parseFloat(price),
      category,
      image,
      description: description || '',
      updatedAt: new Date(),
    }).where(sql`id = ${parseInt(id)}`);

    const updated = await db.select().from(products).where(sql`id = ${parseInt(id)}`).limit(1);
    
    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}
