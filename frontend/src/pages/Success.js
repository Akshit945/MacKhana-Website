import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams,Link } from "react-router-dom";

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { order_id } = useParams();
  const ApiUrl = process.env.REACT_APP_API_URL;

 
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        // setLoading(true);
        let url=`${ApiUrl}/orders/success/${order_id}`;
        const response = await axios.get(
          url
        );
        setOrder(response.data);
         
      } catch (err) {
        setError("Failed to fetch order details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-semibold text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Order Details</h1>
      <p className="text-gray-700">
        <span className="font-semibold">Order ID:</span> {order.razorpay_order_id}
      </p>
      <p className="text-gray-700">
        <span className="font-semibold">Name:</span> {order.name}
      </p>
      <p className="text-gray-700">
        <span className="font-semibold">Email:</span> {order.email}
      </p>
      <p className="text-gray-700">
        <span className="font-semibold">Address:</span> {order.address}
      </p>
      <p className="text-gray-700">
        <span className="font-semibold">Phone Number:</span> {order.phoneNo}
      </p>
      <p className="text-gray-700">
        <span className="font-semibold">Status:</span> {getStatus(order.status)}
      </p>
      <p className="text-gray-700">
        <span className="font-semibold">Total:</span>₹{order.total.toFixed(2)}
      </p>
      <h2 className="text-xl font-bold mt-6 text-gray-800">Products</h2>
      <ul className="list-disc list-inside">
        {order.products.map((product) => (
          <li key={product._id} className="text-gray-700">
          <Link to={`/products/${product.productId}`}><span className="font-semibold">Name:</span> {product.name},{" "}</Link>
            <span className="font-semibold">Quantity:</span> {product.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Helper function to display status
const getStatus = (status) => {
  const statusMap = {
    0: "Pending",
    1: "Paid",
    2: "Shipped",
    3: "Delivered",
    4: "Cancelled",
  };
  return statusMap[status] || "Unknown";
};

export default OrderDetails;