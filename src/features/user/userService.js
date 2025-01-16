// import axios from "axios";
import { base_url, getConfig } from "../../utils/axiosConfig";
import axios from '../../utils/axios';

const register = async (userData) => {
    const response = await axios.post(`${base_url}user/register`, userData);
    if (response.data) {
        // localStorage.setItem("customer", JSON.stringify(response.data));
        return response.data;
    }
};

const login = async (userData) => {
    const response = await axios.post(`${base_url}user/login`, userData);
    console.log('response', response);

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
    const response = await axios.get(`${base_url}user/wishlist`, getConfig());
    if (response.data) {
        return response.data;
    }
};

const addToCart = async (cartData) => {
    const response = await axios.post(
        `${base_url}user/cart/add-to-cart`,
        cartData,
        getConfig()
    );
    if (response.data) {
        return response.data;
    }
};

const getCart = async () => {
    const response = await axios.get(`${base_url}user/cart`, getConfig());
    // const response = await api.get("/user/cart", getConfig());

    if (response.data) {
        return response.data;
    }
};

const removeProductFromCart = async (cartItemId) => {
    const response = await axios.delete(
        `${base_url}user/delete-product-cart/${cartItemId}`,
        getConfig()
    );
    if (response.data) {
        return response.data;
    }
};

const updateProductFromCart = async (cartDetails) => {
    const response = await axios.delete(
        `${base_url}user/update-product-cart/${cartDetails.cartItemId}/${cartDetails.quantity}`,
        getConfig()
    );
    if (response.data) {
        return response.data;
    }
};

const createOrder = async (orderDetail) => {
    const response = await axios.post(
        `${base_url}user/cart/create-order`,
        orderDetail,
        getConfig()
    );
    if (response.data) {
        return response.data;
    }
};

const createOrderAndCheckOrderBefore = async (orderDetail) => {
    const response = await axios.post(
        `${base_url}order/create-order-with-discount`,
        orderDetail,
        getConfig()
    );
    if (response.data) {
        return response.data;
    }
};

const getUserOrders = async () => {
    const response = await axios.get(`${base_url}user/getmyorders`, getConfig());
    if (response.data) {
        return response.data;
    }
};

const getAnOrder = async (orderId) => {
    const response = await axios.get(`${base_url}order/${orderId}`, getConfig());
    if (response.data) {
        return response.data;
    }
}

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

const getUserInfoById = async (id) => {
    const response = await axios.get(
        `${base_url}user/${id}`,
        getConfig()
    );
    if (response.data) {
        return response.data;
    }
}

const changeUserPassword = async (passwordData) => {
    const response = await axios.put(
        `${base_url}user/password`,
        passwordData,
        getConfig()
    );
    if (response.data) {
        return response.data;
    }
};

const cancelOrder = async (orderId) => {
    const response = await axios.put(
        `${base_url}orders/${orderId}/cancel`,
        getConfig()
    );
    if (response.data) {
        return response.data;
    }
};

const disableUser = async (id) => {
    const response = await axios.delete(`${base_url}user/${id}`, getConfig());

    return response.data;
};

const reorder = async (orderId) => {
    const response = await axios.post(
        `${base_url}order/reorder/${orderId}`,
        {},
        getConfig()
    )

    return response.data;
}

const getDefaultAddress = async () => {
    const response = await axios.get(`${base_url}user/default-address`, getConfig());
    if (response.data) {
        return response.data.defaultAddress;
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
    getAnOrder,
    updateUser,
    forgotPassToken,
    resetPass,
    logout,
    getUserInfoByEmail,
    createOrderAndCheckOrderBefore,
    getUserInfoById,
    changeUserPassword,
    cancelOrder,
    disableUser,
    reorder,
    getDefaultAddress
};
