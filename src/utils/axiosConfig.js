// export const base_url = "http://localhost:5001/api/";
export const host = "https://e-commerce-electronics-server-ruddy.vercel.app";
export const base_url = `${host}/api/`;

const getTokenFromLocalStorage = localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    : null;

const token = getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : "";

export const authMiddleware = {
    headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
    },
};

export const config = {
    headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
    },
};

export const getConfig = () => {
    const getTokenFromLocalStorage = localStorage.getItem("customer")
        ? JSON.parse(localStorage.getItem("customer"))
        : null;

    return {
        headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage !== null
                ? getTokenFromLocalStorage.token
                : ""
                }`,
            Accept: "application/json",
        },
    };
};
