import { db } from '@/lib/db';
import { orders } from '@/db/schema';
import { sql } from 'drizzle-orm';
import { ShoppingCart } from 'lucide-react';

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

export default async function OrdersPage() {
  const allOrders = await db.select().from(orders).orderBy(sql`${orders.createdAt} desc`);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Orders</h1>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {allOrders.map((order) => {
              const items: OrderItem[] = JSON.parse(order.items);
              return (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-mono text-gray-800">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{order.customerName}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {items.map((item, idx: number) => (
                      <div key={idx}>
                        {item.name} x{item.quantity}
                      </div>
                    ))}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-800">${order.totalAmount.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.status === 'pending' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '-'}
                  </td>
                </tr>
              );
            })}
            {allOrders.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No orders yet</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
