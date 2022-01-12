import { Box, Button, Input, VStack, Text } from "native-base";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import DialogBox from "../components/DialogBox";
import { useDispatch } from "react-redux";
import { createContact } from "../redux/actions/contactActions";
import { useSelector } from "react-redux";
import { updateBase64Image } from "../redux/actions/base64ImageActions";
import ContactForm from "../components/ContactForm";

const AddContact = (props) => {
  const initialValues = {
    name: null,
    mobile: null,
    landline: null,
    favorite: 0,
    image: null,
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const base64Image = useSelector((state) => state.base64Image);

  const dispatch = useDispatch();

  const handleChange = (value, name) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      // setImage(result.uri);
      // console.log("Image picker base64", result.base64); //store this in db
      setFormValues({ ...formValues, image: result.base64 });
    }
  };

  useEffect(() => {
    dispatch(updateBase64Image(null));
  }, []);

  useEffect(() => {
    setFormValues({ ...formValues, image: base64Image });
  }, [base64Image]);

  const onSave = () => {
    dispatch(createContact(formValues));
  };

  const onImageSelectorType = (type) => {
    if (type === "imagePicker") {
      pickImage();
    } else if (type === "camera") {
      props.navigation.navigate("Camera");
    }
  };

  return (
    <ContactForm
      formValues={formValues}
      handleChange={handleChange}
      onSave={onSave}
      buttonText="Add Contact"
    >
      <Button
        isDisabled={formValues.image !== null}
        onPress={() => setIsDialogOpen(!isDialogOpen)}
      >
        {formValues.image === null
          ? "Choose Contact Picture"
          : "Picture Selected"}
      </Button>
      <DialogBox
        isOpen={isDialogOpen}
        setIsOpen={(flag) => setIsDialogOpen(flag)}
        onImageSelectorType={(type) => onImageSelectorType(type)}
      />
    </ContactForm>
  );
};

export default AddContact;
