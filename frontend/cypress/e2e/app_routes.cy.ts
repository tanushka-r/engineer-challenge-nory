describe('App Navigation and Routing', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('loads Home page by default', () => {
    cy.get('[data-cy="page-home"]').should('exist');
  });

  it('navigates to Deliveries page', () => {
    cy.get('[data-cy="nav-deliveries"]').click();
    cy.url().should('include', '/deliveries');
    cy.get('[data-cy="page-deliveries"]').should('exist');
  });

  it('navigates to Sales page', () => {
    cy.get('[data-cy="nav-sales"]').click();
    cy.url().should('include', '/sales');
    cy.get('[data-cy="page-sales"]').should('exist');
  });

  it('navigates to Stock page', () => {
    cy.get('[data-cy="nav-stock"]').click();
    cy.url().should('include', '/stock');
    cy.get('[data-cy="page-stock"]').should('exist');
  });

  it('navigates to Reports page', () => {
    cy.get('[data-cy="nav-reports"]').click();
    cy.url().should('include', '/reports');
    cy.get('[data-cy="page-reports"]').should('exist');
  });
});
