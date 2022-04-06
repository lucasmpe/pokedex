export const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

export async function getPokemons(endPoint) {
    const response = await fetch(BASE_URL + endPoint);
    return await response.json();
}
