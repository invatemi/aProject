import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../types";
import { UsersState } from "./type";
import { fetchUsersAPI } from "../../services/api";

export const fetchUsers = createAsyncThunk<User[]>(
  "users/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchUsersAPI();
    } catch (error) {
      return rejectWithValue(
        error instanceof Error 
          ? error.message 
          : "Ошибка загрузки списка пользователей"
      );
    }
  }
);

const initialState: UsersState = {
  items: [],
  status: "idle",
  error: null
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearUsers: (state) => {
      state.items = [];
      state.status = "idle";
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.items = [];
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Неизвестная ошибка сети";
        state.items = [];
      });
  }
});

export const { clearUsers } = usersSlice.actions;
export default usersSlice.reducer;