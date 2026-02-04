import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2';

export const getPokemonList = async (url = `${API_URL}/pokemon?limit=12`) => {
  const response = await axios.get(url);
  return response.data;
};