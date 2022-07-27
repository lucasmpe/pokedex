/*
 * @jest-environment jsdom
 */

/// <reference types = "Jest" />

import {
  generateEndPoint,
  getActiveItem,
  setActiveItem,
  changeActiveItem
} from '../utilidades.js';

test('Genera endpoint según dataset', () => {
  document.body.innerHTML = '<div class="list" data-page-number="1"></div>';
  expect(generateEndPoint()).toBe('?offset=0&limit=10');
});

test('Devuelve el ítem activo de la lista', () => {
  document.body.innerHTML = '<a id="1" class="list-group-item list-group-item-action active" href="#card">BULBASAUR</a>';
  expect(getActiveItem().textContent).toBe('BULBASAUR');
});

test('Marca el ítem pasado por parámetro como activo', () => {
  document.body.innerHTML = '<a id="1" class="list-group-item list-group-item-action" href="#card">BULBASAUR</a>';
  const item = document.querySelector('.list-group-item')
  setActiveItem(item);
  expect(item.classList.contains('active')).toBe(true);
});

test('Cambia el ítem activo', () => {
  document.body.innerHTML = '<a id="1" class="list-group-item list-group-item-action active" href="#card">BULBASAUR</a>'
    + '<a id="2" class="list-group-item list-group-item-action" href="#card">IVYSAUR</a>';
  const selctedItem = document.querySelectorAll('.list-group-item')[1];
  changeActiveItem(selctedItem);
  expect(selctedItem.classList.contains('active')).toBe(true);
});
