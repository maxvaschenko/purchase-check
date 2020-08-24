/// <reference types="cypress" />

describe('ikea', () => {
    it('render initial screen', () => {
        cy.window()
            .then((win) => {

                cy.visit('');
            });
    })
});
