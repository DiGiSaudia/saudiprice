'use client';

import { useState } from 'react';

const categories = [
  { id: 'all', name: 'All Deals', icon: '🌟' },
  { id: 'mobiles', name: 'Mobiles & Tablets', icon: '📱' },
  { id: 'laptops', name: 'Laptops & PCs', icon: '💻' },
  { id: 'electronics', name: 'Electronics & TV', icon: '🎧' },
  { id: 'grocery', name: 'Grocery & Daily Needs', icon: '🛒' },
  { id: 'fashion', name: 'Fashion & Beauty', icon: '👕' },
  { id: 'home', name: 'Home & Kitchen', icon: '🏠' },
];

export default function Sidebar() {
  const [active, setActive] = useState('all');

  return (
    <aside className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm sticky top-24">
      <h3 className="text-lg font-black text-gray-800 mb-4 px-2 uppercase tracking-wider">
        Categories
      </h3>
      <ul className="space-y-1.5">
        {categories.map((cat) => (
          <li key={cat.id}>
            <button
              onClick={() => setActive(cat.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-bold text-sm ${
                active === cat.id 
                  ? 'bg-green-50 text-green-700 shadow-sm border border-green-100' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-green-600 border border-transparent'
              }`}
            >
              <span className="text-xl">{cat.icon}</span>
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
      
      {/* Small Promo Banner inside Sidebar */}
      <div className="mt-8 bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
        <h4 className="font-black text-blue-800 text-sm mb-1">Download App</h4>
        <p className="text-xs text-blue-600 mb-3">Get exclusive app-only discounts!</p>
        <button className="w-full bg-blue-600 text-white text-xs font-bold py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Coming Soon
        </button>
      </div>
    </aside>
  );
}