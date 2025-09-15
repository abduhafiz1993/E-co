// src/pages/OrdersPage.tsx
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAppSelector } from "../store/hooks";

type Order = {
  id: string;
  items: { id: string; name: string; price: number; quantity: number }[];
  total: number;
  status: string;
  created_at: string;
};

const OrdersPage: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      setLoading(true);
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("❌ Error fetching orders:", error);
      } else {
        setOrders(data as Order[]);
      }
      setLoading(false);
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    return <p>You must be logged in to view your orders.</p>;
  }

  if (loading) return <p>Loading your orders...</p>;

  return (
    <div className="orders-page">
      <h2>Your Orders</h2>

      {orders.length === 0 ? (
        <p>You don’t have any orders yet.</p>
      ) : (
        <ul className="space-y-6">
          {orders.map((order) => (
            <li key={order.id} className="border p-4 rounded-lg shadow">
              <p>
                <strong>Order ID:</strong> {order.id}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(order.created_at).toLocaleString()}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <p>
                <strong>Total:</strong> ${order.total.toFixed(2)}
              </p>

              <h4 className="mt-2 font-semibold">Items:</h4>
              <ul className="ml-4 list-disc">
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.name} × {item.quantity} = $
                    {(item.price * item.quantity).toFixed(2)}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrdersPage;
