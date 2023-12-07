describe("Home page", () => {
  beforeEach(() => {
    cy.visit("/");
    localStorage.getItem("userId");
  });

  it("renders Home page", () => {
    cy.get('[data-testid="logo-title"]')
      .should("exist")
      .should("have.text", "Posting");
  });

  it("auto focus on post input", () => {
    cy.focused().should("have.class", "post-input");
  });

  it("error while posting", () => {
    const typedText = "Hello, testing cypress";
    cy.get(".post-input").type(typedText).should("have.value", typedText);
    cy.get('[data-post-post="post-post"]').click();
    cy.contains("Please Login to Post");
  });

  it("post the post", () => {
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

    const typedText = "Hello, testing cypress";

    cy.get(".post-input").type(typedText).should("have.value", typedText);

    cy.get('[data-post-post="post-post"]').click();

    cy.contains("Post Successful").should("exist");
  });

  it("if post is empty", () => {
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
    cy.wait(5000);
    const typedText = " ";

    cy.get(".post-input").type(typedText).should("have.value", typedText);

    cy.get('[data-post-post="post-post"]').click();

    cy.contains("Please enter valid post!").should("exist");
  });

  it("renders posts on the screen", () => {
    cy.get('[data-testid="posts"]').should("exist");
  });

  it("render the Like page on click", () => {
    cy.contains("Like").click();

    cy.url().should("include", "/like");
  });

  it("render the Bookmark page on click", () => {
    cy.contains("Bookmark").click();

    cy.url().should("include", "/bookmark");
  });

  it("render the Profile page on click", () => {
    cy.contains("Profile").click();

    cy.url().should("include", "/profile");
  });

  it("render posts and submit updated post", () => {
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
    cy.get('[data-testid="posts"]').should("exist");
    // cy.wait(5000);
    cy.get('[data-three-dot="three-dot"]').should("exist").eq(0).click();

    cy.get('[data-update-post="update-post"]').click();

    cy.get('[data-submit-modal="data-submit-modal"]').click();

    cy.contains("Submit").click();

    // cy.contains("Post Updated").should("exist");
  });

  it("cancel updation of post ", () => {
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
    cy.get('[data-three-dot="three-dot"]').should("exist").eq(0).click();

    cy.get('[data-update-post="update-post"]').click();

    cy.get('[data-cancel-modal="data-cancel-modal"]').click();
  });

  it("check like posts", () => {
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
    cy.get(".handle-like").should("exist");
    cy.wait(3000);
    cy.get(".handle-like").eq(0).click();
    cy.wait(3000);
    cy.get('[data-filled-like-icon="filled-like-icon"]').should("exist");

    cy.get('[data-filled-like-icon="filled-like-icon"]').should("exist");
    cy.get('[data-like-count="data-like-count"]').eq(0).should("exist");
  });

  it("check bookmark posts", () => {
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
    cy.get(".handle-bookmark").should("exist");
    cy.wait(3000);
    cy.get(".handle-bookmark").eq(0).click();
    cy.get('[data-filled-bookmark-icon="filled-bookmark-icon"]').should(
      "exist"
    );

    cy.get('[data-filled-bookmark-icon="filled-bookmark-icon"]').eq(0).click();
    cy.get('[data-bookmark-count="data-bookmark-count"]').eq(0).should("exist");
  });

  it("check comment page", () => {
    cy.get(".handle-comment").eq(0).click();
    cy.url().should("include", "/comment");
  });

  it("cancel deletion of post ", () => {
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
    cy.get('[data-three-dot="three-dot"]').should("exist").eq(0).click();

    cy.get('[data-delete-post="delete-post"]').click();
    cy.contains("Are you sure to delete this post?").should("exist");

    // if (location.pathname === "/") {
    cy.contains("Yes").should("exist").click();
    // }
  });

  it("changing the value of input field", () => {
    const typedText = "Hello, testing cypress";
    cy.get(".post-input").type(typedText).should("have.value", typedText);
  });

  it("should display a character limit message", () => {
    // Type more than 100 characters in the input field
    const longPost = "Lorem ipsum dolor sit amet, ".repeat(10);
    cy.get('[data-post-input="post-input-field"]').type(longPost);

    // Assert that the character limit message is displayed
    cy.contains("Please enter only 100 characters").should("exist");
  });

  it("Logout", () => {
    cy.wait(3000);
    cy.viewport(620, 750);
    cy.get(".dropdown-menu").should("exist").click();
    cy.get('[data-handle-logout="handle-logout"]').click();
  });

  // it("Logout", () => {
  //   cy.wait(3000);
  //   cy.get('[data-logout="data-logout"]').should("exist").click();

  //   cy.url().should("include", "/login");
  // });
});
