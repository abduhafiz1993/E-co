// src/pages/CheckoutPage.tsx
import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { clearCart } from "../features/cart/cartslice";
import { useNavigate } from "react-router-dom";

const CheckoutPage: React.FC = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.address) {
      alert("Please fill in all fields");
      return;
    }

    // Simulate placing an order
    console.log("🛍️ Order placed:", {
      customer: form,
      items: cartItems,
      total,
    });

    dispatch(clearCart()); // clear cart after checkout
    navigate("/order-success");
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty. Add products first.</p>
      ) : (
        <>
          <h3>Order Summary</h3>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} × {item.quantity} = ${item.price * item.quantity}
              </li>
            ))}
          </ul>
          <p><strong>Total:</strong> ${total.toFixed(2)}</p>

          <h3>Shipping Info</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              required
            />
            <button type="submit">Place Order</button>
          </form>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;

