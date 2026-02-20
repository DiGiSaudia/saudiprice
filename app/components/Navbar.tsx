'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

function NavbarContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const defaultCity = searchParams.get('city') || 'Riyadh';
  const [selectedCity, setSelectedCity] = useState(defaultCity);
  const [selectedLang, setSelectedLang] = useState('en');
  
  // State to manage the active sub-menu item
  const [activeSubMenu, setActiveSubMenu] = useState('All Offers');

  // State for Mobile Categories Dropdown
  const [isMobileCategoryOpen, setIsMobileCategoryOpen] = useState(false);

  // States for Live KSA Time and Dates
  const [ksaTime, setKsaTime] = useState<Date | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setKsaTime(new Date());
    
    // Update time every second to keep the clock live
    const timer = setInterval(() => {
      setKsaTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const city = e.target.value;
    setSelectedCity(city);
    router.push(`/?city=${city}`);
  };

  const toggleLanguage = () => {
    setSelectedLang((prevLang) => (prevLang === 'en' ? 'ar' : 'en'));
  };

  const subMenuItems = [
    'All Offers', 'Ramadan offers', 'Supermarket', 'Mobiles', 
    'Laptops', 'TV & Audio', 'Home & Decor', 'Health & Beauty'
  ];

  const mobileCategories = [
    'Mobiles', 'TV', 'Kitchen Appliance', 'Printer', 
    'Smart Watch', 'Computer & Laptop', 'Tabs', 'Gaming'
  ];

  // Formatting functions for Asia/Riyadh timezone
  const formatKsaTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      timeZone: 'Asia/Riyadh', 
      hour12: true, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  const formatGregorianDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      timeZone: 'Asia/Riyadh', 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Fixed Hijri Date formatting: Shows Islamic month, removes duplicate AH or BC issues completely
  const formatHijriDate = (date: Date) => {
    try {
      const formatter = new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura', {
        timeZone: 'Asia/Riyadh',
        day: 'numeric',
        month: 'long', // Forces the actual Islamic month name (e.g., Ramadan, Shawwal)
        year: 'numeric'
      });
      
      let formatted = formatter.format(date);
      
      // Clean the string: Remove any browser-injected 'AH', 'BC', 'BCE', 'CE', or 'ERA'
      formatted = formatted.replace(/\s*(AH|BC|BCE|CE|AD|ERA)\s*/gi, '').trim();
      
      // Append exactly one AH at the end
      return `${formatted} AH`;
    } catch (error) {
      return 'Loading...';
    }
  };

  // Standard SVG Calendar Icon Component
  const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-green-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );

  // Reusable Date & Time Component for Desktop and Tablet
  const renderDateTimeContainer = (customClasses: string) => (
    <div className={`flex items-center gap-2 lg:gap-3 bg-gray-50 rounded-full px-2 lg:px-3 py-1.5 border border-gray-200 text-[10px] xl:text-[11px] font-bold text-gray-700 shadow-sm whitespace-nowrap shrink-0 ${customClasses}`}>
      
      {/* Unified Dual Date Container (Gregorian -> Hijri) */}
      <span className="flex items-center gap-1.5 lg:gap-2 min-w-max shrink-0">
        <CalendarIcon />
        <span>{isMounted && ksaTime ? formatGregorianDate(ksaTime) : 'Loading...'}</span>
        
        {/* Elegant Converter/Exchange Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>

        <span className="text-green-700">{isMounted && ksaTime ? formatHijriDate(ksaTime) : 'Loading...'}</span>
      </span>
      
      <div className="w-px h-3.5 bg-gray-300 shrink-0"></div>
      
      {/* Live KSA Time with tabular-nums to prevent layout shifting */}
      <span className="flex items-center justify-center gap-1.5 text-gray-800 min-w-[85px] sm:min-w-[95px] shrink-0 tabular-nums">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0">
          <circle cx="12" cy="12" r="10" className="stroke-blue-600 fill-blue-50"></circle>
          <polyline points="12 6 12 12 16 14" className="stroke-red-500"></polyline>
        </svg>
        {isMounted && ksaTime ? formatKsaTime(ksaTime) : '00:00:00 AM'}
      </span>

    </div>
  );

  return (
    <header className="font-sans z-50 bg-white shadow-sm sticky top-0 w-full">
      
      {/* 1. Main Top Header Row (Desktop & Tablet Layout sharing the same view) */}
      <div className="max-w-[1400px] mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3 md:gap-4">
        
        {/* Brand Logo - Visible on all screens */}
        <Link href="/" className="text-2xl md:text-3xl font-black tracking-tighter shrink-0 flex items-center">
          <span className="text-green-600">Saudi</span>
          <span className="text-[#D4AF37]">Price</span>
        </Link>

        {/* Live Dates and Time - DESKTOP & TABLET (Hidden on Mobile only) */}
        {renderDateTimeContainer("hidden md:flex")}

        {/* Compact Search Bar & City Selector - DESKTOP & TABLET ONLY */}
        <div className="hidden md:flex flex-1 max-w-sm lg:max-w-md xl:max-w-lg border-2 border-green-600 rounded-full overflow-hidden bg-white h-[38px] transition-all focus-within:ring-2 focus-within:ring-green-600/20 ml-auto">
          
          <div className="bg-gray-50 border-r border-gray-200 px-3 flex items-center min-w-[90px] lg:min-w-[100px] shrink-0">
            <select 
              value={selectedCity} 
              onChange={handleCityChange}
              className="bg-transparent text-gray-800 text-xs font-bold outline-none w-full cursor-pointer"
            >
              <option value="Riyadh">Riyadh</option>
              <option value="Jeddah">Jeddah</option>
              <option value="Dammam">Dammam</option>
            </select>
          </div>
          
          <input 
            type="text" 
            placeholder="Find shopping flyers..." 
            className="flex-1 px-3 text-xs text-gray-800 outline-none w-full"
          />
          
          <button className="bg-green-600 text-white px-4 lg:px-5 font-bold text-xs hover:bg-green-700 transition-colors border-l border-green-600 shrink-0">
            Search
          </button>
        </div>

        {/* Visually Appealing Language Toggle Button */}
        <div className="flex items-center shrink-0">
          <button 
            onClick={toggleLanguage}
            className="flex items-center bg-green-50 text-green-700 border border-green-200 px-3 py-1.5 rounded-full font-bold text-[10px] md:text-[11px] hover:bg-green-100 transition-colors shadow-sm"
          >
            {selectedLang === 'en' ? 'عربي - AR' : 'English - EN'}
          </button>
        </div>

      </div>

      {/* 2. Mobile Date and Time Row (Visible only on Mobile, perfectly centered without horizontal scrolling) */}
      <div className="flex md:hidden bg-white border-t border-gray-100 px-2 py-2 shadow-inner items-center justify-center w-full">
         <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-[10px] font-bold text-gray-700 w-full text-center">
           
           {/* Mobile Unified Date Container */}
           <span className="flex items-center justify-center gap-1.5 shrink-0 whitespace-nowrap">
             <CalendarIcon />
             <span>{isMounted && ksaTime ? formatGregorianDate(ksaTime) : 'Loading...'}</span>
             <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-gray-400 shrink-0 mx-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
               <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
             </svg>
             <span className="text-green-700">{isMounted && ksaTime ? formatHijriDate(ksaTime) : 'Loading...'}</span>
           </span>
           
           {/* Divider (Hidden if elements wrap on very small screens) */}
           <div className="hidden sm:block w-px h-3.5 bg-gray-300 shrink-0"></div>
           
           {/* Mobile Live KSA Time */}
           <span className="flex items-center justify-center gap-1 text-gray-800 shrink-0 tabular-nums whitespace-nowrap">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 shrink-0">
               <circle cx="12" cy="12" r="10" className="stroke-blue-600 fill-blue-50"></circle>
               <polyline points="12 6 12 12 16 14" className="stroke-red-500"></polyline>
             </svg>
             {isMounted && ksaTime ? formatKsaTime(ksaTime) : '00:00:00 AM'}
           </span>

         </div>
      </div>

      {/* 3. Secondary Mobile-Only Section (Search & Categories for Mobile) */}
      <div className="block md:hidden bg-gray-50 border-t border-gray-100 px-4 py-3 shadow-inner w-full">
        <div className="flex flex-col gap-3">
          
          {/* Row A: Categories Button & City Selector */}
          <div className="flex items-center justify-between gap-3 relative z-50">
            
            {/* Categories Mobile Menu Button */}
            <div className="relative shrink-0">
              <button 
                onClick={() => setIsMobileCategoryOpen(!isMobileCategoryOpen)}
                className="flex items-center gap-1.5 bg-green-600 text-white px-3 py-2 rounded-md font-bold text-[11px] shadow-sm hover:bg-green-700 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                Categories
              </button>

              {/* Expandable Dropdown Menu */}
              {isMobileCategoryOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 flex flex-col">
                  {mobileCategories.map((cat, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setIsMobileCategoryOpen(false)}
                      className="px-4 py-2.5 text-left text-[11px] font-bold text-gray-700 hover:bg-green-50 hover:text-green-600 border-b border-gray-50 last:border-0"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Mobile City Selector */}
            <div className="bg-white border border-gray-300 rounded-md px-2 py-1.5 flex items-center shadow-sm flex-1 h-[34px]">
              <select 
                value={selectedCity} 
                onChange={handleCityChange}
                className="bg-transparent text-gray-800 text-[11px] font-bold outline-none w-full cursor-pointer"
              >
                <option value="Riyadh">Riyadh</option>
                <option value="Jeddah">Jeddah</option>
                <option value="Dammam">Dammam</option>
              </select>
            </div>
            
          </div>

          {/* Row B: Mobile Search Bar */}
          <div className="flex border-2 border-green-600 rounded-md overflow-hidden bg-white h-[38px] shadow-sm w-full">
            <input 
              type="text" 
              placeholder="Find shopping flyers..." 
              className="flex-1 px-3 text-[11px] text-gray-800 outline-none w-full"
            />
            <button className="bg-green-600 text-white px-5 font-bold text-[11px] hover:bg-green-700 transition-colors border-l border-green-600 shrink-0">
              Search
            </button>
          </div>
          
        </div>
      </div>

      {/* 4. Green Sub-Menu Navigation */}
      <div className="bg-green-600 text-white shadow-md w-full">
        <div className="max-w-[1400px] mx-auto px-4 flex items-center overflow-x-auto scrollbar-hide">
          <nav className="flex space-x-6 text-[12px] font-semibold whitespace-nowrap py-2.5">
            {subMenuItems.map((item) => (
              <button
                key={item}
                onClick={() => setActiveSubMenu(item)}
                className={`transition-colors ${
                  activeSubMenu === item 
                    ? 'text-black font-extrabold' 
                    : 'text-white hover:text-green-200'
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
    <Suspense fallback={<header className="font-sans z-50 bg-white shadow-sm sticky top-0 h-[100px] w-full"></header>}>
      <NavbarContent />
    </Suspense>
  );
}