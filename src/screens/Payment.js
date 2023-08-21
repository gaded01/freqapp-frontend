import React from 'react'
import SafeViewAndroid from "../components/SafeViewAndroid";
import Header from "../components/Header";
import UnderConstruction from "../components/UnderConstructor";
import {
  Text,
  SafeAreaView,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

const Payment = () => {
  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
    <View>
      <Header/>
      <View className="mx-3 my-10">
            <Text className="text-2xl font-bold text-orange-700 mr-3">Payment Transaction</Text>
          <View className="flex flex-row items-center"> 
            <UnderConstruction/>
          </View>
         
      </View>
    </View>
  </SafeAreaView>
  )
}

export default Payment