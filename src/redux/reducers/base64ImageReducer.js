import { UPDATE_BASE64_IMAGE } from "../actionTypes";

const base64ImageReducer = (state = "", action) => {
  switch (action.type) {
    case UPDATE_BASE64_IMAGE:
      return action.payload;
    default:
      return state;
  }
};

export default base64ImageReducer;
