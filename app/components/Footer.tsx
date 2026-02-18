import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div>
          <h3 className="text-2xl font-black text-white mb-4 tracking-tighter">
            Saudi<span className="text-blue-500">Price</span>
          </h3>
          <p className="text-sm text-gray-400 max-w-xs">
            Your trusted platform to find the best deals and compare prices across top stores in Saudi Arabia.
          </p>
        </div>
        
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
          <ul className="space-y-3 text-sm font-medium">
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Contact</h3>
          <p className="text-sm text-gray-400 font-medium">Email: contact@saudiprice.com</p>
        </div>
        
      </div>
      
      <div className="text-center text-sm font-medium text-gray-500 mt-12 pt-8 border-t border-gray-800">
        &copy; {new Date().getFullYear()} SaudiPrice.com - All rights reserved.
      </div>
    </footer>
  );
}