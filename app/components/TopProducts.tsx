'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import Link from 'next/link';

interface TopProductsProps {
  activeCategory?: string;
}

export default function TopProducts({ activeCategory = 'All Deals' }: TopProductsProps) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    // Load saved products to make hearts red
    const saved = JSON.parse(localStorage.getItem('saudiPrice_favs') || '[]');
    setSavedIds(saved.map((item: any) => item.id));

    async function fetchProducts() {
      setLoading(true);
      let query = supabase.from('products').select('*');
      
      if (activeCategory && activeCategory !== 'All Deals') {
        query = query.eq('category', activeCategory);
      }

      const { data, error } = await query;
      if (!error && data) setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, [activeCategory]);

  const toggleSaveProduct = (product: any) => {
    const saved = JSON.parse(localStorage.getItem('saudiPrice_favs') || '[]');
    const isSaved = saved.find((item: any) => item.id === product.id);
    
    let newSaved;
    if (isSaved) {
      newSaved = saved.filter((item: any) => item.id !== product.id);
      setSavedIds(savedIds.filter(id => id !== product.id)); // Remove red color
    } else {
      newSaved = [...saved, product];
      setSavedIds([...savedIds, product.id]); // Add red color
    }
    
    localStorage.setItem('saudiPrice_favs', JSON.stringify(newSaved));
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <section className="py-6 w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-black text-gray-800 tracking-tight">
          {activeCategory === 'All Deals' ? 'Trending Products' : `${activeCategory} Deals`}
        </h2>
      </div>

      {loading ? (
        <div className="text-center py-10 font-bold text-green-600">Loading deals...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-10 text-gray-500 font-bold bg-white rounded-2xl border border-gray-100 shadow-sm">
          No products found in {activeCategory}.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {products.map((product) => {
            const hasDiscount = product.old_price && product.old_price > product.current_price;
            const discountPercentage = hasDiscount 
              ? Math.round(((product.old_price - product.current_price) / product.old_price) * 100) 
              : 0;
            
            const isSaved = savedIds.includes(product.id);

            return (
              <Link 
                href={`/product/${product.id}`} 
                key={product.id} 
                className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all relative group flex flex-col cursor-pointer"
              >
                
                {hasDiscount && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-md z-10 shadow-sm">
                    {discountPercentage}% OFF
                  </span>
                )}

                <button 
                  onClick={(e) => {
                    e.preventDefault(); // Prevents navigating to the product page when clicking the heart
                    toggleSaveProduct(product);
                  }}
                  className={`absolute top-3 right-3 z-10 p-1.5 bg-white/90 backdrop-blur-sm rounded-full transition-all shadow-sm hover:shadow ${isSaved ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill={isSaved ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>

                <div className="relative aspect-square w-full mb-4 bg-gray-50 rounded-xl flex items-center justify-center p-4">
                  <img src={product.image_url} alt={product.title} className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300" />
                </div>

                <span className="text-[10px] font-black bg-blue-50 text-blue-600 px-2 py-1 rounded-md w-fit uppercase mb-2 block">
                  {product.store_name || 'Retailer'}
                </span>

                <h3 className="text-sm font-bold text-gray-800 line-clamp-2 h-10 mb-4 group-hover:text-green-600 transition-colors">
                  {product.title}
                </h3>

                <div className="mt-auto flex items-end justify-between border-t border-gray-50 pt-3">
                  <div className="flex flex-col">
                    {hasDiscount && <span className="text-[11px] text-gray-400 line-through">SAR {product.old_price}</span>}
                    <span className="text-lg font-black text-green-600 italic">SAR {product.current_price}</span>
                  </div>
                </div>

              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}