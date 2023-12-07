describe("Login page", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("renders login page", () => {
    cy.get('[data-login-title="login-title"]')
      .should("exist")
      .should("have.text", "Login");
  });

  it("Login into the account", () => {
    const typedEmail = "issac@gmail.com";
    const typedPass = "omkar123";

    cy.get('[data-login-mail="login-mail-field"]')
      .type(typedEmail)
      .should("have.value", typedEmail);

    cy.get('[data-login-pass="login-pass-field"]')
      .type(typedPass)
      .should("have.value", typedPass);

    cy.get(".login-form-button").click();

    cy.url().should("include", "/");
  });

  it("check error for login", () => {
    const typedEmail = "issac@gmal.com";
    const typedPass = "omkar123";

    cy.get('[data-login-mail="login-mail-field"]')
      .type(typedEmail)
      .should("have.value", typedEmail);

    cy.get('[data-login-pass="login-pass-field"]')
      .type(typedPass)
      .should("have.value", typedPass);

    cy.get(".login-form-button").click();

    cy.url().should("include", "/login");

    cy.get('[data-error-id="data-error-id"]').should("exist");
  });
});
