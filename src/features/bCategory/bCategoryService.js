import axios from "axios";
import { base_url } from "../../utils/axiosConfig";

const getBCategories = async () => {
    const response = await axios.get(`${base_url}blogcategory`);
    if (response.data) {
        return response.data;
    }
};

const getBCategoryById = async (id) => {
    const response = await axios.get(`${base_url}blogcategory/${id}`);
    if (response.data) {
        return response.data;
    }
};

export const bCategoryService = {
    getBCategories,
    getBCategoryById,
};
