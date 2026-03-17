import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { orders } from '@/db/schema';
import { sql } from 'drizzle-orm';

export async function GET() {
  try {
    const allOrders = await db.select().from(orders).orderBy(sql`${orders.createdAt} desc`);
    return NextResponse.json(allOrders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, email, items, totalAmount } = body;

    if (!customerName || !email || !items || !totalAmount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const result = await db.insert(orders).values({
      id: orderId,
      customerName,
      email,
      items: JSON.stringify(items),
      totalAmount: parseFloat(totalAmount),
      status: 'pending',
    }).returning();

    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
