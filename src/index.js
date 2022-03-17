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

async function updateList() {
  listPokemons(await getPokemons(generateEndPoint()), updateCard);
}

function initialize() {
  updateList();
  updatePage(updateList);
}

// async function initialize() {
//   listPokemons(await getPokemons(generateEndPoint()), updateCard);
//   updatePage(initialize);
// }

initialize();
