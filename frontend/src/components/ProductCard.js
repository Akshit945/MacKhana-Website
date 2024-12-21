import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { cart, dispatch } = useCart();
  
  // Find the product in the cart to set the initial quantity
  const cartItem = cart.find((item) => item._id === product._id);
  const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 0);

  // Sync quantity when cart updates
  useEffect(() => {
    const updatedCartItem = cart.find((item) => item._id === product._id);
    setQuantity(updatedCartItem ? updatedCartItem.quantity : 0);
  }, [cart, product._id]);

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { _id: product._id, quantity: quantity - 1 },
      });
    } else {
      // Remove item if quantity is 0 or 1
      dispatch({ type: "REMOVE_FROM_CART", payload: { _id: product._id } });
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded-md"
      />
      <Link to={`/products/${product._id}`}>
        <h3 className="text-lg font-bold mt-2">{product.name}</h3>
      </Link>

      <p className="text-gray-600">{product.description}</p>
      <p className="text-blue-600 font-bold mt-2">₹{product.price}</p>
      <div className="flex items-center space-x-2 mt-4">
        {quantity === 0 ? (
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700"
          >
            Add to Cart
          </button>
        ) : (
          <>
            <button
              onClick={handleDecreaseQuantity}
              className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700"
            >
              -
            </button>
            <span className="font-semibold">{quantity}</span>
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700"
            >
              +
            </button>
          </>
        )}
      </div>

    </div>
  );
};

export default ProductCard;
