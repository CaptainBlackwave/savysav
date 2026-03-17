'use client';

import Link from 'next/link';
import { useCart } from './cart-context';
import { ShoppingCart, Sparkles } from 'lucide-react';

export default function Header() {
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-rose-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-rose-400 via-purple-500 to-sky-400 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-rose-500 via-purple-500 to-sky-500 bg-clip-text text-transparent">
              Savy Sav&apos;s Dream Creations
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-rose-500 transition-colors font-medium">
              Shop
            </Link>
          </nav>

          <Link
            href="/cart"
            className="relative flex items-center justify-center w-10 h-10 bg-rose-50 rounded-full hover:bg-rose-100 transition-colors"
          >
            <ShoppingCart className="w-5 h-5 text-rose-600" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
