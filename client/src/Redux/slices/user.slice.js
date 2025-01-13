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
  allUsers: [],
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

export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await gitUser.getAllUsers();
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, { rejectWithValue }) => {
    console.log(id);
    try {
      const res = await gitUser.deleteUser(id);
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
      })
      .addCase(getAllUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = "success";
        state.allUsers = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = "success";
        state.allUsers = state.allUsers.filter(
          (user) => user._id !== action.payload.deletedUser._id
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
