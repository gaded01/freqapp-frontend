import React, { useEffect, useState } from "react";
import SafeViewAndroid from "../components/SafeViewAndroid";
// import Header from "../components/Header";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowLeftIcon,
  ArrowUpTrayIcon,
  Bars3BottomRightIcon,
  PhotoIcon,
  PlusCircleIcon,
  PlusIcon,
} from "react-native-heroicons/outline";
import Spinner from "react-native-loading-spinner-overlay";
import { REACT_APP_BASE_API_URL } from "@env";
import {
  Text,
  SafeAreaView,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useBillStatusContext } from "../context/BillStatusContext";
import * as DocumentPicker from "expo-document-picker";

const AdminBillingInfoModal = () => {
  const navigation = useNavigation();
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [image, setImg] = useState(null);
  const [image2, setImg2] = useState(null);
  const { billStatus, setBillStatus } = useBillStatusContext();
  const [info ,setInfo]  =useState({});
  const [file, setFile] = useState({
    uri: "",
    fname: "",
    type: ""
  })
  let bodyFormData = new FormData();

  const paid = async () => {
    bodyFormData.append('bill_id', billStatus);
    bodyFormData.append('image', {
      uri: file.uri,
      name: file.fname,
      type: file.type,
    });
    console.log('asdasd', bodyFormData)
    let response = await AsyncStorage.getItem("@access_token");
    let config = { 
      headers: 
        { 
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${response}`,
          
        } 
    };
    setLoading(true);
    setTimeout(async () => {
      console.log('asdasd')
      await axios
        .post(
          `${REACT_APP_BASE_API_URL}/verify-payment`, bodyFormData,  config)
        .then((res) => {
          setBills(() => res.data);
          console.log('errewrwerwerwerwer', res.data);
          navigation.navigate("Bill");
          alert("Please wait for the payment verification");
          setBillStatus(() => null);
        })
        .catch((err) => {
          console.log("err", err);
        });
      setLoading(false);
    }, 5000);
  };
  
  useEffect(() => {
    (async () => {
      let response = await AsyncStorage.getItem("@access_token");
      let config = { headers: { Authorization: `Bearer ${response}` } };
      setLoading(true);
      await axios
        .get(`${REACT_APP_BASE_API_URL}/get-information`, config)
        .then((res) => {
          setInfo(() => res.data);
          console.log("bill", res);
        })
        .catch((err) => {
          console.log("err", err);
        });
      setLoading(false);
    })();
  }, []);

  const selectImage = async () => {
    try {
      let doc = await DocumentPicker.getDocumentAsync({
        type: "image/*",
        multiple: false,
      });
      setImg(doc.assets[0].uri);
      setFile(prevState => (
        {...prevState, 
        uri: doc.assets[0].uri,
        fname: doc.assets[0].name,
        type: doc.assets[0].mimeType,
      }
        ))
    } catch (err) {
      console.log(err);
    }
  };

  const append = () => {

  }

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      {/* <LinearGradient
        className=" flex-1 py-5 px-5"
        colors={["rgba(246, 99, 92, 0.40) 0%", "#F6635C"]}
      > */}

      <View className="bg-gray-50 flex-1 py-5 px-5">
        <ArrowLeftIcon
          onPress={() => {
            navigation.goBack();
          }}
          color="#000"
          size="30"
        />
        <View className="flex-row justify-between items-center my-5">
          <Text className="text-red-500 text-3xl font-semibold">
            Payment Method
          </Text>
        </View>
        <View className="bg-white relative shadow-black shadow-xl rounded-lg p-5 h-auto mb-32">
          <ScrollView
            vertical
            contentContainerStyle={{
              paddingBottom: 30,
              flexGrow: 1,
              overflow: "hidden",
            }}
            showsHorizontalScrollIndicator={false}
            className="pt-4"
            h
          >
            <Text className="font-semibold text-xs text-red-500 mb-1">
              Instruction
            </Text>
            <Text className="text-xs">
              Please make payment according to your bill, payment can be via
              transfer to the following account:
            </Text>
            <View className="py-5">
              <Text className="text-xs ml-1"><Text className="text-red-500">Step 1:</Text> Copy the details of GCash account</Text>
              <View className="flex-row mt-5">
                <Image
                  source={require("../../assets/gcash.png")}
                  className="h-11 w-11"
                />
                <View className="flex justify-evenly ml-1">
                  
                  <Text className="text-xs"><Text className="text-gray-400">GCash account:</Text> {info?.number}</Text>
                  <Text className="text-xs"><Text className="text-gray-400">Name:</Text> {info?.name}</Text>
                </View>
              </View>
            </View>
            <Text className="text-xs ml-1 pt-3 pb-10"><Text className="text-red-500">Step 2:</Text> Open your GCash App and transfer the payment to the recipient's GCash account - 
              <Text className="text-red-500"> 0956000001</Text>
            </Text>
            <Text className="text-xs ml-1 pb-4"><Text className="text-red-500">Step 3:</Text>Take a screenshot of your payment and click the choose file to upload the screenshot </Text>
            <View className="flex items-center border-dashed border-0.5 relative border-slate-400 rounded-md h-56 mb-10">
              {image != null ? (
                <View className="flex items-center mt-5 w-56">
                  <Image source={{ uri: image }} className="h-36 w-24" />
                </View>
              ) : (
                <View className="flex items-center mt-12 w-56">
                  <PhotoIcon color="#f1f1f1" size="40"/>
                  <Text className="text-red-500 text-xs font-semibold">
                    UPLOAD IMAGE HERE
                  </Text>
                  <Text className="text-gray-400 text-xs mt-2 text-center ">
                    Click the button to upload your payment screenshot here
                  </Text>
                </View>
              )}
              <TouchableOpacity 
                className="absolute bottom-2 bg-red-500 py-2 px-5 rounded-3xl"
                onPress={selectImage}
              >
                <Text className="text-white text-xs text-center ">
                  Choose File
                </Text>
              </TouchableOpacity>
            </View>

            <View>
              <Text className="text-xs text-red-500 font-semibold mb-1">
                Contact Information
              </Text>
              <Text className="text-xs">Email : sample@gmail.com</Text>
              <Text className="text-xs">Phone No :  {info?.number}</Text>
            </View>
            <View className="flex-col justify-center item-center mt-10">
              <Text className="text-xs text-center text-gray-500">If you have paid, please click</Text>
              <TouchableOpacity
                className="bg-red-500 mt-0 rounded-md h-10 w-full"
                onPress={paid}
              >
                <Text className="text-white text-sm pt-2.5 font-semibold text-center">
                  I've Paid
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
      {/* </LinearGradient> */}
      <Spinner visible={loading} />
    </SafeAreaView>
  );
};

export default AdminBillingInfoModal;
