import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'

export default async function RangePage({ params }: { params: { slug: string } }) {
  const { slug } = params

  // Fetch range details
  const range = await prisma.productRange.findUnique({
    where: { slug },
    include: {
      products: {
        where: { status: 'ACTIVE' },
        include: {
          images: {
            where: { isPrimary: true },
            take: 1
          }
        }
      }
    }
  })

  if (!range) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              SwitchStore
            </Link>

            <div className="flex items-center gap-6">
              <Link href="/account" className="text-gray-700 hover:text-blue-600">
                My Account
              </Link>
              <Link href="/wishlist" className="text-gray-700 hover:text-blue-600">
                Wishlist
              </Link>
              <Link href="/cart" className="text-gray-700 hover:text-blue-600">
                Cart (0)
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <span className="text-gray-900">{range.name}</span>
        </div>
      </div>

      {/* Range Hero */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">{range.name}</h1>
            <p className="text-xl text-gray-600 mb-6">{range.tagline}</p>
            <p className="text-gray-700 max-w-3xl mx-auto">{range.description}</p>
          </div>

          {/* Highlights */}
          {range.highlights && range.highlights.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6 text-center">Highlights & Advantages</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {range.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                    <div className="text-blue-600 text-xl">✓</div>
                    <p className="text-gray-700">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Products in this Range</h2>

        {range.products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {range.products.map((product) => (
              <Link 
                key={product.id} 
                href={`/products/${product.slug}`}
                className="bg-white rounded-lg shadow hover:shadow-lg transition"
              >
                {/* Product Image */}
                <div className="h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
                  <span className="text-4xl font-bold text-gray-400">
                    {product.name[0]}
                  </span>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold mb-1">{product.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{product.productCode}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-blue-600">
                      PKR {product.price.toString()}
                    </span>
                    {product.stockQuantity > 0 ? (
                      <span className="text-xs text-green-600">In Stock</span>
                    ) : (
                      <span className="text-xs text-red-600">Out of Stock</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500">No products available in this range yet.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2026 SwitchStore. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}