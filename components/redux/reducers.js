import { combineReducers } from "redux";

import {
	CONTACTS_AVAILABLE,
	ADD_CONTACT,
	UPDATE_CONTACT,
	DELETE_CONTACT,
} from "./actions"; //Import the actions types constant we defined in our actions

let dataState = { contacts: [] };

const dataReducer = (state = dataState, action) => {
	switch (action.type) {
		case ADD_CONTACT:
			let { contact } = action.data;

			//clone the current state
			let clone = JSON.parse(JSON.stringify(state.contacts));

			clone.unshift(contact); //add the new contact to the top

			return { ...state, contacts: clone };

		case CONTACTS_AVAILABLE:
			let { contacts } = action.data;

			return { ...state, contacts };

		case UPDATE_CONTACT: {
			let { contact } = action.data;

			//clone the current state
			let clone = JSON.parse(JSON.stringify(state.contacts));

			//check if contact already exist
			const index = clone.findIndex((obj) => obj.id === contact.id);

			//if the contact is in the array, replace the contact
			if (index !== -1) clone[index] = contact;

			return { ...state, contacts: clone };
		}

		case DELETE_CONTACT: {
			let { id } = action.data;

			//clone the current state
			let clone = JSON.parse(JSON.stringify(state.contacts));

			//check if contact already exist
			const index = clone.findIndex((obj) => obj.id === id);

			//if the contact is in the array, remove the contact
			if (index !== -1) clone.splice(index, 1);

			return { ...state, contacts: clone };
		}

		default:
			return state;
	}
};

// Combine all the reducers
const rootReducer = combineReducers({ dataReducer });

export default rootReducer;
