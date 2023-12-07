describe("SignUp Component", () => {
  it("should sign up a new user", () => {
    // Visit the signup page
    cy.visit("/signup");

    const typedEmail = "pacman@gmail.com";
    const typeUsername = "Pacman";
    const typedPass = "omkar123";

    cy.get('[signup-input-email="signup-input-email"]')
      .type(typedEmail)
      .should("have.value", typedEmail);

    cy.get('[signup-input-username="signup-input-username"]')
      .type(typeUsername)
      .should("have.value", typeUsername);

    cy.get('[ signup-input-pass="signup-input-pass"]')
      .type(typedPass)
      .should("have.value", typedPass);

    cy.wait(1000);

    cy.get('[data-testid="signup-button"]').click();

    cy.wait(1000);

    cy.get('[data-error-signup="data-error-signup"]').should("not.exist");

    cy.url().should("include", "/");
  });

  it("sign up a new user handling error", () => {
    // Visit the signup page
    cy.visit("/signup");

    const typedEmail = "issac@gmail.com";
    const typeUsername = "Pacman";
    const typedPass = "omkar123";

    cy.get('[signup-input-email="signup-input-email"]')
      .type(typedEmail)
      .should("have.value", typedEmail);

    cy.get('[signup-input-username="signup-input-username"]')
      .type(typeUsername)
      .should("have.value", typeUsername);

    cy.get('[ signup-input-pass="signup-input-pass"]')
      .type(typedPass)
      .should("have.value", typedPass);

    cy.wait(1000);

    cy.get('[data-testid="signup-button"]').click();
    cy.wait(1000);
    cy.get('[data-error-signup="data-error-signup"]').should("exist");
  });
});
