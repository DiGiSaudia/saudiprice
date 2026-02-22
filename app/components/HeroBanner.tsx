import Link from 'next/link';

export default function HeroBanner() {
  return (
    <div className="w-full mb-6 md:mb-8 mt-2 md:mt-4 rounded-2xl overflow-hidden relative bg-gradient-to-r from-green-600 to-green-800 text-white shadow-sm flex flex-col md:flex-row items-center justify-between p-6 md:p-10 min-h-[200px] md:min-h-[280px]">
      
      {/* Text Content */}
      <div className="flex-1 z-10 relative">
        <span className="bg-yellow-400 text-yellow-900 text-[10px] md:text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-3 md:mb-4 inline-block shadow-sm">
          Ramadan Special
        </span>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-black mb-3 md:mb-4 leading-tight tracking-tight">
          Mega Electronics Sale<br/>Up to <span className="text-yellow-400">70% OFF</span>
        </h2>
        <p className="text-green-100 mb-5 md:mb-6 max-w-md text-xs md:text-sm leading-relaxed">
          Get the best deals on smartphones, laptops, and home appliances. Limited time offer across all major KSA stores.
        </p>
        
        {/* Updated Button to be Clickable */}
        <Link href="/search?q=electronics" className="bg-white text-green-700 px-6 py-2.5 rounded-full font-bold text-xs md:text-sm shadow-md hover:bg-gray-50 transition-transform hover:scale-105 inline-block">
          Shop Now
        </Link>
      </div>

      {/* Right Side Design (Visible on larger screens) */}
      <div className="hidden md:flex w-1/3 relative z-10 justify-end items-center">
        <div className="w-40 h-40 bg-white/10 rounded-full blur-2xl absolute right-10"></div>
        <div className="w-32 h-32 bg-yellow-400/20 rounded-full blur-xl absolute top-0 right-0"></div>
        <span className="text-8xl opacity-80 drop-shadow-2xl">📱</span>
      </div>

      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none mix-blend-overlay"></div>
    </div>
  );
}