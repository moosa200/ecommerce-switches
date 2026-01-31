interface ProductCardProps {
  id: string;
  name: string;
  code: string;
  image: string;
  price: number;
}

export default function ProductCard({ id, name, code, image, price }: ProductCardProps) {
  return (
    <a
      href={`/products/${id}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
    >
      <div className="aspect-square bg-gray-100 flex items-center justify-center">
        <div className="text-4xl text-gray-400">🔌</div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-1">{name}</h3>
        <p className="text-sm text-gray-500 mb-2">Code: {code}</p>
        <p className="text-lg font-bold text-blue-600">PKR {price.toLocaleString()}</p>
      </div>
    </a>
  );
}