import getPokemons from './servicios/pokemon.js';
import { generateEndPoint } from './utilidades/utilidades.js';
import showCard from './ui/pokemon.js';
import listPokemons from './ui/listado.js';
import updatePage from './ui/paginador.js';

async function updateCard(id) {
  showCard(await getPokemons(id));
}

async function updateList() {
  listPokemons(await getPokemons(generateEndPoint()), updateCard)
    .catch((e) => console.error(e));
}

function initialize() {
  updateList();
  updatePage(updateList);
}

initialize();
