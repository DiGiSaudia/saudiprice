import React from 'react';
import { popularCategories, hotDeals, topProducts } from './data';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
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

      {/* Popular Categories */}
      <section className="bg-gray-50 py-10 border-b">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800">Popular Categories</h3>
            <p className="text-gray-500 text-sm">Browse through our most popular shopping categories</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {popularCategories.map((cat, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm text-center border hover:shadow-md transition cursor-pointer text-blue-600 group">
                <div className="text-3xl mb-3 group-hover:scale-110 transition duration-300">{cat.icon}</div>
                <h4 className="font-semibold text-gray-700 text-sm">{cat.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hot Deals List */}
      <section className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-6 border-b pb-2">
          <h3 className="text-2xl font-bold text-gray-800">Hot Deals</h3>
          <div className="flex gap-2">
            <span className="bg-blue-500 text-white px-3 py-1 text-sm rounded cursor-pointer">Deal End</span>
            <span className="border px-3 py-1 text-sm rounded cursor-pointer hover:bg-gray-50 transition">Recent</span>
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

        {/* Dynamic Deals */}
        {hotDeals.map((deal) => (
          <div key={deal.id} className="border border-t-0 p-4 flex flex-col md:flex-row items-center hover:bg-gray-50 transition">
            <div className="w-full md:w-1/3 flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-100 flex items-center justify-center rounded border text-2xl">{deal.icon}</div>
              <div>
                <h4 className="font-bold text-sm">{deal.title}</h4>
                <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded">{deal.location}</span>
              </div>
            </div>
            
            {deal.price ? (
              <div className="w-full md:w-2/6 text-center font-bold text-gray-800 mt-2 md:mt-0">{deal.price}</div>
            ) : (
              <>
                <div className="w-full md:w-1/6 text-center text-sm text-gray-600 mt-2 md:mt-0">{deal.startDate}</div>
                <div className="w-full md:w-1/6 text-center text-sm text-gray-600">{deal.endDate}</div>
              </>
            )}
            
            <div className="w-full md:w-1/6 text-center mt-2 md:mt-0">
              {deal.status && (
                <span className="text-green-600 text-sm font-bold flex items-center justify-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span> {deal.status}
                  {deal.isNew && <span className="bg-red-500 text-white text-[10px] px-1 rounded ml-1">New</span>}
                </span>
              )}
            </div>
            <div className="w-full md:w-1/6 text-center mt-4 md:mt-0">
              <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-1.5 rounded text-sm w-full md:w-auto transition">View</button>
            </div>
          </div>
        ))}
      </section>

      {/* Product Grid */}
      <section className="bg-white py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800 border-l-4 border-blue-600 pl-3">Mobile Phones</h3>
            <a href="/electronics" className="text-blue-600 text-sm hover:underline">View All</a>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {topProducts.map((product) => (
              <div key={product.id} className="border border-gray-100 p-4 hover:shadow-lg transition relative bg-white flex flex-col group">
                <div className="h-40 flex items-center justify-center mb-4">
                  <span className="text-6xl group-hover:scale-110 transition duration-300">{product.icon}</span>
                </div>
                <h4 className="text-blue-600 text-sm font-medium hover:underline cursor-pointer line-clamp-2 h-10">{product.name}</h4>
                <div className="mt-2 mb-4">
                  <span className="text-xs text-gray-500">Starts from</span>
                  <div className="font-bold text-lg text-gray-900">SAR {product.startingPrice}</div>
                </div>
                <div className="mt-auto">
                  <div className="flex gap-1 mb-2">
                    {product.stores.map((store, idx) => (
                      <span key={idx} className={`text-xs px-1 rounded ${store === 'Noon' ? 'bg-yellow-100 text-yellow-800' : store === 'Amazon' ? 'bg-blue-100 text-blue-800' : store === 'Jarir' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                        {store}
                      </span>
                    ))}
                  </div>
                  <button className="w-full bg-green-500 hover:bg-green-600 text-white py-1.5 rounded text-sm font-medium transition">Compare Prices</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}