'use client';

import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Link from 'next/link';

// Dummy Categories for Left Sidebar
const categories = [
  { name: 'Electronics', active: true, sub: ['Mobiles', 'TV', 'Kitchen Appliance', 'Printer', 'Smart Watch'] },
  { name: 'Food - Grocery', active: false, sub: [] },
  { name: 'Fruits & Vegetable', active: false, sub: [] },
  { name: 'Dairy & Eggs', active: false, sub: [] },
  { name: 'Chicken, Meat & Fish', active: false, sub: [] },
  { name: 'Frozen Food', active: false, sub: [] },
];

// Dummy Supermarkets
const supermarkets = [
  { id: 1, name: 'Carrefour', logo: 'https://placehold.co/150x150/ffffff/000000?text=Carrefour' },
  { id: 2, name: 'Nesto', logo: 'https://placehold.co/150x150/ffffff/000000?text=Nesto' },
  { id: 3, name: 'LuLu', logo: 'https://placehold.co/150x150/ffffff/000000?text=LuLu' },
  { id: 4, name: 'Othaim', logo: 'https://placehold.co/150x150/ffffff/000000?text=Othaim' },
  { id: 5, name: 'Tamimi', logo: 'https://placehold.co/150x150/ffffff/000000?text=Tamimi' },
  { id: 6, name: 'Panda', logo: 'https://placehold.co/150x150/ffffff/000000?text=Panda' },
  { id: 7, name: 'Grand', logo: 'https://placehold.co/150x150/ffffff/000000?text=Grand' },
];

// Advanced Flyer Data matching D4D style
const flyers = [
  { id: 1, store: 'Carrefour', title: "We've Got Your Ramadan", pages: '+72 Pages', daysLeft: '+6 Days left', image: 'https://placehold.co/400x550/e2e8f0/475569?text=Carrefour+Flyer', logo: 'https://placehold.co/80x80/ffffff/000000?text=C' },
  { id: 2, store: 'City Flower', title: 'Ramadan Souq', pages: '+7 Pages', daysLeft: '+12 Days left', image: 'https://placehold.co/400x550/e2e8f0/475569?text=City+Flower+Flyer', logo: 'https://placehold.co/80x80/ffffff/000000?text=CF' },
  { id: 3, store: 'Nesto', title: 'Ramadan Mubarak', pages: '+47 Pages', daysLeft: '+6 Days left', image: 'https://placehold.co/400x550/e2e8f0/475569?text=Nesto+Flyer', logo: 'https://placehold.co/80x80/ffffff/000000?text=N' },
  { id: 4, store: 'United Pharmacies', title: 'Special Offer', pages: '+28 Days left', daysLeft: '+4 Days left', image: 'https://placehold.co/400x550/e2e8f0/475569?text=Pharmacy+Flyer', logo: 'https://placehold.co/80x80/ffffff/000000?text=UP' },
];

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await supabase.from('products').select('*').limit(8);
      if (data) setProducts(data);
    }
    fetchProducts();
  }, []);

  return (
    <div className="bg-[#f8f9fa] min-h-screen">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row pt-6 px-4 gap-6">
        
        {/* LEFT SIDEBAR (D4D Style) */}
        <aside className="hidden md:block w-64 flex-shrink-0 bg-white border-r border-gray-100 min-h-screen sticky top-0 pt-4">
          <h2 className="text-xl font-black text-gray-900 mb-6 px-4">Categories</h2>
          <nav className="space-y-1">
            {categories.map((cat, idx) => (
              <div key={idx} className="border-b border-gray-100">
                <div className={`flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50 ${cat.active ? 'text-purple-600 font-bold' : 'text-gray-700 font-medium'}`}>
                  <span className="text-sm">{cat.name}</span>
                  <svg className={`w-4 h-4 ${cat.active ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
                {cat.active && cat.sub.length > 0 && (
                  <div className="bg-gray-50 px-4 py-2 space-y-2">
                    {cat.sub.map((subItem, sIdx) => (
                      <div key={sIdx} className="text-xs text-gray-600 hover:text-purple-600 cursor-pointer py-1 pl-4 border-l-2 border-transparent hover:border-purple-600">
                        {subItem}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 overflow-hidden">
          
          {/* Top Supermarket Carousel */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex space-x-4 overflow-x-auto scrollbar-hide items-center">
            <button className="hidden md:flex bg-gray-100 p-2 rounded-full hover:bg-gray-200">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            {supermarkets.map((store) => (
              <div key={store.id} className="flex flex-col items-center min-w-[70px] cursor-pointer group">
                <div className="w-16 h-16 rounded-xl border border-gray-200 overflow-hidden group-hover:border-purple-500 transition-all shadow-sm">
                  <img src={store.logo} alt={store.name} className="w-full h-full object-contain p-1" />
                </div>
              </div>
            ))}
            <button className="hidden md:flex bg-gray-100 p-2 rounded-full hover:bg-gray-200">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </div>

          {/* Title & Tabs */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
            <h1 className="text-xl font-bold text-gray-800 mb-4">KSA, Saudi Arabia, Saudi - Riyadh offers</h1>
            <div className="flex gap-3">
              <button className="bg-purple-600 text-white flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-purple-700 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path></svg>
                Top Pick
              </button>
              <button className="bg-gray-100 text-gray-700 flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold border border-gray-200 hover:bg-gray-200 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Latest
              </button>
            </div>

            {/* Flyer Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
              {flyers.map((flyer) => (
                <div key={flyer.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col">
                  {/* Image Area with Inset Logo */}
                  <div className="relative aspect-[3/4] bg-gray-100">
                    <img src={flyer.image} alt={flyer.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute -bottom-4 right-4 w-12 h-12 bg-white rounded-lg shadow-md border border-gray-100 p-1 overflow-hidden z-10">
                      <img src={flyer.logo} alt="Store Logo" className="w-full h-full object-contain" />
                    </div>
                  </div>
                  {/* Text Details */}
                  <div className="p-4 pt-6 flex-grow flex flex-col">
                    <h3 className="font-extrabold text-gray-900 text-[15px] mb-1 leading-snug">{flyer.store}</h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-1">{flyer.title}</p>
                    <div className="mt-auto flex items-center justify-between text-xs font-semibold text-gray-400 border-t border-gray-100 pt-3">
                      <span>{flyer.pages}</span>
                      <span>{flyer.daysLeft}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hot Deals (Your Previous Products Grid) */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
             <h2 className="text-xl font-bold text-gray-800 mb-6">Trending Deals</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group">
                  <Link href={`/product/${product.id}`} className="h-40 bg-white p-4 flex justify-center items-center relative overflow-hidden group-hover:bg-gray-50 transition-colors">
                    <img src={product.image_url} alt={product.title} onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x400?text=No+Image'; }} className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                  </Link>
                  <div className="p-4 flex flex-col flex-grow border-t border-gray-50">
                    <Link href={`/product/${product.id}`}>
                      <h3 className="text-sm font-bold text-gray-800 mb-2 line-clamp-2 leading-snug group-hover:text-purple-600 transition-colors cursor-pointer">{product.title}</h3>
                    </Link>
                    <div className="mt-auto pt-2">
                      <p className="text-lg font-black text-red-600">{product.price} <span className="text-[10px] font-bold text-gray-500">SAR</span></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}