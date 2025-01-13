import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { contactService } from "./contactService";
import { toast } from "react-toastify";

export const createQuery = createAsyncThunk(
    "contact/post",
    async (contactData, thunkAPI) => {
        try {
            console.log(contactData);
            return await contactService.postQuery(contactData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getAProduct = createAsyncThunk(
    "contact/getAProduct",
    async (id, thunkAPI) => {
        try {
            return await contactService.getAProduct(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const resetState = createAction("Reset_all");

const contactState = {
    contact: "",
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
};

export const contactSlice = createSlice({
    name: "contact",
    initialState: contactState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createQuery.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createQuery.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.contact = action.payload;
                if (state.isSuccess === true) {
                    toast.success("Đơn yêu cầu của bạn đã được gửi đi");
                }
            })
            .addCase(createQuery.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
                if (state.isError === true) {
                    toast.error("Đơn yêu cầu của bạn không thể gửi đi");
                }
            })
            .addCase(getAProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.singleproduct = action.payload;
                toast.success(action.payload.message);
            })
            .addCase(getAProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, () => contactState);
    },
});

export default contactSlice.reducer;
