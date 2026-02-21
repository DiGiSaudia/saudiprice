'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';

export default function StoreDetailsPage() {
  const params = useParams();
  const router = useRouter();
  
  // URL سے اسٹور کا نام پڑھیں (مثلاً Panda)
  const storeNameFromUrl = decodeURIComponent(params.name as string);

  const [store, setStore] = useState<any>(null);
  const [flyers, setFlyers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('saudiPrice_favs') || '[]');
    setSavedIds(saved.map((item: any) => item.id));

    async function fetchStoreData() {
      setLoading(true);
      
      const { data: storeData } = await supabase
        .from('stores')
        .select('*')
        .ilike('name', storeNameFromUrl)
        .single();
        
      if (storeData) {
        setStore(storeData);
        
        const { data: flyersData } = await supabase
          .from('flyers')
          .select('*')
          .eq('store_id', storeData.id);
        if (flyersData) setFlyers(flyersData);

        const { data: productsData } = await supabase
          .from('products')
          .select('*')
          .ilike('store_name', `%${storeData.name}%`);
        if (productsData) setProducts(productsData);
      }
      
      setLoading(false);
    }

    if (storeNameFromUrl) {
      fetchStoreData();
    }
  }, [storeNameFromUrl]);

  const toggleSaveProduct = (product: any) => {
    const saved = JSON.parse(localStorage.getItem('saudiPrice_favs') || '[]');
    const isSaved = saved.find((item: any) => item.id === product.id);
    
    let newSaved;
    if (isSaved) {
      newSaved = saved.filter((item: any) => item.id !== product.id);
      setSavedIds(savedIds.filter(savedId => savedId !== product.id));
    } else {
      newSaved = [...saved, product];
      setSavedIds([...savedIds, product.id]);
    }
    
    localStorage.setItem('saudiPrice_favs', JSON.stringify(newSaved));
    window.dispatchEvent(new Event('storage'));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f5f7]">
        <div className="text-xl font-bold text-green-600 animate-pulse">Loading Store details...</div>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f4f5f7]">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Store not found</h1>
        <button onClick={() => router.push('/')} className="bg-green-600 text-white px-6 py-2 rounded-full font-bold">
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f5f7] pb-12 font-sans">
      
      {/* نیا بیک بٹن (Top Navigation Bar) */}
      <div className="bg-white px-4 py-3 flex items-center shadow-sm sticky top-0 z-40 md:static md:shadow-none md:border-b md:border-gray-200">
        <div className="max-w-[1400px] mx-auto w-full">
          <button 
            onClick={() => router.push('/')} 
            className="flex items-center gap-1.5 text-sm font-bold text-gray-600 hover:text-green-600 transition-colors w-fit bg-gray-50 md:bg-transparent px-3 py-1.5 md:p-0 rounded-full md:rounded-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Offers
          </button>
        </div>
      </div>

      {/* Store Header Banner */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 py-6 md:py-8 flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <div className="w-20 h-20 md:w-28 md:h-28 bg-white rounded-2xl shadow-md border-2 border-gray-100 p-2 shrink-0">
            <img src={store.logo_url} alt={store.name} className="w-full h-full object-contain rounded-xl" />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-2xl md:text-4xl font-black text-gray-900 mb-1">{store.name}</h1>
            <p className="text-sm md:text-base text-gray-500 font-medium">Explore all the latest flyers and top deals from {store.name} in Saudi Arabia.</p>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 mt-8">
        
        {/* Store Flyers Section */}
        <div className="mb-10">
          <h2 className="text-xl md:text-2xl font-black text-gray-800 mb-5 border-l-4 border-green-600 pl-3">Latest Flyers</h2>
          {flyers.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {flyers.map((flyer) => (
                <Link href={`/flyer/${flyer.id}`} key={flyer.id} className="group">
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full overflow-hidden">
                    <div className="relative h-[180px] md:h-[240px] bg-gray-50 border-b border-gray-50 w-full shrink-0">
                      <img src={flyer.cover_image_url} alt={flyer.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-3 md:p-4 flex-grow flex flex-col">
                      <p className="text-gray-800 font-bold text-xs md:text-sm mb-2 line-clamp-2">{flyer.title}</p>
                      <div className="mt-auto flex items-center justify-between text-[9px] md:text-[10px] font-bold pt-2 border-t border-gray-50">
                        <span className="text-gray-600 bg-gray-50 px-2 py-1 rounded-lg">+{flyer.page_count} Pages</span>
                        <span className="text-green-600 bg-green-50 px-2 py-1 rounded-lg">Active</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-sm text-gray-500 font-medium">
              No active flyers available for {store.name} at the moment.
            </div>
          )}
        </div>

        {/* Store Products Section */}
        <div>
          <h2 className="text-xl md:text-2xl font-black text-gray-800 mb-5 border-l-4 border-green-600 pl-3">Top Deals & Products</h2>
          {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {products.map((product) => {
                const hasDiscount = product.old_price && product.old_price > product.current_price;
                const isSaved = savedIds.includes(product.id);

                return (
                  <div key={product.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all relative group flex flex-col">
                    <button 
                      onClick={() => toggleSaveProduct(product)}
                      className={`absolute top-3 right-3 z-10 p-1.5 bg-white/90 backdrop-blur-sm rounded-full transition-all shadow-sm hover:shadow ${isSaved ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill={isSaved ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                    <div className="relative aspect-square w-full mb-4 bg-gray-50 rounded-xl flex items-center justify-center p-4">
                      <img src={product.image_url} alt={product.title} className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <h3 className="text-sm font-bold text-gray-800 line-clamp-2 h-10 mb-4 group-hover:text-green-600 transition-colors">
                      {product.title}
                    </h3>
                    <div className="mt-auto flex flex-col border-t border-gray-50 pt-3">
                      {hasDiscount && <span className="text-[11px] text-gray-400 line-through">SAR {product.old_price}</span>}
                      <span className="text-lg font-black text-green-600 italic">SAR {product.current_price}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
             <div className="bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-sm text-gray-500 font-medium">
               No specific product deals listed for {store.name} right now. Check out their flyers above!
             </div>
          )}
        </div>

      </div>
    </div>
  );
}