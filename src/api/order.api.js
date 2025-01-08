import axios from "axios";
import { base_url, getConfig } from "../utils/axiosConfig";

/**
 * API call to cancel an order.
 * @param {string} orderId - The ID of the order to cancel.
 * @returns {Promise<{data: any} | {error: string}>}
 */
export const cancelOrderService = async (orderId) => {
    try {
        const response = await axios.post(
            `${base_url}order/cancel`,
            { orderId },
            getConfig()
        );
        return { data: response.data };
    } catch (error) {
        return handleError(error, "Failed to cancel order");
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
