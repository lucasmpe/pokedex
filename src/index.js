import { generateEndPoint, getPokemons } from './api.js';

import {
  getPageNumber,
  listPokemons,
  showCard,
  updatePage
} from './ui.js';

async function updateCard(id) {
  showCard(await getPokemons(id));
}

async function updateList() {
  listPokemons(await getPokemons(generateEndPoint(getPageNumber())), updateCard);
}

function initialize() {
  updateList();
  updatePage(updateList);
}

initialize();
