import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { pCategoryService } from "./pCategoryService";

export const getAllPCategories = createAsyncThunk("pCategories/get",
    async (thunkAPI) => {
        try {
            return await pCategoryService.getPCategories();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getPCategoryById = createAsyncThunk(
    "pCategory/getById",
    async (id, thunkAPI) => {
        try {
            return await pCategoryService.getPCategoryById(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const pCategoryState = {
    pCategories: "",
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
    singlePCategory: "",
};

export const pCategorySlice = createSlice({
    name: "pCategory",
    initialState: pCategoryState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // GET ALL pCategories
            .addCase(getAllPCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllPCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.pCategories = action.payload.data;
            })
            .addCase(getAllPCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            // GET pCategory BY ID
            .addCase(getPCategoryById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPCategoryById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.singlePCategory = action.payload;
            })
            .addCase(getPCategoryById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            });
    },
});

export default pCategorySlice.reducer;
