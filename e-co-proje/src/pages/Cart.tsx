import React from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { increaseQuantity, decreaseQuantity, removeFromCart, clearCart } from "../features/cart/cartslice";

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  // calculate total
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return <div className="p-6 text-center text-gray-600">Your cart is empty 🛒</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b pb-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image_url}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-gray-500">${item.price.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Quantity Controls */}
              <button
                onClick={() => dispatch(decreaseQuantity(item.id))}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                -
              </button>
              <span className="font-medium">{item.quantity}</span>
              <button
                onClick={() => dispatch(increaseQuantity(item.id))}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>

            <div className="flex items-center gap-4">
              <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Footer */}
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={() => dispatch(clearCart())}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Clear Cart
        </button>
        <div className="text-xl font-bold">Total: ${total.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default Cart;
