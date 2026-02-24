'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '../lib/supabase';

export default function Sidebar({ activeCategory, setActive }: { activeCategory: string, setActive: (name: string) => void }) {
  const [cats, setCats] = useState<any[]>([]);

  useEffect(() => {
    async function loadCats() {
      const { data } = await supabase.from('categories').select('*').order('name');
      setCats([{ id: 'all', name: 'All Deals', icon: '☀️' }, ...(data || [])]);
    }
    loadCats();
  }, []);

  return (
    <aside className="hidden md:block w-64 shrink-0 font-sans">
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50 sticky top-28">
        <h3 className="text-[11px] font-black uppercase text-gray-400 tracking-widest mb-5 px-2">Categories</h3>
        
        <nav className="space-y-1.5 mb-8">
          {cats.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.name)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-bold transition-all duration-200 ${
                activeCategory === c.name 
                ? 'bg-green-50 text-green-700 shadow-sm border-l-4 border-green-600' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-black'
              }`}
            >
              <span className="text-lg opacity-80">{c.icon || '📦'}</span>
              {c.name}
            </button>
          ))}
        </nav>

        {/* Download App Section - Fixed with missing text */}
        <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100">
          <h4 className="text-[13px] font-black text-blue-800 mb-1">Download App</h4>
          <p className="text-[10px] font-bold text-blue-600/80 mb-4 leading-relaxed">
            Get exclusive app-only discounts!
          </p>
          <button className="w-full bg-blue-600 text-white text-[11px] font-black py-2.5 rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all uppercase tracking-wider">
            Coming Soon
          </button>
        </div>
      </div>
    </aside>
  );
}