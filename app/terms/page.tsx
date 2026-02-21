import Link from 'next/link';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#f4f5f7] py-12 md:py-16 font-sans">
      <div className="max-w-[800px] mx-auto px-4">
        
        {/* Main Content Card */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="prose max-w-none text-gray-600 text-[15px] md:text-base leading-relaxed space-y-6 text-justify">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-8 border-b border-gray-100 pb-4">
              Last Updated: February 2026
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-10 mb-4">1. License and Scope of Service</h2>
            <p>Welcome to SaudiPrice. These terms and conditions outline the rules and regulations for the use of the SaudiPrice website and services. By accessing this platform, we assume you accept these terms and conditions in full. The scope of our service includes providing promotional flyers, daily deals, and product pricing information gathered from various supermarkets and stores across Saudi Arabia.</p>

            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-10 mb-4">2. Copyrights and Content</h2>
            <p>Unless otherwise stated, SaudiPrice and its licensors own the intellectual property rights for all native material, logos, and UI designs on this platform. You must not republish, sell, rent, reproduce, duplicate, or copy native material from SaudiPrice without our prior written consent. The third-party promotional flyers and logos displayed remain the property of their respective owners.</p>

            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-10 mb-4">3. Limitation of Liability</h2>
            <p>SaudiPrice acts solely as a digital aggregator of offers, flyers, and deals. We do not directly sell the products listed and are not responsible for any changes in prices, out-of-stock items, product quality, or disputes between the consumer and the respective physical or online stores.</p>

            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-10 mb-4">4. Pricing Information</h2>
            <p>While our team strives to provide accurate and up-to-date pricing and promotional information, pricing errors, expired deals, or discrepancies may occur. The final price, terms, and availability of any product are strictly determined by the respective supermarket or vendor at the time of your actual purchase in their store.</p>
            
            <div className="mt-12 pt-8 border-t border-gray-100">
              <p>For any questions regarding our terms, please <Link href="/contact" className="text-green-600 font-bold hover:underline">contact us</Link>.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}