export default class Pokemon {

/**
 * @param {Number} id
 * @param {String} name
 * @param {Number} height
 * @param {Number} weight
 * @param {String} picture
 * @param {Array<String>} types
 */

  constructor(id, name, height, weight, picture, types = []) {
    this.id = id;
    this.name = name;
    this.height = height;
    this.weight = weight;
    this.picture = picture;
    this.types = types; 
  }
}