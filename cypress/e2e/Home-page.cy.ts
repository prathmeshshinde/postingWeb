describe("Home page", () => {
  it("renders Home page", () => {
    cy.visit("/");

    cy.get('[data-testid="logo-title"]')
      .should("exist")
      .should("have.text", "Posting");
  });

  it("renders posts on the screen", () => {
    cy.visit("/");

    cy.get('[data-testid="posts"]').should("exist");
  });

  it("render the Like page on click", () => {
    cy.visit("/");

    cy.contains("Like").click();

    cy.url().should("include", "/like");
  });

  it("render the Bookmark page on click", () => {
    cy.visit("/");

    cy.contains("Bookmark").click();

    cy.url().should("include", "/bookmark");
  });

  it("render the Profile page on click", () => {
    cy.visit("/");

    cy.contains("Profile").click();

    cy.url().should("include", "/profile");
  });
});
