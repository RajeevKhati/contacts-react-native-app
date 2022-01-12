import * as React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchContacts } from "../redux/actions/contactActions";
import {
  Box,
  FlatList,
  Avatar,
  HStack,
  VStack,
  Text,
  Spacer,
  Fab,
  Icon,
  Pressable,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";

const ContactList = (props) => {
  const contacts = useSelector((state) => Object.values(state.contact));
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
      {/* <Heading fontSize="xl" p="4" pb="3">
          Inbox
        </Heading> */}
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id + ""}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              props.navigation.navigate("UpdateContact", { id: item.id });
            }}
            _pressed={{
              transform: [
                {
                  scale: 0.96,
                },
              ],
            }}
          >
            <Box
              borderBottomWidth="1"
              _dark={{
                borderColor: "gray.600",
              }}
              borderColor="coolGray.200"
              pl="4"
              pr="5"
              py="2"
            >
              <HStack space={3} justifyContent="space-between">
                <Avatar
                  size="48px"
                  source={{
                    uri: "data:image/jpeg;base64," + item.image,
                  }}
                />
                <VStack>
                  <Text
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="coolGray.800"
                    bold
                  >
                    {item.name}
                  </Text>
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                  >
                    {item.mobile}
                  </Text>
                </VStack>
                <Spacer />
                <Text
                  fontSize="xs"
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="coolGray.800"
                  alignSelf="flex-start"
                >
                  {item.favorite}
                </Text>
              </HStack>
            </Box>
          </Pressable>
        )}
      />
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
