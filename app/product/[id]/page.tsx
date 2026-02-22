'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    async function fetchProductDetails() {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (data && !error) {
        setProduct(data);
        
        // Check if saved
        const saved = JSON.parse(localStorage.getItem('saudiPrice_favs') || '[]');
        setIsSaved(saved.some((item: any) => item.id === data.id));
      }
      setLoading(false);
    }

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  const toggleSaveProduct = () => {
    if (!product) return;
    
    const saved = JSON.parse(localStorage.getItem('saudiPrice_favs') || '[]');
    let newSaved;
    
    if (isSaved) {
      newSaved = saved.filter((item: any) => item.id !== product.id);
      setIsSaved(false);
    } else {
      newSaved = [...saved, product];
      setIsSaved(true);
    }
    
    localStorage.setItem('saudiPrice_favs', JSON.stringify(newSaved));
    window.dispatchEvent(new Event('storage'));
  };

  const shareProduct = () => {
    if (!product) return;
    const url = window.location.href;
    const text = `Check out this deal: ${product.title} for SAR ${product.current_price} at ${product.store_name} on SaudiPrice!\n\n${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f5f7]">
        <div className="text-xl font-bold text-green-600 animate-pulse">Loading Product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f4f5f7]">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h1>
        <button onClick={() => router.push('/')} className="bg-green-600 text-white px-6 py-2 rounded-full font-bold hover:bg-green-700">
          Go Back Home
        </button>
      </div>
    );
  }

  const hasDiscount = product.old_price && product.old_price > product.current_price;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.old_price - product.current_price) / product.old_price) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-[#f4f5f7] pb-20 font-sans">
      
      {/* Top Navigation */}
      <div className="bg-white px-4 py-3 flex items-center justify-between shadow-sm sticky top-0 z-40">
        <button onClick={() => router.back()} className="flex items-center gap-1.5 text-sm font-bold text-gray-600 hover:text-green-600 transition-colors bg-gray-50 px-3 py-1.5 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>
        <div className="flex gap-2">
          <button onClick={shareProduct} className="p-2 bg-gray-50 text-gray-600 rounded-full hover:bg-green-50 hover:text-green-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
          <button onClick={toggleSaveProduct} className={`p-2 rounded-full transition-colors ${isSaved ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-400 hover:text-red-500'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill={isSaved ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="max-w-[1000px] mx-auto px-4 mt-6">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
          
          {/* Product Image Section */}
          <div className="w-full md:w-1/2 p-8 md:p-12 bg-white relative flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-100">
            {hasDiscount && (
              <span className="absolute top-6 left-6 bg-red-500 text-white font-black text-sm px-3 py-1 rounded-lg shadow-sm">
                -{discountPercentage}%
              </span>
            )}
            <img 
              src={product.image_url} 
              alt={product.title} 
              className="max-h-[350px] w-auto object-contain mix-blend-multiply hover:scale-105 transition-transform duration-500" 
              onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x600/f4f5f7/a1a1aa?text=Image+Not+Found'; }}
            />
          </div>

          {/* Product Details Section */}
          <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
            
            <div className="mb-6">
              <Link href={`/search?q=${encodeURIComponent(product.store_name)}`} className="inline-block bg-blue-50 text-blue-600 font-black text-xs px-3 py-1.5 rounded-lg uppercase tracking-wider mb-4 hover:bg-blue-100 transition-colors">
                {product.store_name}
              </Link>
              <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight mb-4">
                {product.title}
              </h1>
              
              <div className="flex items-end gap-3">
                <span className="text-4xl font-black text-green-600 italic tracking-tighter">SAR {product.current_price}</span>
                {hasDiscount && (
                  <span className="text-lg text-gray-400 line-through font-bold mb-1">SAR {product.old_price}</span>
                )}
              </div>
            </div>

            {/* Added Description Section */}
            {product.description && (
              <div className="mb-6">
                <h3 className="text-sm font-black text-gray-900 mb-2 uppercase tracking-wider">Product Overview</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
              </div>
            )}

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-sm text-gray-600 font-medium bg-gray-50 p-3 rounded-xl border border-gray-100">
                <span className="text-green-500 text-xl">✓</span>
                Verified Offer from {product.store_name}
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 font-medium bg-gray-50 p-3 rounded-xl border border-gray-100">
                <span className="text-green-500 text-xl">✓</span>
                Prices are inclusive of VAT
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 mt-auto">
              {/* Made this a clickable link instead of a dummy button */}
              <a 
                href={product.product_url || '#'} 
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-600 text-white font-black text-lg py-4 rounded-2xl hover:bg-green-700 hover:shadow-lg transition-all transform hover:-translate-y-0.5 text-center flex items-center justify-center gap-2"
              >
                Go to {product.store_name}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <p className="text-center text-xs text-gray-400 font-medium">Clicking this will take you to the official retailer</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}