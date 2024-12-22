// import axios from "axios";
import { authMiddleware, base_url, config } from "../../utils/axiosConfig";
import axios from '../../utils/axios';

const register = async (userData) => {
    const response = await axios.post(`${base_url}user/register`, userData);
    if (response.data) {
        localStorage.setItem("customer", JSON.stringify(response.data));
        return response.data;
    }
};

const login = async (userData) => {
    const response = await axios.post(`${base_url}user/login`, userData);

    localStorage.setItem("customer", JSON.stringify(response.data?.findUser));
    localStorage.setItem("token", JSON.stringify(response.data?.findUser.token));
    if (response.data) {
        return response.data;
    }
};

const logout = () => {
    localStorage.removeItem("customer");
};

const getUserWishList = async () => {
    const response = await axios.get(`${base_url}user/wishlist`, authMiddleware);
    if (response.data) {
        return response.data;
    }
};

const addToCart = async (cartData) => {
    const response = await axios.post(
        `${base_url}user/cart/add-to-cart`,
        cartData,
        authMiddleware
    );
    if (response.data) {
        return response.data;
    }
};

const getCart = async () => {
    const response = await axios.get(`${base_url}user/cart`, authMiddleware);
    // const response = await api.get("/user/cart", authMiddleware);

    if (response.data) {
        return response.data;
    }
};

const removeProductFromCart = async (cartItemId) => {
    const response = await axios.delete(
        `${base_url}user/delete-product-cart/${cartItemId}`,
        config
    );
    if (response.data) {
        return response.data;
    }
};

const updateProductFromCart = async (cartDetails) => {
    const response = await axios.delete(
        `${base_url}user/update-product-cart/${cartDetails.cartItemId}/${cartDetails.quantity}`,
        config
    );
    if (response.data) {
        return response.data;
    }
};

const createOrder = async (orderDetail) => {
    const response = await axios.post(
        `${base_url}user/cart/create-order`,
        orderDetail,
        config
    );
    if (response.data) {
        return response.data;
    }
};

const createOrderAndCheckOrderBefore = async (orderDetail) => {
    const response = await axios.post(
        `${base_url}order/`,
        orderDetail,
        config
    );
    if (response.data) {
        return response.data;
    }
};

const getUserOrders = async () => {
    const response = await axios.get(`${base_url}user/getmyorders`, config);
    if (response.data) {
        return response.data;
    }
};

const updateUser = async (userData) => {
    const response = await axios.put(
        `${base_url}user/edit-user`,
        userData,
        {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("customer")).token}`,
                Accept: "application/json",
            },
        }
    );
    if (response.data) {
        return response.data;
    }
};

const forgotPassToken = async (email) => {
    const response = await axios.post(
        `${base_url}user/forgot-password-token`,
        email
    );
    if (response.data) {
        return response.data;
    }
};

const resetPass = async (data) => {
    const response = await axios.put(
        `${base_url}user/reset-password/${data.token}`,
        { password: data?.password }
    );
    if (response.data) {
        return response.data;
    }
};

const getUserInfoByEmail = async (email) => {
    const response = await axios.post(
        `${base_url}oauth2/getInfoByEmail`,
        { email },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                Accept: "application/json",
            },
        },

    );
    if (response.data) {
        return response.data;
    }
};

export const authService = {
    register,
    login,
    getUserWishList,
    addToCart,
    getCart,
    removeProductFromCart,
    updateProductFromCart,
    createOrder,
    getUserOrders,
    updateUser,
    forgotPassToken,
    resetPass,
    logout,
    getUserInfoByEmail,
    createOrderAndCheckOrderBefore
};
