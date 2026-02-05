import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2';

export const getPokemonList = async (url = `${API_URL}/pokemon?limit=12`) => {
  const response = await axios.get(url);
  return response.data;
};

export const getPokemonDetail = async (name: string) => {
  const response = await axios.get(`${API_URL}/pokemon/${name}`);
  return response.data;
};