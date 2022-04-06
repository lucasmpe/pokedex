export default function showCard(pokemon) {
    setNameCard(pokemon.name, pokemon.id);
    setImageCard(pokemon.sprites.other['official-artwork'].front_default);
    setAbilityCard(pokemon.height, pokemon.weight);
    setTypeCard(pokemon.types);
    document.querySelector('#card').classList.remove('invisible');
}

const $cardPokemon = document.querySelector('.card-pokemon');

function setNameCard(name, id) {
    $cardPokemon.querySelector('.name h3').innerText = `${name.charAt(0).toUpperCase() + name.slice(1)} N° ${id}`;
}

function setImageCard(image) {
    $cardPokemon.querySelector('.image img').src = image;
}

function setAbilityCard(height, weight) {
    const $ability = $cardPokemon.querySelectorAll('.ability-info tbody > tr > td');
    $ability[0].innerText = `${height / 10} m`;
    $ability[1].innerText = `${weight / 10} kg`;
}

function setTypeCard(types) {
    const $types = $cardPokemon.querySelector('.type');
    $types.innerHTML = '';
    types.forEach((type) => {
        const $type = document.createElement('span');
        $type.className = `badge ${type.type.name} type`;
        $type.textContent = type.type.name;
        $types.appendChild($type);
    });
}
