interface ProductRangeCardProps {
  name: string;
  tagline: string;
  image: string;
  slug: string;
}

export default function ProductRangeCard({ name, tagline, image, slug }: ProductRangeCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <div className="aspect-square bg-gray-100 flex items-center justify-center">
        <div className="text-6xl text-gray-400">{name[0]}</div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-4">{tagline}</p>
        
        <a 
          href={`/ranges/${slug}`}
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Explore Range
        </a>
      </div>
    </div>
  );
}