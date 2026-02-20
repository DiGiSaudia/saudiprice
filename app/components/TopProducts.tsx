'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import Link from 'next/link';

type Product = {
  id: string;
  title: string;
  current_price: number;
  old_price: number | null;
  image_url: string;
  created_at: string;
  stores?: { name: string } | null;
};

export default function TopProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('id, title, current_price, old_price, image_url, created_at, stores(name)')
        .eq('is_top_product', true)
        .limit(10);

      if (!error && data) {
        setProducts(data as unknown as Product[]);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const toggleLike = (id: string) => {
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) return <div className="p-10 text-center font-bold text-gray-400">Loading SaudiPrice Deals...</div>;

  return (
    <section className="max-w-[1400px] mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-black text-gray-800">
          Top <span className="text-green-600">Products</span>
        </h2>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((product) => {
          const hasDiscount = product.old_price && product.old_price > product.current_price;
          const discountPercent = hasDiscount ? Math.round(((product.old_price! - product.current_price) / product.old_price!) * 100) : 0;
          const storeName = product.stores?.name || "SaudiPrice Store";

          return (
            <div key={product.id} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all group flex flex-col relative overflow-hidden">
              
              {/* Top Row: Store Name & Hot Deal/Heart */}
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-black text-green-700 bg-green-50 px-2 py-1 rounded-md uppercase truncate max-w-[80px]">
                  {storeName}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-orange-500 italic">Hot Deal</span>
                  <button onClick={() => toggleLike(product.id)} className="transition-transform active:scale-125">
                    <svg xmlns="http://www.w3.org/2000/svg" 
                      className={`w-5 h-5 ${liked[product.id] ? 'fill-red-500 text-red-500' : 'fill-none text-gray-300'}`} 
                      viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Discount Badge */}
              {hasDiscount && (
                <div className="absolute top-14 left-0 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-r-full z-10 shadow-lg">
                  -{discountPercent}% OFF
                </div>
              )}

              {/* Product Image - Fixed height for uniform layout */}
              <Link href={`/product/${product.id}`} className="relative h-44 w-full flex items-center justify-center mb-4 p-2 bg-white rounded-xl overflow-hidden">
                <img src={product.image_url} alt={product.title} className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500" />
              </Link>
              
              {/* Product Title */}
              <Link href={`/product/${product.id}`} className="text-xs md:text-sm font-bold text-gray-900 line-clamp-2 mb-3 h-10 group-hover:text-green-600 transition-colors">
                {product.title}
              </Link>
              
              {/* Bottom Price & Basket */}
              <div className="mt-auto flex items-center justify-between bg-gray-50 p-2 rounded-xl border border-gray-100">
                <div className="flex flex-col">
                  {hasDiscount && (
                    <span className="text-[10px] text-gray-400 line-through font-medium leading-none">SAR {product.old_price}</span>
                  )}
                  <span className="text-sm md:text-lg font-black text-green-600 leading-tight">
                    <span className="text-[10px] mr-0.5">SAR</span>{product.current_price}
                  </span>
                </div>

                {/* Classic SaudiPrice Shopping Basket */}
                <button className="bg-white hover:bg-green-600 hover:text-white text-green-600 w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md border border-gray-100 group-hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}