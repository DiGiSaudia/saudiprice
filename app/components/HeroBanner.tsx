import Link from 'next/link';

export default function HeroBanner() {
  return (
    // Reduced padding and min-heights by ~15% to make the banner more compact
    <div className="w-full mb-5 md:mb-6 mt-2 md:mt-3 rounded-2xl overflow-hidden relative bg-gradient-to-r from-green-600 to-green-800 text-white shadow-sm flex flex-col md:flex-row items-center justify-between p-5 md:p-8 min-h-[170px] md:min-h-[240px]">
      
      {/* Text Content */}
      <div className="flex-1 z-10 relative">
        <span className="bg-yellow-400 text-yellow-900 text-[9px] md:text-[11px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider mb-2 md:mb-3 inline-block shadow-sm">
          Ramadan Special
        </span>
        {/* Scaled down text sizes */}
        <h2 className="text-xl md:text-3xl lg:text-4xl font-black mb-2 md:mb-3 leading-tight tracking-tight">
          Mega Electronics Sale<br/>Up to <span className="text-yellow-400">70% OFF</span>
        </h2>
        <p className="text-green-100 mb-4 md:mb-5 max-w-sm text-[11px] md:text-xs leading-relaxed">
          Get the best deals on smartphones, laptops, and home appliances. Limited time offer across all major KSA stores.
        </p>
        
        {/* Updated Button */}
        <Link href="/search?q=electronics" className="bg-white text-green-700 px-5 py-2 rounded-full font-bold text-[11px] md:text-xs shadow-md hover:bg-gray-50 transition-transform hover:scale-105 inline-block">
          Shop Now
        </Link>
      </div>

      {/* Right Side Design (Visible on larger screens) */}
      <div className="hidden md:flex w-1/3 relative z-10 justify-end items-center">
        <div className="w-32 h-32 bg-white/10 rounded-full blur-2xl absolute right-8"></div>
        <div className="w-24 h-24 bg-yellow-400/20 rounded-full blur-xl absolute top-0 right-0"></div>
        {/* Reduced emoji size */}
        <span className="text-7xl opacity-80 drop-shadow-2xl">📱</span>
      </div>

      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none mix-blend-overlay"></div>
    </div>
  );
}