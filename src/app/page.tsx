import Header from '@/components/Header';
import ProductRangeCard from '@/components/ProductRangeCard';

const productRanges = [
  {
    name: 'KARBONIC',
    tagline: 'Fine Polycarbonate switches',
    image: '/ranges/karbonic.jpg',
    slug: 'karbonic'
  },
  {
    name: 'CRYSTAL',
    tagline: 'Premium glass finish switches',
    image: '/ranges/crystal.jpg',
    slug: 'crystal'
  },
  {
    name: 'ALLURE',
    tagline: 'Elegant modern design',
    image: '/ranges/allure.jpg',
    slug: 'allure'
  },
  {
    name: 'SOCKET',
    tagline: 'Universal socket solutions',
    image: '/ranges/socket.jpg',
    slug: 'socket'
  },
  {
    name: 'MODULAR',
    tagline: 'Customizable switch modules',
    image: '/ranges/modular.jpg',
    slug: 'modular'
  },
  {
    name: 'CLASSIC',
    tagline: 'Traditional reliable switches',
    image: '/ranges/classic.jpg',
    slug: 'classic'
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">
          Explore Our Switch Ranges
        </h1>
        <p className="text-gray-600 text-center mb-12">
          Discover premium electrical switches for every space
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productRanges.map((range) => (
            <ProductRangeCard
              key={range.slug}
              name={range.name}
              tagline={range.tagline}
              image={range.image}
              slug={range.slug}
            />
          ))}
        </div>
      </main>
    </div>
  );
}