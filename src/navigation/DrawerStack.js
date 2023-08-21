import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import Payment from '../screens/Payment';
import Subscription from '../screens/Subscription';
import Plan from '../screens/Plan';
import Report from '../screens/Report';
import Logout from '../screens/Logout';

const Drawer = createDrawerNavigator();

const Root = () => {
  return (
    <Drawer.Navigator>
         <Drawer.Screen 
            name="Home" 
            component={Home} 
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
  )
}

export default Root