import React, { useState, useEffect } from "react";
import SafeViewAndroid from "../components/SafeViewAndroid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Spinner from "react-native-loading-spinner-overlay";
import { REACT_APP_BASE_API_URL } from "@env";
import axios from 'axios';
import {
  Text,
  SafeAreaView,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { userCurrentUserContext } from "../context/CurrentUserContext";
import { useUserContext } from "../context/UserContext";

const Login = () => {
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const {setUser} = userCurrentUserContext();
  const {setUserMain} = useUserContext();

  const navigation = useNavigation();

  const storeToken = async (value) => {
    const res = await AsyncStorage.setItem("@access_token", value);
    return res;
  };

  const submitLogin = () => {
    setLoading(true);
    axios.post(`${REACT_APP_BASE_API_URL}/user-login`, {
        contact_number: contactNumber,
        password: password,
      })
      .then((res) => {
        setLoading(false);
        if (res.data.status !== "failed") {
          setUser( res.data.user.id);
          setUserMain(res.data.user);
          storeToken(res.data.access_token);
          if(res.data.user.role == "0") {
            navigation.navigate("SubHome");
            console.log(res.data);
          }
          else {
            navigation.navigate("Drawer");
          }
          
        } else {
          alert(res.data.message);
          console.log(REACT_APP_BASE_API_URL);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log('erri', error);
      });
  };

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <LinearGradient colors={["rgba(255, 225, 144, .40) 0%", "#E01C34"]}>
        <View className="flex items-center mt-5">
          <View className="mt-10">
            <Image
                source={require("../../assets/app-logo.png")}
              className="h-28 w-72"
            />
          </View>
          <View className="mt-10 h-screen">
            <View className="relative mb-5">
              <Text className="absolute text-red-500 text-xs top-2 left-2 z-10">
                Contact number
              </Text>
              <TextInput
                className="bg-gray-100 rounded-md px-2 pb-2 pt-5 w-96"
                onChangeText={setContactNumber}
                value={contactNumber}
                placeholder="Enter contact number"
              />
            </View>
            <View className="relative mb-5">
              <Text className="absolute text-red-500 text-xs top-2 left-2 z-10">
                Password
              </Text>
              <TextInput
                className="bg-gray-100 rounded-md px-2 pb-2 pt-5 w-96"
                onChangeText={setPassword}
                secureTextEntry={true}
                value={password}
                placeholder="Enter password"
              />
            </View>
            <Text className="text-red-500 text-sm" onPress={()=> navigation.navigate("Register")}>Want to subscribe? Click here to register. </Text>
            <TouchableOpacity
              className="bg-white mt-4 rounded-md h-14 w-96 absolute bottom-64"
              onPress={submitLogin}
            >
              <Text className="text-red-500 text-base pt-4 font-bold text-center">
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
      <Spinner visible={loading} />
    </SafeAreaView>
  );
};

export default Login;
