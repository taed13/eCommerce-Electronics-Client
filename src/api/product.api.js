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
 * API call to apply discount to multiple products.
 * @param {Array<string>} productIds - List of product IDs to apply the discount.
 * @param {string} discountId - The discount ID.
 * @returns {Promise<{data: any} | {error: string}>}
 */
export const applyDiscountToMultipleProductsService = async (productIds, discountId) => {
    try {
        const response = await axios.post(
            `${base_url}product/apply-discount-multiple`,
            { productIds, discountId },
            getConfig()
        );
        return { data: response.data };
    } catch (error) {
        return handleError(error, "Failed to apply discount to multiple products");
    }
};

/**
 * API call to unapply discount from multiple products.
 * @param {Array<string>} productIds - List of product IDs to unapply the discount.
 * @returns {Promise<{data: any} | {error: string}>}
 */
export const unapplyDiscountFromMultipleProductsService = async (productIds) => {
    try {
        const response = await axios.post(
            `${base_url}product/unapply-discount-multiple`,
            { productIds },
            getConfig()
        );
        return { data: response.data };
    } catch (error) {
        return handleError(error, "Failed to unapply discount from multiple products");
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
