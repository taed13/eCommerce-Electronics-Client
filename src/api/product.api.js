import axios from "axios";
import { base_url, getConfig } from "../utils/axiosConfig";

/**
 * API call to get popular products.
 * @returns {Promise<{data: any} | {error: string}>}
 */
export const getPopularProductsService = async () => {
    try {
        const response = await axios.get(`${base_url}product/popular-products`);
        return { data: response.data };
    } catch (error) {
        return handleError(error, "Failed to fetch popular products");
    }
};

/**
 * API call to get special products.
 * @returns {Promise<{data: any} | {error: string}>}
 */
export const getSpecialProductsService = async () => {
    try {
        const response = await axios.get(`${base_url}product/special-products`);
        return { data: response.data };
    } catch (error) {
        return handleError(error, "Failed to fetch special products");
    }
};

/**
 * API call to get the latest products.
 * @returns {Promise<{data: any} | {error: string}>}
 */
export const getLatestProductsService = async () => {
    try {
        const response = await axios.get(`${base_url}product/latest-products`);
        return { data: response.data };
    } catch (error) {
        return handleError(error, "Failed to fetch latest products");
    }
};

/**
 * Common error handler for all API requests.
 * @param {object} error - The error object.
 * @param {string} defaultMessage - The default error message.
 * @returns {{error: string}}
 */
const handleError = (error, defaultMessage) => {
    if (error.response?.data?.message) {
        return { error: error.response.data.message };
    }
    return { error: error.message || defaultMessage };
};
