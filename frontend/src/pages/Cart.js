import React from "react";
import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { Link, Links, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, dispatch } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleIncrease = (item) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { _id: item._id, quantity: item.quantity + 1 },
    });
  };

  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { _id: item._id, quantity: item.quantity - 1 },
      });
    } else {
      dispatch({ type: "REMOVE_FROM_CART", payload: { _id: item._id } });
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>
          Your cart is empty.{" "}
          <Link to="/shop" className="text-blue-600">
            Shop Now
          </Link>
        </p>
      ) : (
        <div>
          <div className="grid grid-cols-1 gap-4">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between border-b py-2"
              >
                <div>
                <Link to={`/products/${item._id}`}><h2 className="text-lg font-bold">{item.name}</h2></Link>
                <p>₹{item.price}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleDecrease(item)}
                    className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleIncrease(item)}
                    className="bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700"
                  >
                    +
                  </button>
                </div>
                <p className="font-bold">
                ₹{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <p className="text-xl font-bold">Total: ₹{total.toFixed(2)}</p>
            <button
              onClick={handleCheckout}
              className="bg-blue-600 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
