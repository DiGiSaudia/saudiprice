'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function SavedItemsPage() {
  const [savedProducts, setSavedProducts] = useState<any[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const loadSavedItems = () => {
      const items = JSON.parse(localStorage.getItem('saudiPrice_favs') || '[]');
      setSavedProducts(items);
    };
    
    loadSavedItems();
    window.addEventListener('storage', loadSavedItems);
    return () => window.removeEventListener('storage', loadSavedItems);
  }, []);

  const removeProduct = (id: string) => {
    const updatedItems = savedProducts.filter(item => item.id !== id);
    setSavedProducts(updatedItems);
    localStorage.setItem('saudiPrice_favs', JSON.stringify(updatedItems));
    window.dispatchEvent(new Event('storage')); // Update navbar counter
  };

  if (!isMounted) return <div className="min-h-screen bg-gray-50"></div>;

  return (
    <main className="min-h-screen bg-gray-50 py-10 font-sans">
      <div className="max-w-[1400px] mx-auto px-4">
        
        <div className="mb-8 flex items-center gap-3">
          <Link href="/" className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <h1 className="text-2xl font-black text-gray-800">My Saved Items</h1>
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
            {savedProducts.length} items
          </span>
        </div>

        {savedProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
            <div className="text-5xl mb-4">💔</div>
            <h2 className="text-xl font-bold text-gray-800">No saved items yet</h2>
            <p className="text-gray-500 mt-2">Click the heart icon on any product to save it here.</p>
            <Link href="/" className="mt-6 inline-block bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition-all">
              Explore Deals
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {savedProducts.map((product) => {
              const hasDiscount = product.old_price && product.old_price > product.current_price;
              
              return (
                <div key={product.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all relative group flex flex-col">
                  
                  <button 
                    onClick={() => removeProduct(product.id)}
                    className="absolute top-3 right-3 z-10 p-1.5 bg-red-50 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-sm"
                    title="Remove from saved"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>

                  <div className="relative aspect-square w-full mb-4 bg-gray-50 rounded-xl flex items-center justify-center p-4">
                    <img src={product.image_url} alt={product.title} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                  </div>

                  <span className="text-[10px] font-black bg-blue-50 text-blue-600 px-2 py-1 rounded w-fit uppercase mb-2 block">
                    {product.store_name || 'Retailer'}
                  </span>

                  <h3 className="text-sm font-bold text-gray-800 line-clamp-2 h-10 mb-4 group-hover:text-green-600 transition-colors">
                    {product.title}
                  </h3>

                  <div className="mt-auto flex flex-col border-t border-gray-50 pt-3">
                    {hasDiscount && <span className="text-[11px] text-gray-400 line-through">SAR {product.old_price}</span>}
                    <span className="text-lg font-black text-green-600 italic">SAR {product.current_price}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </main>
  );
}