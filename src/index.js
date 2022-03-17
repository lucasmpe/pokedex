import { getPokemons } from './api.js';

import {
  generateEndPoint,
  listPokemons,
  showCard,
  updatePage
} from './ui.js';

async function updateCard(id) {
  showCard(await getPokemons(id));
}

async function initialize() {
  listPokemons(await getPokemons(generateEndPoint()), updateCard);
  updatePage();
}

initialize();
