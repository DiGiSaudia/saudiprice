'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [selectedCity, setSelectedCity] = useState('Riyadh');
  const [selectedLang, setSelectedLang] = useState('en');

  return (
    <header className="font-sans z-50 bg-white shadow-sm sticky top-0">
      
      {/* Main Top Header Row */}
      <div className="max-w-[1400px] mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-6">
        
        {/* Brand Logo - Dual Color */}
        <Link href="/" className="text-3xl font-black tracking-tighter shrink-0">
          <span className="text-green-600">Saudi</span>
          <span className="text-gray-800">Price</span>
        </Link>

        {/* Center Tabs (Offers, Products, Coupons) */}
        <div className="hidden lg:flex items-center bg-gray-100 rounded-full p-1 border border-gray-200">
          <button className="px-8 py-2.5 rounded-full bg-green-600 text-white font-bold text-sm shadow-sm transition-colors">Offers</button>
          <button className="px-8 py-2.5 rounded-full text-gray-600 font-bold text-sm hover:text-green-600 transition-colors">Products</button>
          <button className="px-8 py-2.5 rounded-full text-gray-600 font-bold text-sm hover:text-green-600 transition-colors">Coupons</button>
        </div>

        {/* Advanced Search Bar (Pill Shape) */}
        <div className="flex-1 max-w-2xl flex border-2 border-green-600 rounded-full overflow-hidden bg-white h-[46px]">
          <div className="bg-gray-50 border-r border-gray-300 px-3 flex items-center min-w-[130px]">
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
            placeholder="Find all shopping flyers in one place" 
            className="flex-1 px-4 text-sm text-gray-800 outline-none"
          />
          <button className="bg-green-600 text-white px-8 font-bold text-sm hover:bg-green-700 transition-colors">
            Search
          </button>
        </div>

        {/* Language Dropdown */}
        <div className="hidden md:flex items-center shrink-0">
          <select 
            value={selectedLang}
            onChange={(e) => setSelectedLang(e.target.value)}
            className="bg-transparent text-sm font-bold text-gray-700 hover:text-green-600 outline-none cursor-pointer"
          >
            <option value="en">English - EN</option>
            <option value="ar">عربي - AR</option>
          </select>
        </div>

      </div>

      {/* Green Sub-Menu Navigation */}
      <div className="bg-green-600 text-white shadow-md">
        <div className="max-w-[1400px] mx-auto px-4 flex items-center overflow-x-auto scrollbar-hide">
          <nav className="flex space-x-8 text-[14px] font-semibold whitespace-nowrap py-3.5">
            <Link href="/" className="hover:text-green-200 transition-colors">All Offers</Link>
            <Link href="#" className="hover:text-green-200 transition-colors">Ramadan offers</Link>
            <Link href="#" className="hover:text-green-200 transition-colors">Supermarket</Link>
            <Link href="#" className="hover:text-green-200 transition-colors">Mobiles</Link>
            <Link href="#" className="hover:text-green-200 transition-colors">Laptops</Link>
            <Link href="#" className="hover:text-green-200 transition-colors">TV & Audio</Link>
            <Link href="#" className="hover:text-green-200 transition-colors">Home & Decor</Link>
            <Link href="#" className="hover:text-green-200 transition-colors">Health & Beauty</Link>
          </nav>
        </div>
      </div>

    </header>
  );
}