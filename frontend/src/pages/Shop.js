import React, { useEffect, useState } from "react";
import ProductCatalogue from "../components/ProductCatalogue";
import { fetchProducts } from "../utils/api";

const Home = () => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Unable to fetch Products")
      }
      
    };
    getProducts();
  }, []);

  if(products.length===0) return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">No Products Found</h1>
      <h1 className="text-2xl font-bold mb-6 text-center">Try Again</h1>
    </div>)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Our Products</h1>
      <ProductCatalogue products={products} onAddToCart={(product) => console.log("Add to Cart", product)} />
    </div>
  );
};

export default Home;
