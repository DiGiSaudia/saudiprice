import React from 'react';
// چونکہ اب ہم ایک فولڈر اندر ہیں، اس لیے ڈبل ڈاٹ (..) لگا کر ڈیٹا منگوا رہے ہیں
import { topProducts } from '../data'; 

export default function ElectronicsPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      
      {/* پیج کی ہیڈنگ */}
      <div className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Electronics & Mobiles</h1>
        <p className="text-gray-500">Compare the best prices for smartphones, laptops, and more in Saudi Arabia.</p>
      </div>

      {/* پروڈکٹس کی لسٹ */}
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
  );
}