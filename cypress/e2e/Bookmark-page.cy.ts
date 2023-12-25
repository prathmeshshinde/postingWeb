// beforeEach(() => {
//   cy.visit("/login");
//   localStorage.getItem("userId");
//   const typedEmail = "issac@gmail.com";
//   const typedPass = "omkar123";

//   cy.get('[data-login-mail="login-mail-field"]')
//     .type(typedEmail)
//     .should("have.value", typedEmail);

//   cy.get('[data-login-pass="login-pass-field"]')
//     .type(typedPass)
//     .should("have.value", typedPass);

//   cy.get(".login-form-button").click();

//   cy.url().should("include", "/");
// });

describe("Bookmark page", () => {
  it("renders Bookmark page", () => {
    cy.visit("/bookmark");
    cy.get('[data-testid="bookmark-posts-title"]')
      .should("exist")
      .should("have.text", "My Bookmarks");
  });

  it("bookmarked posts are present in the data", () => {
    cy.wait(3000);
    cy.visit("/");
    cy.wait(3000);
    cy.get(".handle-bookmark").should("exist");
    cy.wait(3000);
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
    cy.get(".handle-bookmark").eq(0).click();
    cy.wait(3000);

    cy.visit("/bookmark");
  });

  it("bookmarked posts are not present in the data", () => {
    cy.visit("/bookmark");
    cy.get('[data-error-fetching-posts="error-fetching-posts"]').should(
      "not.exist"
    );

    cy.get('[data-bookmark-posts="empty-bookmark-page"]').should("exist");

    cy.get('[data-testid="posts"]').should("not.exist");
  });

  it("remove bookmarked posts", () => {
    cy.visit("/bookmark");
    cy.wait(5000);
    cy.get('[data-filled-bookmark-icon="filled-bookmark-icon"]').should(
      "exist"
    );
    cy.get('[data-filled-bookmark-icon="filled-bookmark-icon"]').eq(0).click();
  });
});
