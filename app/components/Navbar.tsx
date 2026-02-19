'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [selectedCity, setSelectedCity] = useState('Dammam');
  const [selectedLang, setSelectedLang] = useState('en');

  return (
    <header className="font-sans z-50 bg-white shadow-sm sticky top-0">
      {/* Main Header (Logo, Tabs, Search, Lang) */}
      <div className="max-w-[1400px] mx-auto px-4 py-3 md:py-4 flex flex-wrap items-center justify-between gap-4">
        
        {/* Brand Logo - Dual Color */}
        <Link href="/" className="text-2xl md:text-3xl font-black tracking-tighter shrink-0">
          <span className="text-green-600">Saudi</span>
          <span className="text-gray-800">Price</span>
        </Link>

        {/* Center Tabs (Desktop Only) */}
        <div className="hidden md:flex bg-gray-100 rounded-full p-1 mx-4">
          <button className="px-6 py-2 rounded-full bg-green-600 text-white font-bold text-sm shadow-sm">Offers</button>
          <button className="px-6 py-2 rounded-full text-gray-600 font-bold text-sm hover:text-green-600 transition-colors">Products</button>
          <button className="px-6 py-2 rounded-full text-gray-600 font-bold text-sm hover:text-green-600 transition-colors">Coupons</button>
        </div>

        {/* Search Bar (Full width on mobile, auto on desktop) */}
        <div className="flex-1 w-full md:w-auto md:flex-none md:max-w-md flex border-2 border-green-600 rounded-full overflow-hidden order-last md:order-none mt-2 md:mt-0 bg-white">
          <div className="bg-gray-50 border-r border-gray-300 px-3 py-2 flex items-center min-w-[100px] md:min-w-[120px]">
            <select 
              value={selectedCity} 
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-transparent text-gray-800 text-sm font-bold outline-none w-full cursor-pointer"
            >
              <option value="Riyadh">Riyadh</option>
              <option value="Jeddah">Jeddah</option>
              <option value="Dammam">Dammam</option>
            </select>
          </div>
          <input 
            type="text" 
            placeholder="Search for offers..." 
            className="flex-1 px-4 py-2 text-sm text-gray-800 outline-none"
          />
          <button className="bg-green-600 text-white px-5 md:px-8 py-2 font-bold text-sm hover:bg-green-700 transition-colors">
            SEARCH
          </button>
        </div>

        {/* Language Dropdown */}
        <div className="flex items-center gap-2 shrink-0">
          <select 
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            className="bg-transparent text-sm font-bold text-gray-700 hover:text-green-600 outline-none cursor-pointer"
          >
            <option value="en">EN</option>
            <option value="ar">عربي</option>
          </select>
        </div>
      </div>

      {/* Mobile Tabs (Offers/Products/Coupons) - Shows only on mobile under search */}
      <div className="md:hidden flex border-t border-gray-100 bg-gray-50 text-sm font-bold">
        <button className="flex-1 py-3 text-green-600 border-b-2 border-green-600">Offers</button>
        <button className="flex-1 py-3 text-gray-500 hover:text-green-600">Products</button>
        <button className="flex-1 py-3 text-gray-500 hover:text-green-600">Coupons</button>
      </div>

      {/* Green Sub-Menu Navigation */}
      <div className="bg-green-600 text-white shadow-md">
        <div className="max-w-[1400px] mx-auto px-4 flex justify-start items-center overflow-x-auto scrollbar-hide">
          <nav className="flex space-x-6 text-[14px] font-semibold whitespace-nowrap py-3">
            <Link href="/" className="hover:text-green-200 transition-colors">All Offers</Link>
            <Link href="#" className="hover:text-green-200 transition-colors">Ramadan offers</Link>
            <Link href="#" className="hover:text-green-200 transition-colors">Supermarket</Link>
            <Link href="#" className="hover:text-green-200 transition-colors">Mobiles</Link>
            <Link href="#" className="hover:text-green-200 transition-colors">Laptops</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}