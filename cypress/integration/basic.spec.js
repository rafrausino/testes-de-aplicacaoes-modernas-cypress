/// <reference types="cypress" />

describe('Cypress basics', () => {
  it.only('Should visit a page and assert title', () => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')

    cy.title().should('be.equal', 'Campo de Treinamento')
    cy.title().should('contain', 'Campo').debug()

    cy.title()
        .should('be.equal', 'Campo de Treinamento')
        .should('contain', 'Campo')
    
    cy.title().then(title => {
      console.log(title);
    })

    //TODO imprimir o log no console
    //TODO escrever o log em um campo de teste
  })

  it('Should find and interact width an element', () => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')

    cy.get('#buttonSimple')
        .click()
        .should('have.value', 'Obrigado!')
  })
})