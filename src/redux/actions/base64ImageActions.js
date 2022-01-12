import { UPDATE_BASE64_IMAGE } from "../actionTypes";

export const updateBase64Image = (base64Image) => {
  return {
    type: UPDATE_BASE64_IMAGE,
    payload: base64Image,
  };
};
