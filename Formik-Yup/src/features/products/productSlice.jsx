import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchProducts = createAsyncThunk(
  "products",
  async (_ , { rejectWithValue }) => {
    try {
      const response = await axios.get("https://dummyjson.com/products");
      // products
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Failed to fetch products");
    }
  }
);

const productSlice = createSlice({
    name : 'product',
    initialState : {products : [], loading :false,error : null},
    reducers : {
      addProduct :(state,action)=> {
        state.products.push(action.payload);
        
      },
      removeProduct :(state,action)=> {
         state.products = state.products.filter((prod)=>prod.id !== action.payload.id);
      },
      updateProduct :(state,action)=> {
        
        // notes

        // state.products = state.products.map((prod)=> {
        //     if(prod.id == action.payload.id){
        //         return action.payload;
        //     }
        //     return prod;
        // })

        const index = state.products.findIndex(prod => prod.id === action.payload.id);
        // if (index !== -1) {
        //     state.products[index] = action.payload;
        // }

        if (index !== -1) {
        // merge the old data with just the new updates
          state.products[index] = {
              ...state.products[index], // Keep existing fields (reviews, ratings, etc.)
              ...action.payload         // Overwrite only the form fields
          };
      }
      }
    }, 
    extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
})

export const {addProduct,removeProduct,updateProduct} = productSlice.actions
export default productSlice.reducer;
//////////////////////////////////////////////////////////////////////////////////
