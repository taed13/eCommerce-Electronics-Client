import axios from "axios";
import { authMiddleware, base_url, config } from "../../utils/axiosConfig";

const getProducts = async (data) => {
    const queryParams = new URLSearchParams();

    if (data?.brand?.length) {
        queryParams.append('brand', data.brand);
    }
    if (data?.category?.length) {
        queryParams.append('category', data.category);
    }
    if (data?.minPrice) {
        queryParams.append('price[gte]', data.minPrice);
    }
    if (data?.maxPrice) {
        queryParams.append('price[lte]', data.maxPrice);
    }
    if (data?.tag?.length) {
        queryParams.append('tag', data.tag);
    }
    if (data?.sort) {
        queryParams.append('sort', data.sort);
    }

    const response = await axios.get(
        `${base_url}product?${queryParams.toString()}`,
        authMiddleware
    );

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

const rateProduct = async (data) => {
    const response = await axios.put(
        `${base_url}product/rating`,
        data,
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
    rateProduct,
};
