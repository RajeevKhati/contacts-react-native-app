import * as React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchContacts } from "../redux/actions/contactActions";
import { Box, Fab, Icon } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import ListOfContacts from "../components/ListOfContacts";

const ContactList = (props) => {
  const contacts = useSelector((state) =>
    Object.values(state.contact).sort((contact1, contact2) =>
      contact1.name.localeCompare(contact2.name)
    )
  );
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchContacts());
  }, []);

  return (
    <Box
      w={{
        base: "100%",
        md: "25%",
      }}
    >
      <ListOfContacts contacts={contacts} navigation={props.navigation} />
      <Box position="relative" h={100} w="100%">
        <Fab
          renderInPortal={isFocused}
          size="sm"
          icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
          onPress={() => props.navigation.navigate("AddContact")}
        />
      </Box>
    </Box>
  );
};

export default ContactList;
