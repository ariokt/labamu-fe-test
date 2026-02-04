import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { PokemonListData, PokemonListResponse } from "./types";
import { getPokemonList } from "@/api/api";

interface PokemonState {
  pokemonList: PokemonListData[];
  next: string;
  prev: string;
  searchQuery: string;
  filteredPokemon: PokemonListData[];
  loading: boolean;
  error: string | null;
}

const initialState: PokemonState = {
  pokemonList: [],
  next: '',
  prev: '',
  searchQuery: '',
  filteredPokemon: [],
  loading: true,
  error: null,
};

export const fetchPokemonList = createAsyncThunk(
  'pokemon/fetchList',
  async (url: string, { rejectWithValue }) => {
    try {
      // const state = getState() as PokemonState;
      if (url !== '') {
        return await getPokemonList(url);
      } else {
        return await getPokemonList();
      }
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Koneksi bermasalah'
      );
    }
  }
);

const pokemonListSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;

      if (!action.payload.trim()) {
        state.filteredPokemon = state.pokemonList;
      } else {
        state.filteredPokemon = state.pokemonList.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(action.payload.toLowerCase())
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemonList.fulfilled, (state, action) => {
        state.loading = false;
        const copyListPokemon = [...state.pokemonList];
        state.pokemonList = [...copyListPokemon, ...action.payload.results];
        state.next = action.payload.next;
        state.prev = action.payload.previous;
      })
      .addCase(fetchPokemonList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const {
  setSearchQuery,
} = pokemonListSlice.actions;

export default pokemonListSlice.reducer;