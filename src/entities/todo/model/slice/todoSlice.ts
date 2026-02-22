import { createSlice, createEntityAdapter, EntityState } from '@reduxjs/toolkit';
import { Todo } from '../../lib';
import { todoApi } from '../../api';
import { RootState } from '@/app/store';

const todosAdapter = createEntityAdapter<Todo>();

const initialState = todosAdapter.getInitialState({
  status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
  error: null as string | null,
});

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    clearTodos: (state) => {
      todosAdapter.removeAll(state);
      state.status = 'idle';
      state.error = null;
    },
    toggleTodoStatus: (state, action: { payload: number }) => {
      const todo = state.entities[action.payload];
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        todoApi.endpoints.getTodosByUserId.matchFulfilled,
        (state, action) => {
          todosAdapter.upsertMany(state, action.payload);
        }
      )
      .addMatcher(
        todoApi.endpoints.getTodosByUserId.matchPending,
        (state) => {
          state.status = 'loading';
        }
      )
      .addMatcher(
        todoApi.endpoints.getTodosByUserId.matchRejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message ?? 'Failed to fetch todos';
        }
      );
  },
});

export const { clearTodos, toggleTodoStatus } = todoSlice.actions;

export const {
  selectAll: selectAllTodos,
  selectById: selectTodoById,
} = todosAdapter.getSelectors((state: RootState) => state.todos as unknown as EntityState<Todo, number>);

export default todoSlice.reducer;