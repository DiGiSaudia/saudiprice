import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#f4f5f7] py-12 md:py-16 font-sans">
      <div className="max-w-[800px] mx-auto px-4">
        
        {/* Main Content Card */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="prose max-w-none text-gray-600 text-[15px] md:text-base leading-relaxed space-y-6 text-justify">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-8 border-b border-gray-100 pb-4">
              Last Updated: February 2026
            </p>

            <p>At SaudiPrice.com, the privacy of our visitors is of extreme importance to us. This privacy policy document outlines the types of personal information that is received and collected by our website and how it is used.</p>
            
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-10 mb-4">Log Files</h2>
            <p>Like many other Web sites, we make use of log files. The information inside the log files includes internet protocol (IP) addresses, type of browser, Internet Service Provider (ISP), date/time stamp, referring/exit pages, and number of clicks to analyze trends, administer the site, track users movement around the site, and gather demographic information.</p>
            
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-10 mb-4">Cookies and Web Beacons</h2>
            <p>We do use cookies to store information about visitors preferences, record user-specific information on which pages the user access or visit, customize Web page content based on visitors browser type or other information that the visitor sends via their browser.</p>
            
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-10 mb-4">Consent</h2>
            <p>By using our website, you hereby consent to our privacy policy and agree to its terms.</p>

            <div className="mt-12 pt-8 border-t border-gray-100">
              <p>If you have any questions or require more information about our privacy policy, please feel free to <Link href="/contact" className="text-green-600 font-bold hover:underline">contact us</Link>.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}