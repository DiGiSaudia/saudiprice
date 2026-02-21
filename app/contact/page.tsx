export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f4f5f7] py-12 md:py-20 font-sans">
      <div className="max-w-[1000px] mx-auto px-4">
        
        {/* Premium Card Container */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Side: Contact Information (Dark Premium Theme) */}
          <div className="w-full md:w-2/5 bg-[#0b5e36] p-8 md:p-10 text-white flex flex-col justify-between relative overflow-hidden">
            
            {/* Decorative Background Elements */}
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute top-10 -left-10 w-32 h-32 bg-[#D4AF37] opacity-10 rounded-full blur-2xl pointer-events-none"></div>

            <div className="relative z-10">
              <h2 className="text-3xl font-black mb-3 text-white tracking-tight">Get in Touch</h2>
              <p className="text-green-100 text-[13px] mb-10 leading-relaxed opacity-90">
                Whether you have a question about our deals, need assistance, or want to partner with us, our team is always ready to help.
              </p>

              <div className="space-y-8">
                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-2xl shrink-0 backdrop-blur-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="pt-1">
                    <h4 className="font-bold text-sm mb-1 text-white uppercase tracking-wider">Head Office</h4>
                    <p className="text-green-100 text-xs leading-relaxed">Olaya Street, King Fahd District<br/>Riyadh, Saudi Arabia</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-2xl shrink-0 backdrop-blur-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="pt-1">
                    <h4 className="font-bold text-sm mb-1 text-white uppercase tracking-wider">Email Us</h4>
                    <p className="text-green-100 text-xs">support@saudiprice.com</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-2xl shrink-0 backdrop-blur-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="pt-1">
                    <h4 className="font-bold text-sm mb-1 text-white uppercase tracking-wider">Call Us</h4>
                    <p className="text-green-100 text-xs">+966 50 000 0000</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="w-full md:w-3/5 p-8 md:p-12 bg-white">
            <h3 className="text-2xl font-black text-gray-900 mb-6 tracking-tight">Send a Message</h3>
            <form className="space-y-5">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* First Name */}
                <div>
                  <label htmlFor="firstName" className="block text-[11px] font-bold text-gray-500 mb-1.5 uppercase tracking-wider">First Name</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:bg-white focus:ring-2 focus:ring-green-600/20 focus:border-green-600 transition-all text-sm font-medium"
                    placeholder="John"
                  />
                </div>
                {/* Last Name */}
                <div>
                  <label htmlFor="lastName" className="block text-[11px] font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:bg-white focus:ring-2 focus:ring-green-600/20 focus:border-green-600 transition-all text-sm font-medium"
                    placeholder="Doe"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label htmlFor="email" className="block text-[11px] font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:bg-white focus:ring-2 focus:ring-green-600/20 focus:border-green-600 transition-all text-sm font-medium"
                  placeholder="john@example.com"
                />
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-[11px] font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:bg-white focus:ring-2 focus:ring-green-600/20 focus:border-green-600 transition-all text-sm font-medium"
                  placeholder="How can we help you?"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-[11px] font-bold text-gray-500 mb-1.5 uppercase tracking-wider">Message</label>
                <textarea 
                  id="message" 
                  rows={4}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:bg-white focus:ring-2 focus:ring-green-600/20 focus:border-green-600 transition-all text-sm font-medium resize-none"
                  placeholder="Type your message here..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <button 
                type="button" 
                className="w-full bg-green-600 text-white font-black text-sm px-8 py-4 rounded-xl hover:bg-green-700 hover:shadow-lg transition-all transform hover:-translate-y-0.5 mt-2 uppercase tracking-wide"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}