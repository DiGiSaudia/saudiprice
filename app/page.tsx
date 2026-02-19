'use client';

import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Link from 'next/link';

const categories = [
  { name: 'Electronics', active: true, sub: ['Mobiles', 'TV & Audio', 'Laptops & Computers', 'Home Appliances'] },
  { name: 'Hyper Markets', active: false, sub: [] },
  { name: 'Super Markets', active: false, sub: [] },
  { name: 'Health & Beauty', active: false, sub: [] },
  { name: 'Home & Garden', active: false, sub: [] },
  { name: 'Malls', active: false, sub: [] },
];

const supermarkets = [
  { id: 1, name: 'Carrefour', logo: 'https://placehold.co/150x150/ffffff/005b9f?text=Carrefour' },
  { id: 2, name: 'Nesto', logo: 'https://placehold.co/150x150/ffffff/e31837?text=Nesto' },
  { id: 3, name: 'LuLu', logo: 'https://placehold.co/150x150/ffffff/008b43?text=LuLu' },
  { id: 4, name: 'Othaim', logo: 'https://placehold.co/150x150/ffffff/1f4d25?text=Othaim' },
  { id: 5, name: 'Panda', logo: 'https://placehold.co/150x150/ffffff/000000?text=Panda' },
  { id: 6, name: 'Extra', logo: 'https://placehold.co/150x150/ffffff/ff6600?text=Extra' },
  { id: 7, name: 'Jarir', logo: 'https://placehold.co/150x150/ffffff/e3000f?text=Jarir' },
];

const flyers = [
  { id: 1, store: 'Carrefour', title: "Ramadan Pre-Sale", pages: '+72 Pages', daysLeft: '+6 Days left', image: 'https://placehold.co/400x550/f1f5f9/475569?text=Carrefour+Flyer', logo: 'https://placehold.co/80x80/ffffff/005b9f?text=C' },
  { id: 2, store: 'Panda', title: 'Weekly Super Deals', pages: '+24 Pages', daysLeft: '+3 Days left', image: 'https://placehold.co/400x550/f1f5f9/475569?text=Panda+Flyer', logo: 'https://placehold.co/80x80/ffffff/000000?text=P' },
  { id: 3, store: 'Nesto', title: 'Weekend Bonanza', pages: '+47 Pages', daysLeft: '+2 Days left', image: 'https://placehold.co/400x550/f1f5f9/475569?text=Nesto+Flyer', logo: 'https://placehold.co/80x80/ffffff/e31837?text=N' },
  { id: 4, store: 'LuLu', title: 'Tech Festival', pages: '+18 Pages', daysLeft: '+5 Days left', image: 'https://placehold.co/400x550/f1f5f9/475569?text=LuLu+Flyer', logo: 'https://placehold.co/80x80/ffffff/008b43?text=L' },
];

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedCity, setSelectedCity] = useState('Dammam');

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await supabase.from('products').select('*').limit(8);
      if (data) setProducts(data);
    }
    fetchProducts();
  }, []);

  return (
    <div className="font-sans flex flex-col">
      
      {/* Breadcrumbs */}
      <div className="max-w-[1400px] mx-auto px-4 py-3 w-full text-[13px] text-gray-500 font-medium">
        <Link href="/" className="hover:text-green-600">Home</Link> <span className="mx-2">›</span>
        <span className="text-gray-800">KSA</span> <span className="mx-2">›</span>
        <span className="text-gray-800">Saudi Arabia</span> <span className="mx-2">›</span>
        <span className="text-green-600 font-bold">{selectedCity} offers</span>
      </div>

      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row px-4 gap-6 flex-grow pb-10">
        
        {/* Left Sidebar Menu */}
        <aside className="hidden md:block w-[260px] flex-shrink-0 bg-white border border-gray-200 rounded shadow-sm h-fit">
          <h2 className="text-[16px] font-black text-gray-800 bg-gray-50 border-b border-gray-200 px-4 py-3 rounded-t">Categories</h2>
          <nav className="py-2">
            {categories.map((cat, idx) => (
              <div key={idx} className="border-b border-gray-100 last:border-0">
                <div className={`flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-green-50 transition-colors ${cat.active ? 'text-green-600 font-bold bg-green-50/50' : 'text-gray-700 font-medium'}`}>
                  <span className="text-[14px]">{cat.name}</span>
                  {cat.sub.length > 0 && (
                    <span className="text-lg font-light">{cat.active ? '-' : '+'}</span>
                  )}
                </div>
                {cat.active && cat.sub.length > 0 && (
                  <div className="bg-white px-4 py-2 space-y-2">
                    {cat.sub.map((subItem, sIdx) => (
                      <div key={sIdx} className="text-[13px] text-gray-500 hover:text-green-600 cursor-pointer py-1 pl-4 border-l-2 border-transparent hover:border-green-600 transition-all">
                        {subItem}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden">
          
          {/* Partner Stores Carousel */}
          <div className="bg-white p-5 rounded shadow-sm border border-gray-200 mb-6 flex space-x-6 overflow-x-auto scrollbar-hide items-center">
            {supermarkets.map((store) => (
              <div key={store.id} className="flex flex-col items-center min-w-[70px] cursor-pointer group">
                <div className="w-[70px] h-[70px] rounded-full border border-gray-200 overflow-hidden group-hover:border-green-500 transition-all shadow-sm p-1">
                  <img src={store.logo} alt={store.name} className="w-full h-full object-cover rounded-full" />
                </div>
              </div>
            ))}
          </div>

          <h1 className="text-xl font-bold text-gray-800 mb-4 tracking-tight">KSA, Saudi Arabia, Saudi - <span className="text-green-600">{selectedCity} offers</span></h1>
          
          <div className="flex gap-2 mb-6 border-b border-gray-200 pb-4">
            <button className="bg-green-600 text-white px-6 py-2 rounded text-[14px] font-bold shadow-sm hover:bg-green-700 transition-colors">Top Pick</button>
            <button className="bg-white text-gray-700 px-6 py-2 rounded text-[14px] font-bold border border-gray-300 hover:bg-gray-50 transition-colors">Latest</button>
          </div>

          {/* Flyers Grid Layout */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {flyers.map((flyer) => (
              <div key={flyer.id} className="bg-white rounded border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col relative">
                <div className="relative aspect-[3/4] bg-gray-50 border-b border-gray-100 overflow-hidden">
                  <img src={flyer.image} alt={flyer.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute -bottom-6 right-3 w-12 h-12 bg-white rounded shadow border border-gray-200 p-1 z-10 flex items-center justify-center">
                    <img src={flyer.logo} alt="Store Logo" className="max-w-full max-h-full object-cover rounded-sm" />
                  </div>
                </div>
                <div className="p-3 pt-8 flex-grow flex flex-col">
                  <h3 className="font-bold text-gray-900 text-[14px] mb-0.5">{flyer.store}</h3>
                  <p className="text-gray-500 text-[12px] mb-3 line-clamp-1">{flyer.title}</p>
                  <div className="mt-auto flex items-center justify-between text-[11px] font-bold pt-2 border-t border-gray-100">
                    <span className="text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">{flyer.pages}</span>
                    <span className="text-red-600 bg-red-50 px-1.5 py-0.5 rounded">{flyer.daysLeft}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </main>
      </div>
    </div>
  );
}