// Frontend: Checkout Component
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const ApiUrl = process.env.REACT_APP_API_URL;
  const RazorpayKey = process.env.REACT_APP_RAZORPAY_KEY_ID;

  const { cart, dispatch } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", address: "",phoneNo:"" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.address) {
      setError("All fields are required!");
      return;
    }

    setLoading(true);

    const isScriptLoaded = await loadRazorpayScript();

    if (!isScriptLoaded) {
      setError("Failed to load Razorpay SDK. Please try again.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${ApiUrl}/payments/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: total * 100 }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Failed to create order.");
        setLoading(false);
        return;
      }

      const { order } = await response.json();

      const options = {
        key: RazorpayKey,
        amount: order.amount,
        currency: order.currency,
        name: "McKhana",
        description: "Complete your purchase",
        order_id: order.id,
        handler: async (razorpayResponse) => {
          setLoading(true);
          const verifyResponse = await fetch(`${ApiUrl}/payments/verify-payment`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              razorpay_order_id: razorpayResponse.razorpay_order_id,
              razorpay_payment_id: razorpayResponse.razorpay_payment_id,
              razorpay_signature: razorpayResponse.razorpay_signature,
              name: form.name,
              email: form.email,
              address: form.address,
              phoneNo: form.phoneNo,
              products: cart.map((item) => ({
                productId: item._id,
                name: item.name,
                quantity: item.quantity,
              })),
              total,
            }),
          });

          if (verifyResponse.ok) {
            
            const data = await verifyResponse.json();
            dispatch({ type: "CLEAR_CART" });
            // console.log(data.order)
            navigate(`/success/${data.order.razorpay_order_id}`, { state: { orderDetails: data } });
            setLoading(false);
          } else {
            const errorData = await verifyResponse.json();
            setError(errorData.message || "Payment verification failed.");
            setLoading(false);
          }
        },
        prefill: {
          name: form.name,
          email: form.email,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      setLoading(false);
    } catch (err) {
      setError(err.message || "Network error. Please try again.");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error} or details entered are incorrect</div>}

      <div className="bg-gray-100 p-4 rounded mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <ul>
          {cart.map((item) => (
            <li key={item._id} className="flex justify-between border-b py-2">
              <span>{item.name}</span>
              <span>
                {item.quantity} × ₹{item.price}
              </span>
            </li>
          ))}
        </ul>
        <div className="text-right font-bold mt-4">Total: ₹{total.toFixed(2)}</div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          className="block w-full mb-4 p-2 border border-gray-300 rounded"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          className="block w-full mb-4 p-2 border border-gray-300 rounded"
          onChange={handleChange}
          required
        />
        <input
          name="phoneNo"
          type="tel"
          placeholder="Phone Number"
          value={form.phoneNo}
          className="block w-full mb-4 p-2 border border-gray-300 rounded"
          onChange={handleChange}
          pattern="^(\+91|0)?[6-9]\d{9}$"//TODO:
          title="Enter a valid Indian phone number (e.g., +919876543210 or 09876543210)."
          required
        />
        <input
          name="address"
          placeholder="Address"
          value={form.address}
          className="block w-full mb-4 p-2 border border-gray-300 rounded"
          onChange={handleChange}
          required
        />
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          type="submit"
          disabled={loading}
        >
          {loading ? "Processing..." : "Place Order"}
        </button>
      </form>
    </div>
  );
};

export default Checkout;


