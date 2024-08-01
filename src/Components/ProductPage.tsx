
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  rating: number;
  images: string[];
}

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const productId = Number(id);
      axios
        .get<Product>(`https://dummyjson.com/products/${productId}`)
        .then((response) => {
          setProduct(response.data);
          setError(null);
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
          setError("Error loading product. Please try again later.");
        });
    }
  }, [id]);

  if (error) {
    return <div className="p-5 text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="p-5">Loading...</div>;
  }

  return (
    <div className="p-5 w-[60%]">
      <button
        onClick={() => navigate(-1)}
        className="mb-5 px-4 py-2 bg-black text-white rounded"
      >
        Back
      </button>
      <img
        src={product.images[0] || 'default-image.jpg'}
        alt={product.title}
        className="w-[50%] mb-5"
      />
      <h1 className="text-2xl mb-4 font-bold">{product.title}</h1>
      <p className="mb-4 text-gray-700 w-[70%]">{product.description}</p>
      <div className="flex">
        <p>Price: ${product.price}</p>
        <p className="ml-10">Rating: {product.rating}</p>
      </div>
    </div>
  );
};

export default ProductPage;
