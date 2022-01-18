import React from "react";
import { useDispatch } from "react-redux";
import { editContact } from "../redux/actions/contactActions";
import {
  Text,
  Box,
  FlatList,
  Avatar,
  HStack,
  VStack,
  Spacer,
  Icon,
  Pressable,
  IconButton,
} from "native-base";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

const ListOfContacts = ({ contacts, navigation }) => {
  const dispatch = useDispatch();
  const favoriteTheCurrentContact = (contactId, contactDetails) => {
    dispatch(editContact(contactId, { ...contactDetails, favorite: 1 }));
  };

  const unFavoriteTheCurrentContact = (contactId, contactDetails) => {
    dispatch(editContact(contactId, { ...contactDetails, favorite: 0 }));
  };
  return (
    <FlatList
      data={contacts}
      keyExtractor={(item) => item.id + ""}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            navigation.navigate("UpdateContact", { id: item.id });
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
              {item.image ? (
                <Avatar
                  size="48px"
                  key={item.image}
                  source={{
                    uri: item.image,
                  }}
                ></Avatar>
              ) : (
                <Avatar size="48px" key={item.image}>
                  <FontAwesome name="user-o" size={24} color="black" />
                </Avatar>
              )}
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
                  Mobile - {item.mobile}
                </Text>
                {(item.landline!=="" && item.landline!==null) && (
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                  >
                    Landline - {item.landline}
                  </Text>
                )}
              </VStack>
              <Spacer />
              {item.favorite == 0 ? (
                <IconButton
                  onPress={() => favoriteTheCurrentContact(item.id, item)}
                  icon={<Icon as={AntDesign} name="staro" />}
                  _icon={{
                    color: "yellow.400",
                    size: "sm",
                  }}
                  alignSelf="center"
                />
              ) : (
                <IconButton
                  onPress={() => unFavoriteTheCurrentContact(item.id, item)}
                  icon={<Icon as={AntDesign} name="star" />}
                  _icon={{
                    color: "yellow.400",
                    size: "sm",
                  }}
                  alignSelf="center"
                />
              )}
            </HStack>
          </Box>
        </Pressable>
      )}
    />
  );
};

export default ListOfContacts;
