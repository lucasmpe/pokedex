const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
const $pokemonList = document.querySelector('.list');

async function getPokemons(endPoint) {
  const response = await fetch(BASE_URL + endPoint);
  return await response.json();
}

function createItemList(pokemon) {
  const $item = document.createElement('a');
  $item.id = pokemon.url.replace(BASE_URL, '').split('/')[0];
  $item.href = '#card';
  $item.classList = 'list-group-item list-group-item-action';
  $item.innerHTML = pokemon.name.toUpperCase();
  $pokemonList.firstElementChild.appendChild($item);
}

function generateEndPonint() {
  const page = $pokemonList.dataset.pageNumber;
  const limit = 10;
  const offset = (page-1)*limit;
  return `?offset=${offset}&limit=${limit}`;
}

function listPokemons() {
  $pokemonList.firstElementChild.innerHTML = '';
  getPokemons(generateEndPonint()).then((response) => {
    response.results.forEach((pokemon) => createItemList(pokemon));
    $pokemonList.dataset.nextPage = response.next;
    $pokemonList.dataset.previousPage = response.previous;
  });
}

function handlerListPokemons() {

  $pokemonList.firstElementChild.onclick = function (e) {
    const $activeItem = document.querySelector('.list-group-item.active');
    $activeItem ? changeActiveItem(e.target) : setActiveItem(e.target);
    getPokemons(getActiveItem().id)
      .then((response) => {
        createCard(response);
        showCard();
      });
  };

  $pokemonList.lastElementChild.onclick = function (e) {
    if (e.target.classList.contains('previous') && $pokemonList.dataset.previousPage !== "null") {
      $pokemonList.dataset.pageNumber--;
    }
    if (e.target.classList.contains('next') && $pokemonList.dataset.nextPage !== "null") {
      $pokemonList.dataset.pageNumber++;
    }
    listPokemons();
  };
}

function getActiveItem() {
  return document.querySelector('.list-group-item.active');
}

function setActiveItem(item) {
  item.classList.add('active');
}

function changeActiveItem(selectedItem) {
  getActiveItem().classList.remove('active');
  setActiveItem(selectedItem);
}

function showCard() {
  document.querySelector('#card').classList.remove('invisible');
}

function setNameCard(name, id) {
  const $cardPokemon = document.querySelector('.card-pokemon');
  $cardPokemon.querySelector('.name h3').innerText = `${name.charAt(0).toUpperCase() + name.slice(1)} N° ${id}`;
}

function setImageCard(image) {
  const $cardPokemon = document.querySelector('.card-pokemon');
  $cardPokemon.querySelector('.image img').src = image;
}

function setAbilityCard(height, weight) {
  const $cardPokemon = document.querySelector('.card-pokemon');
  const $ability = $cardPokemon.querySelectorAll('.ability-info tbody > tr > td');
  $ability[0].innerText = `${height / 10} m`;
  $ability[1].innerText = `${weight / 10} kg`;
}

function setTypeCard(types) {
  const $cardPokemon = document.querySelector('.card-pokemon');
  const $typeList = $cardPokemon.querySelector('.type ul');
  $typeList.innerHTML = '';
  types.forEach((type) => {
    const $type = document.createElement('li');
    $type.innerHTML = type.name;
    $typeList.appendChild($type);
  });
}

function createCard(pokemon) {
  setNameCard(pokemon.name, pokemon.id);
  setImageCard(pokemon.sprites.other['official-artwork'].front_default);
  setAbilityCard(pokemon.height, pokemon.weight);
  setTypeCard(pokemon.types);
}

function initialize() {
  listPokemons();
  handlerListPokemons();
}

initialize();
