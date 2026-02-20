'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import Link from 'next/link';

type Product = {
  id: string;
  title: string;
  description: string;
  current_price: number;
  old_price: number | null;
  image_url: string;
  product_url: string;
  stores?: { name: string } | null;
};

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      const { data, error } = await supabase
        .from('products')
        .select('*, stores(name)')
        .eq('id', id)
        .single();

      if (!error && data) {
        setProduct(data as unknown as Product);
      }
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-gray-400">Loading Product Details...</div>;
  if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found.</div>;

  const hasDiscount = product.old_price && product.old_price > product.current_price;

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-10">
      <nav className="text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-green-600">Home</Link> / 
        <span className="ml-2 text-gray-800 font-medium">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        
        {/* Left Side: Product Image */}
        <div className="flex items-center justify-center bg-gray-50 rounded-2xl p-6 relative overflow-hidden">
          {hasDiscount && (
            <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-black px-4 py-1.5 rounded-full z-10">
              SPECIAL OFFER
            </div>
          )}
          <img 
            src={product.image_url} 
            alt={product.title} 
            className="max-h-[450px] object-contain hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Right Side: Product Info */}
        <div className="flex flex-col">
          <div className="mb-4">
            <span className="text-xs font-black text-green-700 bg-green-50 px-3 py-1 rounded-full uppercase">
              {product.stores?.name || "Official Store"}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 leading-tight">
            {product.title}
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex flex-col">
              <span className="text-3xl font-black text-green-600">
                SAR {product.current_price}
              </span>
              {hasDiscount && (
                <span className="text-lg text-gray-400 line-through font-medium">
                  SAR {product.old_price}
                </span>
              )}
            </div>
            {hasDiscount && (
              <div className="bg-red-50 text-red-600 px-3 py-1 rounded-lg font-bold text-sm">
                Save SAR {product.old_price! - product.current_price}
              </div>
            )}
          </div>

          <p className="text-gray-600 text-sm leading-relaxed mb-8 border-t border-gray-100 pt-6">
            {product.description || "No description available for this product."}
          </p>

          <div className="flex flex-col gap-4 mt-auto">
            <a 
              href={product.product_url} 
              target="_blank" 
              className="w-full bg-green-600 hover:bg-green-700 text-white text-center py-4 rounded-2xl font-black text-lg shadow-lg shadow-green-100 transition-all flex items-center justify-center gap-2"
            >
              Go to Store
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>

            <div className="flex gap-3">
              <button className="flex-1 border border-gray-200 hover:bg-gray-50 py-3 rounded-xl font-bold text-gray-700 flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Favorite
              </button>
              <button className="flex-1 border border-gray-200 hover:bg-gray-50 py-3 rounded-xl font-bold text-gray-700 flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}