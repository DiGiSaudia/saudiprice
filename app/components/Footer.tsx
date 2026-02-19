import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0b5e36] text-white pt-16 pb-8 mt-auto border-t-4 border-green-500 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2 flex flex-col sm:flex-row items-center gap-6">
          <div>
            <h3 className="text-3xl font-black mb-2 tracking-tighter">SaudiPrice</h3>
            <p className="text-green-100 text-sm mb-4 max-w-sm">Get all the latest offers, flyers, and coupons directly on your mobile device. Never miss a deal in KSA!</p>
            <div className="flex gap-3">
              <button className="bg-black border border-gray-700 rounded px-4 py-2 flex items-center gap-2 hover:bg-gray-900 transition">
                <span className="text-xs font-bold">Google Play</span>
              </button>
              <button className="bg-black border border-gray-700 rounded px-4 py-2 flex items-center gap-2 hover:bg-gray-900 transition">
                <span className="text-xs font-bold">App Store</span>
              </button>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-4 border-b border-green-700 pb-2">Quick Links</h4>
          <ul className="space-y-2 text-sm text-green-100">
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
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
      <div className="max-w-[1400px] mx-auto px-4 mt-12 pt-6 border-t border-green-700 text-center text-sm text-green-200">
        <p>© 2026 SaudiPrice.com. All rights reserved.</p>
      </div>
    </footer>
  );
}