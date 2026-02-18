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
      
      {/* 1. Top Navigation Bar (Restore Flag & Login) */}
      <nav className="bg-white border-b border-gray-100 py-3 px-4 md:px-8 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-black text-blue-700 tracking-tighter">SaudiPrice</Link>
          <div className="hidden md:flex gap-6 text-sm font-bold text-gray-500">
            <span className="hover:text-blue-600 cursor-pointer">All Categories</span>
            <span className="hover:text-blue-600 cursor-pointer">Electronics</span>
            <span className="hover:text-blue-600 cursor-pointer">Fashion</span>
            <span className="text-orange-600 flex items-center gap-1"><span className="w-2 h-2 bg-orange-600 rounded-full animate-ping"></span> Hot Deals</span>
          </div>
        </div>
        <div className="flex items-center gap-5 text-sm font-bold text-gray-700">
          <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
            <span>Login</span>
            <svg width="12" height="12" fill="currentColor" viewBox="0 0 16 16"><path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/></svg>
          </div>
          <div className="flex items-center gap-1 border-l pl-5 border-gray-200">
             <span className="text-lg">🇸🇦</span>
             <span className="uppercase">SA AR</span>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-24 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-black mb-6 drop-shadow-xl tracking-tight">
          Discover the Best Deals in Saudi Arabia
        </h1>
        <p className="text-lg md:text-xl text-blue-200 mb-12 max-w-3xl mx-auto font-medium opacity-90">
          Compare prices across Amazon, Noon, Jarir, and Extra to save on your favorite products.
        </p>
        
        <div className="max-w-3xl mx-auto flex bg-white rounded-full shadow-2xl overflow-hidden p-2 focus-within:ring-4 focus-within:ring-blue-400/40 transition-all">
          <input 
            type="text" 
            placeholder="Search for iPhones, Laptops, TVs..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-8 py-4 text-gray-800 focus:outline-none rounded-l-full text-lg font-medium"
          />
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-black px-10 py-4 rounded-full transition-all text-lg shadow-lg active:scale-95">
            Search
          </button>
        </div>
      </div>

      {/* 3. Filter Bar (Clean & Functional) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-30px] relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-5 rounded-2xl shadow-xl border border-gray-100 gap-4">
          <div className="flex w-full md:w-auto gap-4">
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="flex-1 md:flex-none border-gray-200 rounded-xl text-gray-700 px-5 py-3 bg-gray-50 border focus:ring-2 focus:ring-blue-500 outline-none font-bold">
              <option>All Categories</option>
              <option>Mobiles</option>
              <option>Laptops</option>
              <option>Smartwatches</option>
              <option>Televisions</option>
              <option>Gaming</option>
              <option>Home Appliances</option>
            </select>
            <select value={selectedStore} onChange={(e) => setSelectedStore(e.target.value)} className="flex-1 md:flex-none border-gray-200 rounded-xl text-gray-700 px-5 py-3 bg-gray-50 border focus:ring-2 focus:ring-blue-500 outline-none font-bold">
              <option>All Stores</option>
              <option>Amazon</option>
              <option>Noon</option>
              <option>Jarir</option>
              <option>eXtra</option>
            </select>
          </div>
          <div className="flex items-center gap-6">
             <div className="text-sm font-black text-blue-600 bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
               ❤️ {favorites.length} Saved
             </div>
             <div className="hidden md:flex items-center gap-2">
               <span className="text-gray-400 text-sm font-bold">Sort by:</span>
               <select className="border-none bg-transparent font-black text-gray-800 outline-none cursor-pointer">
                 <option>🔥 Latest Deals</option>
                 <option>Price: Low to High</option>
               </select>
             </div>
          </div>
        </div>
      </div>

      {/* 4. Products Grid (Restore Badges & Styling) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">Trending Now</h2>
          <div className="h-1.5 w-24 bg-blue-600 rounded-full"></div>
        </div>
        
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <h3 className="text-3xl text-gray-400 font-black mb-2">No deals found... 😢</h3>
            <p className="text-gray-500 font-bold">Try searching for something else like "iPhone" or "Samsung".</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col overflow-hidden relative group">
                
                {/* HOT Badge */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-pink-500 text-white text-[10px] font-black px-3 py-1.5 rounded-lg z-10 shadow-lg tracking-tighter uppercase">
                  HOT
                </div>

                {/* Store Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-blue-900 border border-blue-100 text-[10px] font-black px-3 py-1.5 rounded-lg z-10 uppercase tracking-widest shadow-sm">
                  {product.store}
                </div>

                {/* Wishlist Heart Button */}
                <button 
                  onClick={(e) => { e.preventDefault(); toggleFavorite(product.id); }}
                  className="absolute top-16 left-4 p-2.5 rounded-full z-20 transition-all bg-white/80 backdrop-blur-sm shadow-md hover:scale-110 active:scale-90"
                >
                  {favorites.includes(Number(product.id)) ? (
                    <svg width="20" height="20" fill="#ef4444" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/></svg>
                  ) : (
                    <svg width="20" height="20" fill="none" stroke="#9ca3af" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                  )}
                </button>

                {/* Image Section with Error Fallback */}
                <Link href={`/product/${product.id}`} className="h-64 bg-white p-10 flex justify-center items-center relative overflow-hidden group-hover:bg-gray-50 transition-colors">
                  <img 
                    src={product.image_url} 
                    alt={product.title} 
                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x400?text=No+Image+Available'; }}
                    className="max-h-full max-w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                  />
                </Link>

                <div className="p-6 flex flex-col flex-grow border-t border-gray-50 bg-white">
                  <span className="text-[10px] text-blue-600 font-black uppercase tracking-[0.2em] mb-2">{product.category}</span>
                  <Link href={`/product/${product.id}`}>
                    <h3 className="text-[17px] font-black text-gray-800 mb-4 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors cursor-pointer">
                      {product.title}
                    </h3>
                  </Link>
                  
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <div>
                      <p className="text-[11px] text-gray-400 line-through mb-1 font-bold italic">{(product.price * 1.15).toFixed(0)} SAR</p>
                      <p className="text-2xl font-black text-green-600 leading-none">{product.price} <span className="text-xs font-bold text-gray-500">SAR</span></p>
                    </div>
                    
                    <a 
                      href={product.product_link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-blue-600 hover:bg-black text-white px-5 py-3 rounded-2xl transition-all duration-300 shadow-lg shadow-blue-200 hover:shadow-none font-black text-xs uppercase tracking-wider active:scale-95"
                    >
                      View Deal
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