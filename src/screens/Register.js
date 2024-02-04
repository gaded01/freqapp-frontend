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


const initialState = {
   first_name: '',
   middle_name: '',
   last_name: '',
   address: '',
   lat: '',
   lon: '',
   contact_number: '',
 };
const Register = () => {
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [autocompelete, setAutoComplete] = useState([]);
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

  const searchAddress = () => {
   console.log(values.address);
   setAutoComplete([])
   axios
     .get('https://api.geoapify.com/v1/geocode/autocomplete', {
       params: {
         text: values.address,
         apiKey: '124a6fb19cab481cabeb3eb096fa944c'
       }
     })
     .then(function (response) {
       response.data.features.map((feature) => {
         setAutoComplete((autocomplete) => [...autocomplete, feature]);
         console.log('feature', feature);
       });
     })
     .catch(function (error) {
       console.log('error', error);
     });
 };

 const handleNameChanges = (prop, value) => {
   if(isNaN(value)){
     setValues({ ...values, [prop]: value });
   }
 }

 const handleChanges = (prop, value) => {
   setValues({ ...values, [prop]: value});
 };

 const selectPlace = (place) => {
   setValues({ ...values, address: place.properties.formatted, lon: place.properties.lon, lat: place.properties.lat });
   setAutoComplete([]);
 }


 const submitRegister = () => {
   console.log('values', values)
 }
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
            <Text className=" text-xl text-red-500 font-bold">Register here</Text>
            <Text className="text-black pb-5 text-sm" onPress={()=> navigation.navigate("Login")}>Already have account? Click here to login. </Text>
            <View className="relative mb-5">
              <Text className="absolute text-red-500 text-xs top-2 left-2 z-10">
               First Name
              </Text>
              <TextInput
                className="bg-gray-100 rounded-md px-2 pb-2 pt-5 w-96"
                onChangeText={(value)=> handleNameChanges('first_name', value)}
                
                value={values.first_name}
                placeholder="Enter first name"
              />
            </View>
            <View className="relative mb-5">
              <Text className="absolute text-red-500 text-xs top-2 left-2 z-10">
                Middle Name
              </Text>
              <TextInput
                className="bg-gray-100 rounded-md px-2 pb-2 pt-5 w-96"
                onChangeText={(value)=> handleNameChanges('middle_name', value)}
               value={values.middle_name}
                placeholder="Enter middle name"
              />
            </View>
            <View className="relative mb-5">
              <Text className="absolute text-red-500 text-xs top-2 left-2 z-10">
                Last Name
              </Text>
              <TextInput
                className="bg-gray-100 rounded-md px-2 pb-2 pt-5 w-96"
                onChangeText={(value)=> handleNameChanges('last_name', value)}
                value={values.last_name}
           
                placeholder="Enter last name"
              />
            </View>
            <View className="relative mb-5">
              <Text className="absolute text-red-500 text-xs top-2 left-2 z-10">
                Contact Number
              </Text>
              <TextInput
                className="bg-gray-100 rounded-md px-2 pb-2 pt-5 w-96"
                onChangeText={(value)=> handleNameChanges('contact_number', value)}
                value={values.contact_number}

                placeholder="Enter contact number"
              />
            </View>
            <View className="relative mb-5">
              <Text className="absolute text-red-500 text-xs top-2 left-2 z-10">
               Address
              </Text>
              <TextInput
                className="bg-gray-100 rounded-md px-2 pb-2 pt-5 w-96"
                onChangeText={(value)=> handleChanges('address', value)}
                value={values.address}
               
                placeholder="Enter address"
              />
              <View className="absolute top-1.5 right-3"> 
                  <TouchableOpacity className="bg-gray-300 w-16 h-11 rounded-md d-flex justify-center items-center"   onPress={() => searchAddress()}>
                     <Text className="text-red-500">Search</Text>
                  </TouchableOpacity>
              </View>
              {autocompelete.length? 
                  <View>
                     <Text className="font-semibold py-2">Select address</Text>
               {autocompelete.map((search, key) => {
                  return (
                     <Text className="py-0.5" key={key} onPress={()=> selectPlace(search)}>
                           {search.properties.formatted}
                     </Text>
                  );
               })}
                  </View>
                  :
                  <Text className="text-black py-5 font-semibold">No place found. Try searching places to find your address.</Text>
               }
              
            </View>
           
            <TouchableOpacity
              className="bg-white mt-4 rounded-md h-14 w-96 absolute bottom-64"
              onPress={submitRegister}
            >
              <Text className="text-red-500 text-base pt-4 font-bold text-center">
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
      <Spinner visible={loading} />
    </SafeAreaView>
  );
};

export default Register;
