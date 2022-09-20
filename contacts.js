// const path = require("path");
// const contactsPath = path.resolve("contacts.json");
// const fs = require("fs");
// fs.readFile("./db/contacts.json", "utf-8", (error, data) => {
//   if (error) {
//     console.log(error);
//   }
//   console.log(data);
// });
const { uid } = require("uid");
const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "./db/contacts.json");

// TODO: задокументировать каждую функцию
function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => {
      return JSON.parse(data);
    })
    .then((data) => {
      console.table(data);
    });
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => JSON.parse(data))
    .then((data) => {
      console.table(data.filter((elem) => +elem.id === contactId));
    });
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => JSON.parse(data))
    .then((data) => {
      const some = data.filter((elem) => +elem.id !== contactId);
      fs.writeFile(contactsPath, JSON.stringify(some));
      listContacts();
    });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath)
    .then((data) => JSON.parse(data))
    .then((data) => {
      const some = [...data, { id: uid(), name, email, phone }];
      fs.writeFile(contactsPath, JSON.stringify(some));
      listContacts();
    });
}
module.exports = {
  addContact,
  removeContact,
  getContactById,
  listContacts,
};
