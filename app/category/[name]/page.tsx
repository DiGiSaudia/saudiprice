'use client';

import { useState, useEffect, Suspense } from 'react';
import { supabase } from '../../lib/supabase';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function CategoryContent() {
  const params = useParams();
  const searchParams = useSearchParams(); // 1️⃣ UPDATE: شہر کو پکڑنے کے لیے searchParams شامل کیا
  
  const categoryName = decodeURIComponent(params.name as string);
  const currentCity = searchParams.get('city') || 'Riyadh'; // موجودہ شہر پکڑا

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('category', categoryName);
      
      if (data) setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, [categoryName]);

  return (
    <div className="min-h-screen bg-[#f4f5f7] pb-16">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        
        {/* Breadcrumb / Back Button */}
        <div className="flex items-center gap-2 text-sm mb-6 text-gray-500 font-medium">
          {/* 2️⃣ UPDATE: Back بٹن کو Link میں تبدیل کر کے شہر کا نام لگا دیا */}
          <Link href={`/?city=${currentCity}`} className="hover:text-green-600 transition-colors flex items-center gap-1 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-bold capitalize">{categoryName} Deals</span>
        </div>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight capitalize">
            {categoryName} <span className="text-green-600">Offers</span>
          </h1>
          <p className="text-sm font-bold text-gray-500 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
            {products.length} Items Found
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-xl font-black text-green-600 animate-pulse">Loading Deals...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-xl text-gray-500 font-bold">No products found in {categoryName}... 😢</h3>
            {/* 3️⃣ UPDATE: خالی کیٹیگری والے ہوم لنک میں بھی شہر شامل کر دیا */}
            <Link href={`/?city=${currentCity}`} className="mt-4 inline-block text-green-600 font-bold underline">Go back home</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
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
                    {product.store_name}
                  </span>

                  <h3 className="text-sm font-bold text-gray-800 line-clamp-2 h-10 mb-4 group-hover:text-green-600 transition-colors">
                    {product.title}
                  </h3>

                  <div className="mt-auto pt-3 border-t border-gray-50">
                    <div className="flex flex-col">
                      {hasDiscount && <span className="text-[11px] text-gray-400 line-through font-medium text-xs">SAR {product.old_price}</span>}
                      <span className="text-lg font-black text-green-600 italic">SAR {product.current_price}</span>
                    </div>
                  </div>
                </Link>
               )
            })}
          </div>
        )}
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