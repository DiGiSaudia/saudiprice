import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Brand Info */}
          <div>
            <h3 className="text-3xl font-black text-white mb-6 tracking-tighter">
              Saudi<span className="text-blue-500">Price</span>
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Your ultimate destination to compare prices and discover the best deals across top e-commerce platforms in Saudi Arabia. Shop smart, save money.
            </p>
            <p className="text-sm font-medium text-gray-400">
              Email: <a href="mailto:contact@saudiprice.com" className="text-blue-400 hover:text-blue-300">contact@saudiprice.com</a>
            </p>
          </div>
          
          {/* Column 2: Popular Categories */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Popular Categories</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/category/Mobiles" className="hover:text-white hover:underline transition-all">Mobile Phones</Link></li>
              <li><Link href="/category/Laptops" className="hover:text-white hover:underline transition-all">Laptops & Computers</Link></li>
              <li><Link href="/category/Smartwatches" className="hover:text-white hover:underline transition-all">Smartwatches</Link></li>
              <li><Link href="/category/Home Appliances" className="hover:text-white hover:underline transition-all">Home Appliances</Link></li>
              <li><Link href="/category/Gaming" className="hover:text-white hover:underline transition-all">Gaming Consoles</Link></li>
            </ul>
          </div>

          {/* Column 3: Top Retailers */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Top Retailers</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/store/Amazon" className="hover:text-white hover:underline transition-all">Amazon KSA</Link></li>
              <li><Link href="/store/Noon" className="hover:text-white hover:underline transition-all">Noon</Link></li>
              <li><Link href="/store/Jarir" className="hover:text-white hover:underline transition-all">Jarir Bookstore</Link></li>
              <li><Link href="/store/eXtra" className="hover:text-white hover:underline transition-all">eXtra Stores</Link></li>
            </ul>
          </div>
          
          {/* Column 4: Legal & Help */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Information</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/about" className="hover:text-white hover:underline transition-all">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white hover:underline transition-all">Contact Us</Link></li>
              <li><Link href="/privacy" className="hover:text-white hover:underline transition-all">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white hover:underline transition-all">Terms of Service</Link></li>
            </ul>
          </div>
          
        </div>
        
        {/* Bottom Copyright */}
        <div className="text-center text-sm font-medium text-gray-500 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} SaudiPrice.com - All rights reserved.</p>
          <p className="mt-2 md:mt-0">Made with ❤️ for Saudi Arabia</p>
        </div>
      </div>
    </footer>
  );
}