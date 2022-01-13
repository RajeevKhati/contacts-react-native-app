import { UPDATE_CLICKED_PHOTO_URI } from "../actionTypes";

export const updateClickedPhotoUri = (clickedPhotoUri) => {
  return {
    type: UPDATE_CLICKED_PHOTO_URI,
    payload: clickedPhotoUri,
  };
};
