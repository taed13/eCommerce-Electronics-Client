import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { blogService } from "./blogService";

export const getAllBlogs = createAsyncThunk("blogs/get", async ({ categoryIds }, thunkAPI) => {
    try {
        return await blogService.getBlogs(categoryIds);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getBlogById = createAsyncThunk(
    "blog/getById",
    async (id, thunkAPI) => {
        try {
            return await blogService.getBlogById(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const blogState = {
    blog: "",
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
};
export const blogSlice = createSlice({
    name: "blog",
    initialState: blogState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // GET ALL BLOGS
            .addCase(getAllBlogs.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllBlogs.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.blog = action.payload;
            })
            .addCase(getAllBlogs.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            // GET BLOG BY ID
            .addCase(getBlogById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBlogById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.singleBlog = action.payload;
            })
            .addCase(getBlogById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            });
    },
});

export default blogSlice.reducer;
