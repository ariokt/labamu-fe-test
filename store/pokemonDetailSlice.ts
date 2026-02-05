import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PokemonDetail } from './types';
import { getPokemonDetail } from '@/api/api';

interface PokemonDetailState {
  data: PokemonDetail | null;
  loading: boolean;
  error: string | null;
}

const initialState: PokemonDetailState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchPokemonDetail = createAsyncThunk(
  'pokemonDetail/fetch',
  async (name: string, { rejectWithValue }) => {
    try {
      return await getPokemonDetail(name);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to load pokemon detail'
      );
    }
  }
);

const pokemonDetailSlice = createSlice({
  name: 'pokemonDetail',
  initialState,
  reducers: {
    clearPokemonDetail: (state) => {
      state.data = null;
      state.error = null;
    },
  },
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

export const { clearPokemonDetail } = pokemonDetailSlice.actions;
export default pokemonDetailSlice.reducer;