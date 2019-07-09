describe('Snack kiosk automatic logout', () => {
    beforeEach(() => {
        cy.request('POST', 'http://localhost:8080/api/v1/test/reset_data');
        cy.visit('/');
        cy.get('#username').type('normal_user{enter}', { delay: 30 });
        cy.get('#password').type('hunter2{enter}', { delay: 30 });
        cy.wait(500);
    });
    it('Should log the user out if user is inactive for more than 60 seconds', () => {
        cy.url().should('not.include', '/login');
        cy.wait(61000);
        cy.url().should('include', '/login');
    });
});
