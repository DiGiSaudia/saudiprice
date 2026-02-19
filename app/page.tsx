'use client';

import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Link from 'next/link';

// Flat Categories (No Parent Grouping)
const categories = [
  { name: 'Mobiles & Tablets', active: true },
  { name: 'TV & Audio', active: false },
  { name: 'Laptops & Computers', active: false },
  { name: 'Home Appliances', active: false },
  { name: 'Smartwatches', active: false },
  { name: 'Gaming Consoles', active: false },
];

const supermarkets = [
  { id: 1, name: 'Store One', logo: 'https://placehold.co/150x150/ffffff/005b9f?text=Store+1' },
  { id: 2, name: 'Store Two', logo: 'https://placehold.co/150x150/ffffff/e31837?text=Store+2' },
  { id: 3, name: 'Store Three', logo: 'https://placehold.co/150x150/ffffff/008b43?text=Store+3' },
  { id: 4, name: 'Store Four', logo: 'https://placehold.co/150x150/ffffff/1f4d25?text=Store+4' },
  { id: 5, name: 'Store Five', logo: 'https://placehold.co/150x150/ffffff/000000?text=Store+5' },
  { id: 6, name: 'Store Six', logo: 'https://placehold.co/150x150/ffffff/ff6600?text=Store+6' },
  { id: 7, name: 'Store Seven', logo: 'https://placehold.co/150x150/ffffff/e3000f?text=Store+7' },
  { id: 8, name: 'Store Eight', logo: 'https://placehold.co/150x150/ffffff/000000?text=Store+8' },
  { id: 9, name: 'Store Nine', logo: 'https://placehold.co/150x150/ffffff/b31b1b?text=Store+9' },
  { id: 10, name: 'Store Ten', logo: 'https://placehold.co/150x150/ffffff/008000?text=Store+10' },
  { id: 11, name: 'Store Eleven', logo: 'https://placehold.co/150x150/ffffff/0055a4?text=Store+11' },
  { id: 12, name: 'Store Twelve', logo: 'https://placehold.co/150x150/ffffff/e2231a?text=Store+12' },
];

const flyers = [
  { id: 1, store: 'Store One', title: "Ramadan Pre-Sale", pages: '+72 Pages', daysLeft: '+6 Days left', image: 'https://placehold.co/400x550/f1f5f9/475569?text=Flyer+1', logo: 'https://placehold.co/80x80/ffffff/005b9f?text=S1' },
  { id: 2, store: 'Store Two', title: 'Weekly Super Deals', pages: '+24 Pages', daysLeft: '+3 Days left', image: 'https://placehold.co/400x550/f1f5f9/475569?text=Flyer+2', logo: 'https://placehold.co/80x80/ffffff/000000?text=S2' },
  { id: 3, store: 'Store Three', title: 'Weekend Bonanza', pages: '+47 Pages', daysLeft: '+2 Days left', image: 'https://placehold.co/400x550/f1f5f9/475569?text=Flyer+3', logo: 'https://placehold.co/80x80/ffffff/e31837?text=S3' },
  { id: 4, store: 'Store Four', title: 'Tech Festival', pages: '+18 Pages', daysLeft: '+5 Days left', image: 'https://placehold.co/400x550/f1f5f9/475569?text=Flyer+4', logo: 'https://placehold.co/80x80/ffffff/008b43?text=S4' },
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
                </div>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden">
          
          {/* Partner Stores Horizontal Scroll */}
          <div className="bg-white p-5 rounded shadow-sm border border-gray-200 mb-6 flex space-x-6 overflow-x-auto scrollbar-hide items-center">
            {supermarkets.map((store) => (
              <div key={store.id} className="flex flex-col items-center min-w-[70px] cursor-pointer group">
                <div className="w-[70px] h-[70px] rounded-full border border-gray-200 overflow-hidden group-hover:border-green-500 transition-all shadow-sm p-1">
                  <img src={store.logo} alt={store.name} className="w-full h-full object-cover rounded-full" />
                </div>
                <span className="text-[11px] font-semibold text-gray-500 mt-2 truncate max-w-[70px]">{store.name}</span>
              </div>
            ))}
          </div>

          <h1 className="text-xl font-bold text-gray-800 mb-4 tracking-tight">SaudiPrice - <span className="text-green-600">{selectedCity} offers</span></h1>
          
          <div className="flex gap-2 mb-6 border-b border-gray-200 pb-4">
            <button className="bg-green-600 text-white px-6 py-2 rounded text-[14px] font-bold shadow-sm hover:bg-green-700 transition-colors">Top Pick</button>
            <button className="bg-white text-gray-700 px-6 py-2 rounded text-[14px] font-bold border border-gray-300 hover:bg-gray-50 transition-colors">Latest</button>
          </div>

          {/* Flyers Horizontal Scroll on Mobile, Grid on Desktop */}
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 md:grid md:grid-cols-3 lg:grid-cols-4 scrollbar-hide">
            {flyers.map((flyer) => (
              <div key={flyer.id} className="min-w-full md:min-w-0 snap-center bg-white rounded border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col relative">
                <div className="relative aspect-[3/4] bg-gray-50 border-b border-gray-100 overflow-hidden">
                  <img src={flyer.image} alt={flyer.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute -bottom-6 right-3 w-12 h-12 bg-white rounded shadow border border-gray-200 p-1 z-10 flex items-center justify-center">
                    <img src={flyer.logo} alt="Store Logo" className="max-w-full max-h-full object-cover rounded-sm" />
                  </div>
                </div>
                <div className="p-4 pt-8 flex-grow flex flex-col">
                  <h3 className="font-bold text-gray-900 text-[15px] mb-1">{flyer.store}</h3>
                  <p className="text-gray-500 text-[13px] mb-4 line-clamp-1">{flyer.title}</p>
                  <div className="mt-auto flex items-center justify-between text-[11px] font-bold pt-3 border-t border-gray-100">
                    <span className="text-gray-500 bg-gray-100 px-2 py-1 rounded">{flyer.pages}</span>
                    <span className="text-red-600 bg-red-50 px-2 py-1 rounded">{flyer.daysLeft}</span>
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