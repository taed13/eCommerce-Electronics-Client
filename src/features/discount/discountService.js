import axios from "axios";
import { base_url, getConfig } from "../../utils/axiosConfig";

const applyDiscount = async (data) => {
    const response = await axios.post(`${base_url}discount/apply-discount`, data, getConfig());

    if (response.data) {
        return response.data;
    }
};

const discountService = {
    applyDiscount,
};

export default discountService;
