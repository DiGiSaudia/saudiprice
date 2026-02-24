'use client';

import { useState, useEffect, Suspense } from 'react';
import { supabase } from '../../lib/supabase';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

const getCategoryIcon = (name: string) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('mobile') || lowerName.includes('tablet')) return '📱';
  if (lowerName.includes('laptop') || lowerName.includes('pc')) return '💻';
  if (lowerName.includes('electronic') || lowerName.includes('tv')) return '🎧';
  if (lowerName.includes('grocery') || lowerName.includes('supermarket') || lowerName.includes('food')) return '🛒';
  if (lowerName.includes('fashion') || lowerName.includes('beauty')) return '👕';
  if (lowerName.includes('home') || lowerName.includes('kitchen')) return '🏠';
  return '🌟';
};

function CategoryContent() {
  const params = useParams();
  const router = useRouter();
  
  // Dynamic parameters from the SEO URL: /category/[name]/[city]
  const categoryName = decodeURIComponent(params.name as string);
  const currentCity = params.city ? decodeURIComponent(params.city as string) : '';

  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      
      const { data: catData } = await supabase.from('categories').select('*').order('created_at');
      if (catData) setCategories([{ id: 'all', name: 'All Deals' }, ...catData]);

      let query = supabase.from('products').select('*').eq('category', categoryName);
      
      if (currentCity) {
        query = query.eq('city', currentCity);
      }
      
      const { data } = await query.order('created_at', { ascending: false });
      if (data) setProducts(data);
      setLoading(false);
    }
    fetchData();
  }, [categoryName, currentCity]);

  const handleCategoryClick = (catName: string) => {
    if (catName === 'All Deals') {
      router.push(currentCity ? `/${currentCity}` : '/');
    } else {
      // Updated to use the new SEO Friendly URL format
      router.push(`/category/${encodeURIComponent(catName)}${currentCity ? `/${currentCity}` : ''}`);
    }
  };

  const displayCategories = categories.length > 0 ? categories : [{id: 'loading', name: 'Loading...'}];

  return (
    <div className="min-h-screen bg-[#f4f5f7] pb-10 font-sans">
      {/* Reduced Top Padding */}
      <div className="max-w-[1400px] mx-auto px-4 py-4 flex flex-col md:flex-row gap-4">
        
        {/* Left Sidebar - Navigation & Ads */}
        <aside className="hidden md:block w-[240px] flex-shrink-0 h-fit sticky top-[80px]">
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-3 mb-4">
            <h3 className="text-sm font-black text-gray-800 mb-3 px-2 uppercase tracking-wider">Categories</h3>
            <ul className="space-y-1">
              {displayCategories.map((cat, idx) => {
                const isActive = categoryName === cat.name;
                return (
                  <li key={cat.id || idx}>
                    <button 
                      onClick={() => handleCategoryClick(cat.name)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all font-bold text-xs ${isActive ? 'bg-green-50 text-green-700 shadow-sm border border-green-100' : 'text-gray-600 hover:bg-gray-50 hover:text-green-600 border border-transparent'}`}
                    >
                      <span className="text-lg">{getCategoryIcon(cat.name)}</span>
                      <span className="truncate">{cat.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Sticky Ads Section */}
          <div className="flex flex-col gap-3">
            <div className="bg-gray-200 rounded-xl w-full h-[250px] flex items-center justify-center border border-gray-300 shadow-inner">
              <span className="text-gray-400 text-xs font-bold">Ad Space 1 (300x250)</span>
            </div>
            <div className="bg-gray-200 rounded-xl w-full h-[250px] flex items-center justify-center border border-gray-300 shadow-inner">
              <span className="text-gray-400 text-xs font-bold">Ad Space 2 (300x250)</span>
            </div>
          </div>
        </aside>

        <main className="flex-1 w-full min-w-0">
          
          {/* Header Row: Title + Heart Icon Aligned, Redundant Text Removed */}
          <div className="flex flex-row items-center justify-between mb-6 gap-2">
            <div className="flex flex-row items-center gap-3">
              <h1 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight capitalize">
                {categoryName} <span className="text-green-600">Deals</span>
                {currentCity && <span className="text-gray-400 text-base block md:inline md:ml-2">in {currentCity}</span>}
              </h1>
              
              {/* Relocated Heart / Saved Item Icon */}
              <Link href="/saved" className="relative p-1.5 md:p-2 text-gray-400 hover:text-red-500 transition-colors bg-white rounded-full border border-gray-200 shadow-sm flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </Link>
            </div>
            
            <p className="text-[10px] md:text-xs font-bold text-gray-500 bg-white px-3 py-1.5 rounded-full border border-gray-100 shadow-sm w-fit shrink-0">
              {products.length} Items
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20 text-lg font-black text-green-600 animate-pulse">Loading Deals...</div>
          ) : products.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg text-gray-500 font-bold">No products found in {categoryName} {currentCity ? `for ${currentCity}` : ''}... 😢</h3>
              <Link href={currentCity ? `/${currentCity}` : '/'} className="mt-4 inline-block text-green-600 font-bold underline">Go back home</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {products.map((product) => {
                 const hasDiscount = product.old_price && product.old_price > product.current_price;
                 return (
                  <Link 
                    href={`/product/${product.id}`} 
                    key={product.id} 
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group p-3"
                  >
                    <div className="relative aspect-square w-full mb-3 bg-gray-50 rounded-xl flex items-center justify-center p-3">
                      <img src={product.image_url} alt={product.title} className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <span className="text-[9px] font-black bg-blue-50 text-blue-600 px-2 py-1 rounded w-fit uppercase mb-2 block tracking-wider">
                      {product.store_name} • {product.city}
                    </span>
                    <h3 className="text-xs font-bold text-gray-800 line-clamp-2 h-8 mb-3 group-hover:text-green-600 transition-colors">
                      {product.title}
                    </h3>
                    <div className="mt-auto pt-2 border-t border-gray-50">
                      <div className="flex flex-col">
                        {hasDiscount && <span className="text-[10px] text-gray-400 line-through font-medium">SAR {product.old_price}</span>}
                        <span className="text-base font-black text-green-600 italic">SAR {product.current_price}</span>
                      </div>
                    </div>
                  </Link>
                 )
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function CategoryPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <CategoryContent />
    </Suspense>
  )
}