beforeEach(() => {
  cy.visit("/profile");
});
describe("Profile page", () => {
  it("renders Profile page and check if user is logged in or not", () => {
    cy.get('[data-test="profile-test"]').should("not.exist");

    cy.wait(2000);
  });

  it("check edit profile modal and profile update", () => {
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

    cy.visit("/profile");

    cy.wait(3000);

    cy.get('[data-edit-button="edit-button"]').click();

    cy.get('[data-submit-modal="cancel-submit-modal"]').submit();

    cy.wait(2000);

    cy.contains("Successfully updated profile").should("exist");
  });

  it("cancel updation of profile", () => {
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

    cy.visit("/profile");

    cy.wait(3000);
    cy.get('[data-edit-button="edit-button"]').click();
    cy.get('[data-cancel-modal="cancel-modal"]').click();
  });

  it("check menu on posts", () => {
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
    cy.visit("/profile");
    cy.wait(3000);
    cy.get('[data-user-posts="all-user-posts"]').then(($el) => {
      if ($el.find('[data-testid="posts"]').length > 0) {
        cy.get('[data-three-dot="three-dot"]').click({ multiple: true });

        cy.get('[data-update-post="update-post"]').click();

        cy.get('[data-isModalOpen="isModalOpen"]').should("exist");

        cy.get('[data-update-post-modal="update-post-modal"]').submit();

        cy.contains("Post updated").should("exist");
      } else {
        cy.get('[data-show-empty-posts="empty-posts"]').should("exist");
      }
    });
  });

  it("check deleting posts", () => {
    cy.visit("/profile");
    cy.wait(3000);
    cy.get('[data-user-posts="all-user-posts"]').then(($el) => {
      if ($el.find('[data-testid="posts"]').length > 0) {
        cy.get('[data-three-dot="three-dot"]').click({ multiple: true });

        cy.get('[ data-delete-post="delete-post"]').click();
        cy.contains("Yes").click();
      } else {
        cy.get('[data-show-empty-posts="empty-posts"]').should("exist");
      }
    });
  });
});
