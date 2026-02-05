"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchPokemonList,
  setSearchQuery,
  resetPokemonList,
} from "@/store/pokemonListSlice";
import { RootState } from "@/store/store";
import { useCallback, useEffect, useRef } from "react";
import PokemonCard from "./PokemonCard";
import Spinner from "./Spinner";
import SearchBar from "./SearchBar";

export default function PokemonList() {
  const dispatch = useAppDispatch();
  const { pokemonList, loading, next, searchQuery, filteredPokemon } =
    useAppSelector((state: RootState) => state.pokemonList);

  const isInitialLoad = useRef(false);

  useEffect(() => {
    if (isInitialLoad.current) return;

    isInitialLoad.current = true;
    dispatch(resetPokemonList());
    dispatch(fetchPokemonList(""));
  }, [dispatch]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 10 &&
      !loading &&
      next
    ) {
      dispatch(fetchPokemonList(next));
    }
  }, [dispatch, loading, next]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleSearchChange = (query: string) => {
    dispatch(setSearchQuery(query));
  };

  const displayedData = searchQuery ? filteredPokemon : pokemonList;

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 rounded-xl p-4">
        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by name..."
        />
        {displayedData.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
      {loading && (
        <div className="mx-auto text-xl w-fit my-4">
          <Spinner />
        </div>
      )}
    </>
  );
}
