describe('Snack kiosk login (mocked)', () => {
    beforeEach(() => {
        cy.server();
        cy.route({
            method: 'POST',
            url: '/api/v1/authenticate',
            response: 'fixture:login_http_400.json',
            status: 400,
            delay: 100
        }).as('http400response');
        cy.visit('/login');
    });
    it('Should go to login page', () => {
        cy.visit('/login');
    });
    it('Should have login form in the page', () => {
        cy.get('.loginForm').should('exist');
        cy.get('#username').should('exist');
        cy.get('#password').should('exist');
        cy.focused().should('have.attr', 'id', 'username');
    });
    it('Should have focus on username', () => {
        cy.get('#username').should('exist');
        cy.focused().should('have.attr', 'id', 'username');
        cy.focused().should('have.attr', 'type', 'text');
        cy.focused().should('have.attr', 'placeholder', 'Username');
    });
    it('Should focus first on username, then on password after inserting username and pressing enter', () => {
        cy.focused().should('have.attr', 'id', 'username');
        cy.get('#username').type('test_user{enter}');
        cy.focused().should('have.attr', 'id', 'password');
    });
    it('Should set login button to spinner when logging in', () => {
        cy.focused().should('have.attr', 'id', 'username');
        cy.get('#username').type('test_user{enter}', { delay: 30 });
        cy.focused().should('have.attr', 'id', 'password');
        cy.get('.loader').should('not.exist');
        cy.get('#password').type('test_password{enter}', { delay: 30 });
        cy.get('.loader').should('exist');
    });
    it('Should show error message & correct error text when the request is mocked as HTTP 400', () => {
        cy.focused().should('have.attr', 'id', 'username');
        cy.get('#username').type('test_user{enter}', { delay: 30 });
        cy.focused().should('have.attr', 'id', 'password');
        cy.get('.loader').should('not.exist');
        cy.get('#password').type('test_password{enter}', { delay: 30 });
        cy.get('.error-message').should('not.exist');
        cy.get('.loader').should('exist');
        cy.wait('@http400response');
        cy.get('.error-message').should('exist');
        cy.get('.error-message').contains('This is a mocked API error response');
        cy.get('.error-message').should('not.exist');
    });
});