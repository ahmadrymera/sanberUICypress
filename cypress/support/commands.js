// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', () => {
    cy.get('#email').type("makani@ternak.com")
    cy.get('#password').type("12345678")
    cy.contains('login').click()
    cy.get('.chakra-heading').should('be.visible').should('have.text', 'kasirAja')
})

Cypress.Commands.add('checkNotificationText', (notificationText) => {
    cy.get('.chakra-toast').find('.chakra-alert__desc').should('be.visible').should('have.text', notificationText)
    cy.get(`[aria-label="Close"]`).click()
})

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })