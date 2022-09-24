const contact = require('./contacts');
const argv = require('yargs').argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const allContacts = await contact.listContacts();
      console.log(allContacts);
      break;

    case 'get':
      const getContacts = await contact.getContactById(id);
      console.log(getContacts);
      break;

    case 'add':
      const addContacts = await contact.addContact(
        name,
        email,
        phone
      );
      console.log(addContacts);
      break;

    case 'remove':
      const removeContacts = await contact.removeContact(id);
      console.log(removeContacts);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
