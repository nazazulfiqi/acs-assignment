// /redux/slices/pokemonSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface Pokemon {
  name: string;
  url: string;
  details?: any; // Field untuk menyimpan detail Pokemon
}

interface PokemonState {
  list: Pokemon[];
  loading: boolean;
  error: string | null;
  offset: number;
}

const initialState: PokemonState = {
  list: [],
  loading: false,
  error: null,
  offset: 0,
};

const apiUrl2 = process.env.NEXT_PUBLIC_API_URL_2;


export const fetchPokemons = createAsyncThunk(
  'pokemon/fetchPokemons',
  async (offset: number) => {
    const response = await axios.get(
      `${apiUrl2}/pokemon?limit=20&offset=${offset}`
    );
    return response.data.results;
  }
);


export const fetchPokemonDetails = createAsyncThunk(
  'pokemon/fetchPokemonDetails',
  async (pokemon: Pokemon) => {
    const response = await axios.get(pokemon.url);
    return { name: pokemon.name, details: response.data };
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
        const uniquePokemons = action.payload.filter(
          (pokemon: Pokemon) => !state.list.some((p) => p.name === pokemon.name)
        );
        state.list = [...state.list, ...uniquePokemons];
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch Pokemons';
      })
      .addCase(fetchPokemonDetails.fulfilled, (state, action) => {
        const index = state.list.findIndex(p => p.name === action.payload.name);
        if (index !== -1) {
          state.list[index].details = action.payload.details;
        }
      });
  },
});

export const { resetPokemonList, setOffset } = pokemonSlice.actions;
export default pokemonSlice.reducer;
