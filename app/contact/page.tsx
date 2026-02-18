export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-black text-gray-900 mb-8">Contact Us</h1>
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-2xl">
        <p className="text-lg text-gray-600 mb-8">Have a question or want to partner with us? We would love to hear from you.</p>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Your Name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="your@email.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea rows={5} className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="How can we help you?"></textarea>
          </div>
          <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors w-full sm:w-auto">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}