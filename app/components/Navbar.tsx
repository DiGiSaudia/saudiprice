'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

function NavbarContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const defaultCity = searchParams.get('city') || 'Riyadh';
  const [selectedCity, setSelectedCity] = useState(defaultCity);
  
  // States for Active UI Elements
  const [activeTab, setActiveTab] = useState('Offers');
  const [activeSubMenu, setActiveSubMenu] = useState('All Offers');
  const [activeLang, setActiveLang] = useState('en');

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const city = e.target.value;
    setSelectedCity(city);
    router.push(`/?city=${city}`);
  };

  const tabs = ['Offers', 'Products', 'Coupons'];
  const subMenuItems = [
    'All Offers', 'Ramadan offers', 'Supermarket', 'Mobiles', 
    'Laptops', 'TV & Audio', 'Home & Decor', 'Health & Beauty'
  ];

  return (
    <header className="font-sans z-50 bg-white shadow-sm sticky top-0">
      
      <div className="max-w-[1400px] mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4 md:gap-5">
        
        <Link href="/" className="text-2xl md:text-3xl font-black tracking-tighter shrink-0">
          <span className="text-green-600">Saudi</span>
          <span className="text-[#D4AF37]">Price</span>
        </Link>

        <div className="hidden lg:flex items-center bg-gray-100 rounded-full p-1 border border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-1.5 rounded-full font-bold text-xs transition-colors ${
                activeTab === tab 
                  ? 'bg-green-600 text-white shadow-sm' 
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex-1 max-w-2xl flex border-2 border-green-600 rounded-full overflow-hidden bg-white h-[38px] transition-all focus-within:ring-2 focus-within:ring-green-600/20">
          <div className="bg-gray-50 border-r border-gray-200 px-3 flex items-center min-w-[90px] md:min-w-[110px]">
            <select 
              value={selectedCity} 
              onChange={handleCityChange}
              className="bg-transparent text-gray-800 text-[11px] md:text-xs font-bold outline-none w-full cursor-pointer"
            >
              <option value="Riyadh">Riyadh</option>
              <option value="Jeddah">Jeddah</option>
              <option value="Dammam">Dammam</option>
            </select>
          </div>
          
          <input 
            type="text" 
            placeholder="Find all shopping flyers in one place" 
            className="flex-1 px-3 text-[11px] md:text-xs text-gray-800 outline-none"
          />
          
          <button className="bg-green-600 text-white px-5 md:px-6 font-bold text-[11px] md:text-xs hover:bg-green-700 transition-colors border-l border-green-600">
            Search
          </button>
        </div>

        {/* Cleanly Structured Language Toggle for Future Routing */}
        <div className="hidden md:flex items-center bg-gray-50 rounded-full p-1 border border-gray-200 shrink-0">
          <button 
            onClick={() => setActiveLang('en')} 
            className={`px-4 py-1.5 rounded-full text-[11px] font-bold transition-colors ${activeLang === 'en' ? 'bg-green-600 text-white shadow-sm' : 'text-gray-500 hover:text-green-600'}`}
          >
            EN
          </button>
          <button 
            onClick={() => setActiveLang('ar')} 
            className={`px-4 py-1.5 rounded-full text-[11px] font-bold transition-colors ${activeLang === 'ar' ? 'bg-green-600 text-white shadow-sm' : 'text-gray-500 hover:text-green-600'}`}
          >
            AR
          </button>
        </div>

      </div>

      <div className="bg-green-600 text-white shadow-md">
        <div className="max-w-[1400px] mx-auto px-4 flex items-center overflow-x-auto scrollbar-hide">
          <nav className="flex space-x-6 text-[12px] font-semibold whitespace-nowrap py-2.5">
            {subMenuItems.map((item) => (
              <button
                key={item}
                onClick={() => setActiveSubMenu(item)}
                className={`transition-colors border-b-2 ${
                  activeSubMenu === item 
                    ? 'text-[#D4AF37] border-[#D4AF37] pb-1 font-bold' 
                    : 'text-green-100 border-transparent hover:text-white pb-1'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      </div>

    </header>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={<header className="font-sans z-50 bg-white shadow-sm sticky top-0 h-[100px]"></header>}>
      <NavbarContent />
    </Suspense>
  );
}