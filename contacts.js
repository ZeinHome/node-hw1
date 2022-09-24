const path = require('path');
const fs = require('fs').promises;
const { nanoid } = require('nanoid');

const contactsPath = path.resolve('./db/contacts.json');

const updateContacts = async (contact) =>
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));

async function listContacts() {
  const allContacts = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(allContacts);
}

async function getContactById(contactId) {
  const arrayContacts = await listContacts();
  contactIdString = String(contactId);
  const contact = arrayContacts.find(
    (contact) => contact.id === contactIdString
  );
  return contact || null;
}

async function removeContact(contactId) {
  contactIdString = String(contactId);
  const arrayContacts = await listContacts();
  const index = arrayContacts.findIndex(
    (item) => item.id === contactIdString
  );
  if (index === -1) {
    return null;
  }
  const [result] = arrayContacts.splice(index, 1);
  await updateContacts(arrayContacts);
  return result;
}

async function addContact(name, email, phone) {
  const data = { name, email, phone };
  const arrayContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  arrayContacts.push(newContact);
  await updateContacts(arrayContacts);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
