/// <reference types="Cypress" />

describe('Pokedex', () => {

  before(() => {
    cy.intercept('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10', { fixture: 'listado-pagina-1.json' })
      .as('primeraPagina');
    cy.visit('http://127.0.0.1:8080');
  });

  it('Carga la primera página', () => {
    const POKEMONS_PER_PAGE = 10;

    cy.get('.list-group-item')
      .should('have.length', POKEMONS_PER_PAGE);

    cy.get('.list-group-item:nth(0)').should('have.text', 'BULBASAUR');

    cy.get('#card').should('have.class', 'invisible');
  });

  it('Carga un pokemon cuando se lo selecciona de la lista', () => {
    const COUNT_TYPES = 2;

    cy.intercept('https://pokeapi.co/api/v2/pokemon/1/', { fixture: 'bulbasaur.json' })
      .as('bulbasaur');
    
    cy.get('.list-group-item:first')
      .click();

    cy.get('#card').should('not.have.class', 'invisible');

    cy.get('.type span').should('have.length', COUNT_TYPES);
  });

  it('Usa el paginador', () => {
    
    cy.intercept('https://pokeapi.co/api/v2/pokemon/?offset=10&limit=10', { fixture: 'listado-pagina-2.json' })
      .as('segundaPagina');

    cy.get('.next')
      .click();

    cy.get('.list-group-item:nth(0)').should('have.text', 'METAPOD');

  });

});
