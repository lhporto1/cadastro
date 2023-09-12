/// <reference types="cypress" />

import {faker} from '@faker-js/faker'

describe('Cadastro de Usuários - Validações', ()=> {
    before(() => {
        cy.visit('index.html')
    }),

    it('Tela 1 - Visitar a página e verificar campos', ()=> {
        cy.title().should('be.equal', 'Cadastro de Usuários')
        cy.get('h1').should('have.text', 'Cadastro de usuários')
        cy.get('p').should('have.text', 'Para realizar o cadastro de um usuário, insira dados válidos no formulário e acione a opção Cadastrar :)')
        cy.get(':nth-child(2) > label').should('have.text', 'Nome')
        cy.get('#name').should('be.visible')
        cy.get(':nth-child(3) > label').should('have.text', 'E-mail')
        cy.get('#email').should('be.visible')
        cy.get(':nth-child(4) > label').should('have.text', 'Senha')
        cy.get('#password').should('be.visible')
        cy.get('button')
            .should('be.visible')
            .should('contain', 'Cadastrar')
        cy.get('#userTableWrapper').should('not.be.visible')
    }),

    it('Tela 2 - Obrigatoriedade campo Nome', () => {
        const randomEmail = faker.internet.email()
        const randomPassword = faker.internet.password()

        cy.get('input[placeholder="joao.silva@email.com"]').type(randomEmail, {delay: 100})
        cy.get('#password').type(randomPassword, {delay: 100})

        cy.contains('button', "Cadastrar").click()

        cy.get('#nameError')
            .should('be.visible')
            .should('contain', 'O campo Nome é obrigatório.')
        
        cy.get('#userTableWrapper').should('not.be.visible')
    }),

    it('Tela 3 - Obrigatoriedade campo E-mail', () => {
        cy.reload()
        const randomName = faker.person.fullName()
        const randomPassword = faker.internet.password()

        cy.get('#name').type(randomName, {delay: 100})
        cy.get('#password').type(randomPassword, {delay: 100})

        cy.contains('button', "Cadastrar").click()

        cy.get('#emailError')
            .should('be.visible')
            .should('contain', 'O campo E-mail é obrigatório.')
        
        cy.get('#userTableWrapper').should('not.be.visible')
    }),

    it('Tela 4 - Obrigatoriedade campo Senha', () => {
        cy.reload()
        const randomName = faker.person.fullName()
        const randomEmail = faker.internet.email()

        cy.get('#name').type(randomName, {delay: 100})
        cy.get('input[placeholder="joao.silva@email.com"]').type(randomEmail, {delay: 100})

        cy.contains('button', "Cadastrar").click()

        cy.get('#passwordError')
            .should('be.visible')
            .should('contain', 'O campo Senha é obrigatório.')
        
        cy.get('#userTableWrapper').should('not.be.visible')
    }),

    it('Tela 5 - Obrigatoriedade de todos os campos', () => {
        cy.reload()
        cy.contains('button', "Cadastrar").click()

        cy.get('#nameError')
            .should('be.visible')
            .should('contain', 'O campo Nome é obrigatório.')

        cy.get('#emailError')
            .should('be.visible')
            .should('contain', 'O campo E-mail é obrigatório.')

        cy.get('#passwordError')
            .should('be.visible')
            .should('contain', 'O campo Senha é obrigatório.')
        
        cy.get('#userTableWrapper').should('not.be.visible')
    }),

    it('Tela 6 - Obrigatoriedade Nome completo', () => {
        cy.reload()
        const randomName = faker.person.firstName()
        const randomEmail = faker.internet.email()
        const randomPassword = faker.internet.password()

        cy.get('#name').type(randomName, {delay: 100})
        cy.get('input[placeholder="joao.silva@email.com"]').type(randomEmail, {delay: 100})
        cy.get('#password').type(randomPassword, {delay: 100})

        cy.contains('button', "Cadastrar").click()

        cy.get('#nameError')
            .should('be.visible')
            .should('contain', 'Por favor, insira um nome completo.')
        
        cy.get('#userTableWrapper').should('not.be.visible')
    }),

    it('Tela 7 - Validar E-mail digitado', () => {
        cy.reload()
        const randomName = faker.person.fullName()
        const randomPassword = faker.internet.password()

        cy.get('#name').type(randomName, {delay: 100})
        cy.get('#email').type('email.com.br', {delay: 100})
        cy.get('#password').type(randomPassword, {delay: 100})

        cy.contains('button', "Cadastrar").click()

        cy.get('#emailError')
            .should('be.visible')
            .should('contain', 'Por favor, insira um e-mail válido.')
        
        cy.get('#userTableWrapper').should('not.be.visible')
    }),

    it('Tela 8 - Verificar se Senha tem mais de 8 caracteres', () => {
        cy.reload()
        const randomName = faker.person.fullName()
        const randomEmail = faker.internet.email()

        cy.get('#name').type(randomName, {delay: 100})
        cy.get('input[placeholder="joao.silva@email.com"]').type(randomEmail, {delay: 100})
        cy.get('#password').type('1234567', {delay: 100})

        cy.contains('button', "Cadastrar").click()

        cy.get('#passwordError')
            .should('be.visible')
            .should('contain', 'A senha deve conter pelo menos 8 caracteres.')
        
        cy.get('#userTableWrapper').should('not.be.visible')
    }),

    it('Tela 9 - Deve cadastrar um novo usuário com sucesso', ()=> {
        cy.reload()
        const randomName = faker.person.fullName()
        const randomEmail = faker.internet.email()
        const randomPassword = faker.internet.password()
    
        cy.get('#name').type(randomName, {delay: 100})
        cy.get('input[placeholder="joao.silva@email.com"]').type(randomEmail, {delay: 100})
        cy.get('#password').type(randomPassword, {delay: 100})
    
        cy.contains('button', "Cadastrar").click()
    
        cy.get('#userTableWrapper').should('be.visible')
    
        cy.get('tbody tr').should('have.length', 1)
        cy.get('tbody tr td').eq(1).should('contain', randomName)
        cy.get('tbody tr td').eq(2).should('contain', randomEmail)
    }),
    
    it('Tela 10 - Deve cadastrar um segundo usuário com sucesso', ()=> {
        const randomName = faker.person.fullName()
        const randomEmail = faker.internet.email()
        const randomPassword = faker.internet.password()
    
        cy.get('#name').type(randomName, {delay: 100})
        cy.get('input[placeholder="joao.silva@email.com"]').type(randomEmail, {delay: 100})
        cy.get('#password').type(randomPassword, {delay: 100})
    
        cy.contains('button', "Cadastrar").click()

        cy.get('tbody tr').should('have.length', 2)

    }),

    it('Tela 11 - Deve excluir sem interferir nos demais ids ou ordenação', ()=> {
        cy.get(':nth-child(1) > :nth-child(4) > a').click()
        cy.get('tbody tr').should('have.length', 1)
        cy.get('tbody tr td').eq(0).should('contain', 2)
    })

})