describe("Like page", () => {
  it("renders Like page", () => {
    cy.visit("/like");

    cy.get('[data-testid="liked-posts-title"]')
      .should("exist")
      .should("have.text", "Liked Posts");
  });

  it("liked posts are present in the data", () => {
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

  it("render liked posts on the page", () => {
    cy.visit("/like");

    setTimeout(() => {
      cy.get('[data-testid="posts"]').should("exist");
    }, 1000);
  });

  it("click on like button", () => {
    cy.visit("/like");

    const localStore = localStorage.getItem("userId");

    if (localStore) {
      cy.get('[data-postid="login-text"]').should("not.exist");
    }

    setTimeout(() => {
      cy.get('[data-like-button="like-button-like-page"]').should("exist");

      cy.get('[data-filled-like-icon="filled-like-icon"]').should("exist");

      cy.get('[data-filled-like-icon="filled-like-icon"]').click();
    }, 1000);
  });
});
