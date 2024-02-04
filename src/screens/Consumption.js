import React, {useState} from "react";
import SafeViewAndroid from "../components/SafeViewAndroid";
// import Header from "../components/Header";
import { useNavigation } from "@react-navigation/native";
import {
  ArrowLeftIcon,
  Bars3BottomRightIcon,
  PlusCircleIcon,
  PlusIcon,
} from "react-native-heroicons/outline";
import {
  Text,
  SafeAreaView,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Spinner
} from "react-native";

const Consumption = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  
  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
        <View className="bg-gray-50 flex-1 py-5 px-5">
      <ArrowLeftIcon
          onPress={() => {
            navigation.goBack();
          }}
          color="#000"
          size="30"
        />
        <View className="flex-row justify-between items-center my-5">
          <Text className="text-red-500 text-3xl font-semibold">Pay Bills</Text>
        </View>
        <View>
          <View className="bg-white shadow-black shadow-xl rounded-lg px-5 pb-5 h-auto mb-32">
            <ScrollView
              vertical
              contentContainerStyle={{
                paddingVertical: 0,
                flexGrow: 1,
              }}
              showsHorizontalScrollIndicator={false}
              className="pt-4"h
            >
             
            </ScrollView>
          </View>
        </View>
        </View>

      {/* </LinearGradient> */}
      <Spinner visible={loading} />
    </SafeAreaView>
  );
};

export default Consumption;
