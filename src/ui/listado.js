import { getActiveItem, changeActiveItem, setActiveItem  } from "../utilidades/utilidades.js";

export default function listPokemons(response, callbackSelectPokemon) {
    const $pokemonList = document.querySelector('.list');
    $pokemonList.firstElementChild.innerHTML = '';
    response.results.forEach((pokemon) => createItemList(pokemon, callbackSelectPokemon));
    $pokemonList.dataset.nextPage = response.next;
    $pokemonList.dataset.previousPage = response.previous;
    $pokemonList.dataset.count = response.count;
}

function createItemList(pokemon, callbackSelectPokemon) {
    const $pokemonList = document.querySelector('.list');
    const $item = document.createElement('a');
    $item.id = pokemon.url.split('pokemon')[1].replaceAll('/', '');
    $item.href = '#card';
    $item.classList = 'list-group-item list-group-item-action';
    $item.innerHTML = pokemon.name.toUpperCase();
    $item.addEventListener('click', () => {
        getActiveItem() ? changeActiveItem($item) : setActiveItem($item);
        callbackSelectPokemon($item.id);
    });
    $pokemonList.firstElementChild.appendChild($item);
}
