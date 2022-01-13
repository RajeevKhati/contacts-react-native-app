import { combineReducers } from "redux";
import clickedPhotoUriReducer from "./clickedPhotoUriReducer";
import contactReducer from "./contactReducer";

const rootReducer = combineReducers({
  contact: contactReducer,
  clickedPhotoUri: clickedPhotoUriReducer,
});

export default rootReducer;
