export const CONTACTS_AVAILABLE = "CONTACTS_AVAILABLE";
export const ADD_CONTACT = "ADD_CONTACT";
export const UPDATE_CONTACT = "UPDATE_CONTACT";
export const DELETE_CONTACT = "DELETE_CONTACT";

// Get contacts - INDEX
export const addContacts = (contacts) => ({
	type: CONTACTS_AVAILABLE,
	data: { contacts },
});

// Add contact - CREATE (C)
export const addContact = (contact) => ({
	type: ADD_CONTACT,
	data: { contact },
});

// Update contact - UPDATE (U)
export const updateContact = (contact) => ({
	type: UPDATE_CONTACT,
	data: { contact },
});

// Delete contact - DELETE (D)
export const deleteContact = (id) => ({
	type: DELETE_CONTACT,
	data: { id },
});
