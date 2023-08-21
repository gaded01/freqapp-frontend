import React, {useEffect}from "react";
import SafeViewAndroid from "../components/SafeViewAndroid";
import { useNavigation } from "@react-navigation/native";
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

const Login = () => {
  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <View>
        <Header/>
        <View className="mx-3 my-10">
            <View className="flex flex-row items-center"> 
                <Text className="text-2xl font-bold text-orange-700 mr-3">Welcome Admin!</Text>
                <Image source={require("../../assets/hello.png")} className="h-9 w-9 rotate-12"/>
            </View>
            <UnderConstruction/>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
