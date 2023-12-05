describe("MyPosts page", () => {
  beforeEach(() => {
    cy.visit("/myposts");
  });

  it("renders table", () => {
    cy.get('[data-table-myposts="table-myposts"]').should("exist");
  });

  it.only("edit the post", () => {
    cy.get(".pro-table-main").should("exist");

    cy.get(".display-edit").eq(0).should("exist").click();
  });

  it.only("Delete the post", () => {
    cy.get(".pro-table-main").should("exist");

    cy.get(".delete-button").eq(0).should("exist").click();
  });
});
