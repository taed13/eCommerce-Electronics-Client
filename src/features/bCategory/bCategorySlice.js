import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { bCategoryService } from "./bCategoryService";

export const getAllBCategories = createAsyncThunk("bCategories/get",
    async (thunkAPI) => {
        try {
            return await bCategoryService.getBCategories();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getBCategoryById = createAsyncThunk(
    "bCategory/getById",
    async (id, thunkAPI) => {
        try {
            return await bCategoryService.getBCategoryById(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const bCategoryState = {
    bCategories: "",
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
    singleBCategory: "",
};

export const bCategorySlice = createSlice({
    name: "bCategory",
    initialState: bCategoryState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // GET ALL BCategories
            .addCase(getAllBCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllBCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.bCategories = action.payload;
            })
            .addCase(getAllBCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            // GET BCategory BY ID
            .addCase(getBCategoryById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBCategoryById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.singleBCategory = action.payload;
            })
            .addCase(getBCategoryById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            });
    },
});

export default bCategorySlice.reducer;
