import React, { useEffect, useState } from "react";
import SafeViewAndroid from "../components/SafeViewAndroid";
import { useNavigation } from "@react-navigation/native";
import {
  ArrowRightOnRectangleIcon,

} from "react-native-heroicons/outline";
import { REACT_APP_BASE_API_URL } from "@env";
import {
  Text,
  SafeAreaView,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useBillStatusContext } from "../context/BillStatusContext";
import axios from "axios";
import { useUserContext } from "../context/UserContext";

const SubHome = () => {
  const navigation = useNavigation();
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);
  const {billStatus, setBillStatus} = useBillStatusContext();
  const {user} = useUserContext();

  useEffect(() => {
    alert("Welcome Subsciber!");
    console.log('uiser' ,user);
  }, []);

  useEffect(()=> {
    (async () => {
      let response = await AsyncStorage.getItem("@access_token");
      let config = { headers: { Authorization: `Bearer ${response}` } };
      setLoading(true);
      await axios
        .post(`${REACT_APP_BASE_API_URL}/get-bill`, {} , config)    
        .then((res) => {
          setBills(() => res.data);
        })
        .catch((err) => {
          console.log('err', err) 
        });
      setLoading(false);  
    })();
  }, [])

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <LinearGradient
        className="py-5 px-5 flex-1"
        // colors={["rgba(246, 99, 92, 0.40) 0%", "#F6635C"]}
        // colors={["rgba(246, 99, 92, 0.60) 0%", "#ed26a7"]}
        colors={["rgba(255, 225, 144, .40) 0%", "#E01C34"]}
      >
        <View className="flex-row items-center">
             <Image
                source={require("../../assets/user.png")}
              className="h-14 w-14"
            />
            <View className="ml-2">
              <Text className="text-base font-semibold">{`${user?.first_name} ${user?.middle_name} ${user?.last_name}`}</Text>
              {user.address == "" ?  null : <Text className="text-sm text-gray-700">{`${user?.address}`}</Text> }
              {user.contact_number == "" ?  null :<Text className="text-sm text-gray-700">{`${user?.contact_number}`}</Text> }
            </View>
          {/* <Image
                source={require("../../assets/app-logo.png")}
              className="h-20 w-48"
            /> */} 
          {/* <ArrowRightOnRectangleIcon
            onPress={() => {
              navigation.replace("Login");
            }}
            className="absolute left-0"
            color="#000"
            size="30"
          /> */}
        </View>
        <View className="mx-3 my-10">
          <View className="bg-white shadow-lg rounded-lg p-5 h-44">
            <Text className="text-4xl font-semibold">₱ {bills.total_amount}.00</Text>
            <Text className="text-sm font-semibold text-gray-400">
              Total Amount <Text className="text-red-500">Payable</Text>
            </Text>

            <TouchableOpacity 
              className="flex absolute bottom-5 right-5 items-center justify-center bg-red-300 w-32 h-12 rounded"
              onPress={() => {
                navigation.navigate("Bill");
              }} 
            >
              <Text className="text-red-600 font-semibold">View</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row my-5 justify-between flex-wrap">
            <View className="flex-col items-center mb-5">
              <TouchableOpacity 
                className="bg-gray-200 rounded-lg flex items-center justify-center h-32 w-32"
                onPress={() => {
                  navigation.navigate("Bill");
                }}  
              >
                <Image
                  source={require("../../assets/bill.png")}
                  className="h-16 w-16"
                 
                />
              </TouchableOpacity>
              <Text className="text-base text-white font-bold">Bill</Text>
            </View>

            <View className="flex-col items-center mb-5">
              <TouchableOpacity 
                className="bg-gray-100 rounded-lg flex items-center justify-center h-32 w-32"
                onPress={()=> {
                  navigation.navigate("CustomerSupport")
                }}
              >
                <Image
                  source={require("../../assets/chat.png")}
                  className="h-16 w-16"
                />
              </TouchableOpacity>
              <Text className="text-base text-white font-bold">Support</Text>
            </View>

           
            {/* <View className="flex-col items-center mb-5">
              <TouchableOpacity
                className="bg-gray-200 rounded-lg flex items-center justify-center h-32 w-32"
                onPress={() => {
                  navigation.navigate("DataConsumption");
                }} 
              >
                <Image
                  source={require("../../assets/user.png")}
                  className="h-16 w-16"
                />
              </TouchableOpacity>
              <Text className="text-base text-white font-bold">
                Plan Details
              </Text>
            </View> */}

            <View className="flex-col items-center mb-5">
              <TouchableOpacity
                className="bg-gray-200 rounded-lg flex items-center justify-center h-32 w-32"
                onPress={() => {
                  navigation.navigate("DataConsumption");
                }} 
              >
                <Image
                  source={require("../../assets/statistics.png")}
                  className="h-16 w-16"
                />
              </TouchableOpacity>
              <Text className="text-base text-white font-bold">
                Consumption
              </Text>
            </View>
            <View className="flex-col items-center mb-5">
              <TouchableOpacity
                className="bg-gray-200 rounded-lg flex items-center justify-center h-32 w-32"
                onPress={() => {
                  navigation.navigate("TransactionLog");
                }} 
              >
                <Image
                  source={require("../../assets/list.png")}
                  className="h-16 w-16"
                />
              </TouchableOpacity>
              <Text className="text-base text-white font-bold">
                Transaction Log
              </Text>
            </View>
            <View className="flex-col items-center mb-5">
              <TouchableOpacity
                className="bg-gray-200 rounded-lg flex items-center justify-center h-32 w-32"
                onPress={() => {
                  navigation.replace("Login");
                }}
              >
                <Image
                  source={require("../../assets/logout.png")}
                  className="h-16 w-16"
                />
              </TouchableOpacity>
              <Text className="text-base text-white font-bold">
                Logout
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default SubHome;
