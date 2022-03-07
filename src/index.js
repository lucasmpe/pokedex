const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
const $pokemonList = document.querySelector('.list');
const $cardPokemon = document.querySelector('.card-pokemon');
let $activeItem = null;

function getPokemons(endPoint = '?offset=0&limit=10') {
    fetch(BASE_URL + endPoint)
        .then(response => response.json())
        .then(response => {
            listPokemons(response.results);
            handlerListPokemons(response);
        })
        .catch(error => console.error(error));
}

function getPokemon(name) {
    fetch(BASE_URL + name)
        .then(response => response.json())
        .then(response => showPokemon(response))
        .catch(error => console.error(error));
}

function listPokemons(pokemons) {
    $pokemonList.firstElementChild.innerHTML = "";
    pokemons.forEach((pokemon) => createItemList(pokemon));
 
}

function createItemList(pokemon) {    
    const $item = document.createElement('a');
    $item.href = '#card';
    $item.classList = 'list-group-item list-group-item-action';
    $item.innerHTML = pokemon.name.toUpperCase();
    $pokemonList.firstElementChild.appendChild($item);
}

function handlerListPokemons(response) {
    $pokemonList.firstElementChild.onclick = function(e) {
       $activeItem ? changeActiveItem(e.target) : setActiveItem(e.target);
       getPokemon($activeItem.innerText.toLowerCase());
    };

    $pokemonList.lastElementChild.onclick = function(e) {
        if (e.target.classList.contains('previous') && response.previous) {
            getPokemons(response.previous.replace(BASE_URL, ''));
        }    
        if (e.target.classList.contains('next') && response.next) {
            getPokemons(response.next.replace(BASE_URL, ''));
        }
    };
}

function setActiveItem(item) {
    item.classList.add('active');
    $activeItem = item;
}

function changeActiveItem(selectedItem) {
    $activeItem.classList.remove('active');
    setActiveItem(selectedItem);
}

function showPokemon(pokemon) {
    const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    const image = pokemon.sprites.other['official-artwork'].front_default;
    const $ability = $cardPokemon.querySelectorAll('.ability-info tbody > tr > td');
    const $typeList = $cardPokemon.querySelector('.type ul')

    $cardPokemon.querySelector('.name h3').innerText = `${name} N° ${pokemon.id}`;
    
    $cardPokemon.querySelector('.image img').src = image;
    $cardPokemon.querySelector('.image img').alt = name;

    $ability[0].innerText = `${pokemon.height/10} m`;
    $ability[1].innerText = `${pokemon.weight/10} kg`;

    $typeList.innerHTML = "";
    pokemon.types.forEach((type) => {
        const $type = document.createElement('li');
        $type.innerHTML = type.type.name;
        $typeList.appendChild($type);
    });
   
}

getPokemons();
handlerListPokemons();
