import axios from "axios";
import { base_url, getConfig } from "../../utils/axiosConfig";

const postQuery = async (contactData) => {
    const response = await axios.post(`${base_url}enquiry`, contactData, getConfig());
    if (response.data) {
        return response.data;
    }
};

const getAProduct = async (id) => {
    const response = await axios.get(`${base_url}product/${id}`, getConfig());
    if (response.data) {
        return response.data;
    }
};

export const contactService = {
    postQuery,
    getAProduct,
};