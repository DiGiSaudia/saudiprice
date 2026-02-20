'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import Link from 'next/link';

type Product = {
  id: string;
  title: string;
  current_price: number;
  old_price: number | null;
  image_url: string;
  store_name: string;
};

export default function SavedItemsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSavedProducts() {
      // Get IDs from LocalStorage
      const savedIds = JSON.parse(localStorage.getItem('saudiPrice_favs') || '[]');

      if (savedIds.length === 0) {
        setLoading(false);
        return;
      }

      // Fetch only those products whose IDs are in our saved list
      const { data, error } = await supabase
        .from('products')
        .select('id, title, current_price, old_price, image_url, store_name')
        .in('id', savedIds);

      if (!error && data) {
        setProducts(data);
      }
      setLoading(false);
    }

    fetchSavedProducts();
  }, []);

  const removeFavorite = (id: string) => {
    const savedIds = JSON.parse(localStorage.getItem('saudiPrice_favs') || '[]');
    const updatedIds = savedIds.filter((favId: string) => favId !== id);
    localStorage.setItem('saudiPrice_favs', JSON.stringify(updatedIds));
    setProducts(products.filter(p => p.id !== id));
  };

  if (loading) return <div className="text-center py-20 font-bold text-green-600">Loading your favorites...</div>;

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-[1400px] mx-auto px-4">
        
        {/* Page Header */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-gray-900">
              Saved <span className="text-green-600">Items</span>
            </h1>
            <p className="text-gray-500 mt-1">Your personal wishlist from all Saudi stores</p>
          </div>
          <Link href="/" className="text-sm font-bold text-green-600 hover:underline">
            &larr; Back to Shopping
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-dashed border-gray-300">
            <div className="text-5xl mb-4">❤️</div>
            <h2 className="text-xl font-bold text-gray-800">Your wishlist is empty</h2>
            <p className="text-gray-500 mt-2">Save products to keep track of prices and deals.</p>
            <Link href="/" className="mt-6 inline-block bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition-all">
              Explore Deals
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {products.map((product) => {
              const hasDiscount = product.old_price && product.old_price > product.current_price;
              
              return (
                <div key={product.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all relative group">
                  
                  {/* Remove Button */}
                  <button 
                    onClick={() => removeFavorite(product.id)}
                    className="absolute top-3 right-3 z-20 bg-white/80 backdrop-blur-sm p-1.5 rounded-full text-red-500 hover:bg-red-50"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>

                  <Link href={`/product/${product.id}`}>
                    <div className="aspect-square w-full mb-4 bg-gray-50 rounded-xl flex items-center justify-center p-4">
                      <img src={product.image_url} alt={product.title} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                    </div>
                    
                    <span className="text-[10px] font-black text-blue-600 uppercase mb-1 block">
                      {product.store_name}
                    </span>
                    
                    <h3 className="text-sm font-bold text-gray-800 line-clamp-2 h-10 mb-4">
                      {product.title}
                    </h3>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        {hasDiscount && <span className="text-[10px] text-gray-400 line-through">SAR {product.old_price}</span>}
                        <span className="text-lg font-black text-green-600 italic">SAR {product.current_price}</span>
                      </div>
                      <div className="bg-green-50 text-green-600 p-2 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}