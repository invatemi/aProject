import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Photo } from "../../types";
import { PhotosState } from "./types";
import { fetchAlbumPhotosAPI } from "../../services/api";

export const fetchAlbumPhotos = createAsyncThunk<Photo[], number>(
  "photos/fetchByAlbum",
  async (albumId, { rejectWithValue }) => {
    try {
      return await fetchAlbumPhotosAPI(albumId);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error 
          ? error.message 
          : `Ошибка загрузки фотографий альбома ${albumId}`
      );
    }
  }
);

const initialState: PhotosState = {
  items: [],
  status: "idle",
  error: null
};

const photosSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    clearPhotos: (state) => {
      state.items = [];
      state.status = "idle";
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbumPhotos.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.items = [];
      })
      .addCase(fetchAlbumPhotos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchAlbumPhotos.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Неизвестная ошибка сети";
        state.items = [];
      });
  }
});

export const { clearPhotos } = photosSlice.actions;
export default photosSlice.reducer;