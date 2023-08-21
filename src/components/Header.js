import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Bars3BottomRightIcon } from "react-native-heroicons/outline";
import {
    Text,
    SafeAreaView,
    View,
    Image,
    TextInput,
    TouchableOpacity,
  } from "react-native";

const Header = () => {
const navigation = useNavigation();
  return (
    <View className="flex flex-row justify-between  items-center">
      <Image source={require("../../assets/header-app-logo.png")} />
      <Bars3BottomRightIcon
        color="#000"
        size="35"
        onPress={() => navigation.openDrawer()}
      />
    </View>
  );
};

export default Header;

