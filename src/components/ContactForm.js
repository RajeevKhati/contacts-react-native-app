import React, { useState } from "react";
import {
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  Input,
  Text,
  VStack,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";

const ContactForm = ({
  formValues,
  handleChange,
  children,
  onSave,
  buttonText,
}) => {
  const initialValues = {
    name: { isError: false, msg: "" },
    mobile: { isError: false, msg: "" },
  };
  const [formError, setFormError] = useState(initialValues);

  const onFormSubmit = () => {
    setFormError(initialValues);
    if (!formValues.name || !formValues.mobile) {
      if (!formValues.name) {
        setFormError((prevState) => ({
          ...prevState,
          name: { isError: true, msg: "Name is required" },
        }));
      }
      if (!formValues.mobile) {
        setFormError((prevState) => ({
          ...prevState,
          mobile: { isError: true, msg: "Mobile number is required" },
        }));
      }
    } else {
      onSave();
    }
  };

  const renderErrorText = (errorText) => {
    return (
      <Text
        alignSelf="flex-end"
        style={{ color: "red", margin: 0, padding: 0 }}
        fontSize="xs"
      >
        {errorText}
      </Text>
    );
  };

  return (
    <Box padding={5}>
      <VStack space={3}>
        {children[0]}
        {children[1]}

        <Input
          isInvalid={formError.name.isError}
          value={formValues.name}
          w={{
            base: "100%",
            md: "25%",
          }}
          name="name"
          onChangeText={(text) => handleChange(text, "name")}
          placeholder="Enter name"
        />
        {formError.name.isError && renderErrorText(formError.name.msg)}

        <Input
          isInvalid={formError.mobile.isError}
          value={formValues.mobile}
          w={{
            base: "100%",
            md: "25%",
          }}
          name="mobile"
          onChangeText={(text) => handleChange(text, "mobile")}
          placeholder="Enter Mobile Number"
          keyboardType="numeric"
        />
        {formError.mobile.isError && renderErrorText(formError.mobile.msg)}
        <Input
          value={formValues.landline}
          w={{
            base: "100%",
            md: "25%",
          }}
          onChangeText={(text) => handleChange(text, "landline")}
          name="landline"
          placeholder="Enter landline"
          keyboardType="numeric"
        />
        <HStack space={1}>
          {formValues.favorite == 0 ? (
            <IconButton
              onPress={() => handleChange(1, "favorite")}
              icon={<Icon as={AntDesign} name="staro" />}
              _icon={{
                color: "success.500",
                size: "sm",
              }}
              alignSelf="center"
            />
          ) : (
            <IconButton
              onPress={() => handleChange(0, "favorite")}
              icon={<Icon as={AntDesign} name="star" />}
              _icon={{
                color: "success.300",
                size: "sm",
              }}
              alignSelf="center"
            />
          )}
          <Text alignSelf="center">Add to favorites</Text>
        </HStack>
        <Button alignSelf="center" width={150} onPress={onFormSubmit}>
          {buttonText}
        </Button>
        {children[2]}
      </VStack>
    </Box>
  );
};

export default ContactForm;
