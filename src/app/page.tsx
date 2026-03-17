import { db } from '@/lib/db';
import { products } from '@/db/schema';
import { sql } from 'drizzle-orm';
import Header from '@/components/header';
import ProductCard from '@/components/product-card';

export default async function HomePage() {
  const allProducts = await db.select().from(products).orderBy(sql`${products.createdAt} desc`);

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-rose-500 via-purple-500 to-sky-500 bg-clip-text text-transparent mb-4">
            Welcome to Dream Creations
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Handmade with love - Unique crafts and custom items for you and your loved ones
          </p>
        </div>

        {allProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No products available yet.</p>
            <p className="text-gray-400 mt-2">Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <footer className="bg-white/50 border-t border-rose-100 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-500">
              © 2026 Savy Sav&apos;s Dream Creations. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Payment via Interac e-Transfer
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
