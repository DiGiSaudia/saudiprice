import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      
      {/* 1. Navbar (Inspired by Pricena & SaudiPrice) */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-3xl font-bold text-blue-600 tracking-tight">SaudiPrice</h1>
            <div className="hidden md:flex space-x-6 text-sm font-medium text-gray-600">
              <a href="#" className="hover:text-blue-600">All Categories ▾</a>
              <a href="#" className="hover:text-blue-600">Electronics</a>
              <a href="#" className="hover:text-blue-600">Fashion</a>
              <a href="#" className="text-red-500 flex items-center gap-1">🔥 Hot Deals</a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center text-sm">
              <span className="text-gray-500 mr-4">Login ▾</span>
              <span>🇸🇦 AR</span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Hero Section with Search (SaudiPrice Style - Image 3) */}
      <section className="bg-blue-600 py-12 px-4 text-center">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-white mb-3">Find the Best Prices in Saudi Arabia</h2>
          <p className="text-blue-100 mb-8 text-lg">Compare prices from all major retailers and save up to 70% on your purchases.</p>
          
          <div className="max-w-3xl mx-auto flex bg-white rounded-full overflow-hidden shadow-lg p-1 border-2 border-white">
            <select className="bg-gray-100 px-4 py-3 text-gray-600 outline-none rounded-l-full border-r hidden md:block">
              <option>All Categories</option>
            </select>
            <input 
              type="text" 
              placeholder="Search for products, brands or categories..." 
              className="w-full px-6 py-3 text-gray-700 outline-none"
            />
            <button className="bg-blue-600 text-white px-8 py-3 font-medium hover:bg-blue-700 transition rounded-r-full">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* 3. Popular Categories (SaudiPrice Style - Image 3) */}
      <section className="bg-gray-50 py-10 border-b">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800">Popular Categories</h3>
            <p className="text-gray-500 text-sm">Browse through our most popular shopping categories</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {['Smartphones', 'Laptops', 'Fashion', 'TV & Audio', 'Home Appliances', 'Cameras'].map((cat, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm text-center border hover:shadow-md transition cursor-pointer text-blue-600">
                <div className="text-3xl mb-3">
                  {i === 0 ? '📱' : i === 1 ? '💻' : i === 2 ? '👕' : i === 3 ? '📺' : i === 4 ? '🏠' : '📷'}
                </div>
                <h4 className="font-semibold text-gray-700 text-sm">{cat}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Hot Deals List (KSA Price Style - Image 2) */}
      <section className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-6 border-b pb-2">
          <h3 className="text-2xl font-bold text-gray-800">Hot Deals</h3>
          <div className="flex gap-2">
            <span className="bg-blue-500 text-white px-3 py-1 text-sm rounded cursor-pointer">Deal End</span>
            <span className="border px-3 py-1 text-sm rounded cursor-pointer hover:bg-gray-50">Recent</span>
          </div>
        </div>

        {/* Table Header */}
        <div className="bg-cyan-500 text-white flex text-sm font-bold p-3 rounded-t-lg hidden md:flex">
          <div className="w-1/3">Vendor | Description | Location</div>
          <div className="w-1/6 text-center">Deal Start</div>
          <div className="w-1/6 text-center">Deal End</div>
          <div className="w-1/6 text-center">Status</div>
          <div className="w-1/6 text-center">Action</div>
        </div>

        {/* Deal Item 1 */}
        <div className="border border-t-0 p-4 flex flex-col md:flex-row items-center hover:bg-gray-50 transition">
          <div className="w-full md:w-1/3 flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-100 flex items-center justify-center rounded border text-2xl">🏪</div>
            <div>
              <h4 className="font-bold text-sm">Ramadan Deals - Nesto</h4>
              <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded">Riyadh</span>
            </div>
          </div>
          <div className="w-full md:w-1/6 text-center text-sm text-gray-600 mt-2 md:mt-0">Feb 17, 2026</div>
          <div className="w-full md:w-1/6 text-center text-sm text-gray-600">Feb 23, 2026</div>
          <div className="w-full md:w-1/6 text-center mt-2 md:mt-0">
            <span className="text-green-600 text-sm font-bold flex items-center justify-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500"></span> Valid <span className="bg-red-500 text-white text-[10px] px-1 rounded ml-1">New</span>
            </span>
          </div>
          <div className="w-full md:w-1/6 text-center mt-4 md:mt-0">
            <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-1.5 rounded text-sm w-full md:w-auto">View</button>
          </div>
        </div>

        {/* Deal Item 2 */}
        <div className="border border-t-0 p-4 flex flex-col md:flex-row items-center hover:bg-gray-50 transition bg-blue-50/30">
          <div className="w-full md:w-1/3 flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded border overflow-hidden text-2xl">🚗</div>
            <div>
              <h4 className="font-bold text-sm">Kia Sportage Full Option 2026</h4>
              <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded">Jeddah</span>
            </div>
          </div>
          <div className="w-full md:w-2/6 text-center font-bold text-gray-800 mt-2 md:mt-0">SAR 92,000</div>
          <div className="w-full md:w-1/6 text-center mt-2 md:mt-0"></div>
          <div className="w-full md:w-1/6 text-center mt-4 md:mt-0">
            <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-1.5 rounded text-sm w-full md:w-auto">View</button>
          </div>
        </div>
      </section>

      {/* 5. Product Grid (Pricena Style - Image 1) */}
      <section className="bg-white py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800 border-l-4 border-blue-600 pl-3">Mobile Phones</h3>
            <a href="#" className="text-blue-600 text-sm hover:underline">View All</a>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {/* Product 1 */}
            <div className="border border-gray-100 p-4 hover:shadow-lg transition relative bg-white flex flex-col">
              <div className="h-40 flex items-center justify-center mb-4">
                <span className="text-6xl">📱</span>
              </div>
              <h4 className="text-blue-600 text-sm font-medium hover:underline cursor-pointer line-clamp-2 h-10">Samsung Galaxy S24 Ultra, 256GB, Titanium Black</h4>
              <div className="mt-2 mb-4">
                <span className="text-xs text-gray-500">Starts from</span>
                <div className="font-bold text-lg text-gray-900">SAR 3,899</div>
              </div>
              <div className="mt-auto">
                <div className="flex gap-1 mb-2">
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-1 rounded">Noon</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-1 rounded">Amazon</span>
                </div>
                <button className="w-full bg-green-500 hover:bg-green-600 text-white py-1.5 rounded text-sm font-medium">Compare Prices</button>
              </div>
            </div>

            {/* Product 2 */}
            <div className="border border-gray-100 p-4 hover:shadow-lg transition relative bg-white flex flex-col">
              <div className="h-40 flex items-center justify-center mb-4">
                <span className="text-6xl">📱</span>
              </div>
              <h4 className="text-blue-600 text-sm font-medium hover:underline cursor-pointer line-clamp-2 h-10">Apple iPhone 15 Pro Max, 256GB, Natural Titanium</h4>
              <div className="mt-2 mb-4">
                <span className="text-xs text-gray-500">Starts from</span>
                <div className="font-bold text-lg text-gray-900">SAR 4,699</div>
              </div>
              <div className="mt-auto">
                <div className="flex gap-1 mb-2">
                  <span className="text-xs bg-gray-100 text-gray-800 px-1 rounded">Jarir</span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-1 rounded">Amazon</span>
                </div>
                <button className="w-full bg-green-500 hover:bg-green-600 text-white py-1.5 rounded text-sm font-medium">Compare Prices</button>
              </div>
            </div>
            
            {/* Product 3, 4, 5 placeholers... */}
            {[3,4,5].map((num) => (
               <div key={num} className="border border-gray-100 p-4 hover:shadow-lg transition relative bg-white flex flex-col">
               <div className="h-40 flex items-center justify-center mb-4">
                 <span className="text-6xl text-gray-300">📱</span>
               </div>
               <h4 className="text-blue-600 text-sm font-medium hover:underline cursor-pointer line-clamp-2 h-10">Smart Phone Model {num}</h4>
               <div className="mt-2 mb-4">
                 <span className="text-xs text-gray-500">Starts from</span>
                 <div className="font-bold text-lg text-gray-900">SAR 1,299</div>
               </div>
               <div className="mt-auto">
                 <button className="w-full border border-green-500 text-green-600 hover:bg-green-50 py-1.5 rounded text-sm font-medium">Go to Shop</button>
               </div>
             </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Footer (Combined Style) */}
      <footer className="bg-gray-900 text-gray-300 py-10 mt-10 text-sm">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-white text-lg font-bold mb-4">SaudiPrice</h4>
            <p className="text-gray-400">Your trusted price comparison platform helping shoppers in Saudi Arabia find the best deals and save money.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Smartphones</a></li>
              <li><a href="#" className="hover:text-white">Laptops</a></li>
              <li><a href="#" className="hover:text-white">Perfumes</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Newsletter</h4>
            <div className="flex">
              <input type="text" placeholder="Email address" className="px-3 py-2 w-full text-black outline-none" />
              <button className="bg-cyan-500 text-white px-4 py-2 hover:bg-cyan-600">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-8 pt-4 border-t border-gray-800 text-center text-gray-500">
          © 2026 SaudiPrice.com. All rights reserved.
        </div>
      </footer>
    </div>
  );
}