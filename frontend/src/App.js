import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ProductInfo from "./pages/ProductInfo";
import Catalogue from "./pages/Shop";
import ContactUs from "./pages/ContactUs";

const App = () => {
  return (
    <CartProvider>
      <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Catalogue />} />
           <Route path="/cart" element={<Cart />} />
           <Route path="/products/:productId" element={<ProductInfo />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/success/:order_id" element={<Success />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
