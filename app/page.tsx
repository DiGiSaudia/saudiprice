import { supabase } from './lib/supabase'

export const revalidate = 0; 

export default async function Home() {
  const { data: products, error } = await supabase
    .from('products')
    .select('*')

  if (error) {
    return <div className="text-white text-center mt-10">Error fetching data: {error.message}</div>
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-900">🔥 Trending Deals</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products?.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden group">
              
              {/* پروڈکٹ کی تصویر کا حصہ */}
              <div className="h-64 bg-white p-6 flex justify-center items-center relative overflow-hidden">
                <img 
                  src={product.image_url} 
                  alt={product.title} 
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                {/* سٹور کا نام - ایک خوبصورت بیج کی شکل میں */}
                <span className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                  {product.store}
                </span>
              </div>

              {/* پروڈکٹ کی تفصیلات کا حصہ */}
              <div className="p-6 flex flex-col flex-grow border-t border-gray-50">
                <span className="text-xs text-blue-500 font-semibold uppercase tracking-wider mb-2">{product.category}</span>
                <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{product.title}</h2>
                
                {/* قیمت کا حصہ */}
                <div className="mt-auto pt-2 flex items-end justify-between mb-5">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Best Price</p>
                    <p className="text-3xl font-extrabold text-green-600">{product.price} <span className="text-base font-semibold text-gray-500">SAR</span></p>
                  </div>
                </div>

                {/* دکان پر جانے کا بٹن */}
                <a 
                  href={product.product_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full flex justify-center items-center bg-gray-900 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-300 shadow-sm"
                >
                  View Deal →
                </a>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}