'use client';

import { useState, useEffect, Suspense } from 'react';
import { supabase } from '../../lib/supabase';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
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
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const categoryName = decodeURIComponent(params.name as string);
  const currentCity = searchParams.get('city') || ''; 

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

  // 4️⃣ FIX: Handle category click within Category Page without losing City state
  const handleCategoryClick = (catName: string) => {
    if (catName === 'All Deals') {
      router.push(currentCity ? `/${currentCity}` : '/');
    } else {
      router.push(`/category/${encodeURIComponent(catName)}${currentCity ? `?city=${currentCity}` : ''}`);
    }
  };

  const displayCategories = categories.length > 0 ? categories : [{id: 'loading', name: 'Loading...'}];

  return (
    <div className="min-h-screen bg-[#f4f5f7] pb-16 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 py-8 flex flex-col md:flex-row gap-6">
        
        {/* Left Sidebar - Navigation */}
        <aside className="hidden md:block w-[240px] flex-shrink-0 bg-white border border-gray-100 rounded-2xl shadow-sm h-fit sticky top-[100px] p-4">
          <h3 className="text-lg font-black text-gray-800 mb-4 px-2 uppercase tracking-wider">Categories</h3>
          <ul className="space-y-1.5">
            {displayCategories.map((cat, idx) => {
              const isActive = categoryName === cat.name;
              return (
                <li key={cat.id || idx}>
                  <button 
                    onClick={() => handleCategoryClick(cat.name)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-bold text-sm ${isActive ? 'bg-green-50 text-green-700 shadow-sm border border-green-100' : 'text-gray-600 hover:bg-gray-50 hover:text-green-600 border border-transparent'}`}
                  >
                    <span className="text-xl">{getCategoryIcon(cat.name)}</span>
                    <span className="truncate">{cat.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        <main className="flex-1 w-full min-w-0">
          <div className="flex items-center gap-2 text-sm mb-6 text-gray-500 font-medium">
            <Link href={currentCity ? `/${currentCity}` : '/'} className="hover:text-green-600 transition-colors flex items-center gap-1 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to {currentCity ? currentCity : 'Home'}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-bold capitalize">{categoryName} Deals</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight capitalize">
              {categoryName} <span className="text-green-600">Offers</span>
              {currentCity && <span className="text-gray-400 text-lg md:text-xl block md:inline md:ml-2">in {currentCity}</span>}
            </h1>
            <p className="text-sm font-bold text-gray-500 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm w-fit">
              {products.length} Items Found
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20 text-xl font-black text-green-600 animate-pulse">Loading Deals...</div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-xl text-gray-500 font-bold">No products found in {categoryName} {currentCity ? `for ${currentCity}` : ''}... 😢</h3>
              <Link href={currentCity ? `/${currentCity}` : '/'} className="mt-4 inline-block text-green-600 font-bold underline">Go back home</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => {
                 const hasDiscount = product.old_price && product.old_price > product.current_price;
                 return (
                  <Link 
                    href={`/product/${product.id}`} 
                    key={product.id} 
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group p-4"
                  >
                    <div className="relative aspect-square w-full mb-4 bg-gray-50 rounded-xl flex items-center justify-center p-4">
                      <img src={product.image_url} alt={product.title} className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <span className="text-[10px] font-black bg-blue-50 text-blue-600 px-2.5 py-1 rounded w-fit uppercase mb-2 block tracking-wider">
                      {product.store_name} • {product.city}
                    </span>
                    <h3 className="text-sm font-bold text-gray-800 line-clamp-2 h-10 mb-4 group-hover:text-green-600 transition-colors">
                      {product.title}
                    </h3>
                    <div className="mt-auto pt-3 border-t border-gray-50">
                      <div className="flex flex-col">
                        {hasDiscount && <span className="text-[11px] text-gray-400 line-through font-medium">SAR {product.old_price}</span>}
                        <span className="text-lg font-black text-green-600 italic">SAR {product.current_price}</span>
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