const path = require("path");
describe('create, view and download transactions', () => {
  it('should view all transactions', () => {
    cy.visit('http://localhost:3000/');
    cy.get('h2').should('have.text', 'Transactions');

    cy.get('.paying_table > thead > tr > :nth-child(1)').should('have.text', 'Counterparty Name')
    cy.get('.paying_table > thead > tr > :nth-child(2)').should('have.text', 'Amount')

    //paying table should have negative values
    cy.get('.paying_table tbody tr').each(($el) => {
      cy.wrap($el).within(() => {
        cy.get('td').eq(1).should("contain", "-")
      })
    })

    cy.get('.receiving_table > thead > tr > :nth-child(1)').should('have.text', 'Counterparty Name')
    cy.get('.receiving_table > thead > tr > :nth-child(2)').should('have.text', 'Amount')

    //receiving table should not have negative values
    cy.get('.receiving_table tbody tr').each(($el) => {
      cy.wrap($el).within(() => {
        cy.get('td').eq(1).should("not.contain", "-")
      })
    })

    cy.get('.transaction_action > :nth-child(1)').should('have.text', 'Add new Transaction').should('be.enabled')
    cy.get('.transaction_action > :nth-child(2)').should('have.text', 'Compress Transactions').should('be.enabled')
  })

  it('should add a new transaction', () => {
    cy.visit('http://localhost:3000/');
    cy.get('.transaction_action > :nth-child(1)').should('have.text', 'Add new Transaction').should('be.enabled').click();
    cy.get('.modal').should('be.visible')

    cy.get('#saveTransaction').should('not.be.enabled');
    cy.get('#cancel').should('be.enabled').click();
    cy.get('.modal').should('not.exist');

    cy.get('.transaction_action > :nth-child(1)').should('have.text', 'Add new Transaction').should('be.enabled').click();
    cy.get('#Counterparty').type('Counterpartytest 2')
    cy.get('#Amount').type('100');

    cy.get('#saveTransaction').should('be.enabled').click();
    cy.get('.modal').should('not.exist');

    // ensure last column is the one we just entered
    cy.get('.receiving_table tbody tr').last().should('have.text', 'Counterpartytest 2100')


    cy.get('.transaction_action > :nth-child(1)').should('have.text', 'Add new Transaction').should('be.enabled').click();
    cy.get('#Counterparty').type('Counterpartytest 2')
    cy.get('#Amount').type('-100');

    cy.get('#saveTransaction').should('be.enabled').click();
    cy.get('.modal').should('not.exist');

    // ensure last column is the one we just entered
    cy.get('.paying_table tbody tr').last().should('have.text', 'Counterpartytest 2-100')

  })

  it('should compress and download transactions', () => {
    cy.visit('http://localhost:3000/');
    cy.get('.transaction_action > :nth-child(2)').should('have.text', 'Compress Transactions').should('be.enabled').click()

    const downloadsFolder = Cypress.config("downloadsFolder");
    cy.readFile(path.join(downloadsFolder, "download.csv")).should("exist");
  })

})