const { faker } = require("@faker-js/faker");

const pelangganName = faker.name.fullName();
const pelangganAddress = faker.address.streetAddress();
const pelangganNote = faker.lorem.word();

const NewPelangganName = faker.name.fullName();
const NewPelangganAddress = faker.address.streetAddress();
const NewPelangganNote = faker.lorem.word();

const phoneNumber = "0938984999";
const password = "12345678";

describe("Create cashier", () => {
  // login and click menu 'pengguna'
  before(() => {
    cy.login();
    cy.contains("pelanggan").click();
  });

  // create a pelanggan account with empty name
  it("failed to create pelanggan with empty name", () => {
    cy.contains("tambah").click();
    cy.get('[id="no.hp"]').type(phoneNumber);
    cy.get("#alamat").type(pelangganAddress);
    cy.get("#keterangan").type(pelangganNote);
    cy.contains("simpan").click();
    cy.get(".chakra-alert").should(
      "have.text",
      `"name" is not allowed to be empty`
    );
    cy.contains("pelanggan").click();
  });

  // create a pelanggan account with string phone number
  it("failed to create pelanggan with string phone number", () => {
    cy.contains("tambah").click();
    cy.get("#nama").type(pelangganName);
    cy.get('[id="no.hp"]').type("a92839hsgggg");
    cy.get("#alamat").type(pelangganAddress);
    cy.get("#keterangan").type(pelangganNote);
    cy.contains("simpan").click();
    cy.get(".chakra-alert").should("have.text", `"phone" must be a number`);
    cy.contains("pelanggan").click();
  });

  // create a pelanggan account
  it("success to create pelanggan", () => {
    cy.contains("tambah").click();
    cy.get("#nama").type(pelangganName);
    cy.get('[id="no.hp"]').type(phoneNumber);
    cy.get("#alamat").type(pelangganAddress);
    cy.get("#keterangan").type(pelangganNote);
    cy.contains("simpan").click();
    cy.checkNotificationText("item ditambahkan");
  });

  // success to search pelanggan data
  it(`Success to search pelanggan : ${pelangganName}`, () => {
    cy.intercept("https://kasir-api.belajarqa.com/customers?page=1&q=*").as(
      "searchResult"
    );
    cy.get(".chakra-input").clear().type(pelangganName);
    cy.wait("@searchResult");
    cy.get("tbody.css-0 > :nth-child(1) > :nth-child(1)").should(
      "have.text",
      pelangganName
    );
    cy.get("tbody.css-0 > :nth-child(1) > :nth-child(2)").should(
      "have.text",
      phoneNumber
    );
    cy.get("tbody.css-0 > :nth-child(1) > :nth-child(3)").should(
      "have.text",
      pelangganNote
    );
  });

  // success update a pelanggan with complete data [name, address, note]
  it(`Success to update pelanggan : ${pelangganName} data`, () => {
    cy.get('[id^="menu-button"]').eq(1).click();
    cy.contains("ubah").click();
    cy.get("#nama").clear().type(NewPelangganName);
    cy.get("#alamat").clear().type(NewPelangganAddress);
    cy.get("#keterangan").clear().type(NewPelangganNote);
    cy.contains("simpan").click();
    cy.checkNotificationText("item diubah");
  });

  // success delete pelanggan
  it(`Success to delete pelanggan : ${NewPelangganName}`, () => {
    cy.intercept("https://kasir-api.belajarqa.com/customers?page=1&q=*").as(
      "searchResult"
    );
    cy.get(".chakra-input").clear().type(NewPelangganName);
    cy.wait("@searchResult");
    cy.get('[id^="menu-button"]').eq(1).click();
    cy.contains("hapus").click();
    cy.contains("Delete").click();
    cy.checkNotificationText("item dihapus");
  });
});
