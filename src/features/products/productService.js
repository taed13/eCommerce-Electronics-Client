import axios from "axios";
import { authMiddleware, base_url } from "../../utils/axiosConfig";

const getProducts = async () => {
  const response = await axios.get(`${base_url}product`, authMiddleware);
  if (response.data) {
    return response.data;
  }
};

const getSingleProduct = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`, authMiddleware);
  if (response.data) {
    return response.data;
  }
};

const addToWishlist = async (prodId) => {
  const response = await axios.put(
    `${base_url}product/wishlist`,
    {
      prodId,
    },
    authMiddleware
  );
  if (response.data) {
    return response.data;
  }
};
export const productService = {
  getProducts,
  addToWishlist,
  getSingleProduct,
};
