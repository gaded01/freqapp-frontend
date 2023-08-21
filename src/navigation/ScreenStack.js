import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Home from "../screens/Home";
import Drawer from "./DrawerStack";

const Stack = createNativeStackNavigator();
const ScreenStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          drawerItemStyle: { display: "none" },
        }}
      />
      <Stack.Screen
        name="Drawer"
        component={Drawer}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default ScreenStack;
