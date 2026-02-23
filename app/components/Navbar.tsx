'use client';

import { useState, useEffect, Suspense, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { supabase } from '../lib/supabase';

function NavbarContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchRef = useRef<HTMLDivElement>(null);
  
  const validCities = ['Riyadh', 'Jeddah', 'Dammam', 'Mecca', 'Madina'];
  
  const getCityFromUrl = () => {
    const firstSegment = pathname.split('/')[1];
    if (validCities.includes(firstSegment)) return firstSegment;
    const cityParam = searchParams.get('city');
    if (cityParam && validCities.includes(cityParam)) return cityParam;
    return '';
  };

  const currentCity = getCityFromUrl();
  const [selectedLang, setSelectedLang] = useState('en');
  const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);
  const [ksaTime, setKsaTime] = useState<Date | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [savedCount, setSavedCount] = useState(0);

  // Live Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [liveProducts, setLiveProducts] = useState<any[]>([]);
  const [liveStores, setLiveStores] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Auto Clear Search Input when navigating away
  useEffect(() => {
    if (!pathname.includes('/search')) {
      setSearchQuery('');
      setShowDropdown(false);
    } else {
      setSearchQuery(searchParams.get('q') || '');
    }
  }, [pathname, searchParams]);

  // Handle typing: Immediately show dropdown and searching state
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.trim().length >= 2) {
      setIsSearching(true);
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
      setLiveProducts([]);
      setLiveStores([]);
    }
  };

  // Live Search Fetch Logic (Fixed DB Error by using select('*'))
  useEffect(() => {
    const fetchLiveSearch = async () => {
      const query = searchQuery.trim();
      if (query.length < 2) return;

      // Fetch Stores Suggestions
      const { data: storesData } = await supabase
        .from('stores')
        .select('*')
        .ilike('name', `%${query}%`)
        .limit(3);

      // Fetch Products Suggestions
      let pQuery = supabase
        .from('products')
        .select('*')
        .or(`title.ilike.%${query}%,store_name.ilike.%${query}%,category.ilike.%${query}%`)
        .limit(5);

      if (currentCity) {
        pQuery = pQuery.eq('city', currentCity);
      }

      const { data: productsData } = await pQuery.order('created_at', { ascending: false });

      setLiveStores(storesData || []);
      setLiveProducts(productsData || []);
      setIsSearching(false);
    };

    const debounceTimer = setTimeout(fetchLiveSearch, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, currentCity]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMounted(true);
    setKsaTime(new Date());
    const timer = setInterval(() => setKsaTime(new Date()), 1000);

    const updateCount = () => {
      const saved = JSON.parse(localStorage.getItem('saudiPrice_favs') || '[]');
      setSavedCount(saved.length);
    };
    updateCount();
    window.addEventListener('storage', updateCount);

    return () => {
      clearInterval(timer);
      window.removeEventListener('storage', updateCount);
    };
  }, []);

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCity = e.target.value;
    const currentPath = pathname;
    const currentParams = new URLSearchParams(searchParams.toString());

    if (currentPath === '/' || validCities.includes(currentPath.replace('/', ''))) {
      router.push(newCity ? `/${newCity}` : '/');
    } else {
      if (newCity) {
        currentParams.set('city', newCity);
      } else {
        currentParams.delete('city');
      }
      router.push(`${currentPath}?${currentParams.toString()}`);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowDropdown(false);
      const cityQuery = currentCity ? `&city=${currentCity}` : '';
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}${cityQuery}`);
    }
  };

  const toggleLanguage = () => setSelectedLang((prevLang) => (prevLang === 'en' ? 'ar' : 'en'));

  const mobileCategories = ['Mobiles', 'TV', 'Kitchen Appliance', 'Printer', 'Smart Watch', 'Computer & Laptop', 'Tabs', 'Gaming'];
  const cityParam = currentCity ? `?city=${currentCity}` : '';
  const newsItems = [
    { text: "🔥 Mega Sale: Up to 70% OFF on Electronics at Noon!", link: `/search?q=Noon${cityParam}` },
    { text: "📱 iPhone 15 Pro Max 256GB - Lowest price ever in Amazon SA!", link: `/search?q=iPhone${cityParam}` },
    { text: "🛒 Ramadan Supermarket deals starting tomorrow at Panda & Othaim!", link: `/search?q=Panda${cityParam}` },
    { text: "💻 Back to School Offers on Laptops at Jarir Bookstore!", link: `/search?q=Jarir${cityParam}` }
  ];

  const formatKsaTime = (date: Date) => date.toLocaleTimeString('en-US', { timeZone: 'Asia/Riyadh', hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const formatGregorianDate = (date: Date) => date.toLocaleDateString('en-US', { timeZone: 'Asia/Riyadh', month: 'short', day: 'numeric', year: 'numeric' });
  
  const formatHijriDate = (date: Date) => {
    try {
      const parts = new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura', { timeZone: 'Asia/Riyadh', day: 'numeric', month: 'numeric', year: 'numeric' }).formatToParts(date);
      const day = parts.find(p => p.type === 'day')?.value || '1';
      const monthNum = parseInt(parts.find(p => p.type === 'month')?.value || '1', 10);
      let year = (parts.find(p => p.type === 'year')?.value || '1447').replace(/[^0-9]/g, '');
      const islamicMonths = ['Muh', 'Saf', 'Rab', 'Rb2', 'Jum', 'Jm2', 'Raj', 'Sha', 'Ram', 'Shw', 'DhQ', 'DhH'];
      return `${islamicMonths[monthNum - 1] || 'Ram'} ${day}, ${year} AH`;
    } catch (e) { return 'Loading...'; }
  };

  const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 md:w-3.5 md:h-3.5 text-green-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );

  return (
    <>
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-100%); } }
        .animate-marquee { animation: marquee 35s linear infinite; display: inline-flex; }
        .ticker-wrapper:hover .animate-marquee { animation-play-state: paused; }
      `}</style>

      <header className="font-sans z-50 bg-white shadow-sm sticky top-0 w-full">
        <div className="max-w-[1400px] mx-auto px-3 md:px-4 py-2.5 md:py-3 flex flex-wrap items-center justify-between gap-3 md:gap-4">
          <Link href="/" className="text-2xl md:text-3xl font-black tracking-tighter shrink-0 flex items-center">
            <span className="text-green-600">Saudi</span>
            <span className="text-[#D4AF37]">Price</span>
          </Link>

          <div className="hidden xl:flex items-center gap-2 lg:gap-3 bg-gray-50 rounded-full px-2 lg:px-3 py-1.5 border border-gray-200 text-[10px] xl:text-[11px] font-bold text-gray-700 shadow-sm whitespace-nowrap shrink-0">
            <span className="flex items-center gap-1.5 lg:gap-2 min-w-max shrink-0">
              <CalendarIcon />
              <span>{isMounted && ksaTime ? formatGregorianDate(ksaTime) : 'Loading...'}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              <span className="text-green-700">{isMounted && ksaTime ? formatHijriDate(ksaTime) : 'Loading...'}</span>
            </span>
            <div className="w-px h-3.5 bg-gray-300 shrink-0"></div>
            <span className="flex items-center justify-center gap-1.5 text-gray-800 shrink-0 tabular-nums">
              {isMounted && ksaTime ? formatKsaTime(ksaTime) : '00:00:00 AM'}
            </span>
          </div>

          <div ref={searchRef} className="hidden md:flex flex-1 max-w-sm lg:max-w-md xl:max-w-lg relative">
            <form onSubmit={handleSearchSubmit} className="flex flex-1 border-2 border-green-600 rounded-full overflow-hidden bg-white h-[36px] md:h-[38px] transition-all focus-within:ring-2 focus-within:ring-green-600/20 shadow-sm">
              <div className="bg-green-50 hover:bg-green-100 transition-colors border-r border-green-200 px-2 lg:px-3 flex items-center min-w-[90px] lg:min-w-[110px] shrink-0">
                <select value={currentCity} onChange={handleCityChange} className="bg-transparent text-green-800 text-xs font-black outline-none w-full cursor-pointer">
                  <option value="" disabled hidden>Select your region</option>
                  <option value="Riyadh">Riyadh</option>
                  <option value="Jeddah">Jeddah</option>
                  <option value="Dammam">Dammam</option>
                  <option value="Mecca">Mecca</option>
                  <option value="Madina">Madina</option>
                </select>
              </div>
              <input 
                type="text" 
                value={searchQuery} 
                onChange={handleInputChange} 
                onFocus={() => { if(searchQuery.trim().length >= 2) setShowDropdown(true) }}
                placeholder="Search products or stores..." 
                className="flex-1 px-3 text-xs text-gray-800 outline-none w-full font-medium"
              />
              <button type="submit" className="bg-green-600 text-white px-4 lg:px-6 font-bold text-xs hover:bg-green-700 transition-colors border-l border-green-600 shrink-0">Search</button>
            </form>

            {showDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden max-h-[400px] overflow-y-auto">
                {isSearching ? (
                  <div className="p-4 text-center text-xs font-bold text-green-600 animate-pulse">Searching for "{searchQuery}"...</div>
                ) : (liveStores.length > 0 || liveProducts.length > 0) ? (
                  <div className="flex flex-col">
                    {liveStores.length > 0 && (
                      <div className="border-b border-gray-100">
                        <div className="bg-gray-50 px-3 py-1.5 text-[10px] font-black text-gray-500 uppercase tracking-wider">Stores</div>
                        {liveStores.map((store) => (
                          <Link onClick={() => setShowDropdown(false)} href={`/store/${encodeURIComponent(store.name)}`} key={`store-${store.id}`} className="flex items-center gap-3 p-3 hover:bg-green-50 transition-colors">
                            <div className="w-8 h-8 bg-white rounded-full border border-gray-200 p-1 shrink-0">
                              <img src={store.logo_url} alt={store.name} className="w-full h-full object-contain rounded-full" />
                            </div>
                            <span className="text-xs font-bold text-gray-800">{store.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                    {liveProducts.length > 0 && (
                      <div>
                        <div className="bg-gray-50 px-3 py-1.5 text-[10px] font-black text-gray-500 uppercase tracking-wider">Products Deals</div>
                        {liveProducts.map((item) => (
                          <Link onClick={() => setShowDropdown(false)} href={`/product/${item.id}`} key={`prod-${item.id}`} className="flex items-center gap-3 p-3 border-b border-gray-50 last:border-0 hover:bg-green-50 transition-colors">
                            <div className="w-10 h-10 bg-white rounded-md border border-gray-100 flex items-center justify-center p-1 shrink-0">
                              <img src={item.image_url} alt={item.title} className="max-w-full max-h-full object-contain" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-gray-800 truncate">{item.title}</p>
                              <p className="text-[10px] text-green-600 font-bold">{item.store_name} <span className="text-gray-400 font-normal">in {item.city}</span></p>
                            </div>
                            <div className="text-sm font-black text-green-700 shrink-0">SAR {item.current_price}</div>
                          </Link>
                        ))}
                      </div>
                    )}
                    <button onClick={handleSearchSubmit} className="w-full text-center p-3 bg-gray-50 hover:bg-green-600 hover:text-white text-xs font-bold text-green-600 transition-colors">
                      View all results for "{searchQuery}" ❯
                    </button>
                  </div>
                ) : (
                  <div className="p-4 text-center text-xs text-gray-500 font-medium">No matching deals found{currentCity ? ` in ${currentCity}` : ''}.</div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link href="/saved" className="relative p-1.5 text-gray-600 hover:text-red-500 transition-colors bg-gray-50 rounded-full border border-gray-100 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {savedCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">{savedCount}</span>}
            </Link>
            <button onClick={toggleLanguage} className="hidden sm:flex items-center bg-white text-green-700 border border-green-200 px-3 py-1.5 rounded-full font-bold text-[11px] hover:bg-green-50 transition-colors shadow-sm">
              {selectedLang === 'en' ? 'عربي - AR' : 'English - EN'}
            </button>
          </div>
        </div>

        <div className="block md:hidden bg-white px-3 py-2.5 w-full border-b border-gray-100">
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between gap-2.5 relative z-40">
              <button onClick={() => setIsMobileCategoryOpen(!isMobileCategoryOpen)} className="flex items-center gap-1.5 bg-green-600 text-white px-3 py-1.5 rounded-md font-bold text-[11px] shadow-sm hover:bg-green-700 transition-colors">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
                Categories
              </button>
              <div className="bg-green-50 border border-green-200 rounded-md px-2 flex items-center shadow-sm flex-1 h-[32px]">
                <select value={currentCity} onChange={handleCityChange} className="bg-transparent text-green-800 text-[11px] font-black outline-none w-full cursor-pointer h-full">
                  <option value="" disabled hidden>Select your region</option>
                  <option value="Riyadh">Riyadh</option>
                  <option value="Jeddah">Jeddah</option>
                  <option value="Dammam">Dammam</option>
                  <option value="Mecca">Mecca</option>
                  <option value="Madina">Madina</option>
                </select>
              </div>
            </div>
            
            {/* Mobile Search Form (Updated with Live Search Logic) */}
            <div className="relative w-full">
              <form onSubmit={handleSearchSubmit} className="flex border-2 border-green-600 rounded-md overflow-hidden bg-white h-[36px] shadow-sm w-full">
                <input 
                  type="text" 
                  value={searchQuery} 
                  onChange={handleInputChange}
                  onFocus={() => { if(searchQuery.trim().length >= 2) setShowDropdown(true) }}
                  placeholder="Search deals..." 
                  className="flex-1 px-3 text-[12px] font-medium text-gray-800 outline-none w-full"
                />
                <button type="submit" className="bg-green-600 text-white px-4 font-bold text-[11px] hover:bg-green-700 transition-colors shrink-0">Search</button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="bg-green-600 text-white shadow-md w-full overflow-hidden relative flex items-center h-8 md:h-10 ticker-wrapper z-40">
          <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white font-black text-[10px] md:text-xs px-4 md:px-5 py-1 z-50 h-full flex items-center shrink-0 uppercase tracking-wider shadow-[4px_0_12px_rgba(239,68,68,0.5)] border-r border-orange-400">🔥 Hot Sale</div>
          <div className="flex whitespace-nowrap overflow-hidden items-center flex-1 h-full relative z-40">
            <div className="animate-marquee items-center flex">
              {newsItems.map((item, index) => (
                <div key={`news-${index}`} className="flex items-center">
                  <Link href={item.link} className="mx-4 text-[11px] md:text-xs font-semibold hover:text-yellow-300 transition-colors cursor-pointer block py-2">{item.text}</Link>
                  <span className="text-yellow-400 font-bold text-[10px]">•</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={<header className="font-sans z-50 bg-white shadow-sm sticky top-0 h-[100px] w-full"></header>}>
      <NavbarContent />
    </Suspense>
  );
}