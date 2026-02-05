export interface PokemonListResponse {
  count: number;
  next: string;
  previous: string;
  results: PokemonListData[];
}

export interface PokemonListData {
  name: string;
  url: string;
}

interface NameUrlInterface {
  name: string;
  url: string;
}

interface Sprites {
  front_default: string;
}

interface Type {
  slot: number;
  type: NameUrlInterface;
}

interface Stat {
  base_stat: number;
  effort: number;
  stat: NameUrlInterface;
}

export interface PokemonDetail {
  id: number;
  name: string;
  sprites: Sprites;
  height: number;
  weight: number;
  types: Type[];
  stats: Stat[];
}