import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const loginuser = createAsyncThunk('user/loginUser', async (userCred) => {
  try {
    const response = await fetch(`https://62adca20-af73-48e1-8d0a-f7f69c4a63c5.mock.pstmn.io?username=${userCred.username}&password=${userCred.password}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Authentication failed');
    }
    return userCred; // Return user credentials on successful authentication
  } catch (error) {
    throw new Error('Authentication failed');
  }
});
const userslice = createSlice({
  name: 'user',
  initialState: {
    userObj: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginuser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginuser.fulfilled, (state, action) => {
        state.loading = false;
        state.userObj = action.payload; // Store user credentials
      })
      .addCase(loginuser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { reducer: userReducer } = userslice;
