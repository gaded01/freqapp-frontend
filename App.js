import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import ScreenStack from "./src/navigation/ScreenStack";
import { StyleSheet, Text, View } from 'react-native';
import { BillStatusContext } from './src/context/BillStatusContext';
import { useState } from 'react';
import { CurrentUserContext } from './src/context/CurrentUserContext';
import { UserContext } from './src/context/UserContext';

export default function App() {
  const [ billStatus, setBillStatus ] = useState();
  const [ userId , setUser ] = useState();
  const [ user , setUserMain ] = useState();

  return (
    <NavigationContainer>
      	<BillStatusContext.Provider value={{billStatus, setBillStatus }}>
      	<UserContext.Provider value={{user, setUserMain }}>
      	<CurrentUserContext.Provider value={{userId, setUser}}>
          <ScreenStack/>
        </CurrentUserContext.Provider>
        </UserContext.Provider>
        </BillStatusContext.Provider>
    </NavigationContainer>
  );
}

