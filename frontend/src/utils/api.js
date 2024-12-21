import axios from "axios";

export const fetchProducts = async () => {
  const ApiUrl = process.env.REACT_APP_API_URL;
  const response = await axios.get(`${ApiUrl}/products`);
  return response.data;
};

export const fetchProductById = async (productId) => {
  const ApiUrl = process.env.REACT_APP_API_URL;
  const response = await axios.get(`${ApiUrl}/products/${productId}`);
  return response.data;
};
