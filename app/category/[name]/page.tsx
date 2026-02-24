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

  const handleCategoryClick = (catName: string) => {
    if (catName === 'All Deals') {
      router.push(currentCity ? `/${currentCity}` : '/');
    } else {
      router.push(`/category/${encodeURIComponent(catName)}${currentCity ? `?city=${currentCity}` : ''}`);
    }
  };

  const displayCategories = categories.length > 0 ? categories : [{id: 'loading', name: 'Loading...'}];

  return (
    <div className="font-sans flex flex-col bg-[#f4f5f7] min-h-screen w-full overflow-x-hidden">
      
      <div className="max-w-[1400px] mx-auto px-4 py-3 w-full text-xs text-gray-500 font-medium flex items-center flex-wrap gap-2">
        <Link href="/" className="hover:text-green-600 transition-colors cursor-pointer text-gray-600 font-bold bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
          Home
        </Link> 
        <span className="text-gray-400">›</span>
        
        <Link href="/" className="hover:text-green-600 transition-colors cursor-pointer text-gray-600 font-bold bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
          Saudi Arabia
        </Link>
        <span className="text-gray-400">›</span>

        {currentCity && (
          <>
            <Link href={`/${currentCity}`} className="hover:text-green-600 transition-colors cursor-pointer text-gray-600 font-bold bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100 capitalize">
              {currentCity}
            </Link>
            <span className="text-gray-400">›</span>
          </>
        )}

        <span className="text-green-700 font-black bg-green-50 px-3 py-1 rounded-full border border-green-100 shadow-sm capitalize">
          {categoryName}
        </span>
      </div>

      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row px-4 gap-4 pb-6 w-full">
        
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

            <div className="mt-4 bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-xl border border-blue-200">
              <h4 className="font-black text-blue-800 text-xs mb-1">Download App</h4>
              <button onClick={() => alert('🚀 Our official app is launching very soon! Stay tuned for a smarter shopping experience and exclusive discounts.')} className="w-full text-left group">
                 <p className="text-[10px] text-blue-600 mb-2 group-hover:underline cursor-pointer">Get exclusive app-only discounts!</p>
                 <div className="w-full bg-blue-600 text-white text-[10px] font-bold py-1.5 rounded-lg hover:bg-blue-700 transition-colors text-center">
                   Coming Soon
                 </div>
              </button>
            </div>
          </div>
        </aside>

        <main className="flex-1 w-full min-w-0 flex flex-col">
          
          <div className="flex flex-row items-center justify-between mb-4 gap-2">
            <div className="flex flex-row items-center gap-3">
              <h1 className="text-xl md:text-2xl font-black text-gray-900 tracking-tight capitalize">
                {categoryName} <span className="text-green-600">Deals</span>
                {currentCity && <span className="text-gray-400 text-base block md:inline md:ml-2">in {currentCity}</span>}
              </h1>
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
              {products.map((product) => {
                 const hasDiscount = product.old_price && product.old_price > product.current_price;
                 const discountPercentage = hasDiscount 
                    ? Math.round(((product.old_price - product.current_price) / product.old_price) * 100) 
                    : 0;

                 return (
                  <Link 
                    href={`/product/${product.id}`} 
                    key={product.id} 
                    className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all relative group flex flex-col cursor-pointer block"
                  >
                    {hasDiscount && (
                      <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-md z-10 shadow-sm">
                        {discountPercentage}% OFF
                      </span>
                    )}

                    <div className="relative aspect-square w-full mb-4 bg-gray-50 rounded-xl flex items-center justify-center p-4">
                      <img src={product.image_url} alt={product.title} className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <span className="text-[10px] font-black bg-blue-50 text-blue-600 px-2.5 py-1 rounded-md w-fit uppercase mb-2 block tracking-wider">
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