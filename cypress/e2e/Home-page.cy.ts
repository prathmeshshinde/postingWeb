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

  it("post the post", () => {
    const typedText = "Hello, testing cypress";
    cy.get(".post-input").type(typedText).should("have.value", typedText);
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

  it("submit post", () => {
    setTimeout(() => {
      cy.get(".post-input").type("testing cypress").type("{enter}");
    }, 5000);
  });

  it("check like posts", () => {
    cy.get(".handle-like").should("exist");
    cy.wait(3000);
    cy.get(".handle-like").eq(0).click();
  });

  it("check bookmark posts", () => {
    cy.get(".handle-bookmark").should("exist");
    cy.wait(3000);
    cy.get(".handle-bookmark").eq(0).click();
  });

  it("check comment page", () => {
    cy.get(".handle-comment").click();
    cy.url().should("include", "/comment");
  });
});
