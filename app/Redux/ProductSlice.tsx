import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Product {
    id: number;
    title: string;
    thumbnail: string;
    description: string;
}

interface ProductState {
    items: Product[];
    loading: boolean;
}

const initialState: ProductState = {
    items: [],
    loading: false,
};

export const fetchProducts = createAsyncThunk(
    "products/fetch",
    async ({ page, limit }: { page: number; limit: number }) => {
        const skip = page * limit;
        const res = await fetch(
            `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
        );
        return res.json();
    }
);

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.products;
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default productSlice.reducer;
