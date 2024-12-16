import axios from "axios";
import { base_url } from "../../utils/axiosConfig";

const getBlogs = async (categoryIds) => {
    const queryParams = new URLSearchParams();

    if (categoryIds?.length) {
        queryParams.append("categoryIds", categoryIds.join(","));
    }

    const response = await axios.get(`${base_url}blog?${queryParams.toString()}`);

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
