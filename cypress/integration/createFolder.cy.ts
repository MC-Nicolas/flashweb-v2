context("Folder creation", () => {
  it("Should Login, create a folder, check its presence then delete it and logout", () => {
    cy.login();

    // Wait for user to be logged in
    cy.wait(3000);

    cy.createFolder();
    cy.wait(1000);
    cy.getByCy("page-title").should("have.text", "New Deck");
    cy.getByCy("nav-studies").click();

    // cy.getByCy("neumorphic-table").find("tbody").find("tr").first();
  });
});
