import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Welcome from "../screens/Welcome";
import SubHome from "../screens/SubHome";
import Draw from "./DrawerStack";
import SubscriberBill from "../screens/SubscriberBill";
import TransactionLog from "../screens/TransactionLog";
import AdminBillingInfoModal from "../screens/AdminBillngInfoModal";
import CustomerSupport from "../screens/CustomerSupport";
import DataConsumption from "../screens/DataConsumption";

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
        name="Register"
        component={Register}
        options={{
          headerShown: false,
          drawerItemStyle: { display: "none" },
        }}
      />
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{
          headerShown: false,
          drawerItemStyle: { display: "none" },
        }}
      />
      <Stack.Screen
        name="SubHome"
        component={SubHome}
        options={{
          headerShown: false,
          drawerItemStyle: { display: "none" },
        }}
      />
      <Stack.Screen
        name="Bill"
        component={SubscriberBill}
        options={{
          headerShown: false,
          drawerItemStyle: { display: "none" },
        }}
      />
      <Stack.Screen
        name="CustomerSupport"
        component={CustomerSupport}
        options={{
          headerShown: false,
          drawerItemStyle: { display: "none" },
        }}
      />
      <Stack.Screen
        name="DataConsumption"
        component={DataConsumption}
        options={{
          headerShown: false,
          drawerItemStyle: { display: "none" },
        }}
      />
      <Stack.Screen
        name="TransactionLog"
        component={TransactionLog}
        options={{
          headerShown: false,
          drawerItemStyle: { display: "none" },
        }}
      />
       <Stack.Screen
        name="modal"
        component={AdminBillingInfoModal}
        options={{
          // Set the presentation mode to modal for our modal route.
          headerShown: false,
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="Drawer"
        component={Draw}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default ScreenStack;
