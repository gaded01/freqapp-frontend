import React, { useState } from "react";
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

const Welcome = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <View>
        <View className="flex flex-row justify-center mt-10">
          <Image source={require("../../assets/default-app-logo.png")} />
        </View>
        <View className="flex items-center mt-5">
          <Text className="text-lg font-extrabold text-zinc-600">
            Welcome User
          </Text>
          <Text className="text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Text>
          <TouchableOpacity
            className="bg-orange-600 mt-4 rounded-md h-12 w-72"
            onPress={submit}
          >
            <Text className="text-white text-base pt-3 font-bold text-center">
              Click to Proceed
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
