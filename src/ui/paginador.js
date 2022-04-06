export default function updatePage(callbackSelectPage) {
    const $pokemonList = document.querySelector('.list');
    document.querySelector('.pagination').addEventListener('click', (e) => {
        if (e.target.classList.contains('previous') && $pokemonList.dataset.previousPage !== "null") {
            $pokemonList.dataset.pageNumber--;
        }
        if (e.target.classList.contains('next') && $pokemonList.dataset.nextPage !== "null") {
            $pokemonList.dataset.pageNumber++;
        }
        callbackSelectPage();
    });
}
