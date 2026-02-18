'use client';

import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Link from 'next/link';

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStore, setSelectedStore] = useState('All Stores');
  const [favorites, setFavorites] = useState<number[]>([]); // فیورٹ پروڈکٹس کی لسٹ

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await supabase.from('products').select('*');
      if (data) setProducts(data);
    }
    fetchProducts();

    // براؤزر سے محفوظ شدہ فیورٹ لسٹ نکالنا
    const saved = localStorage.getItem('saudiPriceFavorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  // فیورٹ کو ٹوگل (Toggle) کرنے کا فنکشن
  const toggleFavorite = (id: number) => {
    let newFavorites = [...favorites];
    if (newFavorites.includes(id)) {
      newFavorites = newFavorites.filter(favId => favId !== id);
    } else {
      newFavorites.push(id);
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
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">SaudiPrice: Best Deals Finder</h1>
        <p className="text-lg md:text-xl text-blue-200 mb-10 max-w-2xl mx-auto">Compare prices across Amazon, Noon, and more.</p>
        
        <div className="max-w-3xl mx-auto flex bg-white rounded-full shadow-2xl overflow-hidden p-1.5 focus-within:ring-4 focus-within:ring-blue-400/50 transition-all">
          <input 
            type="text" 
            placeholder="Search for iPhones, Laptops, TVs..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-4 text-gray-800 focus:outline-none rounded-l-full text-lg"
          />
        </div>
      </div>

      {/* Filters Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-25px] relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-lg border border-gray-100 gap-4">
          <div className="flex w-full md:w-auto gap-4">
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="flex-1 md:flex-none border-gray-200 rounded-lg text-gray-700 px-4 py-2.5 bg-gray-50 border outline-none font-medium">
              <option>All Categories</option>
              <option>Mobiles</option>
              <option>Laptops</option>
              <option>Smartwatches</option>
              <option>Televisions</option>
              <option>Gaming</option>
              <option>Home Appliances</option>
            </select>
            <select value={selectedStore} onChange={(e) => setSelectedStore(e.target.value)} className="flex-1 md:flex-none border-gray-200 rounded-lg text-gray-700 px-4 py-2.5 bg-gray-50 border outline-none font-medium">
              <option>All Stores</option>
              <option>Amazon</option>
              <option>Noon</option>
              <option>Jarir</option>
              <option>eXtra</option>
            </select>
          </div>
          <p className="text-sm font-bold text-blue-600">Saved: {favorites.length} Deals</p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden relative group">
              
              {/* Wishlist Heart Button */}
              <button 
                onClick={() => toggleFavorite(product.id)}
                className={`absolute top-3 left-3 p-2 rounded-full z-20 transition-all ${favorites.includes(product.id) ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-400 hover:text-red-500'}`}
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                </svg>
              </button>

              <Link href={`/product/${product.id}`} className="h-60 bg-white p-8 flex justify-center items-center">
                <img src={product.image_url} alt={product.title} className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500" />
              </Link>

              <div className="p-5 flex flex-col flex-grow border-t border-gray-50">
                <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 leading-snug">{product.title}</h3>
                <div className="mt-auto pt-3 flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-black text-green-600">{product.price} <span className="text-sm font-bold text-gray-500">SAR</span></p>
                  </div>
                  <a href={product.product_link} target="_blank" className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-colors">
                    Get Deal
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}