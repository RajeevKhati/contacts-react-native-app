import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Avatar, Pressable } from "native-base";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import DialogBox from "../components/DialogBox";
import { useDispatch } from "react-redux";
import { createContact } from "../redux/actions/contactActions";
import { useSelector } from "react-redux";
import { updateClickedPhotoUri } from "../redux/actions/clickedPhotoUriActions";
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
  const clickedPhotoUri = useSelector((state) => state.clickedPhotoUri);

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
    });

    if (!result.cancelled) {
      setFormValues({ ...formValues, image: result.uri });
    }
  };

  useEffect(() => {
    dispatch(updateClickedPhotoUri(null));
  }, []);

  useEffect(() => {
    setFormValues({ ...formValues, image: clickedPhotoUri });
  }, [clickedPhotoUri]);

  const onSave = () => {
    dispatch(createContact(formValues));
    props.navigation.navigate("Contacts");
  };

  const onImageSelectorType = (type) => {
    if (type === "imagePicker") {
      pickImage();
    } else if (type === "camera") {
      props.navigation.navigate("Camera");
    }
  };

  const renderCam = () => {
    return (
      <Avatar
        alignSelf="center"
        bg="coolGray.200"
        size="xl"
      >
        <MaterialCommunityIcons
          name="camera-plus-outline"
          size={35}
          color="black"
        />
      </Avatar>
    );
  };

  const renderProfilePic = () => {
    return (
      <Avatar
        alignSelf="center"
        bg="coolGray.200"
        size="xl"
        key={formValues.image}
        source={{
          uri: formValues.image,
        }}
      >
        ...Loading
      </Avatar>
    );
  };

  return (
    <ContactForm
      formValues={formValues}
      handleChange={handleChange}
      onSave={onSave}
      buttonText="Add Contact"
    >
      <Pressable
        onPress={() => setIsDialogOpen(!isDialogOpen)}
        _pressed={{
          transform: [
            {
              scale: 0.96,
            },
          ],
        }}
      >
        {formValues.image === null ? renderCam() : renderProfilePic()}
      </Pressable>
      <DialogBox
        isOpen={isDialogOpen}
        setIsOpen={(flag) => setIsDialogOpen(flag)}
        onImageSelectorType={(type) => onImageSelectorType(type)}
      />
    </ContactForm>
  );
};

export default AddContact;
