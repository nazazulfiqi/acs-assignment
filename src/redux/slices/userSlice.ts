import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';


interface UserState {
  id?: string;
  name?: string;
  username: string;
  email: string;
  phone: string;
  isLoggedIn: boolean;
  error?: string;
}

const initialState: UserState = {
  username: '',
  email: '',
  phone: '',
  isLoggedIn: false,
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUrl}/users`);
      const user = response.data.find((user: any) => user.username === username && user.password === password);

      if (user) {
        return user;
      } else {
        return rejectWithValue('Invalid username or password');
      }
    } catch (error) {
      return rejectWithValue('Error logging in');
    }
  }
);

export const updatePassword = createAsyncThunk(
  'user/updatePassword',
  async ({ id, currentPassword, newPassword }: { id: string; currentPassword: string; newPassword: string }, { rejectWithValue }) => {
    try {
    
      const response = await axios.get(`${apiUrl}/users/${id}`);
      const user = response.data;

      
      if (user.password !== currentPassword) {
        return rejectWithValue('Current password is incorrect');
      }

  
      const updatedUser = {
        ...user,
        password: newPassword,
      };

      await axios.put(`${apiUrl}/users/${id}`, updatedUser);

      return newPassword;
    } catch (error) {
      return rejectWithValue('Error updating password');
    }
  }
);


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.isLoggedIn = false;
      state.id = undefined;
      state.name = undefined;
      state.username = '';
      state.email = '';
      state.phone = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoggedIn = true;
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.username = action.payload.username;
        state.email = action.payload.email;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.error = action.payload as string;
      })
      
      .addCase(updatePassword.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
