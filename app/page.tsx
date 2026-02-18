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

// Advanced Flyer Data matching D4D style 100%
const flyers = [
  { id: 1, store: 'Carrefour', title: "We've Got Your Ramadan", pages: '+72 Pages', daysLeft: '+6 Days left', image: 'https://placehold.co/400x550/e2e8f0/475569?text=Carrefour+Flyer', logo: 'https://placehold.co/80x80/ffffff/000000?text=C' },
  { id: 2, store: 'City Flower', title: 'Ramadan Souq', pages: '+7 Pages', daysLeft: '+12 Days left', image: 'https://placehold.co/400x550/e2e8f0/475569?text=City+Flower', logo: 'https://placehold.co/80x80/ffffff/000000?text=CF' },
  { id: 3, store: 'Nesto', title: 'Ramadan Mubarak', pages: '+47 Pages', daysLeft: '+6 Days left', image: 'https://placehold.co/400x550/e2e8f0/475569?text=Nesto+Flyer', logo: 'https://placehold.co/80x80/ffffff/000000?text=N' },
  { id: 4, store: 'United Pharmacies', title: 'Special Offer', pages: '+28 Pages', daysLeft: '+4 Days left', image: 'https://placehold.co/400x550/e2e8f0/475569?text=Pharmacy', logo: 'https://placehold.co/80x80/ffffff/000000?text=UP' },
];

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedCity, setSelectedCity] = useState('Riyadh'); // City State Added!

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await supabase.from('products').select('*').limit(8);
      if (data) setProducts(data);
    }
    fetchProducts();
  }, []);

  return (
    <div className="bg-[#f2f4f7] min-h-screen font-sans">
      
      {/* Top Location & Breadcrumb Bar (100% D4D Match) */}
      <div className="bg-white border-b border-gray-200 py-3 shadow-sm sticky top-0 z-20">
        <div className="max-w-[1400px] mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center text-sm text-gray-500 font-medium">
            <Link href="/" className="hover:text-purple-600">Home</Link>
            <span className="mx-2">&gt;</span>
            <span className="text-gray-800">KSA</span>
            <span className="mx-2">&gt;</span>
            <span className="flex items-center gap-2">
              <img src="https://flagcdn.com/w20/sa.png" alt="Saudi Arabia" className="w-5 h-3 rounded-sm object-cover" />
              Saudi Arabia
            </span>
            <span className="mx-2">&gt;</span>
            <span className="text-purple-600 font-bold">{selectedCity} offers</span>
          </div>
          
          {/* City Selector Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-gray-700">Select City:</span>
            <select 
              value={selectedCity} 
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 outline-none font-bold shadow-sm"
            >
              <option value="Riyadh">Riyadh</option>
              <option value="Jeddah">Jeddah</option>
              <option value="Dammam">Dammam</option>
              <option value="Mecca">Mecca</option>
              <option value="Medina">Medina</option>
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row pt-6 px-4 gap-6">
        
        {/* LEFT SIDEBAR (Exact D4D Style) */}
        <aside className="hidden md:block w-[260px] flex-shrink-0 bg-white border border-gray-200 rounded-xl shadow-sm h-fit sticky top-20">
          <h2 className="text-[17px] font-black text-gray-900 mb-2 px-5 pt-5">Categories</h2>
          <nav className="space-y-0 pb-3">
            {categories.map((cat, idx) => (
              <div key={idx} className="border-b border-gray-100 last:border-0">
                <div className={`flex items-center justify-between px-5 py-3.5 cursor-pointer hover:bg-purple-50 transition-colors ${cat.active ? 'text-purple-700 font-bold bg-purple-50/50' : 'text-gray-700 font-semibold'}`}>
                  <span className="text-[14px]">{cat.name}</span>
                  <svg className={`w-4 h-4 text-gray-400 ${cat.active ? 'transform rotate-180 text-purple-600' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path></svg>
                </div>
                {cat.active && cat.sub.length > 0 && (
                  <div className="bg-white px-5 py-2 space-y-1">
                    {cat.sub.map((subItem, sIdx) => (
                      <div key={sIdx} className="text-[13px] text-gray-600 hover:text-purple-700 font-medium cursor-pointer py-1.5 pl-4 border-l-2 border-gray-100 hover:border-purple-600 transition-all">
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
            <button className="hidden md:flex absolute left-2 bg-white shadow-md p-2 rounded-full border border-gray-100 z-10 hover:bg-gray-50 text-purple-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg>
            </button>
            
            {supermarkets.map((store) => (
              <div key={store.id} className="flex flex-col items-center min-w-[75px] cursor-pointer group">
                <div className="w-[72px] h-[72px] rounded-full border-2 border-gray-100 overflow-hidden group-hover:border-purple-600 transition-all shadow-sm p-1">
                  <img src={store.logo} alt={store.name} className="w-full h-full object-contain rounded-full" />
                </div>
              </div>
            ))}

            <button className="hidden md:flex absolute right-2 bg-white shadow-md p-2 rounded-full border border-gray-100 z-10 hover:bg-gray-50 text-purple-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </div>

          {/* Title & Top Tabs */}
          <div className="mb-6">
            <h1 className="text-xl font-bold text-gray-800 mb-4 tracking-tight">KSA, Saudi Arabia, Saudi - <span className="text-purple-600">{selectedCity} offers</span></h1>
            <div className="flex gap-3 border-b border-gray-200 pb-4">
              <button className="bg-purple-600 text-white flex items-center gap-2 px-6 py-2.5 rounded-full text-[14px] font-bold shadow-md hover:bg-purple-700 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                Top Pick
              </button>
              <button className="bg-white text-gray-700 flex items-center gap-2 px-6 py-2.5 rounded-full text-[14px] font-bold border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm">
                Latest
              </button>
            </div>
          </div>

          {/* 100% Exact D4D Flyer Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
            {flyers.map((flyer) => (
              <div key={flyer.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col relative overflow-visible">
                
                {/* Image Area */}
                <div className="relative aspect-[3/4] bg-gray-50 rounded-t-xl overflow-hidden border-b border-gray-100">
                  <img src={flyer.image} alt={flyer.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                
                {/* 100% Exact Inset Logo Position */}
                <div className="absolute top-[65%] right-3 w-14 h-14 bg-white rounded-lg shadow-md border border-gray-200 p-1.5 z-10 transform -translate-y-1/2 flex items-center justify-center">
                  <img src={flyer.logo} alt="Logo" className="max-w-full max-h-full object-contain" />
                </div>

                {/* Text Details */}
                <div className="p-4 pt-5 flex-grow flex flex-col">
                  <h3 className="font-bold text-gray-900 text-[15px] mb-0.5 leading-snug">{flyer.store}</h3>
                  <p className="text-gray-500 text-[13px] mb-4 line-clamp-1">{flyer.title}</p>
                  
                  {/* Footer - Pages & Days */}
                  <div className="mt-auto flex items-center justify-between text-[11px] font-bold text-gray-500 pt-3 border-t border-gray-100 border-dashed">
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                      {flyer.pages}
                    </span>
                    <span className="flex items-center gap-1 text-red-500">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      {flyer.daysLeft}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Your Products / Hot Deals */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
             <h2 className="text-[17px] font-bold text-gray-900 mb-5">Trending Tech Deals</h2>
             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden group">
                  <Link href={`/product/${product.id}`} className="h-36 bg-white p-4 flex justify-center items-center relative overflow-hidden group-hover:bg-gray-50 transition-colors">
                    <img src={product.image_url} alt={product.title} onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x400?text=No+Image'; }} className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                  </Link>
                  <div className="p-3 flex flex-col flex-grow border-t border-gray-50">
                    <Link href={`/product/${product.id}`}>
                      <h3 className="text-[13px] font-semibold text-gray-800 mb-2 line-clamp-2 leading-snug group-hover:text-purple-600 transition-colors cursor-pointer">{product.title}</h3>
                    </Link>
                    <div className="mt-auto">
                      <p className="text-[16px] font-black text-red-600">{product.price} <span className="text-[10px] font-bold text-gray-500">SAR</span></p>
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