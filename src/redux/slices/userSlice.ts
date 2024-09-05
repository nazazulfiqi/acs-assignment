import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  username: string;
  password: string;
  email: string;
  phone: string;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  username: 'nazazul',
  password: '123',
  email: 'zulfiqinaza@gmail.com',
  phone: '088211797682',
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ username: string; password: string }>) {
      if (action.payload.username === state.username && action.payload.password === state.password) {
        state.isLoggedIn = true;
      } else {
        throw new Error('Invalid username or password');
      }
    },
    logout(state) {
      state.isLoggedIn = false;
    },
    changePassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
  },
});

export const { login, logout, changePassword } = userSlice.actions;
export default userSlice.reducer;
