import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";

export interface Product {
  id: number;
  title: string;
  description: string;
}

interface ProductsState {
  items: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductsState = { items: [], status: "idle", error: null };

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (): Promise<Product[]> => {
    const response = await fetch("https://api.escuelajs.co/api/v1/products");
    const data: Product[] = await response.json();
    return data;
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.status = "succeeded";
          state.items = state.items.concat(action.payload);
        }
      )
      .addCase(
        fetchProducts.rejected,
        (
          state,
          action: PayloadAction<
            unknown,
            string,
            { rejectedWithValue: boolean },
            SerializedError
          >
        ) => {
          state.status = "failed";
          if (action.error.message) {
            state.error = action.error.message;
          }
        }
      );
  },
});

export default productSlice.reducer;
