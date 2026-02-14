import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Album } from "../../types";
import { AlbumsState } from "./types";
import { fetchUserAlbumsAPI, fetchAlbumsAPI } from "../../services/api";

export const fetchUserAlbums = createAsyncThunk<Album[], number>(
  "albums/fetchByUser",
  async (userId, { rejectWithValue }) => {
    try {
      return await fetchUserAlbumsAPI(userId);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error 
          ? error.message 
          : `Ошибка загрузки альбомов пользователя ${userId}`
      );
    }
  }
);

export const fetchAlbums = createAsyncThunk<Album[]>(
  "albums/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAlbumsAPI();
    } catch (error) {
      return rejectWithValue(
        error instanceof Error 
          ? error.message 
          : "Ошибка загрузки всех альбомов"
      );
    }
  }
);

const initialState: AlbumsState = {
  items: [],
  status: "idle",
  error: null
};

const albumsSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {
    clearAlbums: (state) => {
      state.items = [];
      state.status = "idle";
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAlbums.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.items = [];
      })
      .addCase(fetchUserAlbums.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchUserAlbums.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Неизвестная ошибка сети";
        state.items = [];
      });

  builder
    .addCase(fetchAlbums.pending, (state) => {
      state.status = "loading";
      state.error = null;
    })
    .addCase(fetchAlbums.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.items = action.payload;
      state.error = null;
    })
    .addCase(fetchAlbums.rejected, (state, action) => {
      state.status = "failed";
      state.error = (action.payload as string) || "Неизвестная ошибка сети";
    });
  }
});

export const { clearAlbums } = albumsSlice.actions;
export default albumsSlice.reducer;