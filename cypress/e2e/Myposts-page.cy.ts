describe("MyPosts page", () => {
  beforeEach(() => {
    cy.visit("/myposts");
  });

  it("renders table", () => {
    cy.get('[data-table-myposts="table-myposts"]').should("exist");
  });
});
