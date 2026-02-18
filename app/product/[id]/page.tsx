import { supabase } from '../../lib/supabase'
import Link from 'next/link'

export default async function ProductPage({ params }: { params: { id: string } }) {
  // ہم URL سے پروڈکٹ کی ID لے کر ڈیٹا بیس سے وہ مخصوص پروڈکٹ منگوا رہے ہیں
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', params.id)
    .single()

  // اگر کوئی غلط ID ڈالے تو یہ میسج آئے گا
  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Product not found 😢</h1>
        <Link href="/" className="text-blue-600 hover:underline">← Back to Home</Link>
      </div>
    )
  }

  // پروڈکٹ کا شاندار ڈیزائن
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* واپس جانے کا بٹن */}
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold mb-8 transition-colors">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to all deals
        </Link>

        {/* پروڈکٹ کا مین کارڈ */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
          
          {/* بائیں طرف: بڑی تصویر */}
          <div className="w-full md:w-1/2 p-10 flex justify-center items-center bg-white border-b md:border-b-0 md:border-r border-gray-100 relative">
            <div className="absolute top-6 left-6 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-black px-4 py-2 rounded-lg shadow-sm tracking-wide z-10">
              HOT DEAL
            </div>
            <img 
              src={product.image_url} 
              alt={product.title} 
              className="max-w-full h-auto max-h-[400px] object-contain hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* دائیں طرف: پروڈکٹ کی تفصیلات */}
          <div className="w-full md:w-1/2 p-10 md:p-14 flex flex-col justify-center bg-gray-50/50">
            <span className="text-sm text-blue-600 font-bold uppercase tracking-widest mb-3">{product.category}</span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">{product.title}</h1>
            
            <div className="flex items-center gap-4 mb-8">
              <span className="bg-white border border-gray-200 text-gray-800 text-sm font-bold px-4 py-2 rounded-lg shadow-sm">
                Store: <span className="text-blue-700">{product.store}</span>
              </span>
            </div>

            <div className="mb-10 p-6 bg-white rounded-2xl border border-green-100 shadow-sm">
              <p className="text-gray-500 text-sm font-semibold mb-1 uppercase tracking-wider">Best Price in KSA</p>
              <div className="flex items-end gap-3">
                <p className="text-5xl font-black text-green-600">{product.price}</p>
                <p className="text-xl font-bold text-gray-500 mb-1">SAR</p>
              </div>
              <p className="text-sm text-gray-400 line-through mt-2">Was {(product.price * 1.15).toFixed(0)} SAR</p>
            </div>

            <a 
              href={product.product_link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-bold py-5 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-blue-500/30 text-xl flex justify-center items-center gap-3"
            >
              Get Deal Now
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </a>
          </div>

        </div>
      </div>
    </div>
  )
}