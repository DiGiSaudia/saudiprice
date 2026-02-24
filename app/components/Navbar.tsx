'use client';

import { useState, useEffect, Suspense, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { supabase } from '../lib/supabase';

// --- Static Data ---
const CITIES = ['Riyadh', 'Jeddah', 'Dammam', 'Mecca', 'Madina'];
const MOB_CATS = ['Mobiles & Tablets', 'Laptops & PCs', 'Electronics & TV', 'Grocery & Daily Needs', 'Fashion & Beauty', 'Home & Kitchen'];

const CalendarIcon = () => (
  <svg className="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

function NavbarContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ products: any[], stores: any[] }>({ products: [], stores: [] });
  const [ui, setUi] = useState({ isMounted: false, ksaTime: new Date(), lang: 'en', mobMenu: false, dropdown: false, searching: false, favs: 0 });

  const currentCity = CITIES.find(c => pathname.includes(c)) || searchParams.get('city') || '';

  // FIXED: Search Input clear logic added here
  const handleSearchSubmit = useCallback((e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim()) return;

    const searchTerm = query.trim();
    setUi(prev => ({ ...prev, dropdown: false }));
    
    // Clearing the search box
    setQuery(''); 
    
    router.push(`/search?q=${encodeURIComponent(searchTerm)}${currentCity ? `&city=${currentCity}` : ''}`);
  }, [query, currentCity, router]);

  useEffect(() => {
    setUi(v => ({ ...v, isMounted: true }));
    const timer = setInterval(() => setUi(v => ({ ...v, ksaTime: new Date() })), 1000);
    const updateFavs = () => setUi(v => ({ ...v, favs: JSON.parse(localStorage.getItem('saudiPrice_favs') || '[]').length }));
    updateFavs();
    window.addEventListener('storage', updateFavs);
    return () => { clearInterval(timer); window.removeEventListener('storage', updateFavs); };
  }, []);

  useEffect(() => {
    if (query.length < 2) return setUi(v => ({ ...v, dropdown: false }));
    const delay = setTimeout(async () => {
      setUi(v => ({ ...v, searching: true, dropdown: true }));
      const { data: s } = await supabase.from('stores').select('*').ilike('name', `%${query}%`).limit(3);
      let pQ = supabase.from('products').select('*').or(`title.ilike.%${query}%,store_name.ilike.%${query}%`).limit(5);
      if (currentCity) pQ = pQ.eq('city', currentCity);
      const { data: p } = await pQ;
      setResults({ products: p || [], stores: s || [] });
      setUi(v => ({ ...v, searching: false }));
    }, 300);
    return () => clearTimeout(delay);
  }, [query, currentCity]);

  const fTime = ui.ksaTime.toLocaleTimeString('en-US', { timeZone: 'Asia/Riyadh', hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const fDate = ui.ksaTime.toLocaleDateString('en-US', { timeZone: 'Asia/Riyadh', month: 'short', day: 'numeric', year: 'numeric' });
  const fHijri = new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura', { timeZone: 'Asia/Riyadh', day: 'numeric', month: 'short', year: 'numeric' }).format(ui.ksaTime).replace(/AH/g, "").trim();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 font-sans border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-4 py-2 flex items-center justify-between gap-4">
        
        <div className="flex items-center gap-6 shrink-0">
          <Link href="/" className="text-xl md:text-2xl font-black tracking-tighter shrink-0">
            <span className="text-green-600">Saudi</span><span className="text-[#D4AF37]">Price</span>
          </Link>

          <div className="hidden xl:flex items-center gap-3 bg-gray-50 rounded-full px-3 py-1.5 border border-gray-100 text-[11px] font-bold text-gray-700 shadow-sm">
            <CalendarIcon />
            <div suppressHydrationWarning className="flex items-center gap-2">
              <span>{fDate}</span>
              <span className="text-gray-300">|</span>
              <span className="text-green-700">{fHijri} AH</span>
            </div>
            <div className="w-px h-3 bg-gray-300 mx-1"></div>
            <span suppressHydrationWarning className="tabular-nums text-black">{fTime}</span>
          </div>
        </div>

        <div ref={searchRef} className="hidden md:flex flex-1 max-w-lg relative">
          <form onSubmit={handleSearchSubmit} className="flex flex-1 border-2 border-green-600 rounded-full h-10 overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-green-100 transition-all">
            <select onChange={(e) => router.push(e.target.value ? `/${e.target.value}` : '/')} value={currentCity} className="bg-green-50 text-green-800 text-[11px] font-black px-3 border-r outline-none cursor-pointer">
              <option value="">Region</option>
              {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." className="flex-1 px-3 text-xs outline-none font-semibold text-black" />
            <button className="bg-green-600 text-white px-5 font-bold text-xs hover:bg-green-700">Search</button>
          </form>

          {ui.dropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-xl shadow-2xl z-50 max-h-80 overflow-auto p-2">
              {ui.searching ? <div className="p-4 text-center text-xs text-green-600 animate-pulse font-black">Searching...</div> : (
                <>
                  {results.stores.map(s => <Link key={s.id} href={`/store/${s.name}`} onClick={() => { setUi(v => ({ ...v, dropdown: false })); setQuery(''); }} className="flex items-center gap-2 p-2 hover:bg-green-50 rounded-lg text-xs font-bold text-gray-800"><img src={s.logo_url} className="w-5 h-5 rounded-full" /> {s.name}</Link>)}
                  {results.products.map(p => <Link key={p.id} href={`/product/${p.id}`} onClick={() => { setUi(v => ({ ...v, dropdown: false })); setQuery(''); }} className="flex justify-between p-2 border-t hover:bg-green-50 text-[11px] font-bold text-black"><span className="truncate mr-4">{p.title}</span> <span>SAR {p.current_price}</span></Link>)}
                </>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <Link href="/saved" className="relative p-2 bg-gray-100 rounded-full border border-gray-200 text-gray-700 hover:text-red-500 hover:bg-red-50 transition-all group">
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {ui.favs > 0 && <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[9px] font-black w-4.5 h-4.5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">{ui.favs}</span>}
          </Link>
          <button onClick={() => setUi(v => ({ ...v, lang: v.lang === 'en' ? 'ar' : 'en' }))} className="hidden sm:block bg-white border border-green-200 px-3 py-1.5 rounded-full font-bold text-[10px] text-green-700 hover:bg-green-50 uppercase">
            {ui.lang === 'en' ? 'AR' : 'EN'}
          </button>
        </div>
      </div>

      <div className="md:hidden px-4 pb-2 space-y-2">
        <form onSubmit={handleSearchSubmit} className="flex border-2 border-green-600 rounded-lg h-8 overflow-hidden shadow-sm">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search deals..." className="flex-1 px-3 text-xs outline-none text-black font-semibold" />
          <button className="bg-green-600 text-white px-3 font-bold text-[10px] uppercase">Go</button>
        </form>
      </div>

      <div className="bg-green-600 h-7 md:h-8 flex items-center overflow-hidden relative">
        <div className="bg-red-600 text-white font-black text-[9px] md:text-[10px] px-3 h-full flex items-center shrink-0 z-10 shadow-lg uppercase">🔥 Hot</div>
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center">
              {newsItems.map((n, idx) => <Link key={idx} href={n.link} className="mx-4 text-[10px] md:text-[11px] font-bold text-white hover:text-yellow-300 transition-colors uppercase">{n.text} •</Link>)}
            </div>
          ))}
        </div>
        <style jsx>{`
          .animate-marquee { animation: marquee 35s linear infinite; }
          @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        `}</style>
      </div>
    </header>
  );
}

const newsItems = [
  { text: "Mega Sale: 70% OFF at Noon!", link: "/search?q=Noon" },
  { text: "iPhone 15 Pro Max - Amazon SA", link: "/search?q=iPhone" },
  { text: "Ramadan Deals starting tomorrow!", link: "/search?q=Panda" }
];

export default function Navbar() {
  return <Suspense fallback={<div className="h-16 bg-white shadow-sm" />}><NavbarContent /></Suspense>;
}