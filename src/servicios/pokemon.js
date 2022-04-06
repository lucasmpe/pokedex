import * as api from '../api/pokemon.js';
import * as localStorage from '../storage/pokemon.js'

export default async function getPokemons(endPoint) {
  if (endPoint === undefined) {
    throw new Error('Se necesita un endpoint para cargar pokemones');
  }

  let pokemons;

  try {
    pokemons = localStorage.getPokemons(endPoint);
  } catch (e) {
    pokemons = await api.getPokemons(endPoint);
    localStorage.savePokemons(endPoint, pokemons);
  }
  return pokemons;
}
