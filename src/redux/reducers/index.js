import { combineReducers } from "redux";
import base64ImageReducer from "./base64ImageReducer";
import contactReducer from "./contactReducer";

const rootReducer = combineReducers({
  contact: contactReducer,
  base64Image: base64ImageReducer,
});

export default rootReducer;
