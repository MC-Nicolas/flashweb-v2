context("Login", () => {
  it("Should login with email and password", () => {
    cy.login();
    cy.getByCy("page-title").should("have.text", "Dashboard");
  });
});
