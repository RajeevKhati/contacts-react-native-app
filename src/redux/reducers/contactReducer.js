import {
  CREATE_CONTACT,
  DELETE_CONTACT,
  EDIT_CONTACT,
  FETCH_CONTACT,
  FETCH_CONTACTS,
} from "../actionTypes";

const initialState = {};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONTACTS:
      const newObj = {};
      action.payload.forEach((contact) => {
        newObj[contact.id] = contact;
      });
      return newObj;
    case FETCH_CONTACT:
      //This square bracket is called "key interpolation", suppose action.payload.id is 5, so it'll get converted to {...state, 5: action.payload}
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_CONTACT:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_CONTACT:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_CONTACT:
      const newState = { ...state };
      delete newState[action.payload.id];
      return newState;
    default:
      return state;
  }
};

export default contactReducer;
