'use client';

import Link from 'next/link';

export default function TermsAndConditions() {
  return (
    <div className="font-sans flex flex-col bg-[#f4f5f7] min-h-screen">
      
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 py-3 w-full text-[13px] text-gray-500 font-medium">
          <Link href="/" className="hover:text-green-600 transition-colors">Home</Link> <span className="mx-2">›</span>
          <span className="text-gray-800 font-bold">Terms and Conditions</span>
        </div>
      </div>

      {/* Main Legal Content */}
      <div className="max-w-[1000px] mx-auto px-4 py-10 w-full flex-grow">
        <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-gray-200">
          <h1 className="text-3xl font-black text-gray-900 mb-8 border-b border-gray-100 pb-5 tracking-tight">Terms and Conditions</h1>
          
          <div className="space-y-8 text-gray-600 text-[15px] leading-relaxed">
            
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">1. License and Scope of Service</h2>
              <p>
                Welcome to SaudiPrice. These terms and conditions outline the rules and regulations for the use of the SaudiPrice website and services. By accessing this platform, we assume you accept these terms and conditions in full. The scope of our service includes providing promotional flyers, daily deals, and product pricing information gathered from various supermarkets and stores across Saudi Arabia. SaudiPrice grants you a limited, non-exclusive, non-transferable license to access and use the platform strictly for personal, non-commercial purposes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">2. Copyrights, Trademark Rights and Content</h2>
              <p>
                Unless otherwise stated, SaudiPrice and its licensors own the intellectual property rights for all native material, logos, and UI designs on this platform. All intellectual property rights are reserved. You may view and print pages from the website for your own personal use, subject to restrictions set in these terms. You must not republish, sell, rent, reproduce, duplicate, or copy native material from SaudiPrice without our prior written consent. The third-party promotional flyers and logos displayed remain the property of their respective owners.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">3. Limitation of Liability</h2>
              <p>
                SaudiPrice acts solely as a digital aggregator of offers, flyers, and deals. We do not directly sell the products listed and are not responsible for any changes in prices, out-of-stock items, product quality, or disputes between the consumer and the respective physical or online stores. In no event shall SaudiPrice, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">4. Pricing Information</h2>
              <p>
                While our team strives to provide accurate and up-to-date pricing and promotional information, pricing errors, expired deals, or discrepancies may occur. The final price, terms, and availability of any product are strictly determined by the respective supermarket or vendor at the time of your actual purchase in their store. SaudiPrice does not guarantee the accuracy of any prices displayed on the aggregated promotional flyers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">5. Modifications to Terms</h2>
              <p>
                SaudiPrice reserves the right to revise these terms and conditions at any time as it sees fit. By using this website, you agree that it is your responsibility to review these terms on a regular basis to ensure you understand all rules governing the use of this platform.
              </p>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}