describe("Bookmark page", () => {
  it("renders Bookmark page", () => {
    cy.visit("/bookmark");

    cy.get('[data-testid="bookmark-posts-title"]').should("exist");
  });

  it("bookmark posts are present in the data", () => {
    cy.visit("/bookmark");

    cy.get('[data-testid="bookmark-posts-present"]').should("exist");
  });

  it("bookmark posts are not present in the data", () => {
    cy.visit("/bookmark");

    cy.get('[data-error-fetching-posts="error-fetching-posts"]').should(
      "not.exist"
    );

    cy.get('[data-bookmark-posts="empty-bookmark-page"]').should("exist");

    cy.get('[data-testid="posts"]').should("not.exist");
  });

  it("render bookmark posts on the page", () => {
    cy.visit("/bookmark");

    setTimeout(() => {
      cy.get('[data-testid="posts"]').should("exist");
    }, 1000);
  });

  it("click on bookmark button", () => {
    cy.visit("/bookmark");

    const localStore = localStorage.getItem("userId");

    if (localStore) {
      cy.get('[data-postid="login-text"]').should("not.exist");
    }

    setTimeout(() => {
      cy.get('[data-bookmark-button="bookmark-button-bookmark-page"]').should(
        "exist"
      );

      cy.get('[data-filled-bookmark-icon="filled-bookmark-icon"]').should(
        "exist"
      );

      cy.get('[data-filled-bookmark-icon="filled-bookmark-icon"]').click();
    }, 1000);
  });
});
