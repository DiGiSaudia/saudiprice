'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';

export default function FlyerDetailsPage() {
  const params = useParams();
  const router = useRouter(); // Added useRouter for back navigation
  const id = params?.id as string;

  const [flyer, setFlyer] = useState<any>(null);
  const [flyerPages, setFlyerPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFlyerDetails() {
      if (!id) return;

      try {
        const { data: flyerData, error: flyerError } = await supabase
          .from('flyers')
          .select('*, stores(name, logo_url)')
          .eq('id', id)
          .single();

        if (flyerError) {
          console.error("Supabase Error:", flyerError);
          setLoading(false);
          return;
        }

        if (flyerData) {
          setFlyer(flyerData);
          
          const { data: pagesData } = await supabase
            .from('flyer_pages')
            .select('*')
            .eq('flyer_id', id)
            .order('page_number', { ascending: true });
            
          if (pagesData) setFlyerPages(pagesData);
        }
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFlyerDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f5f7]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!flyer) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f4f5f7] p-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Flyer Not Found</h1>
        <p className="text-gray-500 mb-6">The offer you are looking for might have expired or been removed.</p>
        <button onClick={() => router.push('/')} className="bg-green-600 text-white px-6 py-2 rounded-md font-bold hover:bg-green-700 transition-colors">
          Go Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f5f7] font-sans pb-10">
      
      {/* Top Breadcrumb Navigation (Fixed Back Button) */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-[1000px] mx-auto px-4 py-3 flex items-center justify-between">
          <button onClick={() => router.back()} className="text-green-600 hover:text-green-700 font-bold text-sm flex items-center gap-1.5 bg-green-50 px-3 py-1.5 rounded-full transition-colors">
            <span>❮</span> Back to Store
          </button>
          <div className="text-xs text-gray-500 font-medium">SaudiPrice</div>
        </div>
      </div>

      <main className="max-w-[1000px] mx-auto px-4 mt-6">
        
        {/* Flyer Header Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6 mb-6 flex flex-col md:flex-row gap-4 items-center md:items-start text-center md:text-left">
          <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 border border-gray-100 rounded-2xl p-2 shadow-sm mx-auto md:mx-0 bg-white">
            <img src={flyer.stores?.logo_url} alt={flyer.stores?.name} className="w-full h-full object-contain" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl md:text-2xl font-black text-gray-900 mb-1">{flyer.title}</h1>
            <p className="text-gray-600 font-bold text-sm mb-3">{flyer.stores?.name}</p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs font-bold">
              <span className="bg-green-50 text-green-700 px-3 py-1.5 rounded-md border border-green-100 shadow-sm">
                {flyer.page_count} Pages
              </span>
              <span className="bg-red-50 text-red-600 px-3 py-1.5 rounded-md border border-red-100 shadow-sm uppercase tracking-wider text-[10px]">
                Valid Offer
              </span>
            </div>
          </div>
        </div>

        {/* Flyer Images Gallery */}
        <div className="flex flex-col gap-4 md:gap-6 items-center w-full">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 md:p-3 w-full max-w-[700px]">
            <img src={flyer.cover_image_url} alt="Cover" className="w-full h-auto rounded-lg" />
          </div>

          {flyerPages.length > 0 ? (
            flyerPages.map((page) => (
              <div key={page.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 md:p-3 w-full max-w-[700px]">
                <img src={page.image_url} alt={`Page ${page.page_number}`} className="w-full h-auto rounded-lg" />
                <p className="text-center text-xs text-gray-400 mt-3 font-bold bg-gray-50 py-1 rounded-md">Page {page.page_number}</p>
              </div>
            ))
          ) : (
            <div className="py-10 text-gray-500 text-sm font-medium bg-white w-full max-w-[700px] text-center rounded-xl border border-gray-100 shadow-sm">
              Inside pages are currently not available for this flyer.
            </div>
          )}
        </div>

      </main>
    </div>
  );
}