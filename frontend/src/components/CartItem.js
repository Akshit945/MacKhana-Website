import React from "react";
import { useCart } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { dispatch } = useCart();

  const handleRemove = () => {
    dispatch({ type: "REMOVE_FROM_CART", payload: item });
  };

  const handleQuantityChange = (e) => {
    const quantity = parseInt(e.target.value);
    if (quantity > 0) {
      dispatch({ type: "UPDATE_QUANTITY", payload: { id: item.id, quantity } });
    }
  };

  return (
    <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow">
      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
      <div>
        <h3 className="font-bold">{item.name}</h3>
        <p>₹ {item.price.toFixed(2)}</p>
      </div>
      <div>
        <input
          type="number"
          value={item.quantity}
          min="1"
          onChange={handleQuantityChange}
          className="w-16 text-center border border-gray-300 rounded"
        />
      </div>
      <button
        onClick={handleRemove}
        className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
