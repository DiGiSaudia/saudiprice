'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import Link from 'next/link';

// Defining types to fix the red line error
type Product = {
  id: string;
  title: string;
  current_price: number;
  old_price: number | null;
  image_url: string;
  created_at: string;
  stores?: { name: string } | null;
};

export default function TopProducts() {
  // Initializing state with the Product type to fix TypeScript error
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('id, title, current_price, old_price, image_url, created_at, stores(name)')
        .eq('is_top_product', true)
        .limit(10);

      if (!error && data) {
        // Casting data as Product[] fixes the "red line" issue
        setProducts(data as unknown as Product[]);
      }
      setLoading(false);
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 py-8 animate-pulse">
        <div className="h-8 w-48 bg-gray-200 rounded mb-6"></div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-72 bg-gray-100 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-[1400px] mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-black text-gray-800">
          Top <span className="text-green-600">Products</span>
        </h2>
        <button className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
          View All &rarr;
        </button>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((product) => {
          const hasDiscount = product.old_price && product.old_price > product.current_price;
          const storeName = product.stores?.name || 'SaudiPrice';

          return (
            <div key={product.id} className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm hover:shadow-lg transition-all group flex flex-col relative">
              
              {/* Store Name & Favorite Heart Icon */}
              <div className="flex justify-between items-center mb-2">
                <span className="text-[9px] font-bold text-gray-400 uppercase bg-gray-50 px-1.5 py-0.5 rounded">
                  {storeName}
                </span>
                <button className="text-gray-300 hover:text-red-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </button>
              </div>

              {/* Clickable Image */}
              <Link href={`/product/${product.id}`} className="relative aspect-square flex items-center justify-center mb-3">
                <img src={product.image_url} alt={product.title} className="object-contain max-h-full group-hover:scale-105 transition-transform" />
              </Link>
              
              {/* Clickable Title */}
              <Link href={`/product/${product.id}`} className="text-xs md:text-sm font-bold text-gray-800 line-clamp-2 mb-2 group-hover:text-green-600">
                {product.title}
              </Link>
              
              <div className="mt-auto pt-2 border-t border-gray-50 flex items-end justify-between">
                <div>
                  {hasDiscount && <p className="text-[10px] text-gray-400 line-through">SAR {product.old_price}</p>}
                  <p className="text-sm md:text-lg font-black text-green-600 leading-none">
                    <span className="text-[10px] mr-0.5">SAR</span>{product.current_price}
                  </p>
                </div>

                {/* Shopping Basket Icon */}
                <button className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}