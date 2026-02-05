import React from 'react';

interface TagPokemonTypeProps {
  pokemonType: string;
}

const TagPokemonType: React.FC<TagPokemonTypeProps> = ({ pokemonType }) => {
  let bgColor = '';

  switch (pokemonType) {
    case 'normal':
      bgColor = '#A8A77A';
      break;
    case 'fire':
      bgColor = '#EE8130';
      break;
    case 'water':
      bgColor = '#6390F0';
      break;
    case 'electric':
      bgColor = '#F7D02C';
      break;
    case 'grass':
      bgColor = '#7AC74C';
      break;
    case 'ice':
      bgColor = '#96D9D6';
      break;
    case 'fighting':
      bgColor = '#C22E28';
      break;
    case 'poison':
      bgColor = '#A33EA1';
      break;
    case 'ground':
      bgColor = '#E2BF65';
      break;
    case 'flying':
      bgColor = '#A98FF3';
      break;
    case 'psychic':
      bgColor = '#F95587';
      break;
    case 'bug':
      bgColor = '#A6B91A';
      break;
    case 'rock':
      bgColor = '#B6A136';
      break;
    case 'ghost':
      bgColor = '#735797';
      break;
    case 'dragon':
      bgColor = '#6F35FC';
      break;
    case 'dark':
      bgColor = '#705746';
      break;
    case 'steel':
      bgColor = '#B7B7CE';
      break;
    case 'fairy':
      bgColor = '#D685AD';
      break;
    default:
      bgColor = 'black';
  }

  return (
    <div className={`px-6 py-3 rounded-xl text-sm font-bold shadow-xl text-white`} style={{ backgroundColor: bgColor }}>
      {pokemonType}
    </div>
  );
};

export default TagPokemonType;