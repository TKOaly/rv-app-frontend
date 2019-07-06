import moneyFormatter from '../../src/services/moneyFormatter';

describe('Snack kiosk deposit', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('#username').type('normal_user{enter}', { delay: 30 });
        cy.get('#password').type('hunter2{enter}', { delay: 30 });
        cy.wait(500);
    });
    it('Should show deposit prompt when deposit button is clicked', () => {
        cy.get('.deposit').should('not.exist');
        cy.get('.depositBtn').click();
        cy.wait(500);
        cy.get('.deposit')
            .should('exist')
            .should('be.visible');
    });
    it('Should have 13 buttons inside deposit view', () => {
        cy.get('.depositBtn').click();
        cy.wait(500);
        cy.get('.deposit > button').should('have.length', 13);
    });
    it('Should have an initial value of 0.00 €', () => {
        cy.get('.depositBtn').click();
        cy.wait(500);
        cy.get('.deposit .input-wrapper .input').should('have.value', '');
    });
    it('Should update deposit value correctly when clicking buttons', () => {
        cy.get('.depositBtn').click();
        cy.wait(500);
        cy.get('.50euro').click();
        cy.get('.currentDepositValue').should('have.value', '50.00');
        cy.wait(500);
        cy.get('.1euro')
            .click()
            .click();
        cy.get('.currentDepositValue').should('have.value', '52.00');
        cy.wait(500);
        cy.get('.5euro').click();
        cy.get('.currentDepositValue').should('have.value', '57.00');
    });
    it('Should reset deposit value when clicking reset button', () => {
        cy.get('.depositBtn').click();
        cy.wait(500);
        cy.get('.50euro').click();
        cy.wait(500);
        cy.get('.1euro')
            .click()
            .click();
        cy.wait(500);
        cy.get('.currentDepositValue').should('have.value', '52.00');
        cy.wait(500);
        cy.get('.depositResetButton').click();
        cy.get('.currentDepositValue').should('have.value', '');
    });
    it('Should show confirmation prompt when opening deposit modal and clicking OK', () => {
        cy.get('.depositBtn').click();
        cy.wait(500);
        cy.get('.50cents').click();
        cy.get('.currentDepositValue').should('have.value', '0.50');
        cy.wait(500);
        cy.get('.depositOkButton').click();
        cy.get('.confirm-overlay .confirm').should('be.visible');
        cy.get('.confirm-overlay .confirm .confirm-title-text').should(
            'be.visible'
        );
        cy.get('.confirm-overlay .confirm .confirm-title-text').should(
            'have.text',
            'Confirm 0.50 € deposit'
        );

        cy.get('.confirm-overlay .confirm .confirmation-cancel-btn').should(
            'be.visible'
        );
        cy.get('.confirm-overlay .confirm .confirmation-ok-btn').should(
            'be.visible'
        );
    });
    it.only('Should update user money value when user deposits 57.50 euros', async () => {
        cy.get('.user-money-value').then((btn) => {
            const value = moneyFormatter.stringToCents(btn.text());

            cy.get('.depositBtn').click();
            cy.wait(500);
            cy.get('.50euro').click();
            cy.wait(500);
            cy.get('.5euro').click();
            cy.wait(500);
            cy.get('.2euro').click();
            cy.wait(500);
            cy.get('.50cents').click();
            cy.wait(500);
            cy.get('.currentDepositValue').should('have.value', '57.50');
            cy.wait(1000);
            cy.get('.depositOkButton').click();
            cy.wait(1000);
            cy.get('.confirm-overlay .confirm .confirmation-ok-btn').click();
            cy.get('.confirm-overlay').should('not.be.visible');

            const newValue = moneyFormatter.centsToString(value + 5750);
            cy.get('header .header-right .user-money').should(
                'have.text',
                newValue + ' €'
            );
        });
    });
});
