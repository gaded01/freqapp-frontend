import React from "react";
import SafeViewAndroid from "../components/SafeViewAndroid";
// import Header from "../components/Header";
import { useNavigation } from "@react-navigation/native";
import { Bars3BottomRightIcon } from "react-native-heroicons/outline";
// import UnderConstruction from "../components/UnderConstructor";
import {
  Text,
  SafeAreaView,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

const Report = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <View>
        <View className="mx-3 my-10">
          <Text className="text-2xl font-bold text-orange-700 mr-3">
            Report
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Report;
