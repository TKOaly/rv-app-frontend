describe('Snack kiosk login', () => {
    beforeEach(() => {
        cy.request('POST', 'http://localhost:8080/api/v1/test/reset_data');
        cy.visit('/');
    });
    it('Should redirect to login page', () => {
        cy.url().should('include', '/login');
    });
    it('Should have login form in the page', () => {
        cy.get('.loginForm').should('exist');
        cy.get('.loginForm #username').should('exist');
        cy.get('.loginForm #password').should('exist');
        cy.focused().should('have.attr', 'id', 'username');
    });
    it('Should have focus on username', () => {
        cy.get('.loginForm #username').should('exist');
        cy.focused().should('have.attr', 'id', 'username');
        cy.focused().should('have.attr', 'type', 'text');
        cy.focused().should('have.attr', 'placeholder', 'Username');
    });
    it('Should focus first on username, then on password after inserting username and pressing enter', () => {
        cy.focused().should('have.attr', 'id', 'username');
        cy.get('.loginForm #username').type('test_user{enter}');
        cy.focused().should('have.attr', 'id', 'password');
    });
    it('Should show error message & correct error text when the password is invalid', () => {
        cy.url().should('include', '/login');
        cy.focused().should('have.attr', 'id', 'username');
        cy.get('.loginForm #username').type('normal_user{enter}', { delay: 30 });
        cy.focused().should('have.attr', 'id', 'password');
        cy.get('.loginForm .loader').should('not.exist');
        cy.get('.loginForm #password').type('hunter{enter}', { delay: 30 });
        cy.url().should('include', '/login');
        cy.get('.error-message').should('not.exist');
        cy.get('.loginForm .loader').should('exist');
        cy.get('.error-message').should('exist');
        cy.get('.error-message').contains('Invalid username or password');
        cy.get('.error-message').should('not.exist');
    });
    it('Should log the user in if correct credentials are given', () => {
        cy.url().should('include', '/login');
        cy.get('#username').type('normal_user{enter}', { delay: 30 });
        cy.get('#password').type('hunter2{enter}', { delay: 30 });
        cy.wait(3000);
        cy.get('.loginForm').should('not.exist');
        cy.url().should('not.include', '/login');
        cy.get('.pages .mainpage main .products-container').should('be.visible');
        cy.get('.featured-products').should('be.visible');
        cy.get('.product-browser-container').should('be.visible');
        cy.get('header .header-right .user-username').should('be.visible');
        cy.get('header .header-right .user-username').should('have.text', 'normal_user');
        cy.get('header .header-right .user-money').should('be.visible');
        cy.get('header .header-right .logoutBtn').should('be.visible');
        cy.get('header .header-right .depositBtn').should('be.visible');
        cy.get('header .header-right .logoutBtn').should('have.text', ' Log out (ENTER)');
        cy.get('header .header-right .depositBtn').should('have.text', 'Deposit (D)');
        cy.get('.pages .mainpage main .terminal-container').should('be.visible');
        cy.get('.mainpage header .header-title').should('have.text', 'Ruokavälitys');
    });
    it('Should log the user out if "Logout" button is clicked', () => {
        cy.url().should('include', '/login');
        cy.get('#username').type('normal_user{enter}', { delay: 30 });
        cy.get('#password').type('hunter2{enter}', { delay: 30 });
        cy.url().should('not.include', '/login');
        cy.wait(1000);
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
