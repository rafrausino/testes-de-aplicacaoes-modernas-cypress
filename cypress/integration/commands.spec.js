/// <reference types="cypress"/>

describe('Work with commands', () => {
    before( () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    beforeEach( () => {
        cy.reload()
    })

    it('Alert', () => {
        cy.clickAlert('#alert', 'Alert Simples')
    })
})
