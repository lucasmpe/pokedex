import { BASE_URL } from './api.js';

export const $pokemonList = document.querySelector('.list');

export function createList(response) {
    $pokemonList.firstElementChild.innerHTML = '';
    response.results.forEach((pokemon) => createItemList(pokemon));
    $pokemonList.dataset.nextPage = response.next;
    $pokemonList.dataset.previousPage = response.previous;
}

export function generateEndPonint() {
    const page = $pokemonList.dataset.pageNumber;
    const limit = 10;
    const offset = (page - 1) * limit;
    return `?offset=${offset}&limit=${limit}`;
}

function createItemList(pokemon) {
    const $item = document.createElement('a');
    $item.id = pokemon.url.replace(BASE_URL, '').split('/')[0];
    $item.href = '#card';
    $item.classList = 'list-group-item list-group-item-action';
    $item.innerHTML = pokemon.name.toUpperCase();
    $pokemonList.firstElementChild.appendChild($item);
}

export function updateItemActive(event) {
    const $activeItem = document.querySelector('.list-group-item.active');
    $activeItem ? changeActiveItem(event.target) : setActiveItem(event.target);
}

export function updatePageNumber(event) {
    if (event.target.classList.contains('previous') && $pokemonList.dataset.previousPage !== "null") {
        $pokemonList.dataset.pageNumber--;
    }
    if (event.target.classList.contains('next') && $pokemonList.dataset.nextPage !== "null") {
        $pokemonList.dataset.pageNumber++;
    }
}

export function getActiveItem() {
    return document.querySelector('.list-group-item.active');
}

function setActiveItem(item) {
    item.classList.add('active');
}

function changeActiveItem(selectedItem) {
    getActiveItem().classList.remove('active');
    setActiveItem(selectedItem);
}

export function showCard() {
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
        $type.innerHTML = type.type.name;
        $typeList.appendChild($type);
    });
}

export function createCard(pokemon) {
    setNameCard(pokemon.name, pokemon.id);
    setImageCard(pokemon.sprites.other['official-artwork'].front_default);
    setAbilityCard(pokemon.height, pokemon.weight);
    setTypeCard(pokemon.types);
}
