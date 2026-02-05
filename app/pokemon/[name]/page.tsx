"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchPokemonDetail,
  clearPokemonDetail,
} from "@/store/pokemonDetailSlice";
import Spinner from "@/component/Spinner";
import TagPokemonType from "@/component/TagPokemonType";

export default function PokemonDetail() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    data: pokemon,
    loading,
    error,
  } = useAppSelector((state) => state.pokemonDetail);

  useEffect(() => {
    if (params.name) {
      dispatch(fetchPokemonDetail(params.name as string));
    }

    return () => {
      dispatch(clearPokemonDetail());
    };
  }, [params.name, dispatch]);

  const MAX_STAT = 255;

  const getStatPercentage = (value: number) =>
    Math.min((value / MAX_STAT) * 100, 100);

  const getStatColor = (value: number) => {
    if (value >= 100) return "bg-blue-500";
    if (value >= 75) return "bg-purple-500";
    if (value >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  if (loading || (!pokemon && !error)) {
    return (
      <div className="min-h-screen bg-linear-to-br from-dark-bg via-darker-bg to-dark-bg">
        <div className="container mx-auto px-4 py-12">
          <Spinner />
        </div>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="min-h-screen bg-linear-to-br from-dark-bg via-darker-bg to-dark-bg">
        <div className="container mx-auto px-4 py-12 flex flex-col">
          <div className="mx-auto w-fit text-2xl">No Pokemon Found!</div>
          <div className="text-center mt-2">
            <button
              onClick={() => router.push("/")}
              className="px-6 py-3 font-display text-xs rounded-lg transition-colors"
            >
              ◄ BACK TO LIST
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-dark-bg via-darker-bg to-dark-bg">
      <div className="relative z-10">
        <header className="border-b-4 border-yellow-500/20 bg-darker-bg/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-6">
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 px-4 py-2 bg-darker-bg border-4 border-blue-500/30 text-blue-500 font-display text-xs rounded-lg hover:border-blue-500 hover:bg-dark-bg transition-all"
            >
              <span>◄</span>
              <span>BACK</span>
            </button>
          </div>
        </header>
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="bg-linear-to-br from-darker-bg to-dark-bg rounded-3xl border-4 border-yellow-500 p-8 mb-8 relative overflow-hidden animate-slide-up">
              <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-linear-to-b from-yellow-500/10 to-transparent rounded-2xl" />
                  <div className="relative aspect-square flex items-center justify-center p-8">
                    <Image
                      src={pokemon.sprites.front_default}
                      alt={pokemon.name}
                      width={400}
                      height={400}
                      className="drop-shadow-2xl animate-float"
                      priority
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="inline-block text-dark-bg font-display text-sm">
                      #{pokemon.id.toString().padStart(3, '0')}
                    </div>
                    <h1 className="font-display text-yellow-500 text-3xl md:text-4xl tracking-wider mb-4">
                      {pokemon.name.charAt(0).toUpperCase() +
                        pokemon.name.slice(1)}
                    </h1>
                  </div>
                  <div>
                    <h2 className="text-gray-400 font-body text-sm mb-3">
                      TYPE
                    </h2>
                    <div className="flex gap-3">
                      {pokemon.types.map((type) => (
                        <TagPokemonType key={type.type.name} pokemonType={type.type.name} />
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-dark-bg/50 border-2 border-blue-500/30 rounded-xl p-4">
                      <h3 className="text-gray-400 font-body text-xs mb-2">
                        HEIGHT
                      </h3>
                      <p className="font-display text-lg">
                        {(pokemon.height / 10).toFixed(1)}m
                      </p>
                    </div>
                    <div className="bg-dark-bg/50 border-2 border-purple-500/30 rounded-xl p-4">
                      <h3 className="text-gray-400 font-body text-xs mb-2">
                        WEIGHT
                      </h3>
                      <p className="font-display text-lg">
                        {(pokemon.weight / 10).toFixed(1)}kg
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="bg-linear-to-br from-darker-bg to-dark-bg rounded-3xl border-4 border-yellow-500 p-8 animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              <h2 className="font-display text-yellow-500 text-xl mb-8 tracking-wider">
                BASE STATS
              </h2>
              <div className="space-y-6">
                {pokemon.stats.map((stat, index) => {
                  const percentage = getStatPercentage(stat.base_stat);
                  const statColor = getStatColor(stat.base_stat);

                  return (
                    <div key={stat.stat.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 font-body text-sm min-w-30">
                          {stat.stat.name}
                        </span>
                        <span className="font-display text-sm">
                          {stat.base_stat}
                        </span>
                      </div>

                      <div className="h-4 bg-dark-bg rounded-full overflow-hidden border-2 border-yellow-500/30">
                        <div
                          className={`h-full ${statColor} transition-all duration-1000 ease-out shadow-lg`}
                          style={{
                            width: `${percentage}%`,
                            transitionDelay: `${index * 100}ms`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-8 pt-6 border-t-2 border-yellow-500/20">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-body">TOTAL</span>
                  <span className="text-yellow-500 font-display text-xl">
                    {pokemon.stats.reduce(
                      (sum, stat) => sum + stat.base_stat,
                      0
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
