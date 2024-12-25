import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import discountService from "./discountService";
import { toast } from "react-toastify";

// Async Thunk for applying discount
export const applyDiscount = createAsyncThunk(
    "discount/apply-discount",
    async (data, thunkAPI) => {
        try {
            const response = await discountService.applyDiscount(data);
            return response; // API trả về dữ liệu giảm giá
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Reset State Action
export const resetState = createAction("discount/reset");

// Initial State
const initialState = {
    appliedDiscount: null, // Dữ liệu giảm giá áp dụng
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
            // Reset State
            .addCase(resetState, () => initialState);
    },
});

export default discountSlice.reducer;
