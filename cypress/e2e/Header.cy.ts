beforeEach(() => {
  cy.visit("/");
  localStorage.getItem("userId");
});
describe("Header component ", () => {
  it("Logout", () => {
    cy.visit("/login");
    localStorage.getItem("userId");
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

    cy.wait(3000);
    cy.visit("/");
    cy.wait(3000);
    cy.get('[data-logout="data-logout"]').should("exist").click();

    cy.url().should("include", "/login");
  });
});
