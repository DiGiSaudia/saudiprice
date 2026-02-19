'use client';

import { useState, useEffect, Suspense, useRef } from 'react';
import { supabase } from './lib/supabase';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const categories = ['Mobiles', 'TV', 'Kitchen Appliance', 'Printer', 'Smart Watch', 'Computer & Laptop', 'Tabs', 'Gaming'];

const supermarkets = [
  { id: 1, name: 'Store One', logo: 'https://placehold.co/150x150/ffffff/005b9f?text=S1' },
  { id: 2, name: 'Store Two', logo: 'https://placehold.co/150x150/ffffff/e31837?text=S2' },
  { id: 3, name: 'Store Three', logo: 'https://placehold.co/150x150/ffffff/008b43?text=S3' },
  { id: 4, name: 'Store Four', logo: 'https://placehold.co/150x150/ffffff/1f4d25?text=S4' },
  { id: 5, name: 'Store Five', logo: 'https://placehold.co/150x150/ffffff/000000?text=S5' },
  { id: 6, name: 'Store Six', logo: 'https://placehold.co/150x150/ffffff/ff6600?text=S6' },
  { id: 7, name: 'Store Seven', logo: 'https://placehold.co/150x150/ffffff/e3000f?text=S7' },
  { id: 8, name: 'Store Eight', logo: 'https://placehold.co/150x150/ffffff/000000?text=S8' },
  { id: 9, name: 'Store Nine', logo: 'https://placehold.co/150x150/ffffff/b31b1b?text=S9' },
  { id: 10, name: 'Store Ten', logo: 'https://placehold.co/150x150/ffffff/008000?text=S10' },
];

