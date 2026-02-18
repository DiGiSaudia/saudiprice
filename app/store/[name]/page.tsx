'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function StorePage() {
  const params = useParams();
  const storeName = decodeURIComponent(params.name as string);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('store', storeName);
      
      if (data) setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, [storeName]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-center gap-3 mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight capitalize">
          {storeName} Deals
        </h1>
        <div className="h-1 w-20 bg-blue-600 rounded-full mt-2"></div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-xl font-bold text-gray-500">Loading...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-20">
          <h3 className="text-2xl text-gray-500 font-bold">No products found in {storeName}... 😢</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden group">
              <Link href={`/product/${product.id}`} className="h-60 bg-white p-8 flex justify-center items-center relative overflow-hidden group-hover:bg-gray-50 transition-colors mt-2">
                <img src={product.image_url} alt={product.title} onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x400?text=No+Image'; }} className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
              </Link>
              <div className="p-5 flex flex-col flex-grow border-t border-gray-50">
                <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-2">{product.category}</span>
                <Link href={`/product/${product.id}`}>
                  <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors cursor-pointer">{product.title}</h3>
                </Link>
                <div className="mt-auto pt-3 flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-black text-green-600">{product.price} <span className="text-sm font-bold text-gray-500">SAR</span></p>
                  </div>
                  <a href={product.product_link} target="_blank" rel="noopener noreferrer" className="bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white p-3.5 rounded-xl transition-colors duration-300 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 5.354 5.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3z"/><path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}