import { getPokemons } from './api.js';

import {
  $pokemonList,
  generateEndPonint,
  createList,
  updateItemActive,
  getActiveItem,
  createCard,
  showCard,
  updatePageNumber       
} from './ui.js';

function listPokemons() {
  getPokemons(generateEndPonint()).then((response) => createList(response));
}

function handlerListPokemons() {
  $pokemonList.firstElementChild.onclick = function (e) {
    updateItemActive(e);
    getPokemons(getActiveItem().id)
      .then((response) => {
        createCard(response);
        showCard();
      });
  };

  $pokemonList.lastElementChild.onclick = function (e) {
    updatePageNumber(e);
    listPokemons();
  };
}

function initialize() {
  listPokemons();
  handlerListPokemons();
}

initialize();
