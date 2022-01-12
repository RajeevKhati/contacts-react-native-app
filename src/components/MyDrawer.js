import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Box } from "native-base";
import ContactList from "../screens/ContactList";
import FavouriteContactList from "../screens/FavoriteContactList";
import CustomDrawerContent from "./CustomDrawerContent";

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Box mt="1" flex={1}>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="Contacts" component={ContactList} />
        <Drawer.Screen name="Favourites" component={FavouriteContactList} />
      </Drawer.Navigator>
    </Box>
  );
}

export default MyDrawer;
