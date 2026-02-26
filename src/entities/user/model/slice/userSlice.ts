import { createSlice, createEntityAdapter, EntityState } from '@reduxjs/toolkit';
import { User } from '../../lib';
import { userApi } from '../../api/userApi';
import { RootState } from '@/app/store';

const usersAdapter = createEntityAdapter<User>();

const initialState = usersAdapter.getInitialState({
  status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
  error: null as string | null,
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearUsers: (state) => {
      usersAdapter.removeAll(state);
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        userApi.endpoints.getUsers.matchFulfilled,
        (state, action) => {
          usersAdapter.setAll(state, action.payload);
          state.status = 'succeeded';
          state.error = null;
        }
      )
      .addMatcher(
        userApi.endpoints.getUsers.matchPending,
        (state) => {
          state.status = 'loading';
          state.error = null;
        }
      )
      .addMatcher(
        userApi.endpoints.getUsers.matchRejected,
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message ?? 'Failed to fetch users';
        }
      )
      .addMatcher(
        userApi.endpoints.getUserById.matchFulfilled,
        (state, action) => {
          usersAdapter.upsertOne(state, action.payload);
        }
      );
  },
});

export const { clearUsers } = userSlice.actions;

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = usersAdapter.getSelectors((state: RootState) => state.users as unknown as EntityState<User, number>);

export default userSlice.reducer;