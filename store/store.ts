import { configureStore } from "@reduxjs/toolkit";
import pokemonListReducer from './pokemonListSlice';
import pokemonDetailReducer from './pokemonDetailSlice';

export const store = configureStore({
  reducer: {
    pokemonList: pokemonListReducer,
    pokemonDetail: pokemonDetailReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;