import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import discountService from "./discountService";
import { toast } from "react-toastify";

// Async Thunk for applying discount
export const applyDiscount = createAsyncThunk(
    "discount/apply-discount",
    async (data, thunkAPI) => {
        try {
            const response = await discountService.applyDiscount(data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const calculateShippingFee = createAsyncThunk(
    "discount/calculate-fee",
    async (data, thunkAPI) => {
        try {
            const response = await discountService.calculateShippingFee(data);
            return response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Reset State Action
export const resetState = createAction("discount/reset");

// Initial State
const initialState = {
    appliedDiscount: null,
    shippingFee: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
};

// Discount Slice
export const discountSlice = createSlice({
    name: "discount",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Apply Discount
            .addCase(applyDiscount.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
                state.message = "";
            })
            .addCase(applyDiscount.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.appliedDiscount = action.payload.data;
                state.message = action.payload.message || "Mã giảm giá đã được áp dụng.";
            })
            .addCase(applyDiscount.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.appliedDiscount = null;
                state.message = action.payload || "Có lỗi xảy ra khi áp dụng mã giảm giá.";
                toast.error(action.payload.message);
            })
            .addCase(calculateShippingFee.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.isSuccess = false;
                state.message = "";
            })
            .addCase(calculateShippingFee.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.shippingFee = action.payload.data;
                state.message = action.payload.message || "Phí vận chuyển đã được tính thành công.";
                toast.success(state.message);
            })
            .addCase(calculateShippingFee.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.shippingFee = null;
                state.message = action.payload || "Error calculating shipping fee.";
                toast.error(state.message);
            })
            // Reset State
            .addCase(resetState, () => initialState);
},
});

export default discountSlice.reducer;
