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
// Cypress.Commands.add('login', (email, password) => { ... })
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

Cypress.Commands.add("login",(email, password) => {
    cy.visit("/");
    cy.get('.MuiButton-root').click();

    cy.origin("https://dev-l3n7wohuhibmcswe.eu.auth0.com/",{args: [email, password]} ,([email, password]) => {
        cy.get("#username").type(email);
        cy.get("#password").type(password);
        cy.get(".ce5b0411e > .c8fca5323").click();
    });
})
