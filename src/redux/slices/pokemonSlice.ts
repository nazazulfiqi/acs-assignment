// /redux/slices/pokemonSlice.ts
import { createAsyncThunk,createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface PokemonState {
  list: any[];
  loading: boolean;
  error: string | null;
}

const initialState: PokemonState = {
  list: [],
  loading: false,
  error: null,
};

export const fetchPokemons = createAsyncThunk('pokemon/fetchPokemons', async () => {
  const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
  return response.data.results;
});

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch Pokemons';
      });
  },
});

export default pokemonSlice.reducer;
