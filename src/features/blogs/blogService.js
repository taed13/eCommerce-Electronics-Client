import axios from "axios";
import { authMiddleware, base_url } from "../../utils/axiosConfig";

const getBlogs = async () => {
  const response = await axios.get(`${base_url}blog`);
  if (response.data) {
    return response.data;
  }
};

const getBlogById = async (id) => {
  const response = await axios.get(`${base_url}blog/${id}`);
  if (response.data) {
    return response.data;
  }
};

export const blogService = {
  getBlogs,
  getBlogById,
};
