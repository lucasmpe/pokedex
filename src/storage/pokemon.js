function getKey(endPoint) {
  if (isNaN(endPoint)) {
    const offset = endPoint.split('&')[0].split('=')[1];
    const limit = endPoint.split('&')[1].split('=')[1];
    return `pokemons_${offset}_${limit}`;
  } else {
    return `pokemon_${endPoint}`;
  }
}

export function getPokemons(endPoint) {
  const pokemons = JSON.parse(localStorage.getItem(getKey(endPoint)));
  if (pokemons === null) {
    throw new Error(`Pokemon no encontrado`);
  }
  return pokemons;
}

export function savePokemons(endPoint, pokemons) {
  if (typeof pokemons !== 'object') {
    throw new Error('Se necesita un pokemon para guardar en localStorage');
  }
  try {
    localStorage.setItem(getKey(endPoint), JSON.stringify(pokemons));
  } catch (e) {
    console.log(e, 'No se pudo almacenar localmente.');
  }
  
}
