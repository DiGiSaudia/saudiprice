'use client';

import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Link from 'next/link';

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStore, setSelectedStore] = useState('All Stores');
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await supabase.from('products').select('*');
      if (data) setProducts(data);
    }
    fetchProducts();
    const saved = localStorage.getItem('saudiPriceFavorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const toggleFavorite = (id: number) => {
    let newFavorites = [...favorites];
    if (newFavorites.includes(Number(id))) {
      newFavorites = newFavorites.filter(favId => favId !== Number(id));
    } else {
      newFavorites.push(Number(id));
    }
    setFavorites(newFavorites);
    localStorage.setItem('saudiPriceFavorites', JSON.stringify(newFavorites));
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || product.category === selectedCategory;
    const matchesStore = selectedStore === 'All Stores' || product.store === selectedStore;
    return matchesSearch && matchesCategory && matchesStore;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* 1. Hero Section (Absolutely like now11.jpg) */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
          Discover the Best Deals in Saudi Arabia
        </h1>
        <p className="text-lg md:text-xl text-blue-200 mb-10 max-w-2xl mx-auto">
          Compare prices across Amazon, Noon, Jarir, and Extra to save on your favorite products.
        </p>
        
        <div className="max-w-3xl mx-auto flex bg-white rounded-full shadow-2xl overflow-hidden p-1.5 focus-within:ring-4 focus-within:ring-blue-400/50 transition-all">
          <input 
            type="text" 
            placeholder="Search for iPhones, Laptops, TVs..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 text-gray-800 focus:outline-none rounded-l-full text-lg"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-full transition-colors text-lg shadow-md">
            Search
          </button>
        </div>
      </div>

      {/* 2. Filters & Sorting Bar (Clean & White) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-25px] relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-lg border border-gray-100 gap-4">
          <div className="flex w-full md:w-auto gap-4">
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="flex-1 md:flex-none border-gray-200 rounded-lg text-gray-700 px-4 py-2.5 bg-gray-50 border focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer font-medium"
            >
              <option>All Categories</option>
              <option>Mobiles</option>
              <option>Laptops</option>
              <option>Smartwatches</option>
              <option>Televisions</option>
              <option>Gaming</option>
              <option>Tablets</option>
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Home Appliances</option>
            </select>
            <select 
              value={selectedStore} 
              onChange={(e) => setSelectedStore(e.target.value)}
              className="flex-1 md:flex-none border-gray-200 rounded-lg text-gray-700 px-4 py-2.5 bg-gray-50 border focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer font-medium"
            >
              <option>All Stores</option>
              <option>Amazon</option>
              <option>Noon</option>
              <option>Jarir</option>
              <option>eXtra</option>
            </select>
          </div>
          
          <div className="flex items-center w-full md:w-auto gap-4">
            <div className="text-red-500 font-bold bg-red-50 px-3 py-1.5 rounded-lg border border-red-100 flex items-center gap-1.5 text-sm">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/></svg>
              {favorites.length} Saved
            </div>
            <div className="flex items-center">
              <span className="text-gray-500 text-sm mr-3 whitespace-nowrap">Sort by:</span>
              <select className="w-full md:w-auto border-gray-200 rounded-lg text-gray-900 px-4 py-2.5 bg-gray-50 border focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer font-bold">
                <option>🔥 Latest Deals</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Products Grid (Restored Badges & Layout) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3 mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Trending Now</h2>
          <div className="h-1 w-20 bg-blue-600 rounded-full mt-2"></div>
        </div>
        
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl text-gray-500 font-bold">No products found... 😢</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden relative group">
                
                {/* 1. HOT Badge Restored! */}
                <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-black px-3 py-1.5 rounded-md z-10 shadow-sm tracking-wide">
                  HOT
                </div>

                {/* 2. Store Badge Restored! */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-blue-900 border border-blue-100 text-[11px] font-extrabold px-3 py-1.5 rounded-md z-10 uppercase tracking-widest shadow-sm">
                  {product.store}
                </div>

                {/* 3. Wishlist Heart Icon (Safe location, doesn't break layout) */}
                <button 
                  onClick={(e) => { e.preventDefault(); toggleFavorite(product.id); }}
                  className="absolute top-[200px] right-3 p-2.5 rounded-full z-20 transition-all bg-white shadow-md hover:scale-110 border border-gray-100"
                >
                  {favorites.includes(Number(product.id)) ? (
                    <svg width="20" height="20" fill="#ef4444" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/></svg>
                  ) : (
                    <svg width="20" height="20" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                  )}
                </button>

                {/* Image Container with Fallback */}
                <Link href={`/product/${product.id}`} className="h-60 bg-white p-8 flex justify-center items-center relative overflow-hidden group-hover:bg-gray-50 transition-colors">
                  <img 
                    src={product.image_url} 
                    alt={product.title} 
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x400?text=No+Image'; }}
                    className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                  />
                </Link>

                {/* Card Details */}
                <div className="p-5 flex flex-col flex-grow border-t border-gray-50">
                  <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-2">{product.category}</span>
                  <Link href={`/product/${product.id}`}>
                    <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors cursor-pointer">{product.title}</h3>
                  </Link>
                  
                  <div className="mt-auto pt-3 flex items-end justify-between">
                    <div>
                      <p className="text-xs text-gray-400 line-through mb-0.5">{(product.price * 1.15).toFixed(0)} SAR</p>
                      <p className="text-2xl font-black text-green-600">{product.price} <span className="text-sm font-bold text-gray-500">SAR</span></p>
                    </div>
                    
                    {/* Premium Dark View Deal Button */}
                    <a 
                      href={product.product_link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-[#0f172a] hover:bg-black text-white px-5 py-2.5 rounded-xl transition-colors duration-300 shadow-sm text-sm font-bold"
                    >
                      View Deal →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}