import { AlertDialog, Button } from "native-base";
import React from "react";

const DialogBox = ({ isOpen, onImageSelectorType, setIsOpen }) => {
  const cancelRef = React.useRef(null);

  const onClose = (type) => {
    onImageSelectorType(type);
    setIsOpen(false);
  };

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={() => onClose(null)}
    >
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>Select Photo</AlertDialog.Header>
        <AlertDialog.Body>
          Select how you want to select profile pic of current contact
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button
              colorScheme="secondary"
              onPress={() => onClose("imagePicker")}
              ref={cancelRef}
            >
              Photo from gallery
            </Button>
            <Button colorScheme="primary" onPress={() => onClose("camera")}>
              Take Photo
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default DialogBox;
