import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import ScreenStack from "./src/navigation/ScreenStack";
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <NavigationContainer>
        <ScreenStack/>
    </NavigationContainer>
  );
}

