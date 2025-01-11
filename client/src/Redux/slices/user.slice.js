import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import gitUser from "../../services/gitUser";

const initialState = {
  username: null,
  userDetails: null,
  repos: [],
  error: null,
  following: null,
  status: "idle",
  followers: null,
};

export const getUser = createAsyncThunk(
  "user/getUser",
  async (username, { rejectWithValue }) => {
    try {
      const res = await gitUser.getUser(username);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.username = action.payload.login;
        state.userDetails = action.payload.user;
        state.repos = action.payload.repos;
        state.status = "success";
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
