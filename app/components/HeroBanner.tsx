import Link from 'next/link';

export default function HeroBanner() {
  return (
    // Compacted padding (p-4 md:p-6) and min-height (150px to 210px)
    <div className="w-full mb-4 md:mb-5 mt-1 md:mt-2 rounded-2xl overflow-hidden relative bg-gradient-to-r from-green-600 to-green-800 text-white shadow-sm flex flex-col md:flex-row items-center justify-between p-4 md:p-6 min-h-[150px] md:min-h-[210px]">
      
      {/* Text Content */}
      <div className="flex-1 z-10 relative">
        <span className="bg-yellow-400 text-yellow-900 text-[8px] md:text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider mb-2 inline-block shadow-sm">
          Ramadan Special
        </span>
        
        {/* Slightly smaller text for compactness */}
        <h2 className="text-lg md:text-2xl lg:text-3xl font-black mb-1.5 md:mb-2 leading-tight tracking-tight">
          Mega Electronics Sale<br/>Up to <span className="text-yellow-400">70% OFF</span>
        </h2>
        
        <p className="text-green-50 mb-3 md:mb-4 max-w-xs text-[10px] md:text-[11px] leading-relaxed opacity-90">
          Best deals on smartphones and appliances across major KSA stores.
        </p>
        
        {/* Compact Button */}
        <Link href="/search?q=electronics" className="bg-white text-green-700 px-4 py-1.5 rounded-full font-bold text-[10px] md:text-xs shadow-md hover:bg-gray-50 transition-transform hover:scale-105 inline-block">
          Shop Now
        </Link>
      </div>

      {/* Right Side Design - Compacted emoji and blurs */}
      <div className="hidden md:flex w-1/4 relative z-10 justify-end items-center">
        <div className="w-24 h-24 bg-white/10 rounded-full blur-2xl absolute right-4"></div>
        <div className="w-16 h-16 bg-yellow-400/20 rounded-full blur-xl absolute top-0 right-0"></div>
        <span className="text-6xl opacity-80 drop-shadow-xl select-none">📱</span>
      </div>

      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-full h-full opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none mix-blend-overlay"></div>
    </div>
  );
}