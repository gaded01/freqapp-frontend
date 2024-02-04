import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/Home";
import SubHome from "../screens/SubHome";
import Payment from "../screens/Payment";
import Subscription from "../screens/Subscription";
import AddSubscriber from "../screens/AddSubscriber";
import Plan from "../screens/Plan";
import Report from "../screens/Report";
import Logout from "../screens/Logout";
import SubscriberBill from "../screens/SubscriberBill";

const Drawer = createDrawerNavigator();

const Draw = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          // drawerItemStyle: { display: 'none' }
        }}
      />
       <Drawer.Screen
        name="Bill"
        component={SubscriberBill}
        options={{
          headerShown: false,
          // drawerItemStyle: { display: 'none' }
        }}
      />
      <Drawer.Screen
        name="Payment Transaction"
        component={Payment}
        options={{
          headerShown: false,
          // drawerItemStyle: { display: 'none' }
        }}
      />

      <Drawer.Screen
        name="Subscription"
        component={Subscription}
        options={{
          headerShown: false,
          // drawerItemStyle: { display: 'none' }
        }}
      />
      <Drawer.Screen
        name="AddSubscriber"
        component={AddSubscriber}
        options={{
          headerShown: false,
          // drawerItemStyle: { display: 'none' }
        }}
      />
      <Drawer.Screen
        name="Plain Available"
        component={Plan}
        options={{
          headerShown: false,
          // drawerItemStyle: { display: 'none' }
        }}
      />
      <Drawer.Screen
        name="Report"
        component={Report}
        options={{
          headerShown: false,
          // drawerItemStyle: { display: 'none' }
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={Logout}
        options={{
          headerShown: false,
          // drawerItemStyle: { display: 'none' }
        }}
      />
    </Drawer.Navigator>
  );
};

export default Draw;
