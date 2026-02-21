import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f4f5f7] py-12 md:py-16 font-sans">
      <div className="max-w-[800px] mx-auto px-4">
        
        {/* Main Content Card */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-8">About Us</h1>
          
          <div className="prose max-w-none text-gray-600 text-[15px] md:text-base leading-relaxed space-y-6 text-justify">
            
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-6 mb-4">Welcome to SaudiPrice</h2>
            <p>SaudiPrice is your ultimate destination for discovering the best deals, offers, and weekly flyers from top retailers across Saudi Arabia. We understand the value of your hard-earned money and your precious time, which is why we have built a centralized platform to bring all the major discounts right to your fingertips.</p>

            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-10 mb-4">Our Mission</h2>
            <p>Our mission is simple: to help consumers in the Kingdom of Saudi Arabia make smarter, more informed shopping decisions. We aim to bridge the gap between shoppers and retailers by providing a seamless, fast, and user-friendly experience where you can compare prices, find exclusive coupons, and browse supermarket flyers before you step out of your home.</p>

            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-10 mb-4">Why Choose Us?</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Real-Time Updates:</strong> We constantly monitor and update our database to bring you the latest verified offers.</li>
              <li><strong>All-in-One Platform:</strong> From electronics and mobile phones to daily groceries, find deals across all categories.</li>
              <li><strong>User-Friendly Design:</strong> A clean, fast, and intuitive interface designed for all devices.</li>
            </ul>

            <div className="mt-12 pt-8 border-t border-gray-100">
              <p>We are constantly growing and improving. If you have any suggestions or feedback, we would love to hear from you. <Link href="/contact" className="text-green-600 font-bold hover:underline">Get in touch with us</Link>!</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}