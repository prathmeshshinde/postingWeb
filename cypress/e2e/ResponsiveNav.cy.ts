describe("Responsive Nav component ", () => {
  beforeEach(() => {
    cy.visit("/");
    localStorage.getItem("userId");
  });

  it("renders responsive component", () => {
    cy.get('[data-testid="logo-title"]')
      .should("exist")
      .should("have.text", "Posting");
  });

  it("Logout", () => {
    cy.wait(3000);
    cy.viewport(620, 750);
    cy.get(".dropdown-menu").should("exist").click();
    cy.get('[data-handle-logout="handle-logout"]').click();
  });
});
