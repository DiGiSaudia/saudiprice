'use client';

import { useState, useEffect, Suspense, useRef } from 'react';
import { supabase } from './lib/supabase';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import TopProducts from './components/TopProducts'; // 1. Imported TopProducts component here

const NavArrow = ({ direction, onClick }: { direction: 'left' | 'right', onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`absolute top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg border border-gray-200 text-green-600 rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center hover:bg-green-50 transition-colors ${direction === 'left' ? '-left-3 md:-left-5' : '-right-3 md:-right-5'}`}
  >
    {direction === 'left' ? '❮' : '❯'}
  </button>
);

function HomeContent() {
  const searchParams = useSearchParams();
  const selectedCity = searchParams.get('city') || 'Riyadh';
  
  // Database States
  const [categories, setCategories] = useState<any[]>([]);
  const [stores, setStores] = useState<any[]>([]);
  const [flyers, setFlyers] = useState<any[]>([]);
  
  // UI Active States
  const [activeCategory, setActiveCategory] = useState('Supermarket');
  const [activeStore, setActiveStore] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('Top Pick');

  const storesRef = useRef<HTMLDivElement>(null);
  const flyersRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Fetch real data from Supabase for SaudiPrice
  useEffect(() => {
    async function fetchLiveSaudiPriceData() {
      // 1. Fetch Categories
      const { data: catData } = await supabase.from('categories').select('*').order('created_at');
      if (catData) setCategories(catData);

      // 2. Fetch Stores
      const { data: storeData } = await supabase.from('stores').select('*').order('created_at');
      if (storeData) setStores(storeData);

      // 3. Fetch Flyers with Store Details attached
      const { data: flyerData } = await supabase.from('flyers').select(`
        *,
        stores ( name, logo_url )
      `).order('created_at');
      if (flyerData) setFlyers(flyerData);
    }
    fetchLiveSaudiPriceData();
  }, [selectedCity]);

  // Fallback dummy arrays to keep layout beautiful while loading or if data is missing
  const displayCategories = categories.length > 0 ? categories : [{name: 'Loading...'}];
  const displayStores = stores.length > 0 ? stores : [];
  const displayFlyers = flyers.length > 0 ? flyers : [];

  return (
    <div className="font-sans flex flex-col bg-[#f4f5f7] min-h-screen w-full overflow-x-hidden">
      
      <div className="max-w-[1400px] mx-auto px-4 py-3 md:py-4 w-full text-xs md:text-sm text-gray-500 font-medium">
        <Link href="/" className="hover:text-green-600">Home</Link> <span className="mx-2">›</span>
        <span className="text-green-600 font-bold">{selectedCity} Offers</span>
      </div>

      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row px-4 gap-4 md:gap-6 pb-10 w-full">
        
        {/* Left Sidebar - Live Categories */}
        <aside className="hidden md:block w-[240px] flex-shrink-0 bg-white border border-gray-200 rounded-lg shadow-sm h-fit sticky top-[120px]">
          <h2 className="text-sm font-black text-gray-800 bg-gray-50 border-b border-gray-200 px-4 py-3 rounded-t-lg">Categories</h2>
          <nav className="py-1">
            {displayCategories.map((cat, idx) => (
              <div key={cat.id || idx} className="border-b border-gray-100 last:border-0">
                <button 
                  onClick={() => setActiveCategory(cat.name)}
                  className={`w-full flex items-center px-4 py-3 cursor-pointer transition-colors text-left ${
                    activeCategory === cat.name 
                      ? 'text-green-600 font-bold bg-green-50 border-l-4 border-green-600' 
                      : 'text-gray-700 font-medium border-l-4 border-transparent hover:bg-green-50'
                  }`}
                >
                  <span className="text-xs">{cat.name}</span>
                </button>
              </div>
            ))}
          </nav>
        </aside>

        <main className="flex-1 w-full min-w-0">
          
          {/* Responsive Stores Carousel - Live Stores */}
          {displayStores.length > 0 && (
            <div className="relative mb-6 md:mb-8">
              <NavArrow direction="left" onClick={() => scrollCarousel(storesRef, 'left')} />
              <div 
                ref={storesRef}
                className="bg-white p-3 md:p-4 rounded-lg shadow-sm border border-gray-200 flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2 scrollbar-hide items-start w-full"
              >
                {displayStores.map((store) => (
                  <button 
                    key={store.id} 
                    onClick={() => setActiveStore(store.id)}
                    className="flex flex-col items-center min-w-[60px] md:min-w-[70px] snap-start cursor-pointer group shrink-0 outline-none"
                  >
                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden transition-all shadow-sm p-0.5 border-2 ${
                      activeStore === store.id ? 'border-green-600 scale-105' : 'border-gray-200 group-hover:border-green-400'
                    }`}>
                      <img src={store.logo_url} alt={store.name} className="w-full h-full object-cover rounded-full" />
                    </div>
                    <span className={`text-[10px] md:text-xs mt-2 truncate w-full text-center transition-colors ${
                      activeStore === store.id ? 'text-green-600 font-extrabold' : 'text-gray-700 font-semibold group-hover:text-green-600'
                    }`}>
                      {store.name}
                    </span>
                  </button>
                ))}
              </div>
              <NavArrow direction="right" onClick={() => scrollCarousel(storesRef, 'right')} />
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-4 md:mb-5 border-b border-gray-200 pb-3 gap-3 w-full">
            <h1 className="text-lg md:text-xl font-bold text-gray-800 tracking-tight">Latest Flyers & Offers</h1>
            <div className="flex gap-2">
              <button 
                onClick={() => setActiveFilter('Top Pick')}
                className={`px-4 md:px-5 py-1.5 rounded-md text-xs font-bold shadow-sm transition-colors border ${
                  activeFilter === 'Top Pick' 
                    ? 'bg-green-600 text-white border-green-600' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Top Pick
              </button>
              <button 
                onClick={() => setActiveFilter('Latest')}
                className={`px-4 md:px-5 py-1.5 rounded-md text-xs font-bold shadow-sm transition-colors border ${
                  activeFilter === 'Latest' 
                    ? 'bg-green-600 text-white border-green-600' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                Latest
              </button>
            </div>
          </div>

          {/* Responsive Flyer Carousel - Live Flyers */}
          {displayFlyers.length > 0 ? (
            <div className="relative mb-8">
              <NavArrow direction="left" onClick={() => scrollCarousel(flyersRef, 'left')} />
              <div 
                ref={flyersRef}
                className="flex overflow-x-auto snap-x snap-mandatory gap-3 md:gap-4 pb-4 w-full scrollbar-hide"
              >
                {displayFlyers.map((flyer) => (
                  <Link href={`/flyer/${flyer.id}`} key={flyer.id} className="w-[calc(50%-0.375rem)] md:w-[calc(33.333%-0.66rem)] snap-center shrink-0 group">
                    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col relative h-full">
                      <div className="relative aspect-[3/4] bg-gray-50 border-b border-gray-100 overflow-hidden rounded-t-lg">
                        <img src={flyer.cover_image_url} alt={flyer.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute -bottom-4 right-2 w-10 h-10 md:w-12 md:h-12 bg-white rounded shadow-sm border border-gray-200 p-1 z-10 flex items-center justify-center">
                          <img src={flyer.stores?.logo_url} alt="Store Logo" className="max-w-full max-h-full object-cover rounded-sm" />
                        </div>
                      </div>
                      <div className="p-3 pt-6 md:p-4 md:pt-8 flex-grow flex flex-col">
                        <h3 className="font-bold text-gray-900 text-xs md:text-sm mb-1">{flyer.stores?.name}</h3>
                        <p className="text-gray-500 text-[10px] md:text-xs mb-3 md:mb-4 line-clamp-1">{flyer.title}</p>
                        <div className="mt-auto flex items-center justify-between text-[9px] md:text-[10px] font-bold pt-2 md:pt-3 border-t border-gray-100">
                          <span className="text-gray-600 bg-gray-100 px-1.5 py-1 rounded">+{flyer.page_count} Pages</span>
                          <span className="text-red-600 bg-red-50 px-1.5 py-1 rounded">Valid</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <NavArrow direction="right" onClick={() => scrollCarousel(flyersRef, 'right')} />
            </div>
          ) : (
             <div className="py-10 text-center text-gray-500 font-bold">Loading latest offers...</div>
          )}

        </main>
      </div>

      {/* 2. Top Products Section added below the main flyers content */}
      <TopProducts />

    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f4f5f7] w-full"></div>}>
      <HomeContent />
    </Suspense>
  );
}