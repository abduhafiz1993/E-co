import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchProductById } from "../features/products/Productslice";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { single: product, loading, error } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  if (loading) return <p>Loading product...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <img
        src={product.image_url}
        alt={product.name}
        className="w-full h-64 object-cover mb-6 rounded"
      />
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-700 mb-4">{product.description}</p>
      <p className="text-xl font-semibold mb-6">${product.price}</p>
      <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetail;
