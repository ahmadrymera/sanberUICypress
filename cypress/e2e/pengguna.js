const { faker } = require("@faker-js/faker");

const cashierName = faker.name.fullName();
const cashierEmail = faker.internet.exampleEmail();
const newCashierName = faker.name.fullName();
const newCashierEmail = faker.internet.exampleEmail();
const password = "12345678";

describe("Create cashier", () => {
  // login and click menu 'pengguna'
  before(() => {
    cy.login();
    cy.contains("pengguna").click();
  });

  // create a cashier account with empty name
  it("failed to create cashier with empty name", () => {
    cy.contains("tambah").click();
    cy.get("#email").type(cashierEmail);
    cy.get("#password").type(password);
    cy.contains("simpan").click();
    cy.get(".chakra-alert").should(
      "have.text",
      `"name" is not allowed to be empty`
    );
    cy.contains("pengguna").click();
  });

    // create a cashier account with empty email
  it("failed to create cashier with empty email", () => {
    cy.contains("tambah").click();
    cy.get("#nama").type(cashierName);
    cy.get("#password").type(password);
    cy.contains("simpan").click();
    cy.get(".chakra-alert").should(
      "have.text",
      `"email" is not allowed to be empty`
    );
    cy.contains("pengguna").click();
  });

  // create a cashier account with empty password
  it("failed to create cashier with empty password", () => {
    cy.contains("tambah").click();
    cy.get("#nama").type(cashierName);
    cy.get("#email").type(cashierEmail);
    cy.contains("simpan").click();
    cy.get(".chakra-alert").should(
      "have.text",
      `"password" is not allowed to be empty`
    );
    cy.contains("pengguna").click();
  });

  // success create a cashier with complete data [name, email, password]
  it("success to create cashier", () => {
    cy.contains("tambah").click();
    cy.get("#nama").type(cashierName);
    cy.get("#email").type(cashierEmail);
    cy.get("#password").type(password);
    cy.contains("simpan").click();
    cy.checkNotificationText("item ditambahkan");
  });

  // success to search cashier data
  it(`Success to search cashier : ${cashierName}`, () => {
    cy.intercept("https://kasir-api.belajarqa.com/users?page=1&q=*").as(
      "searchResult"
    );
    cy.get(".chakra-input").clear().type(cashierName);
    cy.wait("@searchResult");
    cy.get("tbody.css-0 > .css-0 > :nth-child(1)").should(
      "have.text",
      cashierName
    );
    cy.get("tbody.css-0 > .css-0 > :nth-child(2)").should(
      "have.text",
      cashierEmail
    );
  });

  // success update a cashier with complete data [name, email]
  it(`Success to update cashier : ${cashierName} data`, () => {
    cy.get('[id^="menu-button"]').eq(1).click();
    cy.contains("ubah").click();
    cy.get("#nama").clear().type(newCashierName);
    cy.get("#email").clear().type(newCashierEmail);
    cy.contains("simpan").click();
    cy.checkNotificationText("item diubah");
  });

  // success delete a cashier
  it(`Success to delete cashier : ${newCashierName}`, () => {
    cy.intercept("https://kasir-api.belajarqa.com/users?page=1&q=*").as(
      "searchResult"
    );
    cy.get(".chakra-input").clear().type(newCashierName);
    cy.wait("@searchResult");
    cy.get('[id^="menu-button"]').eq(1).click();
    cy.contains("hapus").click();
    cy.contains("Delete").click();
    cy.checkNotificationText("item dihapus");
  });
});
