'use client';

import { useEffect, useState, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';

function StoreContent() {
  const params = useParams();
  const router = useRouter();
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
      const { data: storeData } = await supabase.from('stores').select('*').ilike('name', storeNameFromUrl).single();
      if (storeData) {
        setStore(storeData);
        const { data: flyersData } = await supabase.from('flyers').select('*').eq('store_id', storeData.id);
        if (flyersData) setFlyers(flyersData);
        const { data: productsData } = await supabase.from('products').select('*').ilike('store_name', `%${storeData.name}%`);
        if (productsData) setProducts(productsData);
      }
      setLoading(false);
    }
    if (storeNameFromUrl) fetchStoreData();
  }, [storeNameFromUrl]);

  const toggleSaveProduct = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
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

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f5f7]">
      <div className="text-xl font-black text-green-600 animate-pulse">Loading {storeNameFromUrl}...</div>
    </div>
  );

  if (!store) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f4f5f7]">
      <h1 className="text-2xl font-black mb-4 text-gray-800">Store Not Found</h1>
      <button onClick={() => router.push('/')} className="bg-green-600 text-white px-8 py-3 rounded-full font-bold shadow-md">Back to Home</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f4f5f7] pb-12 font-sans">
      
      {/* Premium Back Navigation (Back Button) */}
      <div className="bg-white px-4 py-3 border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-[1400px] mx-auto w-full">
          <button 
            onClick={() => router.push('/')} 
            className="flex items-center gap-2 text-sm font-black text-gray-600 hover:text-green-600 transition-all bg-gray-50 hover:bg-green-50 px-4 py-2 rounded-full border border-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to All Offers
          </button>
        </div>
      </div>

      {/* Store Header Banner */}
      <div className="bg-white border-b border-gray-200 shadow-inner">
        <div className="max-w-[1400px] mx-auto px-4 py-8 flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-3xl shadow-lg border-2 border-gray-100 p-2 shrink-0 overflow-hidden">
            <img src={store.logo_url} alt={store.name} className="w-full h-full object-contain" />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-2">{store.name} <span className="text-green-600">Deals</span></h1>
            <p className="text-sm md:text-base text-gray-500 font-medium max-w-2xl leading-relaxed">
              Explore the latest promotional flyers and featured products from {store.name}. Stay updated with active discounts across Saudi Arabia.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 mt-10">
        
        {/* flyers Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-black text-gray-800 mb-6 flex items-center gap-3">
            <span className="w-2 h-8 bg-[#D4AF37] rounded-full"></span> Active Flyers
          </h2>
          {flyers.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {flyers.map((flyer) => (
                <Link href={`/flyer/${flyer.id}`} key={flyer.id} className="group">
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all h-full overflow-hidden flex flex-col">
                    <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                      <img src={flyer.cover_image_url} alt={flyer.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute top-2 right-2 bg-green-600 text-white text-[9px] px-2 py-0.5 rounded shadow-sm font-black uppercase">Valid</div>
                      <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded-md font-bold">
                        {flyer.page_count} Pages
                      </div>
                    </div>
                    <div className="p-4 flex-grow border-t border-gray-50">
                      <p className="text-gray-800 font-bold text-sm line-clamp-2 leading-snug group-hover:text-green-600 transition-colors">{flyer.title}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-10 text-center border border-gray-100 shadow-sm text-gray-400 font-bold italic">
              No active flyers for {store.name} right now.
            </div>
          )}
        </div>

        {/* Products Section */}
        <div>
          <h2 className="text-2xl font-black text-gray-800 mb-6 flex items-center gap-3">
            <span className="w-2 h-8 bg-green-600 rounded-full"></span> Featured Deals
          </h2>
          {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {products.map((product) => {
                const isSaved = savedIds.includes(product.id);
                const hasDiscount = product.old_price && product.old_price > product.current_price;
                return (
                  <Link href={`/product/${product.id}`} key={product.id} className="bg-white border border-gray-100 rounded-3xl p-4 shadow-sm hover:shadow-2xl transition-all group relative flex flex-col">
                    <button 
                      onClick={(e) => toggleSaveProduct(e, product)}
                      className={`absolute top-4 right-4 z-20 p-2 rounded-full shadow-md backdrop-blur-sm transition-all ${isSaved ? 'bg-red-50 text-red-500' : 'bg-white/80 text-gray-300 hover:text-red-500'}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill={isSaved ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                    <div className="relative aspect-square w-full mb-4 bg-gray-50 rounded-2xl flex items-center justify-center p-4 overflow-hidden">
                      <img src={product.image_url} alt={product.title} className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <h3 className="text-sm font-bold text-gray-800 line-clamp-2 h-10 mb-4 group-hover:text-green-600 transition-colors leading-snug">{product.title}</h3>
                    <div className="mt-auto flex flex-col border-t border-gray-50 pt-3">
                      {hasDiscount && <span className="text-[11px] text-gray-400 line-through font-bold">SAR {product.old_price}</span>}
                      <span className="text-xl font-black text-green-600 italic tracking-tighter">SAR {product.current_price}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-10 text-center border border-gray-100 shadow-sm text-gray-400 font-bold italic">
              No specific product deals listed for {store.name} right now.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function StorePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f4f5f7] flex items-center justify-center font-black text-green-600">Loading Store...</div>}>
      <StoreContent />
    </Suspense>
  );
}