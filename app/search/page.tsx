'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '../lib/supabase';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const currentCity = searchParams.get('city') || '';

  const [products, setProducts] = useState<any[]>([]);
  const [matchedStore, setMatchedStore] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    async function searchDatabase() {
      setLoading(true);
      setMatchedStore(null);

      if (!query) {
        setProducts([]);
        setLoading(false);
        return;
      }

      // 1. Store matching logic
      const { data: storeData } = await supabase
        .from('stores')
        .select('*')
        .ilike('name', `%${query}%`)
        .limit(1);

      if (storeData && storeData.length > 0) {
        setMatchedStore(storeData[0]);
      }

      // 2. Fetch products with filters
      let pQuery = supabase
        .from('products')
        .select('*')
        .or(`title.ilike.%${query}%,category.ilike.%${query}%,store_name.ilike.%${query}%`);

      if (currentCity) {
        pQuery = pQuery.eq('city', currentCity);
      }

      const { data: productsData, error } = await pQuery.order('created_at', { ascending: false });

      if (!error && productsData) {
        setProducts(productsData);
      } else {
        setProducts([]);
      }
      setLoading(false);
    }
    searchDatabase();
  }, [query, currentCity]);

  // Sorting Logic
  const sortedProducts = [...products].sort((a, b) =>
    sortOrder === 'asc' ? a.current_price - b.current_price : b.current_price - a.current_price
  );

  return (
    <main className="min-h-screen bg-[#f4f5f7] py-6 md:py-8 font-sans">
      <div className="max-w-[1400px] mx-auto px-4">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm mb-6 text-gray-500 font-medium">
          <Link
            href={currentCity ? `/${currentCity}` : '/'}
            className="hover:text-green-600 transition-colors cursor-pointer text-gray-600 flex items-center gap-1.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to {currentCity ? currentCity : 'Home'}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-bold">Search Results</span>
        </div>

        {/* Matched Store Banner */}
        {matchedStore && (
          <Link href={`/store/${encodeURIComponent(matchedStore.name)}`} className="mb-8 block group">
            <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-3xl p-6 text-white flex items-center gap-6 shadow-lg group-hover:shadow-green-200 transition-all">
              <div className="w-20 h-20 bg-white rounded-2xl p-2 shrink-0 shadow-inner">
                <img src={matchedStore.logo_url} alt="" className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              <div>
                <h2 className="text-2xl font-black">{matchedStore.name}</h2>
                <p className="opacity-90 font-bold text-sm">View Full Store Profile & Flyers ❯</p>
              </div>
            </div>
          </Link>
        )}

        {/* Header + Sort Row */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-gray-800 leading-tight">
              Results for: <span className="text-green-600">"{query}"</span>
              {currentCity && <span className="text-gray-400 text-xl ml-2 font-medium">in {currentCity}</span>}
            </h1>
            <p className="text-gray-500 mt-1 font-bold text-sm uppercase tracking-wider">Found {products.length} Items</p>
          </div>

          {/* Green Sort Dropdown */}
          {products.length > 0 && (
            <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-green-100">
              <span className="text-xs font-black text-gray-400 pl-2 uppercase">Sort By:</span>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                className="bg-green-600 text-white text-sm font-bold py-2 px-5 rounded-xl focus:outline-none hover:bg-green-700 transition-all cursor-pointer shadow-md"
              >
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
              </select>
            </div>
          )}
        </div>

        {/* Results Grid */}
        {loading ? (
          <div className="flex flex-col items-center py-20">
            <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 font-black text-green-600 animate-pulse">SEARCHING DEALS...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-black text-gray-800">No products found</h2>
            <p className="text-gray-500 mt-2 text-sm">Try another keyword or change region.</p>
            <Link href="/" className="mt-8 inline-block bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition-all shadow-md">
              Back to Home
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {sortedProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`} className="bg-white border border-gray-100 rounded-2xl p-3 md:p-4 shadow-sm hover:shadow-xl transition-all relative group flex flex-col cursor-pointer">
                <div className="relative aspect-square w-full mb-4 bg-gray-50 rounded-xl flex items-center justify-center p-4">
                  <img src={product.image_url} alt="" className="max-h-full max-w-full object-contain group-hover:scale-105 transition-all duration-300" />
                </div>
                
                <div className="mb-2">
                  <span className="text-[10px] font-black bg-blue-50 text-blue-600 px-2 py-0.5 rounded uppercase tracking-tighter">
                    {product.store_name} • {product.city}
                  </span>
                </div>

                <h3 className="text-[13px] md:text-sm font-bold text-gray-800 line-clamp-2 h-10 mb-4 leading-tight group-hover:text-green-600 transition-colors">
                  {product.title}
                </h3>

                <div className="mt-auto pt-3 border-t border-gray-50 flex flex-col">
                  {product.old_price && product.old_price > product.current_price && (
                    <span className="text-[11px] text-gray-400 line-through font-bold text-right">SAR {product.old_price}</span>
                  )}
                  <span className="text-lg font-black text-green-600 italic text-right">
                    SAR {product.current_price}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f4f5f7]" />}>
      <SearchContent />
    </Suspense>
  );
}