import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchProducts } from "../features/products/Productslice";
import { addToCart } from "../features/cart/cartslice";

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
         <div key={product.id} className="border rounded-lg p-4 shadow hover:shadow-lg">
        <Link
          to={`/products/${product.id}`}
        >
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-40 object-cover mb-4 rounded"
          />
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-gray-600">${product.price}</p>
        </Link>
                  <button
            onClick={() =>
              dispatch(
                addToCart({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image_url: product.image_url,
                })
              )
            }
            className="mt-3 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add to Cart
          </button>

        </div>
        
      ))}
    </div>
  );
};

export default Products;
