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
    <div className="p-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">Our Latest Products</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products?.map((product) => (
          <div key={product.id} className="border border-gray-200 p-6 rounded-lg shadow-lg bg-white">
            {/* پروڈکٹ کا نام */}
            <h2 className="text-2xl font-bold mb-3 text-gray-900">{product.title}</h2>
            
            {/* قیمت */}
            <p className="text-gray-800 text-lg mb-4 font-medium">
              Price: <span className="font-bold text-green-600">{product.price} SAR</span>
            </p>
            
            {/* سٹور اور کیٹیگری */}
            <div className="flex items-center justify-between">
              <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-semibold">
                {product.store}
              </span>
              <span className="text-sm text-gray-500 font-medium">
                {product.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}