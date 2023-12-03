describe("Profile page", () => {
  it("renders Profile page and check if user is logged in or not", () => {
    cy.visit("/profile");

    const localStore = localStorage.getItem("userId");

    if (!localStore) {
      cy.get('[data-test="profile-test"]').should("not.exist");
    }

    if (localStore) {
      cy.get('[data-test="profile-test"]').should("exist");
    }
  });

  it("check edit profile modal and profile update", () => {
    cy.visit("/profile");

    cy.get('[data-edit-button="edit-button"]').click();

    cy.get('[data-submit-modal="cancel-submit-modal"]').submit();

    cy.get('[data-cancel-modal="cancel-modal"]').click();
  });

  it("renders users posts", () => {
    cy.visit("/profile");
  });

  it("check menu on posts", () => {
    cy.visit("/profile");

    cy.get('[data-user-posts="all-user-posts"]').then(($el) => {
      if ($el.find('[data-testid="posts"]').length > 0) {
        cy.get('[data-three-dot="three-dot"]').click({ multiple: true });

        cy.get('[data-update-post="update-post"]').click();

        cy.get('[data-isModalOpen="isModalOpen"]').should("exist");

        cy.get('[data-update-post-modal="update-post-modal"]').submit();
      } else {
        cy.get('[data-show-empty-posts="empty-posts"]').should("exist");
      }
    });
  });
});
