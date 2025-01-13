import axios from "axios";
import { base_url, getConfig } from "../../utils/axiosConfig";

const getProducts = async (data) => {
    const queryParams = new URLSearchParams();

    if (data?.brand?.length) {
        queryParams.append('product_brand', data.brand);
    }
    if (data?.category?.length) {
        queryParams.append('product_category', data.category);
    }
    if (data?.minPrice) {
        queryParams.append('product_price[gte]', data.minPrice);
    }
    if (data?.maxPrice) {
        queryParams.append('product_price[lte]', data.maxPrice);
    }
    if (data?.tag?.length) {
        queryParams.append('product_tags', data.tag);
    }
    if (data?.color?.length) {
        queryParams.append('product_color', data.color);
    }
    if (data?.sort) {
        queryParams.append('sort', data.sort);
    }

    const response = await axios.get(
        `${base_url}product?${queryParams.toString()}`,
        getConfig()
    );

    if (response.data) {
        return response.data;
    }
};

const getSingleProduct = async (id) => {
    const response = await axios.get(`${base_url}product/${id}`, getConfig());
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
        getConfig()
    );

    if (response.data) {
        return response.data;
    }
};

const rateProduct = async (data) => {
    const response = await axios.put(
        `${base_url}product/rating`,
        data,
        getConfig()
    );

    if (response.data) {
        return response.data;
    }
};

const editRateProduct = async ({ prodId, commentId, star, comment }) => {
    const response = await axios.patch(
        `${base_url}product/products/${prodId}/ratings/${commentId}`,
        { star, comment },
        getConfig()
    );

    if (response.data) {
        return response.data;
    }
};

const checkProductRatingPossibility = async (id) => {
    const response = await axios.get(`${base_url}order/check-product-in-order/${id}`, getConfig());
    if (response.data) {
        return response.data;
    }
};

export const productService = {
    getProducts,
    addToWishlist,
    getSingleProduct,
    rateProduct,
    editRateProduct,
    checkProductRatingPossibility,
};
