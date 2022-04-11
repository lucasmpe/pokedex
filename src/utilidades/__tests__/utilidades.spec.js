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
