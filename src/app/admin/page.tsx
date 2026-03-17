import { db } from '@/lib/db';
import { products, orders } from '@/db/schema';
import { sql } from 'drizzle-orm';
import Link from 'next/link';
import { Package, ShoppingCart, DollarSign, Plus } from 'lucide-react';

export default async function AdminDashboard() {
  const productCount = await db.select({ count: sql<number>`count(*)` }).from(products);
  const orderCount = await db.select({ count: sql<number>`count(*)` }).from(orders);
  const revenue = await db.select({ total: sql<number>`coalesce(sum(${orders.totalAmount}), 0)` }).from(orders);

  const recentOrders = await db.select().from(orders).orderBy(sql`${orders.createdAt} desc`).limit(5);

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Products</p>
              <p className="text-2xl font-bold text-gray-800">{productCount[0]?.count || 0}</p>
            </div>
            <Package className="w-8 h-8 text-rose-400" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold text-gray-800">{orderCount[0]?.count || 0}</p>
            </div>
            <ShoppingCart className="w-8 h-8 text-purple-400" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-800">${(revenue[0]?.total || 0).toFixed(2)}</p>
            </div>
            <DollarSign className="w-8 h-8 text-sky-400" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Quick Action</p>
              <Link
                href="/admin/products/new"
                className="mt-1 inline-flex items-center text-sm font-medium text-rose-500 hover:text-rose-600"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Product
              </Link>
            </div>
            <Plus className="w-8 h-8 text-rose-400" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-mono text-gray-800">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{order.customerName}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.email}</td>
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
                </tr>
              ))}
              {recentOrders.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No orders yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
