describe("Like page", () => {
  beforeEach(() => {
    cy.visit("/like");
  });

  it("renders Like page", () => {
    cy.get('[data-testid="liked-posts-title"]')
      .should("exist")
      .should("have.text", "Liked Posts");
  });

  it("liked posts are present in the data", () => {
    cy.get('[data-testid="liked-posts-present"]').should("exist");
  });

  it("liked posts are not present in the data", () => {
    cy.get('[data-error-fetching-posts="error-fetching-posts"]').should(
      "not.exist"
    );

    cy.get('[data-liked-posts="empty-like-page"]').should("exist");

    cy.get('[data-testid="posts"]').should("not.exist");
  });
});
