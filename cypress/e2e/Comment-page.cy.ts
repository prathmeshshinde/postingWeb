beforeEach(() => {
  localStorage.getItem("userId");
});
describe("Comment page", () => {
  it("directly tries to go to comment page", () => {
    cy.visit("/comment");
    cy.get(".no-comments-text").should("exist");
  });

  it("renders comment page", () => {
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

    const longPost = "Lorem ipsum dolor sit amet, ".repeat(10);
    cy.get('[data-post-comment-input="data-post-comment-input"]').type(
      longPost
    );

    // Assert that the character limit message is displayed
    cy.contains("Please enter only 100 characters").should("exist");

    cy.get('[data-three-dot="three-dot"]').click({ multiple: true });

    cy.get('[data-three-dot="three-dot"]').should("exist").eq(0).click();
  });
});
