/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

Cypress.Commands.add("getByCy", (selector, ...args) => {
  return cy.get(`[data-cy=${selector}]`, ...args);
});

// add login command
Cypress.Commands.add("login", () => {
  cy.visit("http://localhost:3000/login");
  cy.getByCy("login-email").type("testuser@gmail.com");
  cy.getByCy("login-password").type("testuser");
  cy.getByCy("login-submit").click();
});

Cypress.Commands.add("createFolder", () => {
  cy.visit("http://localhost:3000/dashboard");
  cy.getByCy("collapsable-menu-button").click({ force: true });
  cy.getByCy("folder-button").click({ force: true });
  cy.getByCy("folder-name-input").type("testFolder");
  cy.getByCy("submit-new-folder").click();
});

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
//

declare namespace Cypress {
  interface Chainable {
    getByCy(selector: string, ...args: any): Chainable<any>;
    login(): Chainable<void>;
    createFolder(): Chainable<void>;
  }
}
