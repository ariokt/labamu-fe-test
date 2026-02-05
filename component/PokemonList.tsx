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
  const showSearchNoResults =
    searchQuery &&
    !loading &&
    filteredPokemon.length === 0 &&
    pokemonList.length > 0;

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
        {showSearchNoResults && (
          <div className="col-span-2 md:col-span-4 text-center py-8 mt-8">
            <div className="max-w-md mx-auto">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Pokémon found
              </h3>
              <p className="text-gray-500">
                No results match. Try a different search term.
              </p>
            </div>
          </div>
        )}
      </div>
      {loading && (
        <div className="mx-auto text-xl w-fit my-4">
          <Spinner />
        </div>
      )}
    </>
  );
}
