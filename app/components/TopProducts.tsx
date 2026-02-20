'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

type Product = {
  id: string;
  title: string;
  current_price: number;
  old_price: number | null;
  image_url: string;
};

export default function TopProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      // Fetch products from SaudiPrice database where is_top_product is true
      const { data, error } = await supabase
        .from('products')
        .select('id, title, current_price, old_price, image_url')
        .eq('is_top_product', true)
        .limit(10);

      if (!error && data) {
        setProducts(data);
      }
      setLoading(false);
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        <h2 className="text-xl md:text-2xl font-black text-gray-800 mb-6">
          Top <span className="text-green-600">Products</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-100 h-64 rounded-xl border border-gray-200"></div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="max-w-[1400px] mx-auto px-4 py-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-black text-gray-800 tracking-tight">
          Top <span className="text-green-600">Products</span>
        </h2>
        <button className="text-[11px] md:text-xs font-bold text-green-600 hover:text-green-700 transition-colors bg-green-50 px-3 py-1.5 rounded-full">
          View All Deals &rarr;
        </button>
      </div>
      
      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
        {products.map((product) => {
          // Calculate discount percentage if old price exists and is greater than current price
          const hasDiscount = product.old_price && product.old_price > product.current_price;
          const discountPercentage = hasDiscount 
            ? Math.round(((product.old_price! - product.current_price) / product.old_price!) * 100)
            : 0;

          return (
            <div 
              key={product.id} 
              className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm hover:shadow-md transition-all group relative flex flex-col cursor-pointer"
            >
              {/* Discount Badge */}
              {hasDiscount && (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10 shadow-sm">
                  Save {discountPercentage}%
                </div>
              )}
              
              {/* Product Image */}
              <div className="relative w-full aspect-square bg-white rounded-lg overflow-hidden mb-3 flex items-center justify-center p-2">
                <img 
                  src={product.image_url} 
                  alt={product.title}
                  className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              
              {/* Product Title */}
              <h3 className="text-[11px] sm:text-xs md:text-sm font-semibold text-gray-800 line-clamp-2 mb-2 flex-1 group-hover:text-green-600 transition-colors">
                {product.title}
              </h3>
              
              {/* Price Section */}
              <div className="flex flex-col mt-auto">
                <div className="flex flex-wrap items-end gap-1.5">
                  <span className="text-sm md:text-lg font-black text-green-600">
                    <span className="text-[9px] md:text-[11px] font-bold mr-0.5">SAR</span>
                    {product.current_price}
                  </span>
                  {hasDiscount && (
                    <span className="text-[10px] md:text-xs text-gray-400 line-through font-medium mb-0.5 md:mb-1">
                      {product.old_price}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}