const flyers = [
  { id: 1, store: 'Store One', title: "Ramadan Pre-Sale", pages: '+72 Pages', daysLeft: '+6 Days', image: 'https://placehold.co/400x550/f1f5f9/475569?text=Flyer+1', logo: 'https://placehold.co/80x80/ffffff/005b9f?text=S1' },
  { id: 2, store: 'Store Two', title: 'Weekly Super Deals', pages: '+24 Pages', daysLeft: '+3 Days', image: 'https://placehold.co/400x550/f1f5f9/475569?text=Flyer+2', logo: 'https://placehold.co/80x80/ffffff/000000?text=S2' },
  { id: 3, store: 'Store Three', title: 'Weekend Bonanza', pages: '+47 Pages', daysLeft: '+2 Days', image: 'https://placehold.co/400x550/f1f5f9/475569?text=Flyer+3', logo: 'https://placehold.co/80x80/ffffff/e31837?text=S3' },
  { id: 4, store: 'Store Four', title: 'Tech Festival', pages: '+18 Pages', daysLeft: '+5 Days', image: 'https://placehold.co/400x550/f1f5f9/475569?text=Flyer+4', logo: 'https://placehold.co/80x80/ffffff/008b43?text=S4' },
  { id: 5, store: 'Store Five', title: 'Mega Electronics Sale', pages: '+12 Pages', daysLeft: '+1 Days', image: 'https://placehold.co/400x550/f1f5f9/475569?text=Flyer+5', logo: 'https://placehold.co/80x80/ffffff/000000?text=S5' },
];

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
  const [products, setProducts] = useState<any[]>([]);
  
  // States for Active UI Elements
  const [activeCategory, setActiveCategory] = useState('Mobiles');
  const [activeStore, setActiveStore] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState('Top Pick'); // Toggle state for Top Pick / Latest

  const storesRef = useRef<HTMLDivElement>(null);
  const flyersRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await supabase.from('products').select('*').limit(8);
      if (data) setProducts(data);
    }
    fetchProducts();
  }, [selectedCity]);

  return (
    <div className="font-sans flex flex-col bg-[#f4f5f7] min-h-screen w-full overflow-x-hidden">
      
      <div className="max-w-[1400px] mx-auto px-4 py-3 md:py-4 w-full text-xs md:text-sm text-gray-500 font-medium">
        <Link href="/" className="hover:text-green-600">Home</Link> <span className="mx-2">›</span>
        <span className="text-gray-800">KSA</span> <span className="mx-2">›</span>
        <span className="text-green-600 font-bold">{selectedCity} offers</span>
      </div>

      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row px-4 gap-4 md:gap-6 flex-grow pb-10 w-full">
        
        {/* Left Sidebar - Active Category State */}
        <aside className="hidden md:block w-[240px] flex-shrink-0 bg-white border border-gray-200 rounded-lg shadow-sm h-fit sticky top-[120px]">
          <h2 className="text-sm font-black text-gray-800 bg-gray-50 border-b border-gray-200 px-4 py-3 rounded-t-lg">Categories</h2>
          <nav className="py-1">
            {categories.map((cat, idx) => (
              <div key={idx} className="border-b border-gray-100 last:border-0">
                <button 
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full flex items-center px-4 py-3 cursor-pointer transition-colors text-left ${
                    activeCategory === cat 
                      ? 'text-green-600 font-bold bg-green-50 border-l-4 border-green-600' 
                      : 'text-gray-700 font-medium border-l-4 border-transparent hover:bg-green-50'
                  }`}
                >
                  <span className="text-xs">{cat}</span>
                </button>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 w-full min-w-0">
          
          {/* Responsive Stores Carousel - Active Store State */}
          <div className="relative mb-6 md:mb-8">
            <NavArrow direction="left" onClick={() => scrollCarousel(storesRef, 'left')} />
            <div 
              ref={storesRef}
              className="bg-white p-3 md:p-4 rounded-lg shadow-sm border border-gray-200 flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2 scrollbar-hide items-start w-full"
            >
              {supermarkets.map((store) => (
                <button 
                  key={store.id} 
                  onClick={() => setActiveStore(store.id)}
                  className="flex flex-col items-center min-w-[60px] md:min-w-[70px] snap-start cursor-pointer group shrink-0 outline-none"
                >
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden transition-all shadow-sm p-0.5 border-2 ${
                    activeStore === store.id ? 'border-green-600 scale-105' : 'border-gray-200 group-hover:border-green-400'
                  }`}>
                    <img src={store.logo} alt={store.name} className="w-full h-full object-cover rounded-full" />
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

          {/* Top Buttons - Toggle Selection State */}
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

          {/* Responsive Flyer Carousel - Made Clickable (Ready for Routing) */}
          <div className="relative mb-8">
            <NavArrow direction="left" onClick={() => scrollCarousel(flyersRef, 'left')} />
            <div 
              ref={flyersRef}
              className="flex overflow-x-auto snap-x snap-mandatory gap-3 md:gap-4 pb-4 w-full scrollbar-hide"
            >
              {flyers.map((flyer) => (
                // Wrapped the entire flyer card in a Link tag. It behaves purely as a route link.
                <Link href={`#flyer-${flyer.id}`} key={flyer.id} className="w-[calc(50%-0.375rem)] md:w-[calc(33.333%-0.66rem)] snap-center shrink-0 group">
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col relative h-full">
                    <div className="relative aspect-[3/4] bg-gray-50 border-b border-gray-100 overflow-hidden rounded-t-lg">
                      <img src={flyer.image} alt={flyer.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute -bottom-4 right-2 w-10 h-10 md:w-12 md:h-12 bg-white rounded shadow-sm border border-gray-200 p-1 z-10 flex items-center justify-center">
                        <img src={flyer.logo} alt="Store Logo" className="max-w-full max-h-full object-cover rounded-sm" />
                      </div>
                    </div>
                    <div className="p-3 pt-6 md:p-4 md:pt-8 flex-grow flex flex-col">
                      <h3 className="font-bold text-gray-900 text-xs md:text-sm mb-1">{flyer.store}</h3>
                      <p className="text-gray-500 text-[10px] md:text-xs mb-3 md:mb-4 line-clamp-1">{flyer.title}</p>
                      <div className="mt-auto flex items-center justify-between text-[9px] md:text-[10px] font-bold pt-2 md:pt-3 border-t border-gray-100">
                        <span className="text-gray-600 bg-gray-100 px-1.5 py-1 rounded">{flyer.pages}</span>
                        <span className="text-red-600 bg-red-50 px-1.5 py-1 rounded">{flyer.daysLeft}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <NavArrow direction="right" onClick={() => scrollCarousel(flyersRef, 'right')} />
          </div>

        </main>
      </div>
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