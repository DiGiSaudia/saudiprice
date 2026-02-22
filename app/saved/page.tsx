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

  const removeProduct = (e: React.MouseEvent, id: string) => {
    e.preventDefault(); // Prevents the Link from triggering when clicking the remove button
    const updatedItems = savedProducts.filter(item => item.id !== id);
    setSavedProducts(updatedItems);
    localStorage.setItem('saudiPrice_favs', JSON.stringify(updatedItems));
    window.dispatchEvent(new Event('storage')); // Update navbar counter
  };

  if (!isMounted) return <div className="min-h-screen bg-[#f4f5f7]"></div>;

  return (
    <main className="min-h-screen bg-[#f4f5f7] py-8 font-sans">
      <div className="max-w-[1400px] mx-auto px-4">
        
        {/* Breadcrumb / Back Navigation */}
        <div className="flex items-center gap-2 text-sm mb-6 text-gray-500 font-medium">
          <Link href="/" className="hover:text-green-600 transition-colors cursor-pointer text-gray-600 flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-bold">Saved Items</span>
        </div>

        {/* Page Header */}
        <div className="mb-8 flex items-center gap-3">
          <h1 className="text-2xl font-black text-gray-800">My Saved Items</h1>
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-black tracking-wider">
            {savedProducts.length} ITEMS
          </span>
        </div>

        {savedProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
            <div className="text-6xl mb-4 drop-shadow-md">💔</div>
            <h2 className="text-2xl font-black text-gray-800">No saved items yet</h2>
            <p className="text-gray-500 mt-2 font-medium">Click the heart icon on any product to save it here for later.</p>
            <Link href="/" className="mt-8 inline-block bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1">
              Explore Deals
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {savedProducts.map((product) => {
              const hasDiscount = product.old_price && product.old_price > product.current_price;
              
              return (
                /* Main Card Wrapper as a Link */
                <Link href={`/product/${product.id}`} key={product.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all relative group flex flex-col cursor-pointer block">
                  
                  {/* Remove Button (Z-index ensures it stays on top of the link) */}
                  <button 
                    onClick={(e) => removeProduct(e, product.id)}
                    className="absolute top-3 right-3 z-20 p-2 bg-red-50 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all shadow-sm"
                    title="Remove from saved"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>

                  <div className="relative aspect-square w-full mb-4 bg-gray-50 rounded-xl flex items-center justify-center p-4">
                    <img src={product.image_url} alt={product.title} className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300" />
                  </div>

                  <span className="text-[10px] font-black bg-blue-50 text-blue-600 px-2.5 py-1 rounded w-fit uppercase mb-2 block tracking-wider">
                    {product.store_name || 'Retailer'}
                  </span>

                  <h3 className="text-sm font-bold text-gray-800 line-clamp-2 h-10 mb-4 group-hover:text-green-600 transition-colors">
                    {product.title}
                  </h3>

                  <div className="mt-auto flex items-end justify-between border-t border-gray-50 pt-3">
                    <div className="flex flex-col">
                      {hasDiscount && <span className="text-[11px] text-gray-400 line-through font-medium">SAR {product.old_price}</span>}
                      <span className="text-lg font-black text-green-600 italic">SAR {product.current_price}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

      </div>
    </main>
  );
}