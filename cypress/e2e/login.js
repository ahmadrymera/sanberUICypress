/// <reference types="cypress" />
describe('Login to KasirAja', () => {

  it('success login to kasirAja', () => {
    cy.get('#email').type("makani@ternak.com")
    cy.get('#password').type("12345678")
    cy.contains('login').click()
    cy.get('.chakra-heading').should('be.visible').should('have.text', 'kasirAja')
  })
})