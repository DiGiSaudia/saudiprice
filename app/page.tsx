'use client';

import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Link from 'next/link';

// Categories with Icons (100% D4D Style)
const categories = [
  { name: 'Electronics', icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z', active: true, sub: ['Mobiles', 'TV', 'Kitchen Appliance', 'Smart Watch'] },
  { name: 'Food - Grocery', icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z', active: false, sub: [] },
  { name: 'Fruits & Vegetable', icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z', active: false, sub: [] },
  { name: 'Dairy & Eggs', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10', active: false, sub: [] },
  { name: 'Frozen Food', icon: 'M13 10V3L4 14h7v7l9-11h-7z', active: false, sub: [] },
];

const supermarkets = [
  { id: 1, name: 'Carrefour', logo: 'https://placehold.co/150x150/ffffff/000000?text=Carrefour' },
  { id: 2, name: 'Nesto', logo: 'https://placehold.co/150x150/ffffff/000000?text=Nesto' },
  { id: 3, name: 'LuLu', logo: 'https://placehold.co/150x150/ffffff/000000?text=LuLu' },
  { id: 4, name: 'Othaim', logo: 'https://placehold.co/150x150/ffffff/000000?text=Othaim' },
  { id: 5, name: 'Tamimi', logo: 'https://placehold.co/150x150/ffffff/000000?text=Tamimi' },
  { id: 6, name: 'Panda', logo: 'https://placehold.co/150x150/ffffff/000000?text=Panda' },
  { id: 7, name: 'Grand', logo: 'https://placehold.co/150x150/ffffff/000000?text=Grand' },
];

const flyers = [
  { id: 1, store: 'Carrefour', title: "We've Got Your Ramadan", pages: '+72 Pages', daysLeft: '+6 Days left', image: 'https://placehold.co/400x550/e2e8f0/475569?text=Carrefour+Flyer', logo: 'https://placehold.co/80x80/ffffff/000000?text=C' },
  { id: 2, store: 'City Flower', title: 'Ramadan Souq', pages: '+7 Pages', daysLeft: '+12 Days left', image: 'https://placehold.co/400x550/e2e8f0/475569?text=City+Flower', logo: 'https://placehold.co/80x80/ffffff/000000?text=CF' },
  { id: 3, store: 'Nesto', title: 'Ramadan Mubarak', pages: '+47 Pages', daysLeft: '+6 Days left', image: 'https://placehold.co/400x550/e2e8f0/475569?text=Nesto+Flyer', logo: 'https://placehold.co/80x80/ffffff/000000?text=N' },
  { id: 4, store: 'Pharmacies', title: 'Special Offer', pages: '+28 Pages', daysLeft: '+4 Days left', image: 'https://placehold.co/400x550/e2e8f0/475569?text=Pharmacy', logo: 'https://placehold.co/80x80/ffffff/000000?text=UP' },
];

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedCity, setSelectedCity] = useState('Riyadh');

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await supabase.from('products').select('*').limit(8);
      if (data) setProducts(data);
    }
    fetchProducts();
  }, []);

  return (
    <div className="bg-[#f4f5f7] min-h-screen font-sans">
      
      {/* 1. TOP HEADER WITH SEARCH BAR (Missing previously) */}
      <div className="bg-white border-b border-gray-200 py-4 shadow-sm sticky top-0 z-30">
        <div className="max-w-[1400px] mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Logo Area */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-green-600 tracking-tighter">SaudiPrice</span>
          </div>

          {/* Search Bar (D4D Style) */}
          <div className="flex-1 max-w-2xl w-full relative">
            <input 
              type="text" 
              placeholder="Search for offers, flyers, or stores..." 
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-3 pl-10 outline-none"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>

          {/* City & Country Selector */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
              <img src="https://flagcdn.com/w20/sa.png" alt="Saudi Arabia" className="w-5 h-3.5 rounded-sm object-cover" />
              <select 
                value={selectedCity} 
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-transparent text-gray-900 text-sm font-bold outline-none cursor-pointer"
              >
                <option value="Riyadh">Riyadh</option>
                <option value="Jeddah">Jeddah</option>
                <option value="Dammam">Dammam</option>
              </select>
            </div>
          </div>

        </div>
      </div>

      {/* 2. BREADCRUMBS BAR */}
      <div className="bg-white border-b border-gray-200 py-2">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex items-center text-[13px] text-gray-500 font-medium">
            <Link href="/" className="hover:text-green-600">Home</Link>
            <span className="mx-2">&gt;</span>
            <span className="text-gray-800">KSA</span>
            <span className="mx-2">&gt;</span>
            <span className="text-green-600 font-bold">{selectedCity} offers</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row pt-6 px-4 gap-6">
        
        {/* 3. LEFT SIDEBAR WITH ICONS */}
        <aside className="hidden md:block w-[260px] flex-shrink-0 bg-white border border-gray-200 rounded-xl shadow-sm h-fit sticky top-[140px]">
          <h2 className="text-[17px] font-black text-gray-900 mb-2 px-5 pt-5">Categories</h2>
          <nav className="space-y-0 pb-3">
            {categories.map((cat, idx) => (
              <div key={idx} className="border-b border-gray-100 last:border-0">
                <div className={`flex items-center justify-between px-5 py-3.5 cursor-pointer hover:bg-green-50 transition-colors ${cat.active ? 'text-green-700 font-bold bg-green-50/50' : 'text-gray-700 font-semibold'}`}>
                  <div className="flex items-center gap-3">
                    <svg className={`w-5 h-5 ${cat.active ? 'text-green-600' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={cat.icon}></path>
                    </svg>
                    <span className="text-[14px]">{cat.name}</span>
                  </div>
                  <svg className={`w-4 h-4 text-gray-400 ${cat.active ? 'transform rotate-180 text-green-600' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
                </div>
                {cat.active && cat.sub.length > 0 && (
                  <div className="bg-white px-5 py-2 space-y-1">
                    {cat.sub.map((subItem, sIdx) => (
                      <div key={sIdx} className="text-[13px] text-gray-600 hover:text-green-700 font-medium cursor-pointer py-1.5 pl-9 border-l-2 border-transparent hover:border-green-600 transition-all">
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
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 mb-6 flex space-x-5 overflow-x-auto scrollbar-hide items-center relative">
            {supermarkets.map((store) => (
              <div key={store.id} className="flex flex-col items-center min-w-[75px] cursor-pointer group">
                <div className="w-[72px] h-[72px] rounded-full border border-gray-200 overflow-hidden group-hover:border-green-500 transition-all shadow-sm p-1">
                  <img src={store.logo} alt={store.name} className="w-full h-full object-contain rounded-full" />
                </div>
              </div>
            ))}
          </div>

          {/* Title & Tabs (Green Theme) */}
          <div className="mb-6 flex justify-between items-end border-b border-gray-200 pb-4">
            <div>
              <h1 className="text-xl font-bold text-gray-800 mb-3 tracking-tight">KSA - <span className="text-green-600">{selectedCity} offers</span></h1>
              <div className="flex gap-3">
                <button className="bg-green-600 text-white flex items-center gap-2 px-6 py-2 rounded-full text-[14px] font-bold shadow-md hover:bg-green-700 transition-colors">
                  Top Pick
                </button>
                <button className="bg-white text-gray-700 flex items-center gap-2 px-6 py-2 rounded-full text-[14px] font-bold border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm">
                  Latest
                </button>
              </div>
            </div>
            <Link href="/" className="text-sm font-bold text-green-600 hover:underline hidden sm:block">View All</Link>
          </div>

          {/* 4. EXACT D4D Flyer Grid (Inset Logo Fixed perfectly) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
            {flyers.map((flyer) => (
              <div key={flyer.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col overflow-hidden">
                
                {/* Image Area (Relative for absolute logo) */}
                <div className="relative">
                  <div className="aspect-[3/4] bg-gray-50 overflow-hidden">
                    <img src={flyer.image} alt={flyer.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  
                  {/* PERFECT Inset Logo Position (Overlapping Image Bottom) */}
                  <div className="absolute -bottom-6 right-3 w-14 h-14 bg-white rounded-lg shadow-md border border-gray-100 p-1.5 z-10 flex items-center justify-center">
                    <img src={flyer.logo} alt="Logo" className="max-w-full max-h-full object-contain" />
                  </div>
                </div>

                {/* Text Details */}
                <div className="p-4 pt-8 flex-grow flex flex-col">
                  <h3 className="font-bold text-gray-900 text-[15px] mb-0.5 leading-snug">{flyer.store}</h3>
                  <p className="text-gray-500 text-[13px] mb-4 line-clamp-1">{flyer.title}</p>
                  
                  {/* Footer - Pages & Days with accurate icons */}
                  <div className="mt-auto flex items-center justify-between text-[11px] font-bold text-gray-500 pt-3 border-t border-gray-100 border-dashed">
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                      {flyer.pages}
                    </span>
                    <span className="flex items-center gap-1 text-red-500 bg-red-50 px-1.5 py-0.5 rounded">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      {flyer.daysLeft}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Your Original Products Grid */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
             <h2 className="text-[17px] font-bold text-gray-900 mb-5 border-l-4 border-green-500 pl-3">Trending Tech Deals</h2>
             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden group">
                  <Link href={`/product/${product.id}`} className="h-36 bg-white p-4 flex justify-center items-center relative overflow-hidden group-hover:bg-green-50/30 transition-colors">
                    <img src={product.image_url} alt={product.title} onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x400?text=No+Image'; }} className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                  </Link>
                  <div className="p-3 flex flex-col flex-grow border-t border-gray-50">
                    <Link href={`/product/${product.id}`}>
                      <h3 className="text-[13px] font-semibold text-gray-800 mb-2 line-clamp-2 leading-snug group-hover:text-green-600 transition-colors cursor-pointer">{product.title}</h3>
                    </Link>
                    <div className="mt-auto">
                      <p className="text-[16px] font-black text-green-600">{product.price} <span className="text-[10px] font-bold text-gray-500">SAR</span></p>
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