'use client';

import { useState, useEffect, Suspense } from 'react';
import { supabase } from './lib/supabase';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const categories = [
  { name: 'Mobiles', active: true },
  { name: 'TV', active: false },
  { name: 'Kitchen Appliance', active: false },
  { name: 'Printer', active: false },
  { name: 'Smart Watch', active: false },
  { name: 'Computer & Laptop', active: false },
  { name: 'Tabs', active: false },
  { name: 'Gaming', active: false },
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
];

const flyers = [
  { id: 1, store: 'Store One', title: "Ramadan Pre-Sale", pages: '+72 Pages', daysLeft: '+6 Days left', image: 'https://placehold.co/400x550/f1f5f9/475569?text=Flyer+1', logo: 'https://placehold.co/80x80/ffffff/005b9f?text=S1' },
  { id: 2, store: 'Store Two', title: 'Weekly Super Deals', pages: '+24 Pages', daysLeft: '+3 Days left', image: 'https://placehold.co/400x550/f1f5f9/475569?text=Flyer+2', logo: 'https://placehold.co/80x80/ffffff/000000?text=S2' },
  { id: 3, store: 'Store Three', title: 'Weekend Bonanza', pages: '+47 Pages', daysLeft: '+2 Days left', image: 'https://placehold.co/400x550/f1f5f9/475569?text=Flyer+3', logo: 'https://placehold.co/80x80/ffffff/e31837?text=S3' },
  { id: 4, store: 'Store Four', title: 'Tech Festival', pages: '+18 Pages', daysLeft: '+5 Days left', image: 'https://placehold.co/400x550/f1f5f9/475569?text=Flyer+4', logo: 'https://placehold.co/80x80/ffffff/008b43?text=S4' },
  { id: 5, store: 'Store Five', title: 'Electronics Mega Sale', pages: '+12 Pages', daysLeft: '+1 Days left', image: 'https://placehold.co/400x550/f1f5f9/475569?text=Flyer+5', logo: 'https://placehold.co/80x80/ffffff/000000?text=S5' },
];

function HomeContent() {
  const searchParams = useSearchParams();
  const selectedCity = searchParams.get('city') || 'Riyadh';
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await supabase.from('products').select('*').limit(8);
      if (data) setProducts(data);
    }
    fetchProducts();
  }, [selectedCity]);

  return (
    <div className="font-sans flex flex-col bg-[#f4f5f7] min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 py-4 w-full text-sm text-gray-500 font-medium">
        <Link href="/" className="hover:text-green-600">Home</Link> <span className="mx-2">›</span>
        <span className="text-gray-800">KSA</span> <span className="mx-2">›</span>
        <span className="text-gray-800">Saudi Arabia</span> <span className="mx-2">›</span>
        <span className="text-green-600 font-bold">{selectedCity} offers</span>
      </div>

      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row px-4 gap-6 flex-grow pb-10">
        
        <aside className="hidden md:block w-[250px] flex-shrink-0 bg-white border border-gray-200 rounded-lg shadow-sm h-fit sticky top-[140px]">
          <h2 className="text-base font-black text-gray-800 bg-gray-50 border-b border-gray-200 px-5 py-4 rounded-t-lg">Categories</h2>
          <nav className="py-2">
            {categories.map((cat, idx) => (
              <div key={idx} className="border-b border-gray-100 last:border-0">
                <div className={`flex items-center px-5 py-3.5 cursor-pointer hover:bg-green-50 transition-colors ${cat.active ? 'text-green-600 font-bold bg-green-50/50 border-l-4 border-green-600' : 'text-gray-700 font-medium border-l-4 border-transparent'}`}>
                  <span className="text-sm">{cat.name}</span>
                </div>
              </div>
            ))}
          </nav>
        </aside>

        <main className="flex-1 overflow-hidden">
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 mb-8 flex overflow-x-auto gap-6 pb-4 scrollbar-hide items-start">
            {supermarkets.map((store) => (
              <div key={store.id} className="flex flex-col items-center min-w-[75px] cursor-pointer group shrink-0">
                <div className="w-16 h-16 rounded-full border border-gray-200 overflow-hidden group-hover:border-green-500 transition-all shadow-sm p-1">
                  <img src={store.logo} alt={store.name} className="w-full h-full object-cover rounded-full" />
                </div>
                <span className="text-xs font-semibold text-gray-700 mt-2 truncate w-full text-center group-hover:text-green-600">{store.name}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-6 border-b border-gray-200 pb-4 gap-4">
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Latest Flyers & Offers</h1>
            <div className="flex gap-3">
              <button className="bg-green-600 text-white px-6 py-2 rounded-md text-sm font-bold shadow-sm hover:bg-green-700 transition-colors">Top Pick</button>
              <button className="bg-white text-gray-700 px-6 py-2 rounded-md text-sm font-bold border border-gray-300 hover:bg-gray-50 transition-colors">Latest</button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 mb-8">
            {flyers.map((flyer) => (
              <div key={flyer.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group flex flex-col relative">
                <div className="relative aspect-[3/4] bg-gray-50 border-b border-gray-100 overflow-hidden rounded-t-lg">
                  <img src={flyer.image} alt={flyer.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute -bottom-6 right-4 w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-lg shadow-md border border-gray-200 p-1.5 z-10 flex items-center justify-center">
                    <img src={flyer.logo} alt="Store Logo" className="max-w-full max-h-full object-cover rounded-sm" />
                  </div>
                </div>
                <div className="p-4 sm:p-5 pt-8 sm:pt-10 flex-grow flex flex-col">
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1">{flyer.store}</h3>
                  <p className="text-gray-500 text-xs sm:text-sm mb-5 line-clamp-1">{flyer.title}</p>
                  <div className="mt-auto flex items-center justify-between text-[10px] sm:text-xs font-bold pt-4 border-t border-gray-100">
                    <span className="text-gray-600 bg-gray-100 px-2 sm:px-2.5 py-1 rounded-md">{flyer.pages}</span>
                    <span className="text-red-600 bg-red-50 px-2 sm:px-2.5 py-1 rounded-md">{flyer.daysLeft}</span>
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

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f4f5f7]"></div>}>
      <HomeContent />
    </Suspense>
  );
}