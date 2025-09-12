import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../lib/supabaseClient';

export interface Product {
  id: string;
  product_name: string;
  category_id: string;
  product_image: string;
}

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const { data, error } = await supabase
      .from('products')
      .select(`
        id,
        product_name,
        category_id,
        product_image,
        categories(name)
      `);
    if (error) throw new Error(error.message);

    // Map product_image path to public URL
    const productsWithUrl = data.map((product: any) => {
      const { data: urlData } = supabase
        .storage
        .from('product-images')
        .getPublicUrl(product.product_image);
      return { ...product, product_image: urlData.publicUrl };
    });

    return productsWithUrl;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default productSlice.reducer;
