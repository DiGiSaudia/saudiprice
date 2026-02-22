'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
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

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function searchProducts() {
      setLoading(true);
      if (!query) {
        setProducts([]);
        setLoading(false);
        return;
      }

      // Search in Supabase (ILIKE is used for case-insensitive search)
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .or(`title.ilike.%${query}%,category.ilike.%${query}%,store_name.ilike.%${query}%`);

      if (!error && data) {
        setProducts(data);
      }
      setLoading(false);
    }

    searchProducts();
  }, [query]);

  return (
    <main className="min-h-screen bg-[#f4f5f7] py-8">
      <div className="max-w-[1400px] mx-auto px-4">
        
        {/* Added Back Button / Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-sm mb-6 text-gray-500 font-medium">
          <Link href="/" className="hover:text-green-600 transition-colors cursor-pointer text-gray-600 flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-bold">Search Results</span>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-black text-gray-800">
            Search Results for: <span className="text-green-600">"{query}"</span>
          </h1>
          <p className="text-gray-500 mt-1 font-medium">Found {products.length} items</p>
        </div>

        {loading ? (
          <div className="text-center py-20 font-bold text-green-600 text-lg animate-pulse">Searching...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
            <div className="text-6xl mb-4 drop-shadow-md">🔍</div>
            <h2 className="text-2xl font-black text-gray-800">No products found</h2>
            <p className="text-gray-500 mt-2">Try searching for something else like "iPhone" or "Samsung".</p>
            <Link href="/" className="mt-8 inline-block bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1">
              Back to Home
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {products.map((product) => {
              const hasDiscount = product.old_price && product.old_price > product.current_price;
              
              return (
                /* Changed div to Link to make the entire product card clickable */
                <Link href={`/product/${product.id}`} key={product.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all relative group flex flex-col cursor-pointer block">
                  
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

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f4f5f7]"></div>}>
      <SearchContent />
    </Suspense>
  );
}