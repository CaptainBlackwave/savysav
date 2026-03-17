import { db } from '@/lib/db';
import { products, users } from '@/db/schema';
import bcrypt from 'bcryptjs';

const initialProducts = [
  { name: 'Pens & Cup Charms', price: 3, category: 'Pens & Cup Charms', image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=400', description: 'Handmade pens and cup charms - 2 for $5' },
  { name: 'Candles', price: 5, category: 'Candles', image: 'https://images.unsplash.com/photo-1602607663830-a9c9c63a7f4c?w=400', description: 'Hand-poured scented candles' },
  { name: 'Bags', price: 10, category: 'Bags', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400', description: 'Handmade craft bags' },
  { name: 'Cups', price: 15, category: 'Cups', image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400', description: 'Custom decorated cups' },
  { name: 'Kids T-Shirts', price: 15, category: 'Kids T-Shirts', image: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?w=400', description: 'Cute kids t-shirts' },
  { name: 'Adult T-Shirts', price: 20, category: 'Adult T-Shirts', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400', description: 'Comfortable adult t-shirts' },
  { name: 'Signs', price: 20, category: 'Signs', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400', description: 'Decorative signs' },
  { name: 'Kid Sweaters', price: 30, category: 'Kid Sweaters', image: 'https://images.unsplash.com/photo-1621452773781-0f992fd1f5cb?w=400', description: 'Cozy sweaters for kids' },
  { name: 'Tumblers', price: 30, category: 'Tumblers', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400', description: 'Custom tumblers' },
  { name: 'Home Made Slippers', price: 40, category: 'Home Made Slippers', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400', description: 'Handmade comfortable slippers' },
  { name: 'Adult Sweaters', price: 80, category: 'Adult Sweaters', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400', description: 'Quality handmade adult sweaters' },
];

async function seed() {
  console.log('Seeding database...');

  // Add products
  for (const product of initialProducts) {
    await db.insert(products).values(product);
  }
  console.log(`Added ${initialProducts.length} products`);

  // Add admin user (password: admin123)
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await db.insert(users).values({
    id: 'admin-1',
    name: 'Admin',
    email: 'admin@savysav.com',
    password: hashedPassword,
  });
  console.log('Added admin user (email: admin@savysav.com, password: admin123)');

  console.log('Seeding complete!');
}

seed().catch(console.error);
