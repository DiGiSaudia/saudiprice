'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

function FooterContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const validCities = ['Riyadh', 'Jeddah', 'Dammam', 'Mecca', 'Madina'];
  
  const [email, setEmail] = useState('');

  const handleAppClick = () => {
    alert("Our Mobile App is coming very soon! Stay tuned.");
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you for subscribing with: ${email}\nYou will now receive our latest deals!`);
      setEmail('');
    }
  };

  const getCityHref = (newCity: string) => {
    const currentPath = pathname || '/';
    const currentParams = new URLSearchParams(searchParams?.toString() || '');

    if (currentPath === '/' || validCities.includes(currentPath.replace('/', ''))) {
      return `/${newCity}`;
    } else {
      currentParams.set('city', newCity);
      return `${currentPath}?${currentParams.toString()}`;
    }
  };

  const cities = ['Riyadh', 'Jeddah', 'Dammam', 'Mecca', 'Madina'];

  return (
    <footer className="bg-white text-gray-800 pt-12 pb-8 mt-auto border-t border-gray-200 font-sans w-full overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4">
        
        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-8 mb-10">
          
          <div className="md:w-1/3 flex flex-col items-start gap-4">
            <Link href="/" className="text-3xl font-black tracking-tighter shrink-0 mb-1 block">
              <span className="text-green-600">Saudi</span>
              <span className="text-[#D4AF37]">Price</span>
            </Link>
            
            <p className="text-gray-500 text-[15px] max-w-sm leading-relaxed">
              Get all the latest offers, flyers, and coupons directly on your mobile device. Never miss a deal!
            </p>
            
            <div className="flex gap-3 mt-2.5">
              <button 
                onClick={handleAppClick}
                className="bg-black rounded-lg w-[140px] h-[44px] flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors shadow-sm"
              >
                <svg viewBox="0 0 512 512" className="w-5 h-5 shrink-0" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#4285F4" d="M47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l239.9-239.9L47 0z" />
                  <path fill="#EA4335" d="M286.9 272L104.6 13l220.7 127.3L286.9 272z" />
                  <path fill="#FBBC04" d="M325.3 140.3l104.6 60.4c18 10.4 18 27.5 0 37.9L325.3 299 286.9 272l38.4-131.7z" />
                  <path fill="#34A853" d="M104.6 499l182.3-182.3 38.4 38.4L104.6 499z" />
                </svg>
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[8px] uppercase font-semibold text-gray-300 mb-0.5">GET IT ON</span>
                  <span className="text-[12px] font-semibold text-white">Google Play</span>
                </div>
              </button>
              
              <button 
                onClick={handleAppClick}
                className="bg-black rounded-lg w-[140px] h-[44px] flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors shadow-sm"
              >
                <svg viewBox="0 0 384 512" className="w-4 h-4 shrink-0 fill-current text-white pb-0.5" xmlns="http://www.w3.org/2000/svg">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                </svg>
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[8px] font-semibold text-gray-300 mb-0.5">Download on the</span>
                  <span className="text-[12px] font-semibold text-white">App Store</span>
                </div>
              </button>
            </div>
          </div>
          
          <div className="md:w-1/2 flex gap-8 md:gap-4 flex-row justify-between w-full">
            <div className="flex-1">
              <h4 className="text-[17px] font-black mb-4 text-gray-800 uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-3 text-[15px] text-gray-500 font-medium">
                <li><Link href="/about" className="hover:text-green-600 transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-green-600 transition-colors">Contact Us</Link></li>
                <li><Link href="/privacy" className="hover:text-green-600 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-green-600 transition-colors">Terms of Service</Link></li>
                <li><Link href="/disclaimer" className="hover:text-green-600 transition-colors">Disclaimer</Link></li>
              </ul>
            </div>
            
            <div className="flex-1">
              <h4 className="text-[17px] font-black mb-4 text-gray-800 uppercase tracking-wider">Top Cities</h4>
              <ul className="space-y-3 text-[15px] text-gray-500 font-medium">
                {cities.map((city) => (
                  <li key={city}>
                    <Link href={getCityHref(city)} className="hover:text-green-600 transition-colors">
                      {city} Offers
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:w-1/4 mt-8 md:mt-0">
            <h4 className="text-[17px] font-black mb-4 text-gray-800 uppercase tracking-wider">Newsletter</h4>
            <form onSubmit={handleSubscribe} className="flex mb-6">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email address" 
                className="w-full text-[15px] px-3.5 py-2.5 border border-gray-200 rounded-l-md outline-none focus:border-green-600 transition-colors" 
              />
              <button type="submit" className="bg-green-600 text-white text-[15px] px-4 py-2.5 rounded-r-md font-bold hover:bg-green-700 transition-colors">
                Subscribe
              </button>
            </form>
            
            <h4 className="text-[15px] font-bold text-gray-800 mb-3 uppercase tracking-wider">Follow Us</h4>
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-[#1877F2] text-white rounded-md flex items-center justify-center hover:bg-[#166FE5] hover:-translate-y-1 transition-all shadow-sm">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-black text-white rounded-md flex items-center justify-center hover:bg-gray-800 hover:-translate-y-1 transition-all shadow-sm">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-gray-500 text-justify max-w-4xl leading-relaxed">
            SaudiPrice is an independent deal aggregator. Product names and logos belong to their respective owners. Some links may be affiliate links. We do not guarantee absolute accuracy of prices or stock availability. Please verify the final price on the merchant's site before purchasing.
          </p>
          <div className="shrink-0 text-xs font-bold text-gray-400">
            &copy; {new Date().getFullYear()} SaudiPrice. All rights reserved.
          </div>
        </div>
        
      </div>
    </footer>
  );
}

export default function Footer() {
  return (
    <Suspense fallback={<footer className="bg-white border-t border-gray-200 pt-12 pb-8 mt-auto"></footer>}>
      <FooterContent />
    </Suspense>
  );
}