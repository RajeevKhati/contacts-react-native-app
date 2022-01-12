import {
  deleteContact,
  getContact,
  getContacts,
  saveContact,
  updateContact,
} from "../../database/contactsQueries";
import {
  CREATE_CONTACT,
  DELETE_CONTACT,
  EDIT_CONTACT,
  FETCH_CONTACT,
  FETCH_CONTACTS,
} from "../actionTypes";

export const createContact = (contactDetails) => async (dispatch) => {
  const insertId = await saveContact(contactDetails);
  dispatch({
    type: CREATE_CONTACT,
    payload: { ...contactDetails, id: insertId },
  });
};

export const fetchContact = (id) => async (dispatch) => {
  const contactArray = await getContact(id);
  const contact = contactArray[0];
  dispatch({
    type: FETCH_CONTACT,
    payload: contact,
  });
};

export const fetchContacts = () => async (dispatch) => {
  const contacts = await getContacts();
  dispatch({
    type: FETCH_CONTACTS,
    payload: contacts,
  });
};

export const editContact = (id, contactDetails) => async (dispatch) => {
  await updateContact(id, contactDetails);
  dispatch({
    type: EDIT_CONTACT,
    payload: { ...contactDetails, id },
  });
};

export const removeContact = (id) => async (dispatch) => {
  const rowsAffected = await deleteContact(id);
  dispatch({
    type: DELETE_CONTACT,
    payload: {rowsAffected, id},
  });
};
