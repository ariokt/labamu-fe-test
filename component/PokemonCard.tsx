import Image from "next/image";
import React from "react";

interface PokemonCardProps {
  pokemon: {
    name: string;
    url: string;
  };
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const id = pokemon.url.split('/').filter(Boolean).at(-1);

  return (
    <div className="flex flex-col items-center shadow rounded-xl p-2 bg-[#E1F9EA]">
      <div className="bg-white rounded-2xl mb-2">
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          alt={pokemon.name}
          width={200}
          height={200}
        />
      </div>
      <p className="text-gray-400">No. {id}</p>
      <p className="text-md">
        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
      </p>
    </div>
  );
};

export default PokemonCard;
