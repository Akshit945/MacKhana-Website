import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../utils/api";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const ProductDetails = () => {
  const { productId } = useParams();
  const { cart, dispatch } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product details
  useEffect(() => {
    const getProductDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(productId);
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getProductDetails();
  }, [productId]);

  // Update quantity based on cart
  useEffect(() => {
    if (product) {
      const cartItem = cart.find((item) => item._id === product._id);
      setQuantity(cartItem ? cartItem.quantity : 0);
    }
  }, [cart, product]);

  const handleAddToCart = () => {
    if (product) {
      dispatch({ type: "ADD_TO_CART", payload: product });
    }
  };

  const handleDecreaseQuantity = () => {
    if (product && quantity > 1) {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { _id: product._id, quantity: quantity - 1 },
      });
    } else if (product) {
      // Remove item if quantity is 0 or 1
      dispatch({ type: "REMOVE_FROM_CART", payload: { _id: product._id } });
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span
          key={i}
          className={`text-xl ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  if (loading) {
    return <div className="text-center py-8 text-lg font-semibold">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-lg text-red-600">Error: {error}</div>;
  }

  if (!product) {
    return (
      <div className="text-center py-8 text-lg text-gray-600">
        Product not found. Please check the product ID.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Product Image */}
        <div className="relative bg-gray-100 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-sm h-auto rounded-lg object-cover transform hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col p-6 space-y-6">
          {/* Title */}
          <h1 className="text-3xl font-extrabold text-gray-800 leading-snug">
            {product.name}
          </h1>

          {/* Star Rating */}
          <div className="flex items-center space-x-2">
            {renderStars(product.rating || 4)}
            <span className="text-sm text-gray-500">
              ({product.rating || 4}.0)
            </span>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700">Description:</h2>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-600">
              {Array.isArray(product.description) ? (
                product.description.map((item, index) => (
                  <li key={index}>{item}</li>
                ))
              ) : (
                <p>{product.description}</p>
              )}
            </ul>
          </div>

          {/* Price */}
          <p className="text-2xl font-bold text-green-500">₹{product.price}</p>

          {/* Quantity Controls */}
          <div className="flex items-center space-x-4">
            {quantity === 0 ? (
              <button
                onClick={handleAddToCart}
                className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 shadow-md transition"
              >
                Add to Cart
              </button>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleDecreaseQuantity}
                  className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 shadow-md transition"
                >
                  -
                </button>
                <span className="text-xl font-medium">{quantity}</span>
                <button
                  onClick={handleAddToCart}
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 shadow-md transition"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <Link
          to="/"
          className="text-blue-600 hover:underline hover:text-blue-800 transition"
        >
          Back to Products
        </Link>
      </div>
    </div>
  );
};

export default ProductDetails;
