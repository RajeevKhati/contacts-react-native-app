import * as React from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Box, Pressable, VStack, Text, HStack, Icon } from "native-base";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

const getIcon = (screenName, props, index) => {
  switch (screenName) {
    case "Contacts":
      return (
        <Icon
          color={index === props.state.index ? "primary.500" : "gray.500"}
          size="5"
          as={AntDesign}
          name="contacts"
          _dark={{
            color: "warmGray.50",
          }}
        />
      );
    case "Favorites":
      return (
        <Icon
          color="danger.500"
          size="5"
          as={MaterialIcons}
          name="favorite"
          _dark={{
            color: "warmGray.50",
          }}
        />
      );
    default:
      return undefined;
  }
};

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} safeArea>
      <VStack space="6" my="2" mx="1">
        <Box px="4">
          <Text bold color="gray.700">
            Navigation
          </Text>
          {/* <Text fontSize="14" mt="1" color="gray.500" fontWeight="500">
            john_doe@gmail.com
          </Text> */}
        </Box>
        <VStack space="3">
          {props.state.routeNames.map((name, index) => (
            <Pressable
              key={index}
              px="5"
              py="3"
              rounded="md"
              bg={
                index === props.state.index
                  ? "rgba(6, 182, 212, 0.1)"
                  : "transparent"
              }
              onPress={(event) => {
                props.navigation.navigate(name);
              }}
            >
              <HStack space="7" alignItems="center">
                {getIcon(name, props, index)}

                <Text
                  fontWeight="500"
                  color={
                    index === props.state.index ? "primary.500" : "gray.700"
                  }
                >
                  {name}
                </Text>
              </HStack>
            </Pressable>
          ))}
        </VStack>
      </VStack>
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;
