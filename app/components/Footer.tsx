'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [selectedCity, setSelectedCity] = useState('Dammam');

  return (
    <header className="font-sans z-50">
      <div className="bg-white border-b border-gray-200 text-sm font-bold text-gray-500">
        <div className="max-w-[1400px] mx-auto flex justify-center gap-10">
          <button className="py-2.5 px-2 text-green-600 border-b-4 border-green-600">Offers</button>
          <button className="py-2.5 px-2 hover:text-green-600 transition-colors">Products</button>
          <button className="py-2.5 px-2 hover:text-green-600 transition-colors">Coupons</button>
        </div>
      </div>

      <div className="bg-white py-5 shadow-sm relative z-40">
        <div className="max-w-[1400px] mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <Link href="/" className="text-3xl font-black text-green-600 tracking-tighter">SaudiPrice</Link>

          <div className="flex-1 max-w-3xl w-full flex border-2 border-green-600 rounded-lg overflow-hidden shadow-sm bg-white">
            <div className="bg-gray-50 border-r border-gray-300 px-3 py-2.5 flex items-center min-w-[120px]">
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
              placeholder="Search for offers, flyers, or stores..." 
              className="flex-1 px-4 py-2.5 text-sm text-gray-800 outline-none"
            />
            <button className="bg-green-600 text-white px-8 py-2.5 font-bold text-sm hover:bg-green-700 transition-colors">
              SEARCH
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <span className="text-sm font-bold text-gray-600">Language:</span>
            <button className="text-sm font-bold text-green-600">العربية</button>
          </div>
        </div>
      </div>

      <div className="bg-green-600 text-white hidden md:block shadow-md sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-4 flex justify-between items-center">
          <nav className="flex space-x-6 text-[14px] font-semibold">
            <Link href="/" className="py-3.5 hover:text-green-200 border-b-2 border-transparent hover:border-white transition-all">Home</Link>
            <Link href="#" className="py-3.5 hover:text-green-200 border-b-2 border-transparent hover:border-white transition-all">All Offers</Link>
            <Link href="#" className="py-3.5 hover:text-green-200 border-b-2 border-transparent hover:border-white transition-all">Ramadan offers</Link>
            <Link href="#" className="py-3.5 hover:text-green-200 border-b-2 border-transparent hover:border-white transition-all">Supermarket</Link>
            <Link href="#" className="py-3.5 hover:text-green-200 border-b-2 border-transparent hover:border-white transition-all">Electronics</Link>
          </nav>
          <div className="flex items-center space-x-6">
            <Link href="/about" className="text-sm font-medium hover:text-green-200 transition-colors">About Us</Link>
            <Link href="/contact" className="text-sm font-medium hover:text-green-200 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </header>
  );
}