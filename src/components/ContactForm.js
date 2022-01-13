import React from "react";
import {
  Box,
  Button,
  Center,
  Container,
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
  return (
    <Box padding={5}>
      <VStack space={3}>
        {children[0]}
        {children[1]}
        <Input
          value={formValues.name}
          w={{
            base: "100%",
            md: "25%",
          }}
          name="name"
          onChangeText={(text) => handleChange(text, "name")}
          placeholder="Enter name"
        />
        <Input
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
          <Text alignSelf="center">Add this contact to your favorites</Text>
        </HStack>
        <Button alignSelf="center" width={150} onPress={onSave}>
          {buttonText}
        </Button>
        {children[2]}
      </VStack>
    </Box>
  );
};

export default ContactForm;
