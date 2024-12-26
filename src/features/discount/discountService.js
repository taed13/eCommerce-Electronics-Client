import axios from "axios";
import { base_url, getConfig } from "../../utils/axiosConfig";

const applyDiscount = async (data) => {
    const response = await axios.post(`${base_url}discount/apply-discount`, data, getConfig());

    if (response.data) {
        return response.data;
    }
};

const calculateShippingFee = async (data) => {
    const response = await axios.post(`${base_url}discount/shipping/calculate`, data, getConfig());

    if (response.data) {
        return response.data;
    }
    throw new Error("Failed to calculate shipping fee.");
};

const discountService = {
    applyDiscount,
    calculateShippingFee,
};

export default discountService;
