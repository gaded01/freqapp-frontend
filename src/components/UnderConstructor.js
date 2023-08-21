import React from "react";
import {
  Text,
  SafeAreaView,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

const UnderConstruction = () => {
  return (
    <View className="flex items-center">
      <Image
        source={require("../../assets/underconstruction.png")}
        className="h-80 w-64"
      />
      <Text className="text-xl text-orange-700 font-bold my-2">
        System Update
      </Text>
      <Text className="text-center text-zinc-600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Text>
    </View>
  );
};

export default UnderConstruction;
