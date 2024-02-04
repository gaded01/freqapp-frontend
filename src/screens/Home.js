import React from "react";
import SafeViewAndroid from "../components/SafeViewAndroid";
import { useNavigation } from "@react-navigation/native";
import { ArrowRightOnRectangleIcon } from "react-native-heroicons/outline";
import { LinearGradient } from "expo-linear-gradient";
import {
  Text,
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
} from "react-native";


const Home = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <LinearGradient
        className="py-5 px-5"
        // colors={["rgba(246, 99, 92, 0.40) 0%", "#F6635C"]}
        colors={["rgba(246, 99, 92, 0.60) 0%", "#ed26a7"]}
      >
        <View className="flex-row justify-between">
          <ArrowRightOnRectangleIcon />
          <Text className="text-2xl font-bold text-red-500">FreqApp</Text>
          <ArrowRightOnRectangleIcon
            onPress={() => {
              navigation.replace("Login");
            }}
            className="absolute left-0"
            color="#000"
            size="30"
          />
        </View>
        <View className="mx-3 my-10">
          <View className="bg-white shadow-lg rounded-lg p-5 h-36">
            <Text className="text-3xl font-bold">₱ 0.00</Text>
            <Text className="text-xs font-semibold text-gray-400">
              Amount <Text className="text-red-500">Receivable</Text>
            </Text>

            <TouchableOpacity className="flex absolute bottom-5 right-5 items-center justify-center bg-red-300 w-28 h-10 rounded">
              <Text className="text-red-600 font-semibold">View</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row my-5 justify-between flex-wrap">
            <View className="flex-col items-center mb-5">
              <TouchableOpacity className="bg-gray-100 rounded-lg flex items-center justify-center h-32 w-32">
                <Image
                  source={require("../../assets/chat.png")}
                  className="h-16 w-16"
                />
              </TouchableOpacity>
              <Text className="text-base text-white font-bold">Support</Text>
            </View>

            <View className="flex-col items-center mb-5">
					<TouchableOpacity
						className="bg-gray-100 rounded-lg flex items-center justify-center h-32 w-32"
						onPress={() => {
							navigation.navigate("Subscription");
						}}
					>
						<Image
							source={require("../../assets/user.png")}
							className="h-16 w-16"
						/>
              	</TouchableOpacity>
              <Text className="text-base text-white font-bold">Subscriber</Text>
            </View>
				
				<View className="flex-col items-center mb-5">
					<TouchableOpacity className="bg-gray-100 rounded-lg flex items-center justify-center h-32 w-32">
					<Image
						source={require("../../assets/bill.png")}
						className="h-16 w-16"
					/>
					</TouchableOpacity>
					<Text className="text-base text-white font-bold">Billing</Text>
				</View>
           
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Home;
