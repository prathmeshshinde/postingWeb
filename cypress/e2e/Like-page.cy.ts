describe("Like page", () => {
  beforeEach(() => {
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
  });

  it("renders Like page", () => {
    cy.visit("/like");
    cy.get('[data-testid="liked-posts-title"]')
      .should("exist")
      .should("have.text", "My Likes");
  });

  it("liked posts are present in the data", () => {
    cy.wait(3000);
    cy.visit("/");
    cy.get(".handle-dislike").should("exist");
    cy.wait(3000);
    cy.get(".handle-dislike").eq(0).click();
    cy.wait(3000);

    cy.visit("/like");
    cy.get('[data-testid="liked-posts-present"]').should("exist");
  });

  it("liked posts are not present in the data", () => {
    cy.visit("/like");
    cy.get('[data-error-fetching-posts="error-fetching-posts"]').should(
      "not.exist"
    );

    cy.get('[data-liked-posts="empty-like-page"]').should("exist");

    cy.get('[data-testid="posts"]').should("not.exist");
  });

  it("remove liked posts", () => {
    cy.visit("/like");
    cy.wait(5000);

    cy.get('[data-filled-like-icon="filled-like-icon"]').should("exist");
    cy.get('[data-filled-like-icon="filled-like-icon"]').eq(0).click();
  });
});
