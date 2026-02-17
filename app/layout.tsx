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
        
        {/* === NAVBAR (یہ ہر پیج پر نظر آئے گا) === */}
        <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-8">
              {/* Logo */}
              <a href="/" className="text-3xl font-bold text-blue-600 tracking-tight">SaudiPrice</a>
              
              {/* Main Menu */}
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

        {/* === MAIN CONTENT (یہاں ہر پیج کا اپنا ڈیٹا آئے گا) === */}
        <main className="flex-grow">
          {children}
        </main>

        {/* === FOOTER (یہ بھی ہر پیج پر نظر آئے گا) === */}
        <footer className="bg-gray-900 text-gray-300 py-10 mt-10 text-sm">
          <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-white text-lg font-bold mb-4">SaudiPrice</h4>
              <p className="text-gray-400">Your trusted price comparison platform helping shoppers in Saudi Arabia find the best deals and save money.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Categories</h4>
              <ul className="space-y-2">
                <li><a href="/electronics" className="hover:text-white transition">Smartphones</a></li>
                <li><a href="/electronics" className="hover:text-white transition">Laptops</a></li>
                <li><a href="/fashion" className="hover:text-white transition">Perfumes</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Newsletter</h4>
              <div className="flex">
                <input type="text" placeholder="Email address" className="px-3 py-2 w-full text-black outline-none rounded-l" />
                <button className="bg-cyan-500 text-white px-4 py-2 hover:bg-cyan-600 rounded-r transition">Subscribe</button>
              </div>
            </div>
          </div>
          <div className="container mx-auto px-4 mt-8 pt-4 border-t border-gray-800 text-center text-gray-500">
            © 2026 SaudiPrice.com. All rights reserved.
          </div>
        </footer>

      </body>
    </html>
  );
}