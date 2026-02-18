'use client';

import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Link from 'next/link';

// عارضی ڈیٹا (صرف ڈیزائن دکھانے کے لیے)
const supermarkets = [
  { id: 1, name: 'Panda', logo: 'https://placehold.co/150x150/ffffff/000000?text=Panda' },
  { id: 2, name: 'Lulu', logo: 'https://placehold.co/150x150/ffffff/000000?text=Lulu' },
  { id: 3, name: 'Othaim', logo: 'https://placehold.co/150x150/ffffff/000000?text=Othaim' },
  { id: 4, name: 'Carrefour', logo: 'https://placehold.co/150x150/ffffff/000000?text=Carrefour' },
  { id: 5, name: 'Nesto', logo: 'https://placehold.co/150x150/ffffff/000000?text=Nesto' },
  { id: 6, name: 'Danube', logo: 'https://placehold.co/150x150/ffffff/000000?text=Danube' },
];

const flyers = [
  { id: 1, store: 'Panda', title: 'Weekly Super Sale', valid: 'Valid till 25 Feb', image: 'https://placehold.co/400x550/e2e8f0/475569?text=Panda+Weekly+Flyer' },
  { id: 2, store: 'Lulu', title: 'Half Price Deals', valid: 'Valid till 24 Feb', image: 'https://placehold.co/400x550/e2e8f0/475569?text=Lulu+Half+Price' },
  { id: 3, store: 'Othaim', title: 'Fresh Food Festival', valid: 'Valid till 26 Feb', image: 'https://placehold.co/400x550/e2e8f0/475569?text=Othaim+Festival' },
  { id: 4, store: 'Nesto', title: 'Weekend Bonanza', valid: 'Valid till 23 Feb', image: 'https://placehold.co/400x550/e2e8f0/475569?text=Nesto+Weekend' },
];

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      // آپ کا پرانا اصلی ڈیٹا بیس (Supabase) کال
      const { data } = await supabase.from('products').select('*').limit(8);
      if (data) setProducts(data);
    }
    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      
      {/* 1. D4D Style: Supermarket Logos Section */}
      <section className="bg-white shadow-sm py-6 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Top Supermarkets</h2>
          <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
            {supermarkets.map((store) => (
              <div key={store.id} className="flex flex-col items-center min-w-[80px] cursor-pointer group">
                <div className="w-16 h-16 rounded-full border-2 border-gray-100 overflow-hidden group-hover:border-blue-500 transition-all p-1 shadow-sm">
                  <img src={store.logo} alt={store.name} className="w-full h-full object-cover rounded-full" />
                </div>
                <span className="text-xs font-semibold text-gray-600 mt-2 group-hover:text-blue-600">{store.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. D4D Style: Latest Flyers / Magazines */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Latest Weekly Flyers</h2>
            <div className="h-1 w-16 bg-blue-600 rounded-full mt-2"></div>
          </div>
          <Link href="/flyers" className="text-sm font-bold text-blue-600 hover:underline">View All</Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {flyers.map((flyer) => (
            <div key={flyer.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group">
              <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                <img src={flyer.image} alt={flyer.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                  NEW
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-bold text-gray-800 text-sm mb-1 truncate">{flyer.store} - {flyer.title}</h3>
                <p className="text-xs text-gray-500 font-medium">{flyer.valid}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Your Current Style: Trending Electronics & Deals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Trending Tech Deals</h2>
            <div className="h-1 w-16 bg-green-500 rounded-full mt-2"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
              <Link href={`/product/${product.id}`} className="h-48 bg-white p-6 flex justify-center items-center relative overflow-hidden group-hover:bg-gray-50 transition-colors mt-2">
                <img src={product.image_url} alt={product.title} onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x400?text=No+Image'; }} className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
              </Link>
              <div className="p-4 flex flex-col flex-grow border-t border-gray-50">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-2">{product.store}</span>
                <Link href={`/product/${product.id}`}>
                  <h3 className="text-sm font-bold text-gray-800 mb-3 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors cursor-pointer">{product.title}</h3>
                </Link>
                <div className="mt-auto pt-2 flex items-end justify-between">
                  <div>
                    <p className="text-lg font-black text-green-600">{product.price} <span className="text-xs font-bold text-gray-500">SAR</span></p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}