// src/pages/OrderSuccess.tsx
import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess: React.FC = () => {
  return (
    <div className="order-success">
      <h2>🎉 Thank you for your order!</h2>
      <p>Your order has been placed successfully.</p>
      <Link to="/products">Continue Shopping</Link>
    </div>
  );
};

export default OrderSuccess;
