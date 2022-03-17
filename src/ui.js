import { BASE_URL } from './api.js';

const $pokemonList = document.querySelector('.list');

export function listPokemons(response, callbackSelectPokemon) {
    $pokemonList.firstElementChild.innerHTML = '';
    response.results.forEach((pokemon) => createItemList(pokemon, callbackSelectPokemon));
    $pokemonList.dataset.nextPage = response.next;
    $pokemonList.dataset.previousPage = response.previous;
}

export function generateEndPoint() {
    const page = $pokemonList.dataset.pageNumber;
    const limit = 10;
    const offset = (page - 1) * limit;
    return `?offset=${offset}&limit=${limit}`;
}

function createItemList(pokemon, callbackSelectPokemon) {
    const $item = document.createElement('a');
    $item.id = pokemon.url.replace(BASE_URL, '').split('/')[0];
    $item.href = '#card';
    $item.classList = 'list-group-item list-group-item-action';
    $item.innerHTML = pokemon.name.toUpperCase();
    $item.addEventListener('click', () => {
        getActiveItem() ? changeActiveItem($item) : setActiveItem($item);
        callbackSelectPokemon($item.id);
    });
    $pokemonList.firstElementChild.appendChild($item);
}

export function updatePage(callbackSelectPage) {
    document.querySelector('.pagination').addEventListener('click', (e) => {
        console.log(e, e.target);
        if (e.target.classList.contains('previous') && $pokemonList.dataset.previousPage !== "null") {
            $pokemonList.dataset.pageNumber--;
        }
        if (e.target.classList.contains('next') && $pokemonList.dataset.nextPage !== "null") {
            $pokemonList.dataset.pageNumber++;
        }
    });
    callbackSelectPage;
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

export function showCard(pokemon) {
    setNameCard(pokemon.name, pokemon.id);
    setImageCard(pokemon.sprites.other['official-artwork'].front_default);
    setAbilityCard(pokemon.height, pokemon.weight);
    setTypeCard(pokemon.types);
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
