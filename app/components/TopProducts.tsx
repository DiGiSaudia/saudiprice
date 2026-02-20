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
  store_name?: string; // Dynamic store name from DB
};

export default function TopProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load favorites from local storage
    const saved = localStorage.getItem('saudiPrice_favs');
    if (saved) setFavorites(JSON.parse(saved));

    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('id, title, current_price, old_price, image_url, store_name')
        .eq('is_top_product', true);

      if (!error && data) setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const toggleFavorite = (id: string) => {
    const updated = favorites.includes(id) 
      ? favorites.filter(favId => favId !== id) 
      : [...favorites, id];
    setFavorites(updated);
    localStorage.setItem('saudiPrice_favs', JSON.stringify(updated));
  };

  const displayedProducts = showFavorites 
    ? products.filter(p => favorites.includes(p.id)) 
    : products;

  if (loading) return <div className="text-center py-20 font-bold text-green-600">Loading Latest Deals...</div>;

  return (
    <section className="max-w-[1400px] mx-auto px-4 py-8">
      {/* Header with Filter Toggle */}
      <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-2xl font-black text-gray-800">
            Top Picks & <span className="text-green-600">Latest</span>
          </h2>
        </div>
        
        <button 
          onClick={() => setShowFavorites(!showFavorites)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all ${
            showFavorites ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill={showFavorites ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          {showFavorites ? "Show All" : `Saved Items (${favorites.length})`}
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {displayedProducts.map((product) => {
          const hasDiscount = product.old_price && product.old_price > product.current_price;
          const discountPercent = hasDiscount ? Math.round(((product.old_price! - product.current_price) / product.old_price!) * 100) : 0;
          const isFaved = favorites.includes(product.id);

          return (
            <div key={product.id} className="group bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all flex flex-col relative">
              
              {/* Top Row: Store Branding & Heart */}
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-black bg-blue-50 text-blue-600 px-2 py-1 rounded uppercase tracking-wider">
                  {product.store_name || 'Retailer'}
                </span>
                <button onClick={() => toggleFavorite(product.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 ${isFaved ? 'fill-red-500 text-red-500' : 'fill-none'}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              {/* Image Container: Fixed Aspect Ratio */}
              <div className="relative aspect-square w-full mb-4 bg-gray-50 rounded-xl overflow-hidden p-4">
                {hasDiscount && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded-lg z-10">
                    {discountPercent}% OFF
                  </div>
                )}
                <img 
                  src={product.image_url} 
                  alt={product.title} 
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <h3 className="text-sm font-bold text-gray-800 line-clamp-2 mb-4 h-10 group-hover:text-green-600">
                {product.title}
              </h3>

              <div className="mt-auto flex items-center justify-between border-t border-gray-50 pt-3">
                <div className="flex flex-col">
                  {hasDiscount && (
                    <span className="text-[11px] text-gray-400 line-through">SAR {product.old_price}</span>
                  )}
                  <span className="text-lg font-black text-green-600 italic">
                    <span className="text-xs mr-0.5 font-bold">SAR</span>{product.current_price}
                  </span>
                </div>
                
                {/* Action Button */}
                <button className="bg-green-600 text-white p-2.5 rounded-xl hover:bg-green-700 shadow-lg shadow-green-100 transition-all active:scale-95">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      {showFavorites && displayedProducts.length === 0 && (
        <div className="text-center py-20 text-gray-400 font-medium">No saved items yet. Click the heart icon to save!</div>
      )}
    </section>
  );
}