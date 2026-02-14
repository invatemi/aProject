import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Todo } from "../../types";
import { TodosState } from "./types";
import { fetchUserTodosAPI } from "../../services/api";

export const fetchUserTodos = createAsyncThunk<Todo[], number>(
  "todos/fetchByUser",
  async (userId, { rejectWithValue }) => {
    try {
      return await fetchUserTodosAPI(userId);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error 
          ? error.message 
          : `Ошибка загрузки задач пользователя ${userId}`
      );
    }
  }
);

const initialState: TodosState = {
  items: [],
  status: "idle",
  error: null
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    clearTodos: (state) => {
      state.items = [];
      state.status = "idle";
      state.error = null;
    },
    toggleTodoStatus: (state, action: { payload: number }) => {
      const todo = state.items.find(t => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserTodos.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.items = [];
      })
      .addCase(fetchUserTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchUserTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Неизвестная ошибка сети";
        state.items = [];
      });
  }
});

export const { clearTodos, toggleTodoStatus } = todosSlice.actions;
export default todosSlice.reducer;