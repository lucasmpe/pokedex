export default class PokemonsList {

  /**
   * @param {Array<Object<String, String>>} pokemons
   * @param {String} previousPage
   * @param {String} nextPage
   * @param {Number} count
   */

  constructor(pokemons, previousPage, nextPage, count) {
    this.pokemons = pokemons;
    this.previousPage = previousPage;
    this.nextPage = nextPage;
    this.count = count;
  }
}