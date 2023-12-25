describe("MyPosts page", () => {
  it("renders table", () => {
    cy.visit("/myposts");
    cy.get('[data-table-myposts="table-myposts"]').should("exist");
  });

  it("edit the post", () => {
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
    cy.visit("/");
    cy.wait(3000);
    cy.visit("/myposts");
    cy.get(".pro-table-main").should("exist");
    cy.get(".display-edit").eq(0).should("exist").click();
    cy.contains("Save").click();
  });

  it("Delete the post", () => {
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
    cy.visit("/");
    cy.wait(3000);
    cy.visit("/myposts");

    cy.get(".pro-table-main").should("exist");

    cy.get(".delete-button").eq(0).should("exist").click();

    cy.contains("OK").click();
  });

  it("show comments on the posts", () => {
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
    cy.visit("/");
    cy.wait(3000);
    cy.visit("/myposts");

    cy.get(".ant-table-row-expand-icon").eq(0).should("exist").click();
    cy.contains("Delete Comment").eq(0).should("exist").click();
    cy.contains("OK").click();
    cy.wait(3000);
  });
});
