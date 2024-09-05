import { configureStore } from '@reduxjs/toolkit';

import pokemonReducer from './slices/pokemonSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    pokemon: pokemonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;