/// <reference types="cypress" />

describe('template spec', () => {
  it('Acessar formulário', () => {
    cy.visit('index.html')
    cy.title().should('eq', 'Cadastro de Usuários')
  })
})