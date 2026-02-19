'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';

export default function FlyerDetailsPage({ params }: { params: { id: string } }) {
  const [flyer, setFlyer] = useState<any>(null);
  const [flyerPages, setFlyerPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFlyerDetails() {
      try {
        // Fetch the main flyer and store details
        const { data: flyerData, error: flyerError } = await supabase
          .from('flyers')
          .select('*, stores(name, logo_url)')
          .eq('id', params.id)
          .single();

        if (flyerData) {
          setFlyer(flyerData);
          
          // Fetch the inside pages of the flyer
          const { data: pagesData } = await supabase
            .from('flyer_pages')
            .select('*')
            .eq('flyer_id', params.id)
            .order('page_number', { ascending: true });
            
          if (pagesData) setFlyerPages(pagesData);
        }
      } catch (error) {
        console.error("Error fetching flyer:", error);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchFlyerDetails();
    }
  }, [params.id]);

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
        <Link href="/" className="bg-green-600 text-white px-6 py-2 rounded-md font-bold hover:bg-green-700 transition-colors">
          Go Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f5f7] font-sans pb-10">
      
      {/* Top Breadcrumb Navigation */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-[1000px] mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-green-600 hover:text-green-700 font-bold text-sm flex items-center gap-1">
            <span>❮</span> Back to Offers
          </Link>
          <div className="text-xs text-gray-500 font-medium">SaudiPrice</div>
        </div>
      </div>

      <main className="max-w-[1000px] mx-auto px-4 mt-6">
        
        {/* Flyer Header Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-6 mb-6 flex flex-col md:flex-row gap-4 items-center md:items-start text-center md:text-left">
          <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 border border-gray-100 rounded-lg p-1 shadow-sm">
            <img src={flyer.stores?.logo_url} alt={flyer.stores?.name} className="w-full h-full object-contain" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl md:text-2xl font-black text-gray-900 mb-1">{flyer.title}</h1>
            <p className="text-gray-600 font-bold text-sm mb-3">{flyer.stores?.name}</p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs font-bold">
              <span className="bg-green-50 text-green-700 px-2.5 py-1 rounded border border-green-100">
                {flyer.page_count} Pages
              </span>
              <span className="bg-red-50 text-red-600 px-2.5 py-1 rounded border border-red-100">
                Valid Offer
              </span>
            </div>
          </div>
        </div>

        {/* Flyer Images Gallery */}
        <div className="flex flex-col gap-4 md:gap-6 items-center w-full">
          {/* Main Cover Image */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2 w-full max-w-[600px]">
            <img src={flyer.cover_image_url} alt="Cover" className="w-full h-auto rounded" />
          </div>

          {/* Inside Pages Loop */}
          {flyerPages.length > 0 ? (
            flyerPages.map((page) => (
              <div key={page.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-2 w-full max-w-[600px]">
                <img src={page.image_url} alt={`Page ${page.page_number}`} className="w-full h-auto rounded" />
                <p className="text-center text-xs text-gray-400 mt-2 font-medium">Page {page.page_number}</p>
              </div>
            ))
          ) : (
            <div className="py-8 text-gray-500 text-sm font-medium">
              Inside pages are currently not available for this flyer.
            </div>
          )}
        </div>

      </main>
    </div>
  );
}