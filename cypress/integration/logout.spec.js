describe('Snack kiosk logout', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('#username').type('normal_user{enter}', { delay: 30 });
        cy.get('#password').type('hunter2{enter}', { delay: 30 });
        cy.wait(500);
    });
    it('Should log the user out if "Logout" button is clicked', () => {
        cy.url().should('not.include', '/login');
        cy.get('.logoutBtn').click();
        cy.wait(1000);
        cy.url().should('include', '/login');
        cy.get('.products-container').should('not.exist');
        cy.get('.featured-products').should('not.exist');
        cy.get('.product-browser-container').should('not.exist');
        cy.get('header .header-right .user-username').should('not.exist');
        cy.get('header .header-right .user-money').should('not.exist');
    });
});
