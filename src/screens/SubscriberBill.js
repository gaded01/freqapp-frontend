import React, { useEffect, useState } from "react";
import SafeViewAndroid from "../components/SafeViewAndroid";
// import Header from "../components/Header";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowLeftIcon,
  Bars3BottomRightIcon,
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

const SubscriberBill = () => {
  const navigation = useNavigation();
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);
  const {billStatus, setBillStatus} = useBillStatusContext();

  useEffect(() => {
    (async () => {
      let response = await AsyncStorage.getItem("@access_token");
      let config = { headers: { Authorization: `Bearer ${response}` } };
      setLoading(true);
      await axios
        .post(`${REACT_APP_BASE_API_URL}/get-bill`, {} , config)
        .then((res) => {
          setBills(() => res.data.bill);
          console.log('bill',res) 
        })
        .catch((err) => {
          console.log('err', err) 
        });
      setLoading(false); 
    })();
  }, [billStatus]);

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
              {bills != 0
                ? bills.map((bill, i) => {
                    return ( 
                      <View
                        className="flex-row items-center justify-between border-b border-gray-200 py-5"
                        key={i}
                      >
                        <View className="flex justify-center">
                          <View className="flex mb-2 ">
                            <Text className="text-red-500 text-base">{`${bill.month} ${bill.year}`}</Text>
                            <Text className=" text-base">Due on: {`${bill.month}`} 30</Text>
                          </View>
                          <Text className={`text-xs ${bill.status == 2? "bg-green-600 w-14" : bill.status == 1? "bg-orange-600 w-16" : "bg-red-600 w-16"}  p-0.5 text-center rounded-2xl text-white`}>
                           {bill.status == 2 ? "Paid"  : bill.status == 1 ? "Verifying" : "Not Paid"}
                          </Text>
                        </View>
                        <View className="flex items-end">
                          <Text className="text-left text-base font-semibold">{`Php ${bill.amount}.00`}</Text>
                          <TouchableOpacity 
                            className="bg-red-500 rounded-lg flex items-center justify-center h-8 w-20"
                            disabled={bill.status != 0 ? true: false}
                            onPress={()=>
                              { 
                                setBillStatus(()=> bill.id);
                                navigation.navigate("modal")
                              }}
                          >
                              <Text className="text-white text-sm">Pay Bill</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    );
                  })
                : null}
            </ScrollView>
          </View>
        </View>
        </View>

      {/* </LinearGradient> */}
      <Spinner visible={loading} />
    </SafeAreaView>
  );
};

export default SubscriberBill;
