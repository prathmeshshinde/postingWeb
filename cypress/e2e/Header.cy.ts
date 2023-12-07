beforeEach(() => {
  cy.visit("/");
  localStorage.getItem("userId");
});
describe("Header component ", () => {
  it("Logout", () => {
    cy.wait(3000);
    cy.get('[data-logout="data-logout"]').should("exist").click();

    cy.url().should("include", "/login");
  });
});
