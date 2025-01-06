import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { authService } from "./userService";
import { toast } from "react-toastify";

const getCustomerFromLocalStorage = localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    : null;

export const registerUser = createAsyncThunk(
    "auth/register",
    async (userData, thunkAPI) => {
        try {
            return await authService.register(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const loginUser = createAsyncThunk(
    "auth/login",
    async (userData, thunkAPI) => {
        try {
            return await authService.login(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const logoutUser = createAsyncThunk(
    "auth/logout",
    async (thunkAPI) => {
        try {
            return authService.logout();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getUserProductWishList = createAsyncThunk(
    "user/wishlist",
    async (thunkAPI) => {
        try {
            return await authService.getUserWishList();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const addProdToCart = createAsyncThunk(
    "user/cart/add",
    async (cartData, thunkAPI) => {
        try {
            return await authService.addToCart(cartData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getUserCart = createAsyncThunk(
    "user/cart/get",
    async (thunkAPI) => {
        try {
            return await authService.getCart();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const deleteCartProduct = createAsyncThunk(
    "user/cart/product/delete",
    async (cartItemId, thunkAPI) => {
        try {
            return await authService.removeProductFromCart(cartItemId);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const updateCartProduct = createAsyncThunk(
    "user/cart/product/update",
    async (cartDetails, thunkAPI) => {
        try {
            return await authService.updateProductFromCart(cartDetails);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const updateProfile = createAsyncThunk(
    "user/profile/update",
    async (userData, thunkAPI) => {
        try {
            return await authService.updateUser(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const forgotPasswordToken = createAsyncThunk(
    "user/password/token",
    async (email, thunkAPI) => {
        try {
            return await authService.forgotPassToken(email);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const resetPassword = createAsyncThunk(
    "user/password/reset",
    async (data, thunkAPI) => {
        try {
            return await authService.resetPass(data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getOrders = createAsyncThunk(
    "user/order/get",
    async (thunkAPI) => {
        try {
            return await authService.getUserOrders();
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getAnOrder = createAsyncThunk(
    "order/get",
    async (id, thunkAPI) => {
        try {
            return await authService.getAnOrder(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getInfoByEmailAddress = createAsyncThunk(
    "user/email/get",
    async (email, thunkAPI) => {
        try {
            return await authService.getUserInfoByEmail(email);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const createOrderAndCheckOrderBefore = createAsyncThunk(
    "order/create",
    async (orderDetail, thunkAPI) => {
        try {
            return await authService.createOrderAndCheckOrderBefore(orderDetail);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const resetCart = createAction("user/cart/reset");

export const getUserInfoById = createAsyncThunk(
    "user/id/get",
    async (userId, thunkAPI) => {
        try {
            return await authService.getUserInfoById(userId);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const changePassword = createAsyncThunk(
    "user/password/change",
    async (passwordData, thunkAPI) => {
        try {
            return await authService.changeUserPassword(passwordData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || "Có lỗi xảy ra.");
        }
    }
);

const initialState = {
    user: getCustomerFromLocalStorage,
    userInfo: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    createdOrder: {},
    deletedCartProduct: {},
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: [],
    extraReducers: (builder) => {
        builder
            // REGISTER USER
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdUser = action.payload;
                if (state.isSuccess === true) {
                    toast.info(action.payload.message);
                }
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error.message;
                if (state.isError === true) {
                    toast.error(action.payload.message);
                }
            })
            // LOGIN USER
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.user = action.payload.findUser;
                localStorage.setItem("token", action.payload.findUser.token);
                localStorage.setItem("customer", JSON.stringify(action.payload.findUser));
                localStorage.setItem("chat-app-user", JSON.stringify(action.payload.findUser));
                if (state.isSuccess === true) {
                    toast.info(action.payload.message);
                }
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error.message;
                if (state.isError === true) {
                    // toast.error(action.payload.message); // TODO: Needs to be fixed
                    toast.error("Sai email hoặc mật khẩu!");
                }
            })
            // LOGOUT USER
            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.user = null;
                localStorage.removeItem("token");
                if (state.isSuccess === true) {
                    toast.info(action.payload.message);
                }
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error.message;
                if (state.isError === true) {
                    toast.error(action.payload.message);
                }
            })
            // GET USER WISHLIST
            .addCase(getUserProductWishList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserProductWishList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.wishlist = action.payload;
            })
            .addCase(getUserProductWishList.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            // ADD PRODUCT TO CART
            .addCase(addProdToCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addProdToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.cartProduct = action.payload;
                if (state.isSuccess) {
                    toast.success("Sản phẩm đã được thêm vào giỏ hàng!");
                }
            })
            .addCase(addProdToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getUserCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.cartProducts = action.payload;
            })
            .addCase(getUserCart.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteCartProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCartProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedCartProduct = action.payload;
                if (state.isSuccess) {
                    toast.success("Sản phần đã được xóa khỏi giỏ hàng!");
                }
            })
            .addCase(deleteCartProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isSuccess === false) {
                    toast.error("Sản phẩm chưa được xóa khỏi giỏ hàng!");
                }
            })
            .addCase(updateCartProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateCartProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedCartProduct = action.payload;
                if (state.isSuccess) {
                    toast.success("Sản phẩm đã được cập nhật!");
                }
            })
            .addCase(updateCartProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isSuccess === false) {
                    toast.error("Sản phẩm chưa được cập nhật!");
                }
            })
            .addCase(getOrders.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.getOrderedProduct = action.payload.orders;
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getAnOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAnOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.getAnOrder = action.payload;
            })
            .addCase(getAnOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getInfoByEmailAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getInfoByEmailAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.userInfo = action.payload;
            })
            .addCase(getInfoByEmailAddress.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updateProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                console.log("action.payload:::::::::", action.payload);
                state.updatedUser = action.payload;
                if (state.isSuccess) {
                    let newUpdatedData = {
                        ...state.user,
                        ...action.payload.updatedUser,
                    }
                    localStorage.setItem("customer", JSON.stringify(newUpdatedData));
                    toast.success("Cập nhật thành công!");
                }
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isSuccess === false) {
                    toast.error("Cập nhật chưa thành công!");
                }
            })
            .addCase(forgotPasswordToken.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(forgotPasswordToken.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.token = action.payload;
                if (state.isSuccess) {
                    toast.success("Link đổi mật khẩu đã được gửi đến email của bạn!");
                }
            })
            .addCase(forgotPasswordToken.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isSuccess === false) {
                    toast.error("Link đổi mật khẩu chưa được gửi đến email của bạn!");
                }
            })
            .addCase(resetPassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.pass = action.payload;
                if (state.isSuccess) {
                    toast.success("Mật khẩu đã được thay đổi!");
                }
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isSuccess === false) {
                    toast.error("Mật khẩu chưa được thay đổi!");
                }
            })
            .addCase(createOrderAndCheckOrderBefore.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createOrderAndCheckOrderBefore.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdOrder = action.payload;
                if (state.isSuccess) {
                    toast.success("Đơn hàng đã được tạo!");
                }
            })
            .addCase(createOrderAndCheckOrderBefore.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isSuccess === false) {
                    toast.error("Đơn hàng chưa được tạo!");
                }
            })
            .addCase(resetCart, (state) => {
                state.cartProducts = null;
            })
            .addCase(getUserInfoById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getUserInfoById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.userInfo = action.payload.data;
            })
            .addCase(getUserInfoById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(changePassword.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
                state.isError = false;
                state.message = "";
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                toast.success(action.payload.message || "Đổi mật khẩu thành công!");
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload?.message || "Lỗi đổi mật khẩu!";
                toast.error(state.message);
            });
    },
});

export default authSlice.reducer;
