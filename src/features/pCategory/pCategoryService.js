import axios from "axios";
import { base_url } from "../../utils/axiosConfig";

const getPCategories = async () => {
    const response = await axios.get(`${base_url}category`);
    if (response.data) {
        return response.data;
    }
};

const getPCategoryById = async (id) => {
    const response = await axios.get(`${base_url}category/${id}`);
    if (response.data) {
        return response.data;
    }
};

export const pCategoryService = {
    getPCategories,
    getPCategoryById,
};
