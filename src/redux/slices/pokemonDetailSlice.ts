import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

interface PokemonDetailState {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: PokemonDetailState = {
  data: null,
  loading: false,
  error: null,
};

const apiUrl2 = process.env.NEXT_PUBLIC_API_URL_2;

export const fetchPokemonDetail = createAsyncThunk(
  'pokemonDetail/fetchPokemonDetail',
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUrl2}/pokemon/${name}`);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch Pokémon details');
    }
  }
);

const pokemonDetailSlice = createSlice({
  name: 'pokemonDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemonDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPokemonDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default pokemonDetailSlice.reducer;
