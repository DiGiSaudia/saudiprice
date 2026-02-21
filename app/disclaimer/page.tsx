import Link from 'next/link';

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-[#f4f5f7] py-12 md:py-16 font-sans">
      <div className="max-w-[800px] mx-auto px-4">
        
        {/* Main Content Card */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-8">Disclaimer</h1>
          
          <div className="prose max-w-none text-gray-600 text-[15px] md:text-base leading-relaxed space-y-6 text-justify">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-8 border-b border-gray-100 pb-4">
              Last Updated: February 2026
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-10 mb-4">1. Information Accuracy</h2>
            <p>SaudiPrice is an independent deal aggregator and price comparison platform. While we strive to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.</p>

            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-10 mb-4">2. Affiliate Disclosure</h2>
            <p>Some of the links on this website are affiliate links. This means that if you click on the link and purchase the item, SaudiPrice may receive an affiliate commission at no extra cost to you. We only recommend products or services we believe will add value to our users. This helps support the platform and allows us to continue providing free services.</p>

            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-10 mb-4">3. Third-Party Trademarks</h2>
            <p>All product names, logos, and brands are property of their respective owners. All company, product and service names used in this website are for identification purposes only. Use of these names, trademarks, and brands does not imply endorsement by SaudiPrice.</p>

            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-10 mb-4">4. External Links</h2>
            <p>Through this website, you are able to link to other websites which are not under the control of SaudiPrice. We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.</p>

            <div className="mt-12 pt-8 border-t border-gray-100">
              <p>If you have any questions about this disclaimer, please <Link href="/contact" className="text-green-600 font-bold hover:underline">contact us</Link>.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}