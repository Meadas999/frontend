describe('Renders the homepage', () => {
    it('passes homepage load', () => {
        cy.visit('/')
        cy.get("#navbarGL").should("exist")
    });

    it("Passes click on login redirect", () => {
        cy.visit("/");
        cy.get('.MuiButton-root').click();
    });
    it("login", () => {
    cy.login(Cypress.env("username"), Cypress.env("password"));
    cy.get("h2").contains("Amier");

    });
});
