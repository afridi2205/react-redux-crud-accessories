import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    productList: [],
    selectedProduct: null,
    isLoading: false,
    error: ''
};
const BASE_URL = 'http://localhost:8000/products';

export const getProductFromApi = createAsyncThunk(
    "productStore/getProductFromApi",
    async (_, { rejectWithValue }) => {
        const response = await fetch(BASE_URL);
        if (response.ok) {
            return await response.json();
        }
        else
            return rejectWithValue({ error: 'No Products Found' })
    });

export const postProductToApi = createAsyncThunk(
    "productStore/postProductToApi",
    async (products, { rejectWithValue }) => {
        const options = {
            method: 'POST',
            body: JSON.stringify(products),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
        const response = await fetch(BASE_URL, options);
        if (response.ok) {
            return await response.json();
        }
        else
            return rejectWithValue({ error: 'Error Creating Product' })
    });

export const patchProductToApi = createAsyncThunk(
    "productStore/patchProductToApi",
    async (products, { rejectWithValue }) => {
        const options = {
            method: 'PATCH',
            body: JSON.stringify(products),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
        const response = await fetch(`${BASE_URL}/${products.id}`, options);
        if (response.ok) {
            return await response.json();
        }
        else
            return rejectWithValue({ error: 'Error Updating Product' })
    });

export const deleteProductToApi = createAsyncThunk(
    "productStore/deleteProductToApi",
    async (products, { rejectWithValue }) => {
        const options = {
            method: 'DELETE'
        }
        const response = await fetch(`${BASE_URL}/${products.id}`, options);
        if (response.ok) {
            return await response.json();
        }
        else
            return rejectWithValue({ error: 'Error Deleting Product' })
    });

export const searchProductToApi = createAsyncThunk(
    "productStore/searchProductToApi",
    async (searchTerm, { rejectWithValue }) => {
        const options = {
            method: 'GET'
        }
        const response = await fetch(`${BASE_URL}?q=${searchTerm}`, options);
        if (response.ok) {
            return await response.json();
        }
        else
            return rejectWithValue({ error: 'Couldnt find Product' })
    });

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            const items = { ...action.payload, id: Math.random() * 10 };
            state.productList.push({ ...items });
        },
        removeProduct: (state, action) => {
            state.productList = state.productList.filter(
                product => product.id !== action.payload.id
            );
        },
        updateProduct: (state, action) => {
            const index = state.productList.findIndex(product => product.id === action.payload.id);
            if (index !== -1) {
                state.productList[index] = { ...action.payload };
            }
        },
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload;
        },
        searchProducts: (state, action) => {
            if (action.payload)
                state.productList = state.productList.filter(product => (
                    product.productName.toLowerCase().includes(action.payload.toLowerCase())
                ))
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProductFromApi.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProductFromApi.fulfilled, (state, action) => {
                state.isLoading = false
                state.error = ''
                state.productList = action.payload
            })
            .addCase(getProductFromApi.rejected, (state, action) => {
                state.error = action.payload.error
                state.isLoading = false
                state.productList = []
            })
            .addCase(postProductToApi.pending, (state) => {
                state.isLoading = true
            })
            .addCase(postProductToApi.fulfilled, (state, action) => {
                state.isLoading = false
                state.error = ''
                state.productList.push(action.payload)
            })
            .addCase(postProductToApi.rejected, (state, action) => {
                state.error = action.payload.error
                state.isLoading = false
            })
            .addCase(patchProductToApi.pending, (state) => {
                state.isLoading = true
            })
            .addCase(patchProductToApi.fulfilled, (state, action) => {
                state.isLoading = false
                state.error = ''
            })
            .addCase(patchProductToApi.rejected, (state, action) => {
                state.error = action.payload.error
                state.isLoading = false
            })
            .addCase(deleteProductToApi.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteProductToApi.fulfilled, (state) => {
                state.isLoading = false
                state.error = ''
            })
            .addCase(deleteProductToApi.rejected, (state, action) => {
                state.error = action.payload.error
                state.isLoading = false
            })
            .addCase(searchProductToApi.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(searchProductToApi.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productList = state.productList.filter(product =>
                    product.productName.includes(action.payload)
                );
                state.error = '';
            })
            .addCase(searchProductToApi.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Search failed';
            });
    }
});

export const {
    addProduct,
    removeProduct,
    updateProduct,
    setSelectedProduct,
    searchProducts
} = productSlice.actions;

export default productSlice.reducer;
