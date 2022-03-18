export const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

export async function getPokemons(endPoint) {
    const response = await fetch(BASE_URL + endPoint);
    return await response.json();
}

export function generateEndPoint(pageNumber) {
    const limit = 10;
    const offset = (pageNumber - 1) * limit;
    return `?offset=${offset}&limit=${limit}`;
}
