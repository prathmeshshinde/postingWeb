beforeEach(() => {
  localStorage.getItem("userId");
});
describe("Comment page", () => {
  it("directly tries to go to comment page", () => {
    cy.visit("/comment");
    cy.get(".no-comments-text").should("exist");
  });

  it("renders comment page", () => {
    cy.on("fail", (err) => {
      cy.log(err.message);
      return false;
    });
    cy.visit("/login");
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
    // cy.visit("/");
    cy.wait(3000);
    cy.get('[data-testid="posts"]').should("exist");

    cy.get('[data-comment="data-comment-test"]').eq(0).click();

    cy.get('[data-post-comment-input="data-post-comment-input"]').should(
      "exist"
    );

    const typedText = "Hello, testing cypress";
    cy.get('[data-post-comment-input="data-post-comment-input"]')
      .type(typedText)
      .should("have.value", typedText);

    cy.get('[data-submit-comment="data-submit-comment"]').click();

    cy.get('[data-three-dot="three-dot"]').click({ multiple: true });

    cy.get('[data-three-dot="three-dot"]').should("exist").eq(0).click();

    cy.get('[ data-testid="server-error"]').should("be.visible");

    const longPost = "Lorem ipsum dolor sit amet, ".repeat(10);
    cy.get('[data-post-comment-input="data-post-comment-input"]').type(
      longPost
    );

    // Assert that the character limit message is displayed
    cy.contains("Please enter only 100 characters").should("exist");
  });

  it("check if comment is valid or not", () => {
    cy.visit("/login");
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
    cy.get('[data-testid="posts"]').should("exist");

    cy.get('[data-comment="data-comment-test"]').eq(0).click();

    cy.get('[data-post-comment-input="data-post-comment-input"]').should(
      "exist"
    );

    const comment = "  ";
    cy.get('[data-post-comment-input="data-post-comment-input"]').type(comment);
    cy.get('[data-submit-comment="data-submit-comment"]').click();
    cy.contains("Please enter valid comment").should("exist");
  });

  it("rendering comments failed", () => {
    cy.visit("/");
    cy.wait(3000);
    cy.get('[data-logout="data-logout"]').should("exist").click();

    cy.url().should("include", "/login");
    localStorage.removeItem("userId");
    cy.visit("/");
    cy.wait(3000);
    cy.get('[data-testid="posts"]').should("exist");

    cy.get('[data-comment="data-comment-test"]').eq(0).click();

    cy.get('[data-post-comment-input="data-post-comment-input"]').should(
      "exist"
    );

    const typedText = "Hello, testing cypress";
    cy.get('[data-post-comment-input="data-post-comment-input"]')
      .type(typedText)
      .should("have.value", typedText);

    cy.get('[data-submit-comment="data-submit-comment"]').click();

    const longPost = "Lorem ipsum dolor sit amet,";
    cy.get('[data-post-comment-input="data-post-comment-input"]').type(
      longPost
    );

    cy.contains("Please login first").should("exist");
  });
});
