import { UPDATE_CLICKED_PHOTO_URI } from "../actionTypes";

const clickedPhotoUriReducer = (state = "", action) => {
  switch (action.type) {
    case UPDATE_CLICKED_PHOTO_URI:
      return action.payload;
    default:
      return state;
  }
};

export default clickedPhotoUriReducer;
