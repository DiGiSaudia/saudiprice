import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* لوگو (Logo) */}
          <Link href="/" className="text-2xl font-black tracking-tighter">
            <span className="text-gray-900">Saudi</span><span className="text-blue-600">Price</span>
          </Link>
          
          {/* لنکس (Links) */}
          <div className="hidden md:flex space-x-8 font-semibold text-sm text-gray-600 uppercase tracking-wider">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <Link href="/about" className="hover:text-blue-600 transition-colors">About Us</Link>
            <Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
            <Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
          </div>
          
        </div>
      </div>
    </nav>
  );
}