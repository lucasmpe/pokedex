/**
 * @typedef {import('../entidades/pokemonslist').default} PokemonsList
 */

import PokemonsList from "../entidades/pokemonslist.js";
import { getActiveItem, changeActiveItem, setActiveItem  } from "../utilidades/utilidades.js";

/**
 * @param {PokemonsList} pokemonsList 
 * @param {*} callbackSelectPokemon 
 */

export default function listPokemons(pokemonsList, callbackSelectPokemon) {
    const $pokemonList = document.querySelector('.list');
    $pokemonList.firstElementChild.innerHTML = '';
    pokemonsList.pokemons.forEach((pokemonOfList) => createItemList(pokemonOfList, callbackSelectPokemon));
    $pokemonList.dataset.nextPage = pokemonsList.nextPage;
    $pokemonList.dataset.previousPage = pokemonsList.previousPage;
    $pokemonList.dataset.count = pokemonsList.count;
}

function createItemList(pokemonOfList, callbackSelectPokemon) {
    const $pokemonList = document.querySelector('.list');
    const $item = document.createElement('a');
    $item.id = pokemonOfList.id;
    $item.href = '#card';
    $item.classList = 'list-group-item list-group-item-action';
    $item.innerHTML = pokemonOfList.name.toUpperCase();
    $item.addEventListener('click', () => {
        getActiveItem() ? changeActiveItem($item) : setActiveItem($item);
        callbackSelectPokemon($item.id);
    });
    $pokemonList.firstElementChild.appendChild($item);
}
