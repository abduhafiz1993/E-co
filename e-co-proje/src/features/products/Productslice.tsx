import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../lib/supabaseClient";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

interface ProductsState {
  items: Product[];
  single: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  single: null,
  loading: false,
  error: null,
};

// Fetch all products
export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
  const { data, error } = await supabase.from("products").select("*");
  if (error) throw error;
  return data as Product[];
});

// Fetch single product
export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id: string) => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data as Product;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // all products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      })
      // single product
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.single = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch product";
      });
  },
});

export default productsSlice.reducer;
