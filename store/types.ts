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

