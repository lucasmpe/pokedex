import Pokemon from "../entidades/pokemon.js";
import PokemonsList from "../entidades/pokemonslist.js";

export default function mapper(responseApi, endPoint) {
  return isNaN(endPoint) ? mapperPokemonsList(responseApi) : mapperPokemon(responseApi);
}

function mapperPokemon(responseApi) {
  const {
    id,
    name,
    height,
    weight,
    sprites: { other: { 'official-artwork': { front_default: picture } } },
    types
  } = responseApi;
  return new Pokemon(
    id,
    name,
    height,
    weight,
    picture,
    types.map((item) => item.type.name)
  );
}

function mapperPokemonsList(responseApi) {
  const {
    results,
    previous: previousPage,
    next: nextPage,
    count
  } = responseApi;
  return new PokemonsList(
    results.map((item) => ({'name': item.name, 'id': item.url.split('pokemon')[1].replaceAll('/', '')})),
    previousPage,
    nextPage,
    count
  );
}
