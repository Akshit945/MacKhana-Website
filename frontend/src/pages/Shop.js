import React, { useEffect, useState } from "react";
import ProductCatalogue from "../components/ProductCatalogue";
import { fetchProducts } from "../utils/api";

const Home = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    getProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Our Products</h1>
      <ProductCatalogue products={products} onAddToCart={(product) => console.log("Add to Cart", product)} />
    </div>
  );
};

export default Home;
