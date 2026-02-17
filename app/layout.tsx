import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SaudiPrice - Compare Prices in Saudi Arabia",
  description: "Find the best prices and hot deals from Noon, Amazon, Jarir, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white font-sans text-gray-800 min-h-screen flex flex-col">
        
        {/* === NAVBAR === */}
        <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <a href="/" className="text-3xl font-bold text-blue-600 tracking-tight">SaudiPrice</a>
              <div className="hidden md:flex space-x-6 text-sm font-medium text-gray-600">
                <a href="#" className="hover:text-blue-600 transition">All Categories ▾</a>
                <a href="/electronics" className="hover:text-blue-600 transition">Electronics</a>
                <a href="/fashion" className="hover:text-blue-600 transition">Fashion</a>
                <a href="/deals" className="text-red-500 flex items-center gap-1 hover:text-red-600 transition">🔥 Hot Deals</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center text-sm">
                <span className="text-gray-500 mr-4 cursor-pointer hover:text-blue-600">Login ▾</span>
                <span className="cursor-pointer">🇸🇦 AR</span>
              </div>
            </div>
          </div>
        </header>

        {/* === MAIN CONTENT === */}
        <main className="flex-grow">
          {children}
        </main>

        {/* === FOOTER (بالکل اسکرین شاٹ والا نیا ڈیزائن) === */}
        <footer className="bg-[#1a202c] text-gray-300 py-12 mt-10">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
            
            {/* کالم 1: لوگو اور سوشل آئیکنز */}
            <div>
              <h4 className="text-white text-xl font-bold mb-4">SaudiPrice</h4>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Your trusted price comparison platform helping shoppers in Saudi Arabia find the best deals and save money.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-blue-500 transition text-white">𝕏</a>
                <a href="#" className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-blue-600 transition text-white">f</a>
                <a href="#" className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-pink-600 transition text-white">📷</a>
                <a href="#" className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-red-600 transition text-white">▶</a>
              </div>
            </div>
            
            {/* کالم 2: کوئیک لنکس */}
            <div>
              <h4 className="text-white font-bold mb-4 text-base">Quick Links</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Home</a></li>
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">How it Works</a></li>
                <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              </ul>
            </div>

            {/* کالم 3: کیٹیگریز */}
            <div>
              <h4 className="text-white font-bold mb-4 text-base">Popular Categories</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Smartphones</a></li>
                <li><a href="#" className="hover:text-white transition">Laptops</a></li>
                <li><a href="#" className="hover:text-white transition">Televisions</a></li>
                <li><a href="#" className="hover:text-white transition">Home appliances</a></li>
                <li><a href="#" className="hover:text-white transition">Fashion</a></li>
                <li><a href="#" className="hover:text-white transition">Gaming</a></li>
              </ul>
            </div>

            {/* کالم 4: ریٹیلرز (دکانیں) */}
            <div>
              <h4 className="text-white font-bold mb-4 text-base">Retailers</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition">eXtra</a></li>
                <li><a href="#" className="hover:text-white transition">Jarir Bookstore</a></li>
                <li><a href="#" className="hover:text-white transition">Noon</a></li>
                <li><a href="#" className="hover:text-white transition">Amazon KSA</a></li>
                <li><a href="#" className="hover:text-white transition">Samsung KSA</a></li>
                <li><a href="#" className="hover:text-white transition">Apple Store</a></li>
              </ul>
            </div>

          </div>
          
          {/* کاپی رائٹ کی پٹی */}
          <div className="container mx-auto px-4 mt-12 pt-6 border-t border-gray-700 text-center text-gray-500 text-xs">
            © 2026 SaudiPrice.com - All rights reserved. Compare prices and find the best deals in Saudi Arabia.
          </div>
        </footer>

      </body>
    </html>
  );
}