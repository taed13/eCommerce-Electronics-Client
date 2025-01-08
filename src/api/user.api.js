import { base_url, getConfig } from "../utils/axiosConfig";
import axios from "axios";

/**
 * Service to set the default address for a user.
 * @param {string} addressId - The ID of the address to be set as default.
 * @returns {Promise<{data: any} | {error: string}>}
 */
export const setDefaultAddressService = async (addressId) => {
    try {
        const response = await axios.put(`${base_url}user/set-default-address`, { addressId }, getConfig());
        return { data: response.data };
    } catch (error) {
        return handleError(error, "Failed to set default address");
    }
};

/**
 * Service to update an address.
 * @param {string} addressId - The ID of the address to update.
 * @param {object} addressData - The updated address data.
 * @returns {Promise<{data: any} | {error: string}>}
 */
export const updateAddressService = async (addressId, addressData) => {
    try {
        const response = await axios.patch(`${base_url}user/update-address/${addressId}`, addressData, getConfig());
        return { data: response.data };
    } catch (error) {
        return handleError(error, "Failed to update address");
    }
};

/**
 * Service to delete an address.
 * @param {string} addressId - The ID of the address to delete.
 * @returns {Promise<{data: any} | {error: string}>}
 */
export const deleteAddressService = async (addressId) => {
    try {
        const response = await axios.delete(`${base_url}user/address/${addressId}`, getConfig());
        return { data: response.data };
    } catch (error) {
        return handleError(error, "Failed to delete address");
    }
};

/**
 * Service to save a new address.
 * @param {object} address - The address to be saved.
 * @returns {Promise<{data: any} | {error: string}>}
 */
export const saveAddressService = async (addressData) => {
    try {
        const response = await axios.put(`${base_url}user/save-address`, { address: addressData }, getConfig());
        return { data: response.data };
    } catch (error) {
        return handleError(error, "Failed to save address");
    }
};

/**
 * Service to verify email by token.
 * @param {string} token - The verification token.
 * @returns {Promise<{data: any} | {error: string}>}
 */
export const verifyEmailService = async (token) => {
    try {
        const response = await axios.get(`${base_url}user/verify/${token}`);
        return { data: response.data };
    } catch (error) {
        return handleError(error, "Failed to verify email");
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
