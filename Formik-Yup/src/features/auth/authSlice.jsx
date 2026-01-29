import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'


export const loggedInUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://dummyjson.com/auth/login", credentials);
    //   
    console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Login Failed");
    }
  }
);

const authslice = createSlice({
    name : 'auth',
    initialState : {user : {},token : null , loading :false,error : null},
    reducers : {
      logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
    }  
    },  
    extraReducers: (builder) => {
    builder
      .addCase(loggedInUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loggedInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; 
        state.token = action.payload.accessToken; 
        // Navigate
      })
      .addCase(loggedInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
})

export const {logout} = authslice.actions
export default authslice.reducer;
//////////////////////////////////////////////////////////////////////////////////
