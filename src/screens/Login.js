import React, { useState, useEffect } from "react";
import SafeViewAndroid from "../components/SafeViewAndroid";
import { useNavigation } from "@react-navigation/native";
import { Bars3BottomRightIcon } from "react-native-heroicons/outline";
import LinearGradient from "react-native-linear-gradient";
import {
  Text,
  SafeAreaView,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const submit = () => {
    if (email == "admin@gmail.com" && password == "admin") {
      navigation.navigate("Drawer");
    }
  };

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <View>
        <View className="flex flex-row justify-center mt-10">
          <Image source={require("../../assets/default-app-logo.png")} />
        </View>
        <View className="flex items-center mt-5">
          <Text className="text-lg font-extrabold text-zinc-600">
            Login Here
          </Text>
          <View className="mt-5">
            <TextInput
              className="p-3 rounded-md border mb-5 w-72"
              onChangeText={setEmail}
              value={email}
              placeholder="Email/Mobile Number"
            />
            <TextInput
              className="p-3 rounded-md border mb-5 w-72"
              secureTextEntry={true}
              onChangeText={setPassword}
              value={password}
              placeholder="Password"
            />
          </View>
          <TouchableOpacity
            className="bg-orange-600 mt-4 rounded-md h-12 w-72"
            onPress={submit}
          >
            <Text className="text-white text-base pt-3 font-bold text-center">
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
