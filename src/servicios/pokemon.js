import * as api from '../api/pokemon.js';
import * as localStorage from '../storage/pokemon.js'
import mapper from '../mapeadores/pokemon.js';

export default async function getPokemons(endPoint) {
  if (endPoint === undefined) {
    throw new Error('Se necesita un endpoint para cargar pokemones');
  }

  let pokemons;

  try {
    pokemons = localStorage.getPokemons(endPoint);
  } catch (e) {
    const response = await api.getPokemons(endPoint);
    pokemons = mapper(response, endPoint);
    localStorage.savePokemons(endPoint, pokemons);
  }
  return pokemons;
}
