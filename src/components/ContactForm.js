import React from "react";
import { Box, Button, Input, VStack } from "native-base";

const ContactForm = ({
  formValues,
  handleChange,
  children,
  onSave,
  buttonText,
}) => {
  return (
    <Box>
      <VStack space={2}>
        <Input
          value={formValues.name}
          w={{
            base: "75%",
            md: "25%",
          }}
          name="name"
          onChangeText={(text) => handleChange(text, "name")}
          placeholder="Enter name"
        />
        <Input
          value={formValues.mobile}
          w={{
            base: "75%",
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
            base: "75%",
            md: "25%",
          }}
          onChangeText={(text) => handleChange(text, "landline")}
          name="landline"
          placeholder="Enter landline"
          keyboardType="numeric"
        />
        {children}
        <Button onPress={onSave}>{buttonText}</Button>
      </VStack>
    </Box>
  );
};

export default ContactForm;
