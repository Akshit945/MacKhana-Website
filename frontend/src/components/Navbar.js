import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const closeMenuOnClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
        // console.log("dd2");
      }
    };

    document.addEventListener("mousedown", closeMenuOnClickOutside);
    return () => {
      document.removeEventListener("mousedown", closeMenuOnClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-3xl font-extrabold tracking-wide">
          <Link to="/" className="hover:text-yellow-200">
            🍿 McKhana
          </Link>
        </h1>

        {/* Navigation Links and Cart for Large Screens */}
        <div className="hidden lg:flex items-center ml-auto space-x-6">
          <Link
            to="/"
            className="hover:text-yellow-200 hover:scale-110 transition-all duration-300"
          >
            Home
          </Link>
          <Link
            to="/shop"
            className="hover:text-yellow-200 hover:scale-110 transition-all duration-300"
          >
            Shop
          </Link>
          <Link
            to="/contact"
            className="hover:text-yellow-200 hover:scale-110 transition-all duration-300"
          >
            Contact Us
          </Link>
          {/* Cart Button */}
          <Link
            to="/cart"
            className="relative flex items-center bg-red-600 px-4 py-2 rounded-full hover:bg-red-700 hover:scale-105 transition-all duration-300"
          >
            🛒 Cart
            <span className="absolute -top-2 -right-2 bg-yellow-300 text-red-800 font-bold text-xs px-2 py-1 rounded-full shadow-lg">
              {cart.length}
            </span>
          </Link>
        </div>

        {/* Hamburger Menu Button and Cart for Small/Medium Screens */}
        <div className="lg:hidden flex items-center space-x-4">
          {/* Cart Button */}
          <Link
            to="/cart"
            className="relative flex items-center bg-red-600 px-4 py-2 rounded-full hover:bg-red-700 hover:scale-105 transition-all duration-300"
          >
            🛒 Cart
            <span className="absolute -top-2 -right-2 bg-yellow-300 text-red-800 font-bold text-xs px-2 py-1 rounded-full shadow-lg">
              {cart.length}
            </span>
          </Link>

          {/* Hamburger Menu Button */}
          {/* {isMenuOpen ? (
            <button
              className="text-white text-2xl focus:outline-none"
              onClick={() => {
                console.log("dd");
              }} // Close menu
            >
              ✖
            </button>
          ) : (
            <button
              className="text-white text-2xl focus:outline-none"
              onClick={() => {setIsMenuOpen(true)}} // Open menu
            >
              ☰
            </button>
          )} */}
          {
            !isMenuOpen &&
            <button
              className="text-white text-2xl focus:outline-none"
              onClick={() => {setIsMenuOpen(true)}} // Open menu
            >
              ☰
            </button>
          }
        </div>
      </div>

      {/* Navigation Links Dropdown for Small/Medium Screens */}
      <div
        ref={menuRef}
        className={`${
          isMenuOpen ? "block" : "hidden"
        } lg:hidden bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 absolute top-full left-0 w-full z-40`}
      >
        <Link
          to="/"
          className="block px-4 py-2 text-center hover:text-yellow-200 hover:scale-110 transition-all duration-300"
          onClick={() => setIsMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          to="/shop"
          className="block px-4 py-2 text-center hover:text-yellow-200 hover:scale-110 transition-all duration-300"
          onClick={() => setIsMenuOpen(false)}
        >
          Shop
        </Link>
        <Link
          to="/contact"
          className="block px-4 py-2 text-center hover:text-yellow-200 hover:scale-110 transition-all duration-300"
          onClick={() => setIsMenuOpen(false)}
        >
          Contact Us
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
