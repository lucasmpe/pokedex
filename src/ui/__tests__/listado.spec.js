/*
 * @jest-environment jsdom
 */

/// <reference types = "Jest" />

import listPokemons from "../listado.js";
import listPage1 from '../../../cypress/fixtures/listado-pagina-1.json';
import fixture from '../../__tests__/pokedex.fixture.js';

test('Lista pokemones', () => {
  document.body.innerHTML = fixture;
  listPokemons(listPage1, () => {});
  expect(document.querySelectorAll('.list-group-item').length).toBe(10);
});
