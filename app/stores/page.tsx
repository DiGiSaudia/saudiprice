'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AllStoresPage() {
  const router = useRouter();
  const [stores, setStores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchAllStores() {
      setLoading(true);
      const { data, error } = await supabase
        .from('stores')
        .select('*')
        .order('name', { ascending: true });
        
      if (data) {
        setStores(data);
      }
      if (error) {
        console.error("Error fetching stores:", error);
      }
      setLoading(false);
    }
    fetchAllStores();
  }, []);

  // Filter stores based on search input
  const filteredStores = stores.filter(store => 
    store.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f4f5f7] font-sans pb-16">
      
      {/* Smart Breadcrumb */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs md:text-sm font-medium">
            <button onClick={() => router.push('/')} className="text-gray-500 hover:text-green-600 transition-colors">Home</button>
            <span className="text-gray-300">›</span>
            <span className="text-green-700 font-bold">All Stores</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 mt-8 md:mt-10">
        
        {/* Page Header & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-2">
              Browse <span className="text-green-600">All Stores</span>
            </h1>
            <p className="text-gray-500 text-sm md:text-base font-medium max-w-xl">
              Discover the best deals, flyers, and offers from top supermarkets and electronics retailers across Saudi Arabia.
            </p>
          </div>
          
          <div className="relative w-full md:w-80 shrink-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search for a store..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600 shadow-sm transition-all text-sm font-medium text-gray-800"
            />
          </div>
        </div>

        {/* Stores Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="font-black text-green-600">Loading Stores...</p>
          </div>
        ) : filteredStores.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {filteredStores.map((store) => (
              <Link 
                href={`/store/${encodeURIComponent(store.name)}`} 
                key={store.id}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center group text-center"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-50 rounded-full border-2 border-gray-100 p-2 mb-4 group-hover:border-green-500 transition-colors">
                  <img 
                    src={store.logo_url} 
                    alt={store.name} 
                    className="w-full h-full object-contain rounded-full mix-blend-multiply" 
                  />
                </div>
                <h3 className="font-black text-gray-800 text-sm md:text-base mb-1 group-hover:text-green-600 transition-colors line-clamp-1 w-full">
                  {store.name}
                </h3>
                <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50 px-2 py-1 rounded-md mt-auto">
                  View Deals ❯
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl text-gray-800 font-black mb-2">No Stores Found</h3>
            <p className="text-gray-500">We couldn&apos;t find any store matching &quot;{searchQuery}&quot;.</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-6 text-green-600 font-bold hover:underline"
            >
              Clear Search
            </button>
          </div>
        )}

      </div>
    </div>
  );
}