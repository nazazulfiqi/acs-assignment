// /redux/slices/pokemonSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface PokemonState {
  list: any[];
  loading: boolean;
  error: string | null;
  offset: number; // Untuk infinite scroll
}

const initialState: PokemonState = {
  list: [],
  loading: false,
  error: null,
  offset: 0,
};

export const fetchPokemons = createAsyncThunk(
  'pokemon/fetchPokemons',
  async (offset: number) => {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`
    );
    return response.data.results;
  }
);

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    resetPokemonList(state) {
      state.list = [];
      state.offset = 0;
    },
    setOffset(state, action) {
      state.offset = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.loading = false;
        // Filter untuk menghindari duplikasi
        const uniquePokemons = action.payload.filter(
          (pokemon : any) => !state.list.some((p) => p.name === pokemon.name)
        );
        state.list = [...state.list, ...uniquePokemons];
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch Pokemons';
      });
  },
});

export const { resetPokemonList, setOffset } = pokemonSlice.actions;
export default pokemonSlice.reducer;
