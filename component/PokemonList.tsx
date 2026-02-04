"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchPokemonList, setSearchQuery } from "@/store/pokemonListSlice";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import PokemonCard from "./PokemonCard";
import Spinner from "./Spinner";
import SearchBar from "./SearchBar";

export default function PokemonList() {
  const dispatch = useAppDispatch();
  const { pokemonList, loading, next, searchQuery, filteredPokemon } = useAppSelector(
    (state: RootState) => state.pokemonList
  );

  useEffect(() => {
    dispatch(fetchPokemonList(next));
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 10 &&
      !loading
    ) {
      dispatch(fetchPokemonList(next));
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, pokemonList]);

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
