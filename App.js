import * as React from "react";
import { NativeBaseProvider, extendTheme, Drawer } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import MyDrawer from "./src/components/MyDrawer";
import AddContact from "./src/screens/AddContact";
import { createStackNavigator } from "@react-navigation/stack";
import ShowCamera from "./src/screens/ShowCamera";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import UpdateContact from "./src/screens/UpdateContact";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <NativeBaseProvider>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ animationEnabled: false }}
          >
            <Stack.Screen
              name="Home"
              component={MyDrawer}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddContact"
              component={AddContact}
              options={{ title: "Add New Contact" }}
            />
            <Stack.Screen
              name="UpdateContact"
              component={UpdateContact}
              options={{ title: "Update Contact" }}
            />
            <Stack.Screen
              name="Camera"
              component={ShowCamera}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NativeBaseProvider>
      </NavigationContainer>
    </Provider>
  );
}
