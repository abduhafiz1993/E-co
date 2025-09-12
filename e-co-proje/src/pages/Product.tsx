import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchProducts } from "../features/products/Productslice";

const Products = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {items.map((product) => (
        <Link
          key={product.id}
          to={`/products/${product.id}`}
          className="border rounded-lg p-4 shadow hover:shadow-lg"
        >
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-40 object-cover mb-4 rounded"
          />
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-gray-600">${product.price}</p>
        </Link>
      ))}
    </div>
  );
};

export default Products;
