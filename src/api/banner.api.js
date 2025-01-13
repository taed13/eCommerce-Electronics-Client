import axios from "axios";
import { base_url, getConfig } from "../utils/axiosConfig";

/**
 * API call to create a new banner.
 * @param {object} bannerData - The data for the new banner.
 * @returns {Promise<{data: any} | {error: string}>}
 */
export const createBannerService = async (bannerData) => {
    try {
        const response = await axios.post(
            `${base_url}banner`,
            bannerData,
            getConfig()
        );
        return { data: response.data };
    } catch (error) {
        return handleError(error, "Failed to create banner.");
    }
};

/**
 * API call to get all banners.
 * @returns {Promise<{data: any} | {error: string}>}
 */
export const getAllBannersService = async () => {
    try {
        const response = await axios.get(`${base_url}banner`, getConfig());
        return { data: response.data };
    } catch (error) {
        return handleError(error, "Failed to retrieve banners.");
    }
};

/**
 * API call to get a banner by ID.
 * @param {string} bannerId - The ID of the banner to retrieve.
 * @returns {Promise<{data: any} | {error: string}>}
 */
export const getBannerByIdService = async (bannerId) => {
    try {
        const response = await axios.get(
            `${base_url}banner/${bannerId}`,
            getConfig()
        );
        return { data: response.data };
    } catch (error) {
        return handleError(error, "Failed to retrieve the banner.");
    }
};

/**
 * API call to update a banner by ID.
 * @param {string} bannerId - The ID of the banner to update.
 * @param {object} bannerData - The updated data for the banner.
 * @returns {Promise<{data: any} | {error: string}>}
 */
export const updateBannerService = async (bannerId, bannerData) => {
    try {
        const response = await axios.put(
            `${base_url}banner/${bannerId}`,
            bannerData,
            getConfig()
        );
        return { data: response.data };
    } catch (error) {
        return handleError(error, "Failed to update the banner.");
    }
};

/**
 * API call to delete a banner by ID.
 * @param {string} bannerId - The ID of the banner to delete.
 * @returns {Promise<{data: any} | {error: string}>}
 */
export const deleteBannerService = async (bannerId) => {
    try {
        const response = await axios.delete(
            `${base_url}banner/${bannerId}`,
            getConfig()
        );
        return { data: response.data };
    } catch (error) {
        return handleError(error, "Failed to delete the banner.");
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
