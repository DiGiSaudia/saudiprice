import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0b5e36] text-white pt-12 pb-8 mt-auto border-t-4 border-[#D4AF37] font-sans w-full overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand and App Download Section */}
        <div className="col-span-1 md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div>
            {/* Standardized Logo Matching Header */}
            <Link href="/" className="text-3xl font-black tracking-tighter shrink-0 mb-3 block">
              <span className="text-white">Saudi</span>
              <span className="text-[#D4AF37]">Price</span>
            </Link>
            
            <p className="text-green-100 text-sm mb-5 max-w-sm">
              Get all the latest offers, flyers, and coupons directly on your mobile device. Never miss a deal!
            </p>
            
            {/* App Download Buttons with Correct Branding */}
            <div className="flex flex-wrap gap-3">
              {/* Google Play Button with Official Colors */}
              <button className="bg-black border border-gray-700 rounded-lg px-4 py-2 flex items-center gap-3 hover:bg-gray-900 transition-colors shadow-sm">
                <svg viewBox="0 0 512 512" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#4285F4" d="M47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l239.9-239.9L47 0z" />
                  <path fill="#EA4335" d="M286.9 272L104.6 13l220.7 127.3L286.9 272z" />
                  <path fill="#FBBC04" d="M325.3 140.3l104.6 60.4c18 10.4 18 27.5 0 37.9L325.3 299 286.9 272l38.4-131.7z" />
                  <path fill="#34A853" d="M104.6 499l182.3-182.3 38.4 38.4L104.6 499z" />
                </svg>
                <div className="flex flex-col items-start">
                  <span className="text-[10px] uppercase font-semibold leading-none text-gray-300">GET IT ON</span>
                  <span className="text-sm font-bold leading-tight text-white">Google Play</span>
                </div>
              </button>
              
              {/* App Store Button (Standard Silver/White) */}
              <button className="bg-black border border-gray-700 rounded-lg px-4 py-2 flex items-center gap-3 hover:bg-gray-900 transition-colors shadow-sm">
                <svg viewBox="0 0 384 512" className="w-6 h-6 fill-current text-gray-200" xmlns="http://www.w3.org/2000/svg">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                </svg>
                <div className="flex flex-col items-start">
                  <span className="text-[10px] uppercase font-semibold leading-none text-gray-300">Download on the</span>
                  <span className="text-sm font-bold leading-tight text-white">App Store</span>
                </div>
              </button>
            </div>
          </div>
        </div>
        
        {/* Quick Links Section */}
        <div>
          <h4 className="text-lg font-bold mb-4 border-b border-green-700 pb-2">Quick Links</h4>
          <ul className="space-y-2 text-sm text-green-100">
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
        
        {/* Top Cities Section */}
        <div>
          <h4 className="text-lg font-bold mb-4 border-b border-green-700 pb-2">Top Cities</h4>
          <ul className="space-y-2 text-sm text-green-100">
            <li><Link href="#" className="hover:text-white transition-colors">Riyadh Offers</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Jeddah Offers</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Dammam Offers</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Mecca Offers</Link></li>
          </ul>
        </div>

      </div>
      
      <div className="max-w-[1400px] mx-auto px-4 mt-8 pt-6 border-t border-green-700 text-center text-sm text-green-200">
        <p>© 2026 SaudiPrice. All rights reserved.</p>
      </div>
    </footer>
  );
}