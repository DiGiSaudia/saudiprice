'use client';

import { useState, useEffect, Suspense, useRef } from 'react';
import { supabase } from '../lib/supabase';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import TopProducts from '../components/TopProducts';
import HeroBanner from '../components/HeroBanner';

const NavArrow = ({ direction, onClick }: { direction: 'left' | 'right', onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`absolute top-1/2 -translate-y-1/2 z-20 bg-white shadow-md border border-gray-200 text-gray-600 hover:text-green-600 rounded-full w-9 h-9 md:w-10 md:h-10 flex items-center justify-center hover:bg-green-50 transition-colors ${direction === 'left' ? 'left-0 md:-left-2' : 'right-0 md:-right-2'}`}
  >
    {direction === 'left' ? '❮' : '❯'}
  </button>
);

const getCategoryIcon = (name: string) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('mobile') || lowerName.includes('tablet')) return '📱';
  if (lowerName.includes('laptop') || lowerName.includes('pc')) return '💻';
  if (lowerName.includes('electronic') || lowerName.includes('tv')) return '🎧';
  if (lowerName.includes('grocery') || lowerName.includes('supermarket') || lowerName.includes('food')) return '🛒';
  return '🌟';
};

function CityContent() {
  const router = useRouter();
  const params = useParams();
  const currentCity = params.city as string;
  
  const [categories, setCategories] = useState<any[]>([]);
  const [stores, setStores] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState('All Deals');
  const storesRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (catName: string) => {
    if (catName === 'All Deals') {
      setActiveCategory('All Deals');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push(`/category/${encodeURIComponent(catName)}?city=${currentCity}`);
    }
  };

  useEffect(() => {
    async function fetchLiveSaudiPriceData() {
      const { data: catData } = await supabase.from('categories').select('*').order('created_at');
      if (catData) setCategories([{ id: 'all', name: 'All Deals' }, ...catData]);

      const { data: storeData } = await supabase.from('stores').select('*').order('created_at');
      if (storeData) setStores(storeData);
    }
    fetchLiveSaudiPriceData();
  }, []);

  const displayCategories = categories.length > 0 ? categories : [{id: 'loading', name: 'Loading...'}];

  return (
    <div className="font-sans flex flex-col bg-[#f4f5f7] min-h-screen w-full overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto px-4 py-3 md:py-4 w-full text-xs md:text-sm text-gray-500 font-medium flex items-center">
        <Link href="/" className="hover:text-green-600 transition-colors cursor-pointer text-gray-600 font-bold bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
          All Offers
        </Link> 
        <span className="mx-2 text-gray-400">›</span>
        <span className="text-green-700 font-black bg-green-50 px-3 py-1 rounded-full border border-green-100 shadow-sm capitalize">
          {currentCity} Offers
        </span>
      </div>

      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row px-4 gap-4 md:gap-6 pb-10 w-full">
        <aside className="hidden md:block w-[240px] flex-shrink-0 bg-white border border-gray-100 rounded-2xl shadow-sm h-fit sticky top-[100px] p-4">
          <h3 className="text-lg font-black text-gray-800 mb-4 px-2 uppercase tracking-wider">Categories</h3>
          <ul className="space-y-1.5">
            {displayCategories.map((cat, idx) => {
              const isActive = activeCategory === cat.name;
              return (
                <li key={cat.id || idx}>
                  <button 
                    onClick={() => handleCategoryClick(cat.name)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-bold text-sm ${isActive ? 'bg-green-50 text-green-700 shadow-sm border border-green-100' : 'text-gray-600 hover:bg-gray-50 hover:text-green-600 border border-transparent'}`}
                  >
                    <span className="text-xl">{getCategoryIcon(cat.name)}</span>
                    <span className="truncate">{cat.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        <main className="flex-1 w-full min-w-0 flex flex-col">
          {activeCategory === 'All Deals' && (
            <>
              {stores.length > 0 && (
                <div className="relative mb-6">
                  <div className="flex items-center justify-between mb-4 mt-2">
                    <h2 className="text-lg md:text-xl font-black text-gray-900 tracking-tight capitalize">Popular Stores in {currentCity}</h2>
                  </div>
                  
                  <div className="relative w-full px-8 md:px-10">
                    <NavArrow direction="left" onClick={() => scrollCarousel(storesRef, 'left')} />
                    <div ref={storesRef} className="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-gray-100 flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-6 pb-2 scrollbar-hide items-start w-full">
                      {stores.map((store) => (
                        <Link href={`/store/${encodeURIComponent(store.name)}`} key={store.id} className="flex flex-col items-center min-w-[70px] md:min-w-[90px] snap-start cursor-pointer group shrink-0 outline-none">
                          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden transition-all shadow-sm p-1 border-2 bg-white border-gray-100 group-hover:border-green-400 group-hover:shadow-md">
                            <img src={store.logo_url} alt={store.name} className="w-full h-full object-contain rounded-full" />
                          </div>
                          <span className="text-[11px] md:text-sm mt-2.5 truncate w-full text-center transition-colors text-gray-700 font-bold group-hover:text-green-600">
                            {store.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                    <NavArrow direction="right" onClick={() => scrollCarousel(storesRef, 'right')} />
                  </div>
                </div>
              )}
              <div className="mb-8"><HeroBanner /></div>
            </>
          )}
          <div className="w-full pb-8"><TopProducts activeCategory={activeCategory} /></div>
        </main>
      </div>
    </div>
  );
}

export default function CityPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f4f5f7] w-full flex justify-center pt-20 font-black text-green-600">Loading City Offers...</div>}>
      <CityContent />
    </Suspense>
  );
}