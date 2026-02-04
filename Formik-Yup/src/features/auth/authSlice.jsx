import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const tokenFromStorage = localStorage.getItem('token');
const userFromStorage = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://dummyjson.com/auth/login", credentials);
      //
      const token = response.data.accessToken;

      localStorage.setItem('token',token);
      localStorage.setItem('user', JSON.stringify(response.data));

      console.log("response after login",response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login Failed");
    }
  }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: userFromStorage || {},
        token: tokenFromStorage || null,
        loading: false,
        error: null
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.error = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.token = action.payload.accessToken;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;