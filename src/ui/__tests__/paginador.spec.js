/*
 * @jest-environment jsdom
 */

/// <reference types = "Jest" />

import updatePage from '../paginador.js';
import fixture from '../../__tests__/pokedex.fixture.js'

beforeEach(() => {
  document.body.innerHTML = fixture;
  const mockCallBack = jest.fn();
  updatePage(mockCallBack);
});

describe('Actualiza el paginador al hacer click en next', () => {
 
  test('Actualiza el ítem activo', () => {
    document.querySelector('.pagination > li > .next').click();
    expect(document.querySelector('.page-item.numeric.active > .page-link').textContent).toBe('2');
  });

  test('Habilita los atajos previous y primera página', () => {
    document.querySelector('.pagination > li > .next').click();
    expect(document.querySelector('.pagination .previous').parentElement.classList.contains('disabled')).toBeFalsy();
    expect(document.querySelector('.pagination .start').parentElement.classList.contains('disabled')).toBeFalsy();
  });

  test('Actualiza ítems numéricos al hacer 3 veces click', () => {
    for (let i=0; i<3; i++) {
      document.querySelector('.pagination > li > .next').click();
    }
    const numericItems = document.querySelectorAll('.pagination .numeric');
    expect(numericItems[0].textContent).toBe('2');
    expect(numericItems[1].textContent).toBe('3');
    expect(numericItems[2].textContent).toBe('4');
  });
});

describe('Actualiza el paginador al hacer click en el atajo última página', () => {

  test('Actualiza el ítem activo', () => {
    document.querySelector('.pagination > li > .end').click();
    expect(document.querySelector('.page-item.numeric.active > .page-link').textContent).toBe('113');
  });

  test('Deshabilita los atajos next y última página', () => {
    document.querySelector('.pagination > li > .end').click();
    expect(document.querySelector('.pagination .next').parentElement.classList.contains('disabled')).toBeTruthy();
    expect(document.querySelector('.pagination .end').parentElement.classList.contains('disabled')).toBeTruthy();
  });

  test('Actualiza los ítems numéricos', () => {
    document.querySelector('.pagination > li > .end').click();
    const numericItems = document.querySelectorAll('.pagination .numeric');
    expect(numericItems[0].textContent).toBe('111');
    expect(numericItems[1].textContent).toBe('112');
    expect(numericItems[2].textContent).toBe('113');
  });
});

test('Deshabilita atajos al hacer click en previous', () => {
  document.querySelector('.pagination > li > .next').click();
  document.querySelector('.pagination > li > .previous').click();
  expect(document.querySelector('.pagination .previous').parentElement.classList.contains('disabled')).toBeTruthy();
  expect(document.querySelector('.pagination .start').parentElement.classList.contains('disabled')).toBeTruthy();
});

test('Actualiza ítem activo al hacer click sobre ítem numérico', () => {
  document.querySelector('.pagination > li:nth-child(5)').click();
  expect(document.querySelector('.page-item.numeric.active > .page-link').textContent).toBe('3');
});

test('Actualiza ítems númericos al hacer click en previous', () => {
  document.querySelector('.pagination > li > .end').click();
  for (let i=0; i<3; i++) {
    document.querySelector('.pagination > li > .previous').click();
  }
  const numericItems = document.querySelectorAll('.pagination .numeric');
  expect(numericItems[0].textContent).toBe('110');
  expect(numericItems[1].textContent).toBe('111');
  expect(numericItems[2].textContent).toBe('112');
});

test('Actualiza ítems númericos al hacer click en el atajo primera página', () => {
  document.querySelector('.pagination > li > .end').click();
  document.querySelector('.pagination > li > .start').click();
  const numericItems = document.querySelectorAll('.pagination .numeric');
  expect(numericItems[0].textContent).toBe('1');
  expect(numericItems[1].textContent).toBe('2');
  expect(numericItems[2].textContent).toBe('3');
});
