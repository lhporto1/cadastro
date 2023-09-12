/// <reference types="cypress" />

describe('cadastro', ()=> {
it('deve cadastrar um novo usuário', ()=> {
    cy.visit('index.html')

    cy.get('#name').type('João da Silva')
    cy.get('input[placeholder="joao.silva@email.com"]').type('joao@email.com')
    cy.get('#password').type('senha12345678');
    
    cy.contains('button', "Cadastrar").click()
})

})