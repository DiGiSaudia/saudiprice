'use client';

import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Link from 'next/link';

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStore, setSelectedStore] = useState('All Stores');
  const [sortBy, setSortBy] = useState('🔥 Latest Deals');
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

  let sortedProducts = [...filteredProducts];
  if (sortBy === 'Price: Low to High') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'Price: High to Low') {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* Hero Section */}
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

      {/* Filters & Sorting Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-25px] relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-lg border border-gray-100 gap-4">
          <div className="flex w-full md:w-auto gap-4">
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="flex-1 md:flex-none border-gray-200 rounded-lg text-gray-700 px-4 py-2.5 bg-gray-50 border focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer font-medium">
              <option>All Categories</option>
              <option>Mobiles</option>
              <option>Laptops</option>
              <option>Smartwatches</option>
              <option>Televisions</option>
              <option>Gaming</option>
              <option>Home Appliances</option>
            </select>
            <select value={selectedStore} onChange={(e) => setSelectedStore(e.target.value)} className="flex-1 md:flex-none border-gray-200 rounded-lg text-gray-700 px-4 py-2.5 bg-gray-50 border focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer font-medium">
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
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full md:w-auto border-gray-200 rounded-lg text-gray-900 px-4 py-2.5 bg-gray-50 border focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer font-bold"
              >
                <option>🔥 Latest Deals</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3 mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Trending Now</h2>
          <div className="h-1 w-20 bg-blue-600 rounded-full mt-2"></div>
        </div>
        
        {sortedProducts.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl text-gray-500 font-bold">No products found... 😢</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col overflow-hidden relative group">
                
                {/* 1. HOT Badge (Left) */}
                <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] font-black px-3 py-1.5 rounded-md z-10 shadow-sm uppercase tracking-widest">
                  HOT
                </div>

                {/* 2. Heart Icon & Store Badge (Right) - زیادہ واضح (High Contrast & Larger) */}
                <div className="absolute top-3 right-3 z-30 flex items-center gap-2">
                  <button 
                    onClick={(e) => { e.preventDefault(); toggleFavorite(product.id); }}
                    className="p-1.5 rounded-full bg-white shadow-md border border-gray-300 hover:scale-110 transition-all text-gray-400 hover:text-red-500 flex items-center justify-center"
                  >
                    {favorites.includes(Number(product.id)) ? (
                      <svg width="18" height="18" fill="#ef4444" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/></svg>
                    ) : (
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/></svg>
                    )}
                  </button>
                  <div className="bg-[#0f172a] text-white text-xs font-black px-3 py-1.5 rounded-lg uppercase tracking-widest shadow-md border border-gray-600">
                    {product.store}
                  </div>
                </div>

                {/* Image Container */}
                <Link href={`/product/${product.id}`} className="h-60 bg-white p-8 flex justify-center items-center relative overflow-hidden group-hover:bg-gray-50 transition-colors mt-2">
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
                    <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors cursor-pointer">
                      {product.title}
                    </h3>
                  </Link>
                  
                  <div className="mt-auto pt-3 flex items-end justify-between">
                    <div>
                      <p className="text-xs text-gray-400 line-through mb-0.5">{(product.price * 1.15).toFixed(0)} SAR</p>
                      <p className="text-2xl font-black text-green-600">{product.price} <span className="text-sm font-bold text-gray-500">SAR</span></p>
                    </div>
                    
                    <a 
                      href={product.product_link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white p-3.5 rounded-xl transition-colors duration-300 shadow-sm"
                      title="Get Deal"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 5.354 5.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3z"/>
                        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
// deployment fix