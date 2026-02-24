'use client';

import { useState, useEffect, Suspense, useRef } from 'react';
import { supabase } from './lib/supabase';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import TopProducts from './components/TopProducts';
import HeroBanner from './components/HeroBanner';

const NavArrow = ({ direction, onClick }: { direction: 'left' | 'right', onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="shrink-0 z-10 text-gray-400 hover:text-green-600 w-7 h-7 md:w-9 md:h-9 flex items-center justify-center text-lg md:text-xl font-black transition-colors bg-transparent outline-none"
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
  if (lowerName.includes('fashion') || lowerName.includes('beauty')) return '👕';
  if (lowerName.includes('home') || lowerName.includes('kitchen')) return '🏠';
  return '🌟';
};

function HomeContent() {
  const router = useRouter();
  const params = useParams();
  
  const currentCity = params.city ? decodeURIComponent(params.city as string) : '';
  
  const [categories, setCategories] = useState<any[]>([]);
  const [stores, setStores] = useState<any[]>([]);
  
  const [activeCategory, setActiveCategory] = useState('All Deals');
  const [activeStore, setActiveStore] = useState<string | null>(null);

  const storesRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (catName: string) => {
    if (catName === 'All Deals') {
      setActiveCategory('All Deals');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      router.push(currentCity ? `/${currentCity}` : `/`, { scroll: false });
    } else {
      router.push(`/category/${encodeURIComponent(catName)}${currentCity ? `/${currentCity}` : ''}`);
    }
  };

  const resetToHome = () => {
    setActiveCategory('All Deals');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    router.push(`/`);
  };

  useEffect(() => {
    async function fetchLiveData() {
      const { data: catData } = await supabase.from('categories').select('*').order('created_at');
      if (catData) setCategories([{ id: 'all', name: 'All Deals' }, ...catData]);

      const { data: storeData } = await supabase.from('stores').select('*').order('created_at');
      if (storeData) setStores(storeData);
    }
    fetchLiveData();
  }, []);

  const displayCategories = categories.length > 0 ? categories : [{id: 'loading', name: 'Loading...'}];
  const displayStores = stores.length > 0 ? stores : [];

  return (
    <div className="font-sans flex flex-col bg-[#f4f5f7] min-h-screen w-full overflow-x-hidden">
      
      {/* Breadcrumb Navigation */}
      <div className="max-w-[1400px] mx-auto px-4 py-3 w-full text-xs text-gray-500 font-medium flex items-center flex-wrap gap-2">
        <button onClick={resetToHome} className="hover:text-green-600 transition-colors cursor-pointer text-gray-600 font-bold bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
          Home
        </button> 
        <span className="text-gray-400">›</span>
        
        {currentCity ? (
          <>
            <button onClick={resetToHome} className="hover:text-green-600 transition-colors cursor-pointer text-gray-600 font-bold bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
              Saudi Arabia
            </button>
            <span className="text-gray-400">›</span>
            <span className="text-green-700 font-black bg-green-50 px-3 py-1 rounded-full border border-green-100 shadow-sm capitalize">
              {currentCity}
            </span>
          </>
        ) : (
          <span className="text-green-700 font-black bg-green-50 px-3 py-1 rounded-full border border-green-100 shadow-sm">
            Saudi Arabia
          </span>
        )}
      </div>

      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row px-4 gap-4 pb-6 w-full">
        
        {/* Sidebar Navigation */}
        <aside className="hidden md:block w-[240px] flex-shrink-0 h-fit sticky top-[80px]">
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-3 mb-4">
            <h3 className="text-sm font-black text-gray-800 mb-3 px-2 uppercase tracking-wider">
              Categories
            </h3>
            <ul className="space-y-1">
              {displayCategories.map((cat, idx) => {
                const isActive = activeCategory === cat.name;
                return (
                  <li key={cat.id || idx}>
                    <button 
                      onClick={() => handleCategoryClick(cat.name)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all font-bold text-xs ${
                        isActive 
                          ? 'bg-green-50 text-green-700 shadow-sm border border-green-100' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-green-600 border border-transparent'
                      }`}
                    >
                      <span className="text-lg">{getCategoryIcon(cat.name)}</span>
                      <span className="truncate">{cat.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-xl border border-blue-200">
              <h4 className="font-black text-blue-800 text-xs mb-1">Download App</h4>
              <button className="w-full bg-blue-600 text-white text-[10px] font-bold py-1.5 rounded-lg hover:bg-blue-700 transition-colors">
                Coming Soon
              </button>
            </div>
          </div>

          {/* Sidebar Ads */}
          <div className="flex flex-col gap-3">
            <div className="bg-gray-200 rounded-xl w-full h-[250px] flex items-center justify-center border border-gray-300 shadow-inner">
              <span className="text-gray-400 text-xs font-bold">Ad Space 1 (300x250)</span>
            </div>
            <div className="bg-gray-200 rounded-xl w-full h-[250px] flex items-center justify-center border border-gray-300 shadow-inner">
              <span className="text-gray-400 text-xs font-bold">Ad Space 2 (300x250)</span>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 w-full min-w-0 flex flex-col">
          
          {activeCategory === 'All Deals' ? (
            <>
              {/* Stores Strip section */}
              {displayStores.length > 0 && (
                <div className="mb-4 w-full bg-white rounded-xl shadow-sm border border-gray-200 p-1.5 md:p-2 flex items-center justify-between">
                  <NavArrow direction="left" onClick={() => scrollCarousel(storesRef, 'left')} />
                  
                  <div 
                    ref={storesRef}
                    className="flex-1 flex overflow-x-auto snap-x snap-mandatory gap-2 md:gap-2.5 scrollbar-hide items-center px-1 md:px-2"
                  >
                    {displayStores.map((store) => (
                      <Link 
                        href={`/store/${encodeURIComponent(store.name)}${currentCity ? `?city=${currentCity}` : ''}`} 
                        key={store.id} 
                        className="flex flex-col items-center snap-start cursor-pointer group shrink-0 outline-none"
                      >
                        {/* Removed padding (p-1) to allow image to fill the box cleanly */}
                        <div className={`w-[55px] h-[55px] md:w-[65px] md:h-[65px] rounded-xl overflow-hidden transition-all border flex items-center justify-center bg-white ${
                          activeStore === store.id ? 'border-green-600 shadow-sm' : 'border-gray-200 group-hover:border-green-500 group-hover:shadow-sm'
                        }`}>
                          <img src={store.logo_url} alt={store.name} className="w-full h-full object-contain" />
                        </div>
                      </Link>
                    ))}
                  </div>

                  <NavArrow direction="right" onClick={() => scrollCarousel(storesRef, 'right')} />
                </div>
              )}

              {/* Promotional Banner */}
              <div className="w-full mb-5">
                <Link href="/search?q=offers" className="block w-full overflow-hidden rounded-xl shadow-sm border border-gray-200 hover:opacity-95 transition-opacity">
                   <img 
                      src="https://placehold.co/1200x120/ffebb3/b37700?text=RAMADAN+ESSENTIALS+BOX+-+MEGA+OFFER" 
                      alt="Promotional Banner" 
                      className="w-full h-[60px] md:h-[80px] object-cover" 
                   />
                </Link>
              </div>

              {/* Hero Banner Component */}
              <div className="mb-4">
                <HeroBanner />
              </div>
            </>
          ) : (
            // Category filtered view header
            <div className="bg-white rounded-2xl p-3 shadow-sm border border-green-100 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xl md:text-2xl bg-green-50 w-10 h-10 flex items-center justify-center rounded-xl shadow-inner">
                  {getCategoryIcon(activeCategory)}
                </span>
                <div>
                  <h2 className="text-base md:text-lg font-black text-gray-800 leading-tight">{activeCategory}</h2>
                  <p className="text-[9px] md:text-[10px] text-green-600 font-bold uppercase tracking-wider">Top Deals</p>
                </div>
              </div>
              <button 
                onClick={resetToHome} 
                className="text-[10px] font-bold text-red-500 hover:text-white bg-red-50 hover:bg-red-500 px-3 py-1.5 rounded-full transition-all shadow-sm shrink-0"
              >
                ✕ Clear
              </button>
            </div>
          )}

          <div className="w-full pb-4">
            <TopProducts activeCategory={activeCategory} />
          </div>

        </main>
      </div>

    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f4f5f7] w-full flex justify-center pt-20 font-black text-green-600">Loading SaudiPrice...</div>}>
      <HomeContent />
    </Suspense>
  );
